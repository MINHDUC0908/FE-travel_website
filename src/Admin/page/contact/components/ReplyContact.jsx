import { Bookmark, Mail, Reply, Send, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../api/axiosClient";
import { api } from "../../../../../Api";
import { CKEditor } from "ckeditor4-react";
    
function ReplyContact({ setReplyingTo, replyingTo, setContacts, contacts})
{
    const [replyMessage, setReplyMessage] = useState("")
    const handleSendReply = async () => {
        if (!replyingTo || !replyMessage.trim()) return
        console.log(replyingTo)
        try {
            const res = await axiosClient.post(api + "/admin/contact/reply", 
                {
                    contact_id: replyingTo.id,
                    message: replyMessage
                }
            )
            if (res.data.success)
            {
                toast.success(res.data.message)
            }
            setContacts(contacts.map(c => 
                c.id === replyingTo.id ? {...c, isReplied: true} : c
            ))
            setReplyingTo(null)
            setReplyMessage("")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi gửi phản hồi!");
            console.log(error)
        }
    }
    return (
        <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="p-5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex justify-between items-center">
                        <h3 className="text-xl font-semibold flex items-center">
                            <Reply className="mr-2" size={20} />
                            Phản hồi tới {replyingTo.name}
                        </h3>
                        <button 
                            onClick={() => setReplyingTo(null)}
                            className="text-white hover:text-gray-200 p-1 rounded-full hover:bg-white/10 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                        {/* Recipient Info */}
                        <div className="mb-5">
                            <div className="flex items-center bg-indigo-50 p-3 rounded-lg mb-4 border border-indigo-100">
                                <Mail className="mr-2 text-indigo-500" size={18} />
                                <div>
                                    <span className="text-gray-500 text-xs block">Gửi tới:</span>
                                    <span className="font-medium text-indigo-700 text-sm">{replyingTo.email}</span>
                                </div>
                            </div>
                            
                            {/* Original Message */}
                            <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                <h4 className="font-medium text-gray-700 mb-2 flex items-center text-sm">
                                    <Bookmark className="mr-2 text-indigo-400" size={14} />
                                    Tin nhắn gốc:
                                </h4>
                                <div className="text-gray-600 text-sm bg-white p-3 rounded-md border border-gray-100 shadow-sm">
                                    {replyingTo.message}
                                </div>
                            </div>
                        </div>
                        
                        {/* Reply Input */}
                        <div className="mb-5">
                            <label className="block text-gray-700 font-medium mb-2 text-sm">Nội dung phản hồi:</label>
                            <CKEditor
                                onChange={(event) => {
                                    const data = event.editor.getData();
                                    setReplyMessage(data)
                                }}
                            />
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setReplyingTo(null)}
                                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center text-sm"
                            >
                                <X size={16} className="mr-1" />
                                Hủy
                            </button>
                            <button
                                onClick={handleSendReply}
                                disabled={!replyMessage.trim()}
                                className={`px-4 py-2 rounded-lg text-white flex items-center text-sm shadow-md transition-all ${
                                    !replyMessage.trim() 
                                        ? 'bg-gray-300 cursor-not-allowed' 
                                        : 'bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600'
                                }`}
                            >
                                <Send className="mr-1" size={16} />
                                Gửi phản hồi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReplyContact