import { formatPrice } from "../../../../../Api";

function BookingDetails({ bookingDetail, setShowDetail }) {
    console.log(bookingDetail);
    

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    // Status component with enhanced styling
    const StatusBadge = ({ type, status }) => {
        let bgColor = "bg-gray-100";
        let textColor = "text-gray-800";
        let statusText = status;
      
        if (type === "booking") {
            if (status === "pending") {
                bgColor = "bg-yellow-100";
                textColor = "text-yellow-700";
                statusText = "Đang chờ";
            } else if (status === "confirmed") {
                bgColor = "bg-green-100";
                textColor = "text-green-700";
                statusText = "Đã xác nhận";
            } else if (status === "cancelled") {
                bgColor = "bg-red-100";
                textColor = "text-red-700";
                statusText = "Đã hủy";
            }
        } else if (type === "payment") {
            if (status === "unpaid") {
                bgColor = "bg-red-100";
                textColor = "text-red-700";
                statusText = "Chưa thanh toán";
            } else if (status === "paid") {
                bgColor = "bg-green-100";
                textColor = "text-green-700";
                statusText = "Đã thanh toán";
            }
        }
      
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} inline-flex items-center`}>
                <span className={`w-2 h-2 ${textColor.replace('text', 'bg')} rounded-full mr-1`}></span>
                {statusText}
            </span>
        );
    };
  
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
                    <h3 className="font-semibold text-xl">Chi tiết đặt tour</h3>
                    <StatusBadge type="booking" status={bookingDetail.status} />
                </div>
            
                {/* Content */}
                <div className="px-8 py-6 h-[500px] overflow-auto ">
                    {/* Tour info */}
                    <div className="mb-6 pb-5 border-b border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg text-gray-800">{bookingDetail.tour_code}</span>
                        </div>
                        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                            <span className="text-gray-700 font-medium">Tổng tiền:</span>
                            <span className="font-bold text-xl text-blue-700">{formatPrice(bookingDetail.total_price)}</span>
                        </div>
                    </div>
                    
                    {/* Customer info */}
                    <div className="mb-6 pb-5 border-b border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-green-100 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h4 className="text-gray-800 font-medium text-lg">Thông tin khách hàng</h4>
                        </div>
                        <div className="pl-9 grid grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 text-sm">Họ tên:</span>
                                <p className="font-medium text-gray-800 mt-1">{bookingDetail.User.name}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 text-sm">Email:</span>
                                <p className="font-medium text-gray-800 mt-1">{bookingDetail.User.email}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Booking status */}
                    <div className="mb-6 pb-5 border-b border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-purple-100 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="text-gray-800 font-medium text-lg">Trạng thái</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-9">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 text-sm mb-2">Trạng thái đơn:</p>
                                <StatusBadge type="booking" status={bookingDetail.status} />
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-600 text-sm mb-2">Thanh toán:</p>
                                <StatusBadge type="payment" status={bookingDetail.payment_status} />
                            </div>
                        </div>
                    </div>
                    
                    {/* Dates */}
                    <div className="mb-3">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="bg-amber-100 p-2 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="text-gray-800 font-medium text-lg">Thời gian</h4>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pl-9">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 text-sm">Ngày đặt:</span>
                                <p className="font-medium text-gray-800 mt-1">{formatDate(bookingDetail.createdAt)}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <span className="text-gray-600 text-sm">Cập nhật:</span>
                                <p className="font-medium text-gray-800 mt-1">{formatDate(bookingDetail.updatedAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gray-50 px-8 py-4 flex justify-end">
                    <button onClick={() => setShowDetail(false)} className="px-5 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium text-sm mr-3 shadow-sm">
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
  }
  
  export default BookingDetails;