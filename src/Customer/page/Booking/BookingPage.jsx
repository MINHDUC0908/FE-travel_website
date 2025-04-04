import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTourCus } from "../../Context/TourContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthCus } from "../../Context/AuthContext";
import {FaUser, FaChild, FaPlus, FaMinus, FaCalendarAlt, FaMapMarkerAlt,FaTicketAlt, FaInfoCircle, FaClock, FaArrowRight, FaArrowLeft,FaCreditCard, FaMoneyBillWave, FaHotel, FaBus, FaUtensils, FaCheck,FaShieldAlt, FaStar, FaRegClock, FaBan, FaHeadset, FaShoppingBag
} from "react-icons/fa";
import { api, formatPrice, src } from "../../../../Api";
import axiosClient from "../../../api/axiosClient";
import cod from "../../../assets/payment/cod.png";
import vnpay from "../../../assets/payment/vnpay.png";
import zalopay from "../../../assets/payment/zalopay.png";

const BookingPage = ({ setCurrentTitle }) => {
    const { tour, setTour, fetchShowTour, setTours } = useTourCus();
    const { user} = useAuthCus();
    const { state: { id } = {} } = useLocation();
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState("offline");
    const [step, setStep] = useState(1);
    const [loadingAnimation, setLoadingAnimation] = useState(true);
    const [bookingInfo, setBookingInfo] = useState({ adults: 1, children: 0});
    useEffect(() => {
        if (!id) 
        {
            return toast.error("Lỗi: Không tìm thấy ID tour");
        }
        setTour(null);
        setCurrentTitle("Đang tải...");
        fetchShowTour(id);
        setTimeout(() => setLoadingAnimation(false), 800);
    }, [id]);

    useEffect(() => {
        if (tour) window.scrollTo(0, 0), setCurrentTitle(tour.tour_name);
    }, [tour]);

    const totalPrice = () =>
        tour ? (bookingInfo.adults * tour.adult_price) +
            (bookingInfo.children * tour.child_price) : 0;

    const updateCount = (field, value) =>
        setBookingInfo(prev => ({ ...prev, [field]: Math.max(0, value) }));

    const handleBooking = async () => {
        try {
            const res = await axiosClient.post(`${api}/booking/create`, {
                tour_id: tour.id,
                adult_count: bookingInfo.adults,
                child_count: bookingInfo.children,
                payment_method: paymentMethod
            });
            if (res.data.success) {
                // Nếu có URL thanh toán (thanh toán online), chuyển hướng đến VNPay
                if (res.data.payment_url) {
                    toast.success("Bắt đầu thanh toán " + paymentMethod)
                    window.location.href = res.data.payment_url;
                    return;
                }
            } else {
                navigate("/payment-failed", {state: { id: res.data.booking_id}} )
            }      
            setTours((prev) =>
                prev.map((t) =>
                    t.id === id ? { ...t, remaining_quantity: t.remaining_quantity - (bookingInfo.children + bookingInfo.adults) } : t
                )
            );     
            await fetchShowTour(id)     
            toast.success("Đặt tour thành công");
            navigate("/booking/success", {state: { id: res.data.booking_id}} )
        } catch (error) {
            if (error.response && error.response.data) {
                const serverErrorMsg = error.response.data.message || "Lỗi từ server";
                toast.error(serverErrorMsg);
            } else {
                // Đây là nơi hiển thị thông báo lỗi chung
                toast.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        }
    };    

    const TravellerCounter = ({ label, icon: Icon, value, field }) => (
        <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-0 hover:bg-blue-50/50 transition-all duration-200 rounded-lg">
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                <Icon className="text-blue-500 text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-700">{label}</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full border border-gray-100 shadow-sm">
                <button onClick={() => updateCount(field, value - 1)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                <FaMinus className="text-xs text-gray-500" />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-gray-800">{value}</span>
                <button onClick={() => updateCount(field, value + 1)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                <FaPlus className="text-xs text-gray-500" />
                </button>
            </div>
        </div>
    );

    const StepIndicator = ({ currentStep }) => (
        <div className="flex justify-center mb-10">
            <div className="relative w-80 flex items-center">
                <div className="absolute w-full h-1 bg-gray-200 rounded-full">
                <div className="absolute h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" style={{ width: `${(currentStep - 1) * 100}%` }}></div>
                </div>
                {["Thông tin hành khách", "Xác nhận & Thanh toán"].map((label, i) => (
                <div key={i} className={`relative z-10 w-1/2 flex flex-col items-center transition-all duration-300 ${i + 1 <= currentStep ? "text-blue-600" : "text-gray-400"}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium shadow-md border-2 ${i + 1 < currentStep ? "bg-blue-500 text-white border-blue-500" : i + 1 === currentStep ? "bg-white text-blue-600 border-blue-500" : "bg-white text-gray-400 border-gray-200"}`}>
                    {i + 1 < currentStep ? <FaCheck className="text-sm" /> : i + 1}
                    </div>
                    <span className="mt-2 text-xs font-medium tracking-tight">{label}</span>
                </div>
                ))}
            </div>
        </div>
    );

    if (!tour || loadingAnimation) return (
        <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <FaShoppingBag className="text-blue-500 text-lg" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen pt-16 font-sans">
            <div className="container mx-auto px-4 py-8">
                <StepIndicator currentStep={step} />

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative h-96">
                        {tour.Images?.length > 0 ? (
                            <img 
                                src={`${src}${tour.Images[0].image_url}`} 
                                alt={tour.tour_name} 
                                className="w-full h-full object-cover" 
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <FaInfoCircle className="text-5xl text-gray-300" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        
                        <div 
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm 
                                    rounded-full px-4 py-1.5 text-sm text-gray-700 
                                    flex items-center gap-2 shadow-md"
                        >
                            <FaShieldAlt className="text-blue-500" /> Đảm bảo giá tốt
                        </div>
                        
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h2 className="text-3xl font-bold tracking-tight drop-shadow-lg">
                                {tour.tour_name}
                            </h2>
                            
                            <div className="flex items-center gap-6 text-sm mt-3">
                                <span className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-blue-200" /> 
                                    {tour.destination}
                                </span>
                                
                                <span className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-blue-200" /> 
                                    {new Date(tour.departure_date).toLocaleDateString()}
                                </span>
                                
                                <span className="flex items-center gap-2">
                                    <FaRegClock className="text-blue-200" /> 
                                    {tour.duration || "3 ngày 2 đêm"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 grid md:grid-cols-3 gap-8">
                        {/* Tour Info */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-blue-500 text-xl" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-blue-700 uppercase tracking-wide">
                                            Khởi hành từ
                                        </span>
                                        <p className="text-sm font-semibold text-gray-800 mt-1">
                                            {tour.depart}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-indigo-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <FaClock className="text-indigo-500 text-xl" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-indigo-700 uppercase tracking-wide">
                                            Ngày khởi hành
                                        </span>
                                        <p className="text-sm font-semibold text-gray-800 mt-1">
                                            {new Date(tour.departure_date).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-purple-50 rounded-xl p-4 flex items-center gap-3 shadow-sm">
                                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                        <FaRegClock className="text-purple-500 text-xl" />
                                    </div>
                                    <div>
                                        <span className="text-xs text-purple-700 uppercase tracking-wide">
                                            Thời gian
                                        </span>
                                        <p className="text-sm font-semibold text-gray-800 mt-1">
                                            {tour.duration || "3 ngày 2 đêm"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                    <FaStar className="text-yellow-400" /> Điểm nổi bật
                                </h3>
                                <ul className="text-xs text-gray-600 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <FaCheck className="text-green-500" /> Tham quan các địa điểm nổi tiếng
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheck className="text-green-500" /> Trải nghiệm ẩm thực địa phương
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheck className="text-green-500" /> Hướng dẫn viên chuyên nghiệp
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                    <FaUtensils className="text-blue-500" /> Dịch vụ bao gồm
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {[
                                        { icon: FaBus, label: "Phương tiện" },
                                        { icon: FaHotel, label: "Khách sạn 4*" },
                                        { icon: FaUtensils, label: "Bữa ăn" },
                                        { icon: FaTicketAlt, label: "Vé tham quan" }
                                    ].map(({ icon: Icon, label }, i) => (
                                        <div
                                            key={i}
                                            className="flex flex-col items-center gap-2 text-xs text-gray-700 hover:text-blue-600 transition-all duration-200"
                                        >
                                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Icon className="text-blue-500 text-lg" />
                                            </div>
                                            <span className="font-medium text-center">{label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {tour.description && (
                                <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-blue-500 shadow-sm">
                                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                        <FaInfoCircle className="text-blue-500" /> Mô tả tour
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {tour.description}
                                    </p>
                                </div>
                            )}


                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-200 rounded-full -mt-8 -mr-8 opacity-30"></div>
                                    <span className="text-xs text-blue-700 uppercase tracking-wide">
                                        Giá người lớn
                                    </span>
                                    <p className="text-xl font-bold text-blue-600 mt-2">
                                        {formatPrice(tour.adult_price)} <span className="text-sm">VNĐ</span>
                                    </p>
                                    <span className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                                        <FaUser /> /khách
                                    </span>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 rounded-full -mt-8 -mr-8 opacity-30"></div>
                                    <span className="text-xs text-green-700 uppercase tracking-wide">
                                        Giá trẻ em
                                    </span>
                                    <p className="text-xl font-bold text-green-600 mt-2">
                                        {formatPrice(tour.child_price)} <span className="text-sm">VNĐ</span>
                                    </p>
                                    <span className="text-xs text-green-500 mt-1 flex items-center gap-1">
                                        <FaChild /> /khách
                                    </span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2 mb-3">
                                    <FaBan className="text-red-500" /> Chính sách hủy tour
                                </h3>
                                <ul className="text-xs text-gray-600 space-y-2">
                                    <li className="flex items-center gap-2">
                                        <FaCheck className="text-green-500" /> Miễn phí hủy trước 7 ngày
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaCheck className="text-green-500" /> Hoàn 50% nếu hủy trước 3 ngày
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <FaBan className="text-red-500" /> Không hoàn nếu hủy trong 24h
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6 shadow-md relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl"></div>
                                
                            {step === 1 ? (
                                <div className="space-y-6">
                                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                    <FaUser className="text-blue-500" /> Thông tin đặt tour
                                </h3>
                                
                                {/* Thông tin người dùng */}
                                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                                    <h4 className="text-sm font-semibold text-gray-800">Thông tin người dùng</h4>
                                    <div className="space-y-4 mt-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="name" className="text-xs text-gray-600">Họ và tên</label>
                                            <input
                                                id="name"
                                                type="text"
                                                value={user?.name}
                                                className="mt-2 p-2 border border-gray-300 rounded-md text-sm"
                                                placeholder="Nhập tên của bạn"
                                                disabled 
                                            />
                                        </div>
                            
                                        <div className="flex flex-col">
                                            <label htmlFor="email" className="text-xs text-gray-600">Email</label>
                                            <input
                                                id="email"
                                                type="email"
                                                value={user?.email}
                                                className="mt-2 p-2 border border-gray-300 rounded-md text-sm"
                                                placeholder="Nhập email của bạn"
                                                disabled
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="phone" className="text-xs text-gray-600">Số điện thoại</label>
                                            <input
                                                id="phone"
                                                type="text"
                                                value={user?.phone}
                                                className="mt-2 p-2 border border-gray-300 rounded-md text-sm"
                                                placeholder="Nhập địa chỉ của bạn"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="address" className="text-xs text-gray-600">Địa chỉ</label>
                                            <input
                                                id="address"
                                                type="text"
                                                value={user?.address}
                                                className="mt-2 p-2 border border-gray-300 rounded-md text-sm"
                                                placeholder="Nhập địa chỉ của bạn"
                                            />
                                        </div>
                                    </div>
                                </div>
                            
                                {/* Thông tin đặt tour */}
                                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                                    <TravellerCounter label="Người lớn" icon={FaUser} value={bookingInfo.adults} field="adults" />
                                    <TravellerCounter label="Trẻ em (dưới 12 tuổi)" icon={FaChild} value={bookingInfo.children} field="children" />
                                </div>
                            
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between text-xs text-gray-600 py-1">
                                        <span className="flex items-center gap-1">
                                            <FaUser className="text-blue-500" /> Người lớn ({bookingInfo.adults})
                                        </span>
                                        <span>{formatPrice(bookingInfo.adults * tour.adult_price)} VNĐ</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600 py-1">
                                        <span className="flex items-center gap-1">
                                            <FaChild className="text-blue-500" /> Trẻ em ({bookingInfo.children})
                                        </span>
                                        <span>{formatPrice(bookingInfo.children * tour.child_price)} VNĐ</span>
                                    </div>
                                    <div className="border-t border-blue-200 pt-3 mt-3 flex justify-between text-blue-600 font-semibold">
                                        <span className="text-sm flex items-center gap-1">
                                            <FaStar className="text-yellow-400" /> Tổng cộng
                                        </span>
                                        <span className="text-lg">{formatPrice(totalPrice())} VNĐ</span>
                                    </div>
                                </div>
                            
                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm py-3 rounded-lg flex items-center justify-center gap-2 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Tiếp tục <FaArrowRight />
                                </button>
                            </div>
                            
                            ) : (
                                <div className="space-y-6">
                                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                        <FaTicketAlt className="text-blue-500" /> Xác nhận đặt tour
                                    </h3>

                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm">
                                        <div className="flex justify-between text-xs text-gray-600 py-1">
                                            <span className="flex items-center gap-1">
                                                <FaUser className="text-blue-500" /> Người lớn ({bookingInfo.adults})
                                            </span>
                                            <span>{formatPrice(bookingInfo.adults * tour.adult_price)} VNĐ</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-600 py-1">
                                            <span className="flex items-center gap-1">
                                                <FaChild className="text-blue-500" /> Trẻ em ({bookingInfo.children})
                                            </span>
                                            <span>{formatPrice(bookingInfo.children * tour.child_price)} VNĐ</span>
                                        </div>
                                        <div className="border-t border-blue-200 pt-3 mt-3 flex justify-between text-blue-600 font-semibold">
                                            <span className="text-sm flex items-center gap-1">
                                                <FaStar className="text-yellow-400" /> Tổng cộng
                                            </span>
                                            <span className="text-lg">{formatPrice(totalPrice())} VNĐ</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <FaCreditCard className="text-blue-500" /> Phương thức thanh toán
                                        </h4>
                                        {[
                                            { id: "offline", label: "Thanh toán tiền mặt", desc: "Thanh toán khi nhận tour", img: cod },
                                            { id: "online", label: "Thanh toán VNPay", desc: "Thanh toán qua cổng VNPay", img: vnpay },
                                            { id: "zalopay", label: "Thanh toán Zalopay", desc: "Thanh toán qua cổng Zalopay", img: zalopay }
                                        ].map(({ id, label, desc, img }) => (
                                            <label
                                                key={id}
                                                className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                                    paymentMethod === id ? "bg-blue-50 border-blue-200 shadow-sm" : "border-gray-200 hover:bg-gray-50"
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    checked={paymentMethod === id}
                                                    onChange={() => setPaymentMethod(id)}
                                                    className="w-4 h-4 text-blue-500"
                                                />
                                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
                                                    {img && <img src={img} alt={label} className="h-6 w-6" />}
                                                </div>
                                                <div>
                                                    <span className="text-sm font-medium text-gray-800">{label}</span>
                                                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="flex-1 bg-gray-100 text-gray-700 text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-all duration-200 shadow-sm"
                                        >
                                            <FaArrowLeft /> Quay lại
                                        </button>
                                        <button
                                            onClick={handleBooking}
                                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <FaCheck /> Xác nhận đặt tour
                                        </button>
                                    </div>

                                    <div className="text-center text-xs text-gray-500 flex items-center justify-center gap-2 mt-3">
                                        <FaHeadset className="text-blue-500" /> Hỗ trợ 24/7: 
                                        <a href="tel:19001234" className="text-blue-500 hover:underline">1900 1234</a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage