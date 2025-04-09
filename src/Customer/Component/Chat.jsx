import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { useAuthCus } from "../Context/AuthContext";
import axiosClient from "../../api/axiosClient";

const socket = io("http://localhost:3000");

const ChatUser = () => {
    const { user } = useAuthCus();
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState("");
    const messagesEndRef = useRef(null);

    const userId = user?.id;

    useEffect(() => {
        if (!userId) {
            console.error("Bạn cần đăng nhập để sử dụng chat!");
            return;
        }

        socket.emit("joinRoom", userId);

        socket.on("newMessage", (newMessage) => {
            setMessages((prev) => {
                if (!prev.some((msg) => msg.id === newMessage.id)) {
                    const updatedMessages = [...prev, newMessage];
                    setTimeout(scrollToBottom, 0);
                    // Đánh dấu tin nhắn là đã đọc nếu là tin nhắn gửi tới user
                    if (newMessage.recipientId === userId && !newMessage.isRead) {
                        markMessageAsRead(newMessage.id);
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

        fetchMessages();

        return () => {
            socket.off("newMessage");
            socket.off("connect_error");
        };
    }, [userId]);

    const fetchMessages = async () => {
        try {
            const res = await axiosClient.get("/api/message");
            setMessages(res.data);
            setTimeout(scrollToBottom, 0);
            // Đánh dấu tất cả tin nhắn chưa đọc gửi tới user là đã đọc
            res.data.forEach((msg) => {
                if (msg.recipientId === userId && !msg.isRead) {
                    markMessageAsRead(msg.id);
                }
            });
        } catch (error) {
            toast.error("Lỗi khi lấy tin nhắn!");
            console.error(error);
        }
    };

    const sendMessage = () => {
        if (!messageInput.trim()) return;

        const tempMessage = {
            id: Date.now(),
            senderId: userId,
            recipientId: null,
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

        socket.emit("userMessage", {
            senderId: userId,
            message: messageInput,
        });
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const markMessageAsRead = async (messageId) => {
        try {
            await axiosClient.put(`/api/message/read/${messageId}`);
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === messageId ? { ...msg, isRead: true } : msg
                )
            );
        } catch (error) {
            console.error("Lỗi khi đánh dấu tin nhắn là đã đọc:", error);
            toast.error("Không thể đánh dấu tin nhắn là đã đọc!");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-4 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Chat với Admin</h2>
            <div className="h-64 overflow-y-auto mb-4 p-2 bg-white rounded border">
                {messages
                    .filter(
                        (msg) =>
                            msg.senderId === userId ||
                            (msg.recipientId === userId && msg.senderId !== userId)
                    )
                    .map((msg) => (
                        <div
                            key={msg.id}
                            className={`mb-2 flex ${
                                msg.senderId === userId ? "justify-end" : "justify-start"
                            }`}
                        >
                            <div className="flex items-center">
                                {msg.senderId !== userId && !msg.isRead && (
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                                )}
                                <span
                                    className={`inline-block p-2 rounded ${
                                        msg.senderId === userId
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-300"
                                    }`}
                                >
                                    {msg.sender?.name || "Admin"}: {msg.message}
                                </span>
                                {msg.senderId === userId && msg.isRead && (
                                    <span className="ml-2 text-green-500 text-xs">✓ Đã đọc</span>
                                )}
                            </div>
                        </div>
                    ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatUser;