import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom"
import { api, formatDateSS, formatPrice, src } from "../../../../Api"
import { FaCalendarAlt, FaClock, FaHeart, FaMapMarkerAlt, FaRocket, FaStar, FaUsers, FaFilter } from "react-icons/fa"
import Filter from "./components/Filter"

function TourByCategory({ setCurrentTitle }) {
    const location = useLocation()
    const id = location.state?.id
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [hoveredId, setHoveredId] = useState(null)
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    const { category_name } = useParams();
    const fetchTourByCategory = async () => {
        try {
            setLoading(true)
            const response = await axios.post(api + "/tourCategory/tours-by-category", {
                category_id: id,
            })
            if (response.data.success) {
                setTours(response.data.data)
            }
        } catch (error) {
            console.error("Error fetching tour by category:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTourByCategory()
    }, [id])
    useEffect(() => {
        window.scrollTo(0, 0)
        setCurrentTitle("Khám Phá Tour")
    }, [setCurrentTitle])

    return (
        <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen relative overflow-hidden">
            <div className="px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <span className="inline-flex items-center px-4 py-1.5 mb-4 bg-gradient-to-r from-blue-500 to-teal-400 text-white text-xs font-semibold rounded-full shadow-md uppercase tracking-wider animate-pulse">
                            <span className="material-icons text-sm mr-1">explore</span> Khám Phá Ngay
                        </span>
                        <span className="absolute -right-2 -top-2 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-5 relative">
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-teal-500 to-blue-400">
                            Hành Trình Đỉnh Cao
                        </span>
                        <span className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500 to-teal-400 opacity-30 -z-10"></span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        Biến giấc mơ du lịch của bạn thành hiện thực với những chuyến đi độc đáo
                    </p>
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
                    <Filter isMobile={isMobileFilterOpen} setTours={setTours} id={id}  />


                    {/* Danh sách tour */}
                    <div className="col-span-full md:col-span-7">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                            <div className="mb-3 sm:mb-0">
                                <p className="text-gray-700">
                                    <span className="font-medium">{tours.length}</span> tour được tìm thấy trong danh mục: <span className="text-teal-500"> {category_name} </span>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-600 mr-3">Sắp xếp theo:</span>
                                <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 p-2">
                                    <option value="popular">Phổ biến nhất</option>
                                    <option value="price-asc">Giá tăng dần</option>
                                    <option value="price-desc">Giá giảm dần</option>
                                    <option value="duration-asc">Thời gian ngắn nhất</option>
                                    <option value="duration-desc">Thời gian dài nhất</option>
                                </select>
                            </div>
                        </div>

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
                                    const numberOfDays = Math.ceil((new Date(tour.end_date) - new Date(tour.departure_date)) / (1000 * 60 * 60 * 24));
                                    return (
                                        <div
                                            key={tour.id}
                                            className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 transform hover:shadow-md hover:-translate-y-1 border border-gray-100 cursor-pointer ${hoveredId === tour.id ? 'ring-2 ring-teal-400 ring-opacity-50' : ''}`}
                                            style={{ transitionDelay: `${index * 50}ms` }}
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
                                                            className={`w-full h-full object-cover transition-transform duration-700 ${hoveredId === tour.id ? 'scale-110' : 'scale-100'}`}
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
                                                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${hoveredId === tour.id ? 'bg-white text-red-500' : 'bg-white/70 text-gray-600'}`}
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    // Xử lý lưu tour yêu thích
                                                                }}
                                                            >
                                                                <FaHeart className={`${hoveredId === tour.id ? 'animate-pulse' : ''}`} />
                                                            </button>
                                                        </div>
                                                        
                                                        {/* Badge đánh giá */}
                                                        <div className="absolute bottom-3 left-3 flex items-center bg-white/90 px-2 py-1 rounded-md text-xs font-medium">
                                                            <FaStar className="text-yellow-400 mr-1" />
                                                            <span>4.5</span>
                                                            <span className="mx-1 text-gray-400">|</span>
                                                            <span className="text-gray-600">120 đánh giá</span>
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
                                                                {tour.description || `Khám phá vẻ đẹp tuyệt vời của ${tour.destination} với hành trình đặc biệt này. Trải nghiệm văn hóa, ẩm thực và phong cảnh tuyệt đẹp cùng đội ngũ hướng dẫn viên chuyên nghiệp.`}
                                                            </p>
                                                            
                                                            {/* Tiện ích */}
                                                            <div className="flex flex-wrap gap-2 mb-4">
                                                                {['Bao gồm bữa ăn', 'Khách sạn 4 sao', 'Hướng dẫn viên', 'Vé tham quan'].map((feature, i) => (
                                                                    <span key={i} className={`text-xs px-2 py-1 rounded-md ${hoveredId === tour.id ? 'bg-teal-100 text-teal-800' : 'bg-teal-50 text-teal-700'} transition-colors duration-300`}>
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
                                                        
                                                            <button className={`bg-gradient-to-r ${hoveredId === tour.id ? 'from-blue-600 to-teal-500 shadow-md' : 'from-blue-500 to-teal-400'} text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center group`}>
                                                                <FaRocket className={`mr-2 ${hoveredId === tour.id ? 'animate-pulse' : 'group-hover:animate-pulse'}`} />
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
    )
}

export default TourByCategory