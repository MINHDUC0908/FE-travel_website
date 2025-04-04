import React, { useState, useEffect } from 'react';
import useBooking from '../../hooks/useBooking';
import { Eye, Trash2, Filter, Search, RefreshCw, Check, CreditCard, Calendar, Users, MapPin } from 'lucide-react';
import { FaShoppingBag } from 'react-icons/fa';
import Payment_Confirmation from './components/Payment_confirmation';
import BookingDetails from './components/BookingDetail';

const Booking = ({ setCurrentTitle }) => {
    const [bookingsList, setBookingsList] = useState([]);
    const [status, setStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { bookings, loading, error, setBookings } = useBooking(status);
    const [showDetail, setShowDetail] = useState(false)
    const [bookingDetail, setBookingDetail] = useState("")
    useEffect(() => {
        setBookingsList(bookings);
        setCurrentTitle("Quản lí đặt tour")
        window.scrollTo(0, 0)
    }, [bookings, setCurrentTitle]);

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filteredList = bookings.filter(booking => 
            booking.User?.name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            booking.BookingDetails[0]?.Tour.tour_name?.toLowerCase().includes(e.target.value.toLowerCase()) ||
            booking.tour_code?.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setBookingsList(filteredList);
    };
    // Show Booking tour
    const handleViewDetails = (booking) => {
        setShowDetail(true)
        setBookingDetail(booking)
    };

    const handleDelete = (id) => {
        console.log("Delete booking:", id);
    };

    const handleConfirmPayment = (booking) => {
        setSelectedBooking(booking);
        setIsConfirmModalOpen(true);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <FaShoppingBag className="text-blue-500 text-lg" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-6 py-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                Quản lý Booking
                            </h1>
                            <p className="text-blue-100 opacity-80">
                                Quản lý và theo dõi các đơn đặt tour của khách hàng
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                            <div className="text-white text-sm font-medium">Tổng số booking: {bookingsList.length}</div>
                            <div className="flex gap-3 mt-2">
                                <div className="flex items-center text-xs text-green-100">
                                    <span className="h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                                    Đã xác nhận: {bookingsList.filter(b => b.status === 'confirmed').length}
                                </div>
                                <div className="flex items-center text-xs text-yellow-100">
                                    <span className="h-2 w-2 rounded-full bg-yellow-400 mr-1"></span>
                                    Chờ xử lý: {bookingsList.filter(b => b.status !== 'confirmed').length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Filter Controls */}
                <div className="bg-gradient-to-b from-gray-50 to-white px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="relative flex-1 max-w-md w-full">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Tìm kiếm theo tên, tour hoặc mã booking..."
                                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm"
                            />
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleStatusChange("")}
                                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                    status === "" 
                                        ? "bg-blue-600 text-white shadow-md" 
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Tất cả
                            </button>
                            <button
                                onClick={() => handleStatusChange("confirmed")}
                                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                    status === "confirmed" 
                                        ? "bg-green-600 text-white shadow-md" 
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Đã xác nhận
                            </button>
                            <button
                                onClick={() => handleStatusChange("pending")}
                                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                    status === "pending" 
                                        ? "bg-yellow-500 text-white shadow-md" 
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Chờ xác nhận
                            </button>
                            <button
                                onClick={() => handleStatusChange("cancelled")}
                                className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                                    status === "cancelled" 
                                        ? "bg-red-500 text-white shadow-md" 
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                            >
                                Đã hủy
                            </button>
                            <button
                                className="flex items-center gap-1 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 shadow-sm"
                                onClick={() => {
                                    setStatus("");
                                    setSearchTerm("");
                                    setBookingsList(bookings);
                                }}
                            >
                                <RefreshCw className="w-4 h-4" />
                                <span>Làm mới</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Table */}
                <div className="overflow-x-auto">
                    {bookingsList?.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Mã booking</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Khách hàng</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Tổng tiền</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Trạng thái</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Ngày đặt</th>
                                    <th className="py-4 px-6 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {bookingsList.map((booking, index) => (
                                    <tr
                                        key={booking.id}
                                        className={`hover:bg-blue-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    >
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                            <div className="flex items-center">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                                    #{booking.tour_code}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-800">
                                            <div className="flex items-center">
                                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-2 text-xs">
                                                    {(booking.User?.name?.charAt(0) || "U").toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium">{booking.User?.name || "N/A"}</div>
                                                    <div className="text-xs text-gray-500">{booking.User?.email || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                                            <div className="bg-indigo-50 text-indigo-800 py-1 px-2 rounded-md inline-block">
                                                {parseFloat(booking.total_price).toLocaleString('vi-VN')} VNĐ
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {booking.status === 'confirmed' ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                                    Đã xác nhận
                                                </span>
                                            ) : booking.status === 'pending' ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                                                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                                    Chờ xử lý
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                                                    Đã hủy
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-800">
                                            <div className="flex flex-col">
                                                <span>{new Date(booking.createdAt).toLocaleDateString('vi-VN')}</span>
                                                <span className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleTimeString('vi-VN')}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleViewDetails(booking)}
                                                    className="flex items-center justify-center p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 shadow-sm"
                                                    title="Xem chi tiết"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                {booking.status !== 'confirmed' && booking.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => handleConfirmPayment(booking)}
                                                        className="flex items-center justify-center p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-200 shadow-sm"
                                                        title="Xác nhận thanh toán"
                                                    >
                                                        <CreditCard className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(booking.id)}
                                                    className="flex items-center justify-center p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 shadow-sm"
                                                    title="Xóa"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                            <div className="bg-gray-100 p-6 rounded-full mb-4 shadow-inner">
                                <Filter className="h-12 w-12 text-gray-400" />
                            </div>
                            <h3 className="mt-2 text-lg font-medium text-gray-900">Không tìm thấy booking nào</h3>
                            <p className="mt-1 text-gray-500 max-w-md">
                                Không có booking nào phù hợp với điều kiện tìm kiếm hoặc bộ lọc hiện tại.
                            </p>
                            <button
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                                onClick={() => {
                                    setStatus("");
                                    setSearchTerm("");
                                    setBookingsList(bookings);
                                }}
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Làm mới
                            </button>
                        </div>
                    )}
                </div>
                
                {/* Footer with pagination */}
                {bookingsList?.length > 0 && (
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-700">
                                Hiển thị <span className="font-medium">{bookingsList.length}</span> booking trong tổng số <span className="font-medium">{bookings.length}</span>
                            </p>
                            {/* Pagination */}
                            <div className="flex justify-end">
                                <nav className="inline-flex rounded-md shadow-sm">
                                    <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium rounded-l-md text-gray-700 hover:bg-gray-50 transition duration-200">
                                        Trước
                                    </button>
                                    <button className="py-2 px-4 border-t border-b border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                                        1
                                    </button>
                                    <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium rounded-r-md text-gray-700 hover:bg-gray-50 transition duration-200">
                                        Sau
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {
                isConfirmModalOpen && <Payment_Confirmation setIsConfirmModalOpen={setIsConfirmModalOpen} selectedBooking={selectedBooking} setBookings={setBookings} />
            }
            {
                showDetail && <BookingDetails bookingDetail={bookingDetail} setShowDetail={setShowDetail} />
            }
        </div>
    );
};

export default Booking;