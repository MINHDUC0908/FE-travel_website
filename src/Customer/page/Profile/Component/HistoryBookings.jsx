import { useEffect, useState } from "react";
import { api } from "../../../../../Api";
import axiosClient from "../../../../api/axiosClient";
import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaUsers, FaCode, FaCreditCard, FaClock, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { src } from "../../../../../Api";

function HistoryBookings({ setCurrentTitle }) {
    const [historyBookings, setHistoryBookings] = useState([]);
    const [expandedBooking, setExpandedBooking] = useState(null);

    const fetchHistoryBookings = async () => {
        try {
            const res = await axiosClient.get(api + "/profile/historybookings");
            if (res.data.success) {
                setHistoryBookings(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching history bookings:", error);
        }
    };

    useEffect(() => {
        fetchHistoryBookings();
    }, []);
    useEffect(() => {
        setCurrentTitle("Lịch Sử Đặt Tour");
    }, [setCurrentTitle]);

    const toggleExpand = (bookingId) => {
        setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2 mb-6">
                <FaCalendarAlt className="text-blue-500" />
                <span>Lịch Sử Đặt Tour</span>
            </h2>

            {historyBookings.length === 0 ? (
                <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                    <p className="text-gray-600">Bạn chưa có lịch sử đặt tour nào.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {historyBookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                        >
                            {/* Thông tin chính */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/5 flex-shrink-0">
                                    <img
                                        src={
                                            booking.BookingDetails[0]?.Tour.Images[0]?.image_url
                                                ? `${src}${booking.BookingDetails[0].Tour.Images[0].image_url}`
                                                : "https://via.placeholder.com/150"
                                        }
                                        alt={booking.BookingDetails[0]?.Tour.tour_name}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1 text-gray-700">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                                        {booking.BookingDetails[0]?.Tour.tour_name || "Tour không xác định"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <FaCalendarAlt className="text-blue-500" />
                                            <span>
                                                {booking.BookingDetails[0]?.Tour.departure_date
                                                    ? new Date(
                                                          booking.BookingDetails[0].Tour.departure_date
                                                      ).toLocaleDateString("vi-VN")
                                                    : "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <span>
                                                {booking.BookingDetails[0]?.Tour.destination || "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaMoneyBillWave className="text-blue-500" />
                                            <span>
                                                {booking.total_price
                                                    ? Number(booking.total_price).toLocaleString("vi-VN", {
                                                          style: "currency",
                                                          currency: "VND",
                                                      })
                                                    : "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaUsers className="text-blue-500" />
                                            <span>
                                                {booking.BookingDetails[0]?.adults || 0} người lớn,{" "}
                                                {booking.BookingDetails[0]?.children || 0} trẻ em
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCode className="text-blue-500" />
                                            <span>{booking.tour_code || "Chưa xác định"}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaCreditCard className="text-blue-500" />
                                            <span>
                                                {booking.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaClock className="text-blue-500" />
                                            <span>
                                                Đặt ngày:{" "}
                                                {booking.createdAt
                                                    ? new Date(booking.createdAt).toLocaleDateString("vi-VN")
                                                    : "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">Trạng thái:</span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs ${
                                                    booking.status === "confirmed"
                                                        ? "bg-green-100 text-green-700"
                                                        : booking.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {booking.status === "confirmed"
                                                    ? "Đã xác nhận"
                                                    : booking.status === "pending"
                                                    ? "Đang chờ"
                                                    : "Đã hủy"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Nút mở rộng lịch trình */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={() => toggleExpand(booking.id)}
                                    className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                >
                                    {expandedBooking === booking.id ? (
                                        <>
                                            <FaChevronUp />
                                            <span>Thu gọn</span>
                                        </>
                                    ) : (
                                        <>
                                            <FaChevronDown />
                                            <span>Xem lịch trình</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Lịch trình (nếu mở rộng) */}
                            {expandedBooking === booking.id && (
                                <div className="mt-4 border-t border-gray-200 pt-4 text-gray-700">
                                    <h4 className="text-md font-medium text-gray-800 mb-2">Lịch trình</h4>
                                    <div className="space-y-2 text-sm">
                                        {booking.BookingDetails[0]?.Tour.Schedules.sort(
                                            (a, b) => a.day_number - b.day_number
                                        ).map((schedule) => (
                                            <div key={schedule.id}>
                                                <p className="font-medium">
                                                    Ngày {schedule.day_number}:
                                                </p>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: schedule.activities }}
                                                    className="pl-4 text-gray-600"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HistoryBookings;