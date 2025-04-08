import { useEffect, useState } from "react"
import axiosClient from "../../../api/axiosClient"
import { api } from "../../../../Api"
import { toast } from "react-toastify"
import { Trash2, Mail, Phone, Send, User, Reply, Calendar, Check, AlertCircle, Search, MessageCircle } from "lucide-react"
import ReplyContact from "./components/ReplyContact"

function Contact() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)
    const [replyingTo, setReplyingTo] = useState(null)
    const [replyMessage, setReplyMessage] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all") 
    const [sortOrder, setSortOrder] = useState("newest")

    useEffect(() => {
        const fetchContact = async () => {
            try {
                setLoading(true)
                const res = await axiosClient.get(`${api}/admin/contact`)
                if (res.data.success) {
                    setContacts(res.data.data)
                }
            } catch (error) {
                console.log(error)
                toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
            } finally {
                setLoading(false)
            }
        }
        fetchContact()
    }, [])

    const handleDelete = async (id) => {
        try {
            toast.success("Xóa liên hệ thành công!")
            setContacts(contacts.filter(contact => contact.id !== id))
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi xóa liên hệ!");
        }
    }
    const handleReply = (contact) => {
        setReplyingTo(contact)
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date)
    }

    // Filter and sort contacts
    const filteredContacts = contacts
        .filter(contact => {
            const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                contact.message?.toLowerCase().includes(searchTerm.toLowerCase());
            
            // Status filter
            if (filter === "all") return matchesSearch;
            if (filter === "replied") return matchesSearch && contact.isReplied;
            if (filter === "pending") return matchesSearch && !contact.isReplied;
            
            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortOrder === "newest") {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }
        });

    return (
        <div className="p-0  min-h-screen">
            <div className="max-w-full px-6 py-8 mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
                        <h1 className="text-4xl font-bold mb-3">Quản lý liên hệ</h1>
                        <p className="text-blue-100 text-lg max-w-3xl">Hệ thống quản lý và phản hồi tin nhắn từ khách hàng. Tất cả các liên hệ đều được lưu trữ và theo dõi tại đây.</p>
                    </div>
                    
                    <div className="p-6 bg-white border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
                        {/* Search bar */}
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Tìm kiếm liên hệ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            />
                        </div>
                        
                        {/* Filters */}
                        <div className="flex items-center space-x-3">
                            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                                <button 
                                    onClick={() => setFilter("all")}
                                    className={`px-4 py-2 text-sm ${filter === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Tất cả
                                </button>
                                <button 
                                    onClick={() => setFilter("replied")}
                                    className={`px-4 py-2 text-sm flex items-center ${filter === "replied" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                                >
                                    <Check size={14} className="mr-1" />
                                    Đã phản hồi
                                </button>
                                <button 
                                    onClick={() => setFilter("pending")}
                                    className={`px-4 py-2 text-sm flex items-center ${filter === "pending" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                                >
                                    <AlertCircle size={14} className="mr-1" />
                                    Chưa phản hồi
                                </button>
                            </div>
                            
                            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                                <button 
                                    onClick={() => setSortOrder("newest")}
                                    className={`px-4 py-2 text-sm ${sortOrder === "newest" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Mới nhất
                                </button>
                                <button 
                                    onClick={() => setSortOrder("oldest")}
                                    className={`px-4 py-2 text-sm ${sortOrder === "oldest" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
                                >
                                    Cũ nhất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : filteredContacts.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
                        <div className="text-gray-300 text-4xl mb-2">📭</div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Không tìm thấy liên hệ</h2>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto">
                            {searchTerm || filter !== "all" ? 
                                "Không có liên hệ nào khớp với tiêu chí." : 
                                "Chưa có liên hệ nào được ghi nhận."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredContacts.map((contact) => (
                            <div 
                                key={contact.id} 
                                className={`bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 ${
                                    contact.isReplied ? 'border-l-2 border-green-400' : 'border-l-2 border-amber-400'
                                }`}
                            >
                                <div className="p-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-base font-medium flex items-center">
                                            <User className="mr-2" size={16} />
                                            {contact.name}
                                        </h2>
                                        <div className="flex space-x-2">
                                            {contact.isReplied ? (
                                                <span className="flex items-center text-xs font-medium bg-emerald-600 text-white px-3 py-1 rounded-full shadow-sm">
                                                    <Check className="mr-1" size={12} />
                                                    Đã phản hồi
                                                </span>
                                            ) : (
                                                <span className="flex items-center text-xs font-medium bg-amber-600 text-white px-3 py-1 rounded-full shadow-sm">
                                                    <AlertCircle className="mr-1" size={12} />
                                                    Chưa phản hồi
                                                </span>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(contact.id)}
                                                className="text-white/70 hover:text-red-400 p-1 rounded-full hover:bg-red-500/10"
                                                title="Xóa liên hệ"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-4">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 bg-indigo-50/50 rounded-lg p-3 border border-indigo-100">
                                        <div className="flex items-center text-gray-700 mb-2 md:mb-0 text-sm">
                                            <Mail className="mr-1 text-indigo-500" size={14} />
                                            <a href={`mailto:${contact.email}`} className="hover:text-indigo-600">
                                                {contact.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center text-gray-700 text-sm">
                                            <Phone className="mr-1 text-indigo-500" size={14} />
                                            <a href={`tel:${contact.phone}`} className="hover:text-indigo-600">
                                                {contact.phone}
                                            </a>
                                        </div>
                                    </div>
                                    
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200/50">
                                        <h3 className="font-medium text-gray-800 flex items-center mb-2 text-sm">
                                            <Send className="mr-1 text-indigo-500" size={14} />
                                            Nội dung tin nhắn:
                                        </h3>
                                        <div className="text-gray-700 text-sm bg-white p-3 rounded-md border border-gray-100">
                                            {contact.message}
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500 flex items-center justify-end">
                                            <Calendar className="mr-1" size={12} />
                                            {contact.createdAt && formatDate(contact.createdAt)}
                                        </div>
                                    </div>
                                    {contact?.ContactReplies?.length > 0 && (
                                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100/70">
                                            <h3 className="font-medium text-gray-800 flex items-center mb-2">
                                                <MessageCircle className="mr-2 text-blue-600" size={16} />
                                                Phản hồi của bạn:
                                            </h3>
                                            <div 
                                                className="bg-white p-4 rounded-lg border border-blue-100 text-gray-700 leading-relaxed" 
                                                dangerouslySetInnerHTML={{ __html: contact.ContactReplies[0].reply_message }} 
                                            />
                                        </div>
                                    )}
                                    <div className="mt-4 flex justify-end">
                                        {
                                            contact.isReplied || (
                                                <button 
                                                    onClick={() => handleReply(contact)}
                                                    className="flex items-center px-4 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                                >
                                                    <Reply size={14} className="mr-1" />
                                                    Phản hồi
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {/* Reply Modal */}
                {replyingTo && <ReplyContact setReplyingTo={setReplyingTo} replyingTo={replyingTo} setContacts={setContacts} contacts={contacts} />}
            </div>
        </div>
    )
}

export default Contact