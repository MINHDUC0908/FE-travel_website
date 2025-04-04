import { Check, CreditCard, Calendar, User, Map } from "lucide-react"
import axiosClient from "../../../../api/axiosClient"
import { api, formatPrice } from "../../../../../Api"
import { toast } from "react-toastify"

function Payment_Confirmation({ setIsConfirmModalOpen, selectedBooking, setBookings }) {
    const handlePayment_Confirmation = async () => {
        try {
            const res = await axiosClient.post(api + "/admin/booking/payment_confirmation",
                {
                    booking_id: selectedBooking.id
                }
            )
            if (res.data.success) {
                setBookings((prev) =>
                    prev.map((booking) =>
                        booking.id === selectedBooking.id
                            ? { ...booking, status: "confirmed", payment_status: "paid" }
                            : booking
                    )
                );
                toast.success("Xác nhận thanh toán thành công!!!");
                setIsConfirmModalOpen(false);
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error(error.response?.data?.message || "Lỗi khi gửi yêu cầu.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-5 flex items-center">
                    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                        <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Xác nhận thanh toán</h3>
                </div>
                <div className="p-6">
                    <div className="mb-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-4 bg-green-100 rounded-full p-3">
                                        <CreditCard className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Mã booking</p>
                                        <p className="font-bold text-gray-900 text-lg">#{selectedBooking?.tour_code}</p>
                                    </div>
                                </div>
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                    Chờ xử lý
                                </span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <div className="flex items-center mb-2">
                                    <User className="h-4 w-4 text-gray-500 mr-2" />
                                    <p className="text-sm text-gray-600">Khách hàng</p>
                                </div>
                                <p className="font-medium text-gray-900 pl-6">{selectedBooking?.User?.name}</p>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <div className="flex items-center mb-2">
                                    <Map className="h-4 w-4 text-gray-500 mr-2" />
                                    <p className="text-sm text-gray-600">Tour</p>
                                </div>
                                <p className="font-medium text-gray-900 pl-6">{selectedBooking?.BookingDetails[0]?.Tour.tour_name}</p>
                            </div>
                        </div>
                        
                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-blue-700 font-medium">Số tiền thanh toán</p>
                                    <p className="font-bold text-xl text-blue-900 mt-1">{formatPrice(selectedBooking?.total_price)}</p>
                                </div>
                                <div className="bg-blue-100 border border-blue-200 h-12 w-12 rounded-full flex items-center justify-center">
                                    <Check className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r p-4 text-amber-800 text-sm mb-6 flex items-start">
                            <div className="mr-3 mt-0.5">
                                <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Xác nhận thanh toán</p>
                                <p>Xác nhận rằng thanh toán đã được thực hiện và bạn muốn xác nhận đơn booking này.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                        <button 
                            className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
                            onClick={() => setIsConfirmModalOpen(false)}
                        >
                            Hủy
                        </button>
                        <button 
                            onClick={handlePayment_Confirmation}
                            className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition duration-200 flex items-center shadow-md font-medium"
                        >
                            <Check className="w-5 h-5 mr-2" />
                            Xác nhận thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment_Confirmation