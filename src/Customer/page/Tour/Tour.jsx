import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaRocket, FaUsers, FaSearch,FaFilter,FaStar,FaClock,FaHeart
} from "react-icons/fa";
import { formatDateSS, formatPrice, src } from "../../../../Api";
import { useTourCus } from "../../Context/TourContext";
import { Link } from "react-router-dom";
import Header from "./Component/Header";
import SortTour from "./Component/SortTour";
import Filter from "./Component/Filter";

function Tour({ setCurrentTitle }) {
    const { tours, setTours, loading } = useTourCus();
    const [hoveredId, setHoveredId] = useState(null);
    const [animatedItems, setAnimatedItems] = useState([]);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        if (tours && tours.length) {
            const timer = setTimeout(() => {
                const ids = tours.map((tour) => tour.id);
                setAnimatedItems(ids);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [tours]);
    useEffect(() => {
        setCurrentTitle("Các điểm đến - Travel VietNam");
        window.scrollTo(0, 0);
    }, [setCurrentTitle]); 
    const toggleFavorite = (id, e) => {
        e.stopPropagation();
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        } else {
            setFavorites([...favorites, id]);
        }
    };

    return (
        <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-teal-100/50 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-100/50 to-blue-100/50 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <Header />
                </div>

                {/* Filter button for mobile */}
                <div className="mb-6 md:hidden">
                    <button 
                        className="w-full bg-white rounded-lg shadow-sm p-3 flex items-center justify-center font-medium text-gray-700"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    >
                        <FaFilter className="mr-2 text-teal-500" />
                        Lọc và Tìm Kiếm
                        <span className="ml-2 w-4 h-4 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">
                            3
                        </span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
                    {/* Thanh tìm kiếm và lọc */}
                    <Filter isMobileFilterOpen ={isMobileFilterOpen } tours={tours} setTours={setTours} />

                    {/* Danh sách tour */}
                    <div className="col-span-full md:col-span-7">
                        {/* Hiển thị số lượng kết quả và sắp xếp */}
                        <SortTour tours={tours} setTours={setTours}/>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
                            </div>
                        ) : tours && tours.length > 0 ? (
                                <div className="space-y-6">
                                    {tours.map((tour, index) => {
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
                                        const numberOfDays = (new Date(tour.end_date) - new Date(tour.departure_date)) / (1000 * 60 * 60 * 24);
                                        return (
                                            <div
                                                key={tour.id}
                                                className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 transform ${animatedItems.includes(tour.id) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"} hover:shadow-md hover:-translate-y-1 border border-gray-100 cursor-pointer`}
                                                style={{ transitionDelay: `${index * 100}ms` }}
                                                onMouseEnter={() => setHoveredId(tour.id)}
                                                onMouseLeave={() => setHoveredId(null)}
                                            >
                                                <Link to={`/show/tour/${tour.tour_name}`} state={{id: tour.id}}>
                                                    <div className="flex flex-col sm:flex-row">
                                                        {/* Ảnh tour */}
                                                        <div className="w-full sm:w-80 h-52 relative overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
                                                            <img
                                                                src={
                                                                    tour.Images?.length
                                                                        ? src + tour.Images[0].image_url
                                                                        : "https://via.placeholder.com/400x300?text=Tour+Image"
                                                                }
                                                                alt={tour.tour_name}
                                                                className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === tour.id ? "scale-110" : "scale-100"}`}
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                                                            
                                                            {/* Trạng thái và nút yêu thích */}
                                                            <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                                                                <span
                                                                    className={`px-2.5 py-1 text-xs font-medium text-white rounded-full ${statusColor}`}
                                                                >
                                                                    {statusText}
                                                                </span>
                                                                
                                                                <button 
                                                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${favorites.includes(tour.id) ? 'bg-rose-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-rose-500 hover:text-white'}`}
                                                                    onClick={(e) => toggleFavorite(tour.id, e)}
                                                                >
                                                                    <FaHeart className={`text-sm ${favorites.includes(tour.id) ? 'animate-pulse' : ''}`} />
                                                                </button>
                                                            </div>
                                                            
                                                            {/* Badge đánh giá */}
                                                            <div className="absolute bottom-3 left-3 flex items-center bg-white/90 px-2 py-1 rounded-md text-xs font-medium">
                                                                <FaStar className="text-yellow-400 mr-1" />
                                                                <span>4.5</span> {/* Điểm đánh giá cố định */}
                                                                <span className="mx-1 text-gray-400">|</span>
                                                                <span className="text-gray-600">120 đánh giá</span> {/* Số lượng đánh giá cố định */}
                                                            </div>
                                                        </div>
    
                                                        {/* Thông tin tour */}
                                                        <div className="flex-1 p-5 flex flex-col">
                                                            {/* Thông tin chính */}
                                                            <div className="flex-1">
                                                                <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 hover:text-teal-600 transition-colors line-clamp-2">
                                                                    {tour.tour_name}
                                                                </h2>
                                                                
                                                                <div className="grid grid-cols-2 gap-y-2 text-gray-700 text-sm mb-4">
                                                                    <div className="flex items-center">
                                                                        <FaMapMarkerAlt className="text-teal-500 mr-2 flex-shrink-0" />
                                                                        <span className="truncate">{tour.destination}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <FaCalendarAlt className="text-teal-500 mr-2 flex-shrink-0" />
                                                                        <span>{new Date(tour.departure_date).toLocaleDateString("vi-VN")}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <FaClock className="text-teal-500 mr-2 flex-shrink-0" />
                                                                        <span>{numberOfDays} ngày {numberOfDays - 1} đêm</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <FaUsers className="text-teal-500 mr-2 flex-shrink-0" />
                                                                        <span>Còn {tour.remaining_quantity} chỗ</span>
                                                                    </div>
                                                                </div>
                                                                
                                                                {/* Mô tả ngắn */}
                                                                <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                                                    Khám phá vẻ đẹp tuyệt vời của {tour.destination} với hành trình đặc biệt này. Trải nghiệm văn hóa, ẩm thực và phong cảnh tuyệt đẹp cùng đội ngũ hướng dẫn viên chuyên nghiệp.
                                                                </p>
                                                                
                                                                {/* Tiện ích */}
                                                                <div className="flex flex-wrap gap-2 mb-4">
                                                                    {['Bao gồm bữa ăn', 'Khách sạn 4 sao', 'Hướng dẫn viên', 'Vé tham quan'].map((feature, i) => (
                                                                        <span key={i} className="bg-teal-50 text-teal-700 text-xs px-2 py-1 rounded-md">
                                                                            {feature}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
    
                                                            {/* Giá và nút đặt tour */}
                                                            <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                                                <div>
                                                                    <span className="text-xs text-gray-500">Giá chỉ từ</span>
                                                                    <div className="text-xl font-bold text-teal-600">
                                                                        {formatPrice(tour.adult_price)}
                                                                        <span className="text-sm text-gray-600 ml-1">/người</span>
                                                                    </div>
                                                                </div>
                                                            
                                                                <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center group">
                                                                    <FaRocket className="mr-2 group-hover:animate-pulse" />
                                                                    <span>Xem Ngay</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-gray-400 text-5xl mb-4">😢</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Không tìm thấy tour</h3>
                                <p className="text-gray-500">Vui lòng thử lại với các tiêu chí tìm kiếm khác</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tour;