import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { useUser } from "../../Context/AuthContext";

const socket = io("http://localhost:3000");

function Message() {
    const { user } = useUser();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const [notifications, setNotifications] = useState([]); // State cho thông báo
    const messagesEndRef = useRef(null);

    const adminId = user?.id;

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Thêm thông báo mới
    const addNotification = (title, message) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, title, message }]);
        // Tự động xóa sau 5 giây
        setTimeout(() => {
            removeNotification(id);
        }, 5000);
    };

    // Xóa thông báo
    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get("/api/user/index");
            if (res.data.success) {
                setUsers(
                    res.data.data.map((u) => ({
                        ...u,
                        lastMessage: u.lastMessage || "",
                        unreadCount: u.unreadCount || 0,
                    }))
                );
            }
        } catch (error) {
            setError(error);
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi lấy danh sách user!");
        } finally {
            setLoading(false);
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await axiosClient.get("/api/message");
            setMessages(res.data);
            setTimeout(scrollToBottom, 0);

            const unreadCounts = res.data.reduce((acc, msg) => {
                if (msg.senderId !== adminId && !msg.isRead) {
                    acc[msg.senderId] = (acc[msg.senderId] || 0) + 1;
                }
                return acc;
            }, {});
            setUsers((prev) =>
                prev.map((u) => ({
                    ...u,
                    unreadCount: unreadCounts[u.id] || 0,
                    lastMessage:
                        res.data
                            .filter((m) => m.senderId === u.id || m.recipientId === u.id)
                            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0]?.message ||
                        u.lastMessage,
                }))
            );

            if (selectedUser) {
                const unreadMessages = res.data.filter(
                    (msg) => msg.senderId === selectedUser && !msg.isRead
                );
                unreadMessages.forEach((msg) => markMessageAsRead(msg.id));
            }
        } catch (error) {
            toast.error("Lỗi khi lấy tin nhắn!");
            console.error(error);
        }
    };

    useEffect(() => {
        if (!adminId) {
            toast.error("Bạn cần đăng nhập để sử dụng chat!");
            return;
        }

        fetchUsers();
        socket.emit("joinRoom", adminId);

        socket.on("newMessage", (newMessage) => {
            setMessages((prev) => {
                if (!prev.some((msg) => msg.id === newMessage.id)) {
                    const updatedMessages = [...prev, newMessage];
                    setTimeout(scrollToBottom, 0);

                    if (newMessage.senderId !== adminId) {
                        const sender = users.find((u) => u.id === newMessage.senderId);
                        setUsers((prevUsers) =>
                            prevUsers.map((u) =>
                                u.id === newMessage.senderId
                                    ? {
                                          ...u,
                                          lastMessage: newMessage.message,
                                          unreadCount:
                                              (u.unreadCount || 0) + (!newMessage.isRead ? 1 : 0),
                                      }
                                    : u
                            )
                        );

                        // Thêm thông báo nếu không đang xem user này
                        if (selectedUser !== newMessage.senderId) {
                            addNotification(
                                `Tin nhắn mới từ ${sender?.name || "Người dùng"}`,
                                newMessage.message
                            );
                        }

                        if (selectedUser === newMessage.senderId && !newMessage.isRead) {
                            markMessageAsRead(newMessage.id);
                        }
                    }
                    return updatedMessages;
                }
                return prev;
            });
        });

        socket.on("connect_error", (err) => {
            toast.error("Không thể kết nối tới server chat!");
            console.error("Socket connect error:", err);
        });

        return () => {
            socket.off("newMessage");
            socket.off("connect_error");
        };
    }, [adminId, selectedUser]);

    useEffect(() => {
        if (selectedUser) fetchMessages();
    }, [selectedUser]);

    const sendMessage = () => {
        if (!messageInput.trim() || !selectedUser) {
            toast.error("Vui lòng nhập tin nhắn và chọn người nhận!");
            return;
        }

        const tempMessage = {
            id: Date.now(),
            senderId: adminId,
            recipientId: selectedUser,
            message: messageInput,
            isRead: false,
            sender: { name: user?.name },
        };

        setMessages((prev) => {
            const updatedMessages = [...prev, tempMessage];
            setTimeout(scrollToBottom, 0);
            return updatedMessages;
        });
        setMessageInput("");

        socket.emit("adminMessage", {
            senderId: adminId,
            recipientId: selectedUser,
            message: messageInput,
        });
    };

    const markMessageAsRead = async (messageId) => {
        try {
            const response = await axiosClient.put(`/api/message/read/${messageId}`);
            if (response.status === 200) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === messageId ? { ...msg, isRead: true } : msg
                    )
                );
                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === selectedUser
                            ? { ...u, unreadCount: Math.max((u.unreadCount || 0) - 1, 0) }
                            : u
                    )
                );
            }
        } catch (error) {
            console.error("Lỗi khi đánh dấu tin nhắn là đã đọc:", error);
            toast.error("Không thể đánh dấu tin nhắn là đã đọc!");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar - User List */}
            <div className="w-1/4 bg-white border-r border-gray-300">
                <div className="p-4 bg-blue-600 text-white font-bold">
                    Danh sách người dùng
                </div>
                <div className="overflow-y-auto h-full pb-20">
                    {loading ? (
                        <div className="flex justify-center items-center h-20">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        users.map((user) => (
                            <div
                                key={user.id}
                                className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                                    selectedUser === user.id ? "bg-blue-50" : ""
                                } ${user.unreadCount > 0 ? "bg-yellow-100" : ""}`}
                                onClick={() => setSelectedUser(user.id)}
                            >
                                <div className="relative">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            <span className="text-gray-600 font-medium">
                                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                            </span>
                                        </div>
                                    )}
                                    {user.online && (
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                    )}
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="font-medium">{user.name || user.email || "Người dùng"}</div>
                                    <div className="text-sm text-gray-500 truncate">
                                        {user.lastMessage || "Chưa có tin nhắn"}
                                    </div>
                                </div>
                                {user.unreadCount > 0 && (
                                    <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {user.unreadCount}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                    {!loading && users.length === 0 && (
                        <div className="p-4 text-center text-gray-500">
                            Không có người dùng nào
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">
                <div className="p-4 bg-white border-b border-gray-300 flex items-center">
                    {selectedUser ? (
                        <div className="font-medium">
                            Cuộc trò chuyện với{" "}
                            {users.find((u) => u.id === selectedUser)?.name || "Người dùng"}
                        </div>
                    ) : (
                        <div className="font-medium text-gray-500">
                            Chọn một người dùng để bắt đầu cuộc trò chuyện
                        </div>
                    )}
                </div>
                <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                    {!selectedUser ? (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            Vui lòng chọn một người dùng để xem tin nhắn
                        </div>
                    ) : (
                        <>
                            {messages
                                .filter(
                                    (msg) =>
                                        (msg.senderId === adminId && msg.recipientId === selectedUser) ||
                                        (msg.senderId === selectedUser && msg.recipientId === adminId) ||
                                        (msg.senderId === selectedUser && !msg.recipientId)
                                )
                                .map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`mb-2 flex ${
                                            msg.senderId === adminId ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <span
                                            className={`inline-block p-2 rounded ${
                                                msg.senderId === adminId
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-300"
                                            }`}
                                        >
                                            {msg.sender?.name || "User"}: {msg.message}
                                        </span>
                                        {msg.senderId !== adminId && !msg.isRead && (
                                            <span className="ml-2 text-red-500 text-xs">Chưa đọc</span>
                                        )}
                                        {msg.senderId !== adminId && msg.isRead && (
                                            <span className="ml-2 text-green-500 text-xs">✓ Đã đọc</span>
                                        )}
                                    </div>
                                ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>
                <div className="p-4 bg-white border-t border-gray-300">
                    <div className="flex">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Nhập tin nhắn..."
                            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!selectedUser}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700 disabled:bg-blue-300"
                            disabled={!selectedUser}
                        >
                            Gửi
                        </button>
                    </div>
                </div>

                {/* Giao diện thông báo */}
                <div className="absolute top-4 right-4 space-y-2">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className="bg-indigo-600 text-white p-3 rounded shadow-lg flex justify-between items-center max-w-xs animate-slide-in"
                        >
                            <div>
                                <div className="font-bold">{notif.title}</div>
                                <div className="text-sm text-indigo-100">{notif.message}</div>
                            </div>
                            <button
                                onClick={() => removeNotification(notif.id)}
                                className="ml-2 text-indigo-200 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Message;
