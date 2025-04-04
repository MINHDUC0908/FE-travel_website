import { useTourCus } from "../../../Context/TourContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { formatDate, formatDateSS, formatPrice, src } from "../../../../../Api";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTourCategoryCus } from "../../../Context/TourCategoryContext";
import { Link } from "react-router-dom";

function Tour() {
    const { tours } = useTourCus();
    const { tourcategories } = useTourCategoryCus()
    const [isVisible, setIsVisible] = useState(false);
    const [featuredTour, setFeaturedTour] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        // Chọn tour nổi bật ngẫu nhiên
        if (tours && tours.length > 0) {
            const randomIndex = Math.floor(Math.random() * Math.min(tours.length, 7));
            setFeaturedTour(tours[randomIndex]);
        }
        console.log(tourcategories)
    }, [tours]);

    // Biến thể animation cho hiệu ứng chuyển động
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } }
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
    };

    return (
        <div className="container mx-auto py-16 px-6 bg-gradient-to-b relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-400 opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
            {/* Phần tour nổi bật */}
            <motion.div 
                className="text-center mb-12 relative z-10"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="inline-block bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-semibold mb-4 animate-pulse">
                    🔥 Ưu đãi đặc biệt cho các tour mới
                </span>
                <h2 className="text-5xl font-extrabold text-teal-700 tracking-wide drop-shadow-lg">
                    🌴 Bắt Đầu Hành Trình Của Bạn!
                </h2>
                <div className="flex justify-center mt-4">
                    <p className="max-w-2xl text-lg text-gray-600 font-medium">
                        Khám phá những điểm đến tuyệt vời, trải nghiệm văn hóa độc đáo và tạo nên những kỷ niệm không thể quên!
                    </p>
                </div>
            </motion.div>

            {featuredTour && (
                <motion.div 
                    className="mb-16 bg-white rounded-2xl shadow-xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="grid md:grid-cols-2 items-center">
                        <div className="relative h-96">
                            <img
                                src={src + (featuredTour.Images && featuredTour.Images[0]?.image_url) || "https://via.placeholder.com/800x600"}
                                alt={featuredTour.tour_name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                                <span className="bg-yellow-400 text-teal-900 inline-block px-4 py-1 rounded-full text-sm font-bold mb-3">
                                    Tour Đặc Sắc
                                </span>
                                <h3 className="text-3xl font-bold text-white mb-2">{featuredTour.tour_name}</h3>
                                <p className="text-white/90">{featuredTour.destination}, {featuredTour.area}</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center mb-4">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-600 ml-2">(4.9/5 từ 124 đánh giá)</span>
                            </div>
                            <p className="text-gray-600 mb-6">
                                Đắm mình trong vẻ đẹp tự nhiên và văn hóa độc đáo của {featuredTour.destination}. 
                                Tour này sẽ đưa bạn đến những địa điểm nổi tiếng nhất và những góc ẩn chưa được khám phá nhiều.
                            </p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center">
                                    <span className="text-teal-600 mr-2">⏱️</span>
                                    <span className="text-gray-700">3-5 ngày</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-teal-600 mr-2">👥</span>
                                    <span className="text-gray-700">Tối đa {featuredTour.quantity} người</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-teal-600 mr-2">🚌</span>
                                    <span className="text-gray-700">Đưa đón tận nơi</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-teal-600 mr-2">🍽️</span>
                                    <span className="text-gray-700">Bao gồm bữa ăn</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-gray-500 text-sm">Chỉ từ</span>
                                    <p className="text-3xl font-bold text-teal-700">{formatPrice(2500000)}</p>
                                </div>
                                <Link to={`/booking/${featuredTour.tour_name}`} state={{id: featuredTour.id}}>
                                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg">
                                        Đặt Ngay
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            <motion.div 
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <h3 className="text-2xl font-bold text-teal-800">📸 Tour Phổ Biến</h3>
                <a href="#" className="text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center">
                    Xem tất cả
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </motion.div>

            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
                effect="coverflow"
                coverflowEffect={{
                    rotate: 5,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true
                }}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={30}
                slidesPerView={5}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
                className="relative"
            >
                {tours && tours.length > 0 ? (
                    tours.slice(0, 10).map((tour) => {
                        // Xác định trạng thái tour
                        const time = formatDateSS(new Date())
                        const startDate = formatDateSS(tour.departure_date);
                        const endDate = formatDateSS(tour.end_date);
                        let statusText = "Chưa diễn ra";
                        let statusColor = "bg-blue-500";
                        if (time > endDate) {
                            statusText = "Đã kết thúc";
                            statusColor = "bg-gray-500";
                        } else if (time >= startDate && time <= endDate) {
                            statusText = "Đang diễn ra";
                            statusColor = "bg-green-500";
                        } else if (time < startDate) {
                            statusText = "Chưa diễn ra";
                            statusColor = "bg-blue-500"; 
                        }
                    
                        return (
                            <SwiperSlide key={tour.id}>
                                <Link to={`/show/tour/${tour.tour_name}`} state={{id: tour.id}}>
                                    <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl group h-full flex flex-col">
                                        <div className="relative">
                                            <img
                                                src={src + (tour.Images && tour.Images[0]?.image_url) || "https://via.placeholder.com/400x300"}
                                                alt={tour.tour_name}
                                                className="tour-image w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className={`absolute top-4 right-4 ${statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md`}>
                                                {statusText}
                                            </div>
                                            <div className="absolute bottom-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-tl-lg font-semibold shadow-md">
                                                {formatPrice(tour.adult_price)}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-white flex-grow">
                                            <div className="flex items-center mb-2">
                                                <div className="flex">
                                                    {[1, 2, 3, 4, 5].map((star, index) => (
                                                        <svg key={index} className={`w-4 h-4 ${index < 4 ? "text-yellow-400" : "text-gray-300"} fill-current`} viewBox="0 0 24 24">
                                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-teal-800 mb-2 truncate tracking-wide group-hover:text-orange-500 transition-colors duration-300">
                                                {tour.tour_name}
                                            </h3>
                                            <p className="text-sm text-gray-700 font-medium mb-1 flex items-center">
                                                📍 {tour.destination}
                                            </p>
                                            <p className="text-xs text-gray-500 italic mb-3">{tour.area}</p>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">3 ngày</span>
                                                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Khách sạn 4 sao</span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-sm text-gray-600 font-semibold flex items-center">
                                                    👥 Số lượng: {tour.quantity}
                                                </p>

                                                <div className={`text-xs font-medium ${tour.remaining_quantity <= 0 ? "text-red-500" : "text-green-600"} bg-gray-100 px-2 py-1 rounded`}>
                                                    {tour.remaining_quantity <= 0 ? "Hết chỗ" : `Còn lại: ${tour.remaining_quantity }`}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-teal-700/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                                            <button 
                                                className={`w-full ${tour.remaining_quantity <= 0 ? "bg-gray-500 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"} text-white py-3 text-sm font-semibold rounded-b-2xl transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex justify-center items-center`}
                                                disabled={tour.remaining_quantity <= 0}
                                            >
                                                <span>{tour.remaining_quantity <= 0 ? "Hết chỗ" : "Đặt Ngay!"}</span>
                                                {!tour.remaining_quantity <= 0 && (
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 text-lg animate-pulse p-12">
                        Chưa có tour nào, hãy quay lại sau nhé! 🏖️
                    </p>
                )}
            </Swiper>
            {/* Phần danh mục điểm đến */}
            <motion.div 
                className="mt-20"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <h3 className="text-2xl font-bold text-teal-800 mb-8">🔍 Đi Để Cảm Nhận – Trải Nghiệm Khám Phá</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        tourcategories && tourcategories.length > 0 && (
                            tourcategories.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="relative rounded-xl overflow-hidden h-64 shadow-lg group cursor-pointer"
                                    variants={itemVariants}
                                >
                                    <img src={src + item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                                        <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors">
                                            {item.category_name}
                                        </h4>
                                        <p className="text-white/80 text-sm mb-3">{item.Tours.length} tour có sẵn</p>
                                    <Link to={`${item.category_name}`} state={{id: item.id}} className="group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                                        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                            Khám phá ngay
                                        </span>
                                    </Link>
                                    </div>
                                </motion.div>
                            ))
                        )
                    }
                </div>
            </motion.div>
        </div>
    );
}

export default Tour