import React, { useEffect } from 'react';
import { useBookingTour } from '../../Context/BookingTour';
import { useLocation, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { formatDate, formatPrice } from '../../../../Api';

function Confirmation({ setCurrentTitle }) {
    const { bookingTourDetail, tour } = useBookingTour();
    const location = useLocation()
    const [searchParams] = useSearchParams();
    const id = location?.state?.id || searchParams.get("id");
    console.log(id)
    useEffect(() => {
        if (!id)
        {
            toast.error("Lỗi khi xử lí dữ liệu")
        }
        bookingTourDetail(id)
    }, [id])
    useEffect(() => {
        setCurrentTitle('Thanh toán thành công')
    }, [setCurrentTitle])
    console.log(tour)
    const numberOfDays = (new Date(tour?.BookingDetails?.[0]?.Tour?.end_date) - new Date(tour?.BookingDetails?.[0]?.Tour?.departure_date)) / (1000 * 60 * 60 * 24);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-white px-4 py-10 mt-10">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
                <div className="bg-gradient-to-r from-blue-600 to-teal-500 px-6 py-10 text-white relative">
                    <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
                        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.57 10.66C20.43 10.26 20.05 10 19.6 10h-7.19c-.46 0-.83.26-.98.66L10 14.77l.01 5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V19h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-5.51-1.73-4.11z"/>
                            <path d="M12.41 15c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm8 0c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM12 12h8l1.22 3H10.78L12 12z"/>
                            <path d="M4 17.01V11c0-4.07 3.06-7.44 7-7.93V2c-4.94.49-8.8 4.6-9 9.6-.16 4.95 3.36 9.23 8 10.33v-1.05c-2.1-.38-3.77-1.79-4.4-3.65L4 17.01z"/>
                        </svg>
                    </div>
                    <h1 className="text-4xl font-extrabold text-center tracking-tight">Đặt Tour Thành Công!</h1>
                    <p className="text-center mt-3 text-lg font-light opacity-90">
                        Cảm ơn bạn đã tin tưởng dịch vụ du lịch của chúng tôi
                    </p>
                </div>
                <div className="p-8">
                    <div className="flex justify-center mb-8">
                        <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center ring-4 ring-green-50">
                            <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                    </div>
                    <div className="text-center mb-10">
                        <p className="text-2xl font-semibold text-gray-800 mb-3">Hành trình của bạn đã sẵn sàng!</p>
                        <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Thông tin chi tiết về tour đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư đến (hoặc thư rác) để xác nhận.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 shadow-inner">
                        <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-5">Thông Tin Tour</h2>
                        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                            <div>
                                <p className="text-gray-500 font-medium">Tour du lịch</p>
                                <p className="font-semibold text-gray-900">
                                    {
                                        tour?.BookingDetails?.[0]?.Tour?.tour_name || "Không có dữ liệu"
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">Thời gian</p>
                                <p className="font-semibold text-gray-900">
                                    {
                                        `${numberOfDays} ngày ${numberOfDays - 1} đêm`
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">Khởi hành</p>
                                <p className="font-semibold text-gray-900">
                                    {
                                        formatDate(tour?.BookingDetails?.[0]?.Tour?.departure_date)
                                    }
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 font-medium">Số người</p>
                                <p className="font-semibold text-gray-900">
                                    {tour?.BookingDetails?.[0].adults} người lớn, {tour?.BookingDetails?.[0].children} trẻ em</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-200 mt-5 pt-5">
                            <span className="text-gray-600 font-medium">Tổng thanh toán</span>
                            <span className="text-2xl font-extrabold text-teal-700">
                                {formatPrice(tour?.total_price)}
                            </span>
                        </div>

                        {/* Trạng thái thanh toán */}
                        <div className="mt-2">
                            <span 
                                className={`px-3 py-1 rounded-full text-sm font-semibold 
                                    ${tour?.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                            >
                                {tour?.payment_status === "paid" ? "Thành công" : "Chưa thanh toán"}
                            </span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Bước tiếp theo</h3>
                        <div className="grid grid-cols-1 gap-4 text-sm">
                            <div className="flex items-center bg-blue-50 p-4 rounded-xl shadow-sm hover:bg-blue-100 transition-colors duration-300">
                                <p className="font-semibold text-gray-800">Kiểm tra email của bạn</p>
                            </div>
                            <div className="flex items-center bg-green-50 p-4 rounded-xl shadow-sm hover:bg-green-100 transition-colors duration-300">
                                <p className="font-semibold text-gray-800">Lưu ngày khởi hành</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        <button className="bg-gradient-to-r from-teal-600 to-blue-600 py-3 rounded-xl text-base font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 shadow-md">
                            Xem Chi Tiết Tour
                        </button>
                        <button className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-3 rounded-xl text-base font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300">
                            Quay Lại Trang Chủ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Confirmation;
