import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar, FaClock, FaMoneyBillWave, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight, FaUtensils, FaHotel, FaBus, FaPhoneAlt, FaRegCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { useTourCus } from "../../Context/TourContext";
import { formatDate, src } from "../../../../Api";

function ShowTour({ setCurrentTitle }) {
    const { fetchShowTour, loading, setTour, tour } = useTourCus();
    const location = useLocation();
    const id = location.state?.id;
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedTab, setSelectedTab] = useState('overview');

    useEffect(() => {
        if (!id) {
            toast.error("Lỗi: Không tìm thấy ID");
            return;
        }
        setTour(null);
        setCurrentTitle("Đang tải...");
        fetchShowTour(id);
    }, [id]);
    console.log(tour)
    useEffect(() => {
        if (tour) {
            window.scrollTo(0, 0);
            setCurrentTitle(tour.tour_name);
        }
    }, [tour, setCurrentTitle]);

    const handlePrevImage = () => {
        setActiveImage((prev) => (prev === 0 ? tour.Images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setActiveImage((prev) => (prev === tour.Images.length - 1 ? 0 : prev + 1));
    };
    if (!tour?.Images || tour.Images.length === 0) {
        return (
            <div className="absolute inset-0 bg-gray-900">
                <img 
                    src="/api/placeholder/1200/600" 
                    alt="Tour placeholder"
                    className="w-full h-full object-cover opacity-70"
                />
            </div>
        );
    }
    // Mock data for fallback visualization
    const mockTour = {
        tour_name: "Khám phá Vịnh Hạ Long - Kỳ quan thiên nhiên thế giới",
        location: "Quảng Ninh, Việt Nam",
        duration: "3 ngày 2 đêm",
        group_size: "2-20 người",
        rating: 4.9,
        rating_count: 128,
        departure_date: "Hàng ngày",
        description: "Hành trình khám phá kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi được bao phủ bởi làn nước xanh ngọc bích. Bạn sẽ được trải nghiệm ngủ đêm trên vịnh, khám phá hang động kỳ bí, chèo thuyền kayak và thưởng thức hải sản tươi ngon nhất.",
        price: 2850000,
        discount_price: 2550000,
        highlights: [
            "Khám phá hang Sung Sốt - hang động đẹp nhất Vịnh Hạ Long",
            "Ngắm hoàng hôn và bình minh tuyệt đẹp trên vịnh",
            "Trải nghiệm chèo thuyền kayak khám phá các hang động và vịnh nhỏ",
            "Thưởng thức đặc sản hải sản tươi ngon trên du thuyền 5 sao",
            "Tham gia lớp học nấu ăn và làm bánh trên tàu",
            "Ngủ đêm trên vịnh trong phòng sang trọng hướng biển"
        ],
        included: [
            "Xe đưa đón khứ hồi từ Hà Nội",
            "Hướng dẫn viên chuyên nghiệp",
            "Du thuyền 5 sao với phòng tiện nghi đầy đủ",
            "Các bữa ăn theo chương trình",
            "Hoạt động trên tàu và vé tham quan",
            "Bảo hiểm du lịch"
        ],
        excluded: [
            "Đồ uống và chi phí cá nhân",
            "Tiền tip cho hướng dẫn viên và nhân viên",
            "Chi phí phát sinh do thiên tai, thời tiết"
        ],
        itinerary: [
            {
                title: "Hà Nội - Hạ Long",
                description: "Xe đón tại Hà Nội, khởi hành đi Hạ Long. Làm thủ tục lên tàu, ăn trưa trên tàu. Chiều tham quan hang Sung Sốt, chèo thuyền kayak khám phá các hang động. Hoàng hôn trên vịnh và lớp học nấu ăn. Ăn tối và nghỉ đêm trên tàu."
            },
            {
                title: "Vịnh Hạ Long - Đảo Ti Tốp",
                description: "Ngắm bình minh và tập Tai Chi trên boong tàu. Thăm làng chài Cửa Vạn, leo núi Ti Tốp ngắm toàn cảnh vịnh. Buổi chiều thăm hang Luồn bằng thuyền kayak. Tối thưởng thức tiệc BBQ và câu mực đêm."
            },
            {
                title: "Hạ Long - Hà Nội",
                description: "Thưởng thức bữa sáng sớm, tham quan Hang Sửng Sốt. Làm thủ tục trả phòng, ăn trưa trên tàu. Quay về bến tàu và khởi hành về Hà Nội. Kết thúc chuyến đi tại Hà Nội."
            }
        ],
        reviews: [
            {
                name: "Nguyễn Văn A",
                avatar: "https://example.com/avatar1.jpg",
                rating: 5,
                comment: "Chuyến đi tuyệt vời! Vịnh Hạ Long đẹp tuyệt vời, du thuyền sang trọng và đồ ăn ngon. Nhân viên phục vụ rất chu đáo.",
                date: "15/02/2025"
            },
            {
                name: "Trần Thị B",
                avatar: "https://example.com/avatar2.jpg",
                rating: 4,
                comment: "Phong cảnh tuyệt đẹp, hướng dẫn viên nhiệt tình. Chỉ tiếc là thời gian hơi ngắn.",
                date: "05/03/2025"
            }
        ]
    };

    // Use actual tour data or fallback to mock data
    const displayTour = tour || mockTour;

    const numberOfDays = (new Date(tour.end_date) - new Date(tour.departure_date)) / (1000 * 60 * 60 * 24);
    console.log(`Chuyến đi kéo dài ${numberOfDays} ngày`);
    
    return (
        <div className="mt-16">
            {loading ? (
                <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                            <FaShoppingBag className="text-blue-500 text-lg" />
                        </div>
                    </div>
                </div>
            ) : tour ? (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Hero Section with Image Slider */}
                    <div className="relative h-[600px]">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={src + tour.Images[activeImage].image_url} // Key thay đổi để trigger animation
                                src={src + tour.Images[activeImage].image_url}
                                alt={tour.tour_name}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, x: 50 }} // Bắt đầu từ phải và mờ
                                animate={{ opacity: 1, x: 0 }} // Hiện dần với hiệu ứng trượt vào
                                exit={{ opacity: 0, x: -50 }} // Trượt ra bên trái khi đổi ảnh
                                transition={{ duration: 0.5, ease: "easeInOut" }} // Tạo hiệu ứng mượt
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows */}
                        {tour.Images && tour.Images.length > 1 && (
                            <>
                                <button 
                                    onClick={handlePrevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                                >
                                    <FaChevronLeft />
                                </button>
                                <button 
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                                >
                                    <FaChevronRight />
                                </button>
                            </>
                        )}
                        {/* Overlay with Tour Name */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-20 pb-10 px-8">
                            <div className="container mx-auto">
                                <div className="flex flex-wrap items-end justify-between">
                                    <div className="w-full lg:w-2/3">
                                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">{displayTour.tour_name}</h1>
                                        <div className="flex items-center mt-4">
                                            <FaMapMarkerAlt className="text-red-400 mr-2" />
                                            <p className="text-white text-xl">{displayTour.location || "Địa điểm tuyệt vời"}</p>
                                            <div className="flex items-center ml-6">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map(star => (
                                                        <FaStar 
                                                            key={star} 
                                                            className={`${star <= Math.round(displayTour.rating || 5) ? 'text-yellow-400' : 'text-gray-400'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-white">
                                                    {displayTour.rating || 4.9} 
                                                    {displayTour.rating_count && (
                                                        <span className="text-gray-300 text-sm ml-1">({displayTour.rating_count} đánh giá)</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 lg:mt-0">
                                        <div className="flex items-center space-x-4">
                                            <button 
                                                onClick={() => setIsFavorite(!isFavorite)}
                                                className={`p-3 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white/30'} transition-all`}
                                            >
                                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                            <button className="bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-3 px-8 rounded-full hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg transform hover:scale-105">
                                                Đặt tour ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="container mx-auto px-4 py-8">
                        {/* Quick Info Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                            <div className="bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center text-blue-600 mb-3">
                                    <FaCalendarAlt className="mr-3 text-xl" />
                                    <h3 className="font-semibold text-lg">Thời gian</h3>
                                </div>
                                <p className="text-lg font-medium text-gray-800">
                                    {`${numberOfDays} ngày ${numberOfDays - 1} đêm`}
                                </p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center text-green-600 mb-3">
                                    <FaUsers className="mr-3 text-xl" />
                                    <h3 className="font-semibold text-lg">Số người</h3>
                                </div>
                                <p className="text-lg font-medium text-gray-800">{tour.quantity || "2-15 người"}</p>
                            </div>
                            <div className="bg-yellow-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center text-yellow-600 mb-3">
                                    <FaStar className="mr-3 text-xl" />
                                    <h3 className="font-semibold text-lg">Đánh giá</h3>
                                </div>
                                <p className="text-lg font-medium text-gray-800">{displayTour.rating ? `${displayTour.rating}/5` : "4.8/5"}</p>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center text-purple-600 mb-3">
                                    <FaClock className="mr-3 text-xl" />
                                    <h3 className="font-semibold text-lg">Khởi hành</h3>
                                </div>
                                <p className="text-lg font-medium text-gray-800">{formatDate(tour.departure_date) || "Hàng ngày"}</p>
                            </div>
                        </div>

                        {/* Price Banner */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-800 rounded-2xl p-6 mb-10 shadow-lg">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="text-white">
                                    <div className="text-lg mb-1">Giá chỉ từ</div>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold">{(displayTour.discount_price || displayTour.price || 2550000).toLocaleString()}</span>
                                        <span className="ml-2 text-xl">VNĐ / người</span>
                                        {displayTour.discount_price && displayTour.price && (
                                            <span className="ml-3 line-through text-white/70">{displayTour.price.toLocaleString()} VNĐ</span>
                                        )}
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <FaMoneyBillWave className="text-yellow-300 mr-2" />
                                        <span className="text-yellow-300 font-medium">Đặt cọc chỉ 30% - Hỗ trợ trả góp 0%</span>
                                    </div>
                                </div>
                                <div className="mt-6 md:mt-0 flex">
                                    <a href="tel:+84987654321" className="flex items-center bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-5 rounded-full mr-4 transition-colors">
                                        <FaPhoneAlt className="mr-2" />
                                        Gọi tư vấn
                                    </a>
                                    <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full hover:bg-yellow-50 transition-colors shadow-lg">
                                        Đặt tour ngay
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs Navigation */}
                        <div className="border-b mb-8">
                            <div className="flex overflow-x-auto space-x-8">
                                <button
                                    onClick={() => setSelectedTab('overview')}
                                    className={`py-4 px-1 font-medium text-lg relative ${
                                        selectedTab === 'overview' 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    Tổng quan
                                </button>
                                <button
                                    onClick={() => setSelectedTab('itinerary')}
                                    className={`py-4 px-1 font-medium text-lg relative ${
                                        selectedTab === 'itinerary' 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    Lịch trình
                                </button>
                                <button
                                    onClick={() => setSelectedTab('included')}
                                    className={`py-4 px-1 font-medium text-lg relative ${
                                        selectedTab === 'included' 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    Dịch vụ bao gồm
                                </button>
                                <button
                                    onClick={() => setSelectedTab('reviews')}
                                    className={`py-4 px-1 font-medium text-lg relative ${
                                        selectedTab === 'reviews' 
                                            ? 'text-blue-600 border-b-2 border-blue-600' 
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    Đánh giá
                                </button>
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="mb-12">
                            {/* Overview Tab */}
                            {selectedTab === 'overview' && (
                                <div>
                                    {/* Tour Description */}
                                    <div className="mb-10">
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Giới thiệu chuyến đi</h2>
                                        <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                                            <p>{displayTour.description || 
                                                "Hãy cùng khám phá vẻ đẹp tuyệt vời của điểm đến này với chúng tôi. Chuyến đi này sẽ mang lại cho bạn những trải nghiệm đáng nhớ với nhiều hoạt động thú vị, ẩm thực đặc sắc và phong cảnh tuyệt đẹp."
                                            }</p>
                                        </div>
                                    </div>

                                    {/* Highlights */}
                                    <div className="mb-10">
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Điểm nổi bật</h2>
                                        <div className="bg-blue-50 p-6 rounded-2xl">
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {(displayTour.highlights || [
                                                    "Khám phá cảnh đẹp tự nhiên đặc biệt",
                                                    "Thưởng thức ẩm thực địa phương đặc sắc",
                                                    "Tham gia các hoạt động văn hóa truyền thống",
                                                    "Nghỉ dưỡng tại khách sạn cao cấp"
                                                ]).map((highlight, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">✓</span>
                                                        <span className="text-gray-700 text-lg">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Itinerary Tab */}
                            {selectedTab === 'itinerary' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                                        <FaRegCalendarAlt className="text-blue-600 text-xl" />
                                        Lịch trình chi tiết
                                    </h2>
                                    <div className="relative space-y-8">
                                        {tour.Schedules.map((day, index) => (
                                            <div key={index} className="relative flex items-start group">
                                                {/* Đường nối giữa các ngày */}
                                                {index < tour.Schedules.length - 1 && (
                                                    <div className="absolute left-6 top-12 bottom-0 w-[2px] bg-blue-300 group-hover:bg-blue-500 transition-all"></div>
                                                )}

                                                {/* Số ngày */}
                                                <div className="flex-shrink-0 z-10">
                                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-semibold text-base shadow-md transition-all duration-300 group-hover:scale-110">
                                                        {index + 1}
                                                    </div>
                                                </div>

                                                {/* Nội dung lịch trình */}
                                                <div className="ml-6 p-3 bg-white shadow-md rounded-lg w-full">
                                                    <h3 className="font-semibold text-lg text-gray-800">{day.activities}</h3>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}


                            {/* Included Services Tab */}
                            {selectedTab === 'included' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Dịch vụ bao gồm</h2>
                                        <div className="bg-green-50 p-6 rounded-2xl">
                                            <ul className="space-y-4">
                                                {(displayTour.included || [
                                                    "Xe đưa đón khứ hồi",
                                                    "Hướng dẫn viên chuyên nghiệp",
                                                    "Các bữa ăn theo chương trình",
                                                    "Vé tham quan các điểm",
                                                    "Bảo hiểm du lịch"
                                                ]).map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="inline-flex items-center justify-center bg-green-600 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">✓</span>
                                                        <span className="text-gray-700 text-lg">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800">Dịch vụ không bao gồm</h2>
                                        <div className="bg-red-50 p-6 rounded-2xl">
                                            <ul className="space-y-4">
                                                {(displayTour.excluded || [
                                                    "Chi phí cá nhân",
                                                    "Đồ uống ngoài chương trình",
                                                    "Tiền tip cho hướng dẫn viên"
                                                ]).map((item, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <span className="inline-flex items-center justify-center bg-red-600 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">✗</span>
                                                        <span className="text-gray-700 text-lg">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reviews Tab */}
                            {selectedTab === 'reviews' && (
                                <div>
                                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Đánh giá từ khách hàng</h2>
                                    <div className="space-y-6">
                                        {(displayTour.reviews || []).length > 0 ? (
                                            displayTour.reviews.map((review, index) => (
                                                <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                                                    <div className="flex items-center mb-4">
                                                        <img 
                                                            src={review.avatar || "/api/placeholder/50/50"} 
                                                            alt={review.name} 
                                                            className="w-12 h-12 rounded-full mr-4 object-cover"
                                                        />
                                                        <div>
                                                            <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                                                            <div className="flex items-center">
                                                                <div className="flex">
                                                                    {[1, 2, 3, 4, 5].map(star => (
                                                                        <FaStar 
                                                                            key={star} 
                                                                            className={`${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="ml-2 text-gray-600">{review.date}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-700 text-lg leading-relaxed">{review.comment}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 text-lg">Chưa có đánh giá nào cho tour này.</p>
                                        )}
                                    </div>
                                    <div className="text-center mt-8">
                                        <button className="inline-flex items-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-full px-6 py-3 transition-colors">
                                            Xem tất cả đánh giá
                                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
                    <p className="text-lg text-gray-600 font-medium">Không tìm thấy thông tin tour</p>
                    <p className="text-sm text-gray-500 mt-2">Vui lòng thử lại hoặc liên hệ hỗ trợ</p>
                </div>
            )}
        </div>
    );
}

export default ShowTour;