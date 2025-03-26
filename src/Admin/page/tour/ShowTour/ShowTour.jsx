import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom";
import { useTour } from "../../../Context/TourContext";
import { toast } from "react-toastify";
import { 
    FaArrowLeft, FaEdit, FaMapMarkerAlt, FaPrint, 
    FaShoppingBag, FaTrash, FaUsers, FaCalendar, 
    FaClock, FaTag 
} from "react-icons/fa";
import { formatDate, formatPrice, src } from "../../../../../Api";
import { isAfter } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ShowTour({ setCurrentTitle }) {
    const { fetchTourShow, loading, tour, setTour } = useTour();
    const printRef = useRef();
    const location = useLocation()
    const id = location.state?.id;

    useEffect(() => {
        if (!id) {
            toast.error("Lỗi: Không tìm thấy ID");
            return;
        }

        setTour(null);
        setCurrentTitle("Đang tải...");
        fetchTourShow(id);
    }, [id]);

    useEffect(() => {
        if (tour) {
            window.scrollTo(0,0)
            setCurrentTitle(tour.tour_name);
        }
    }, [tour]);
    
    const isExpired = tour?.end_date ? isAfter(new Date(), new Date(tour.end_date)) : false;

    const handleDownloadPDF = async () => {
        const element = printRef.current;
        
        const images = element.querySelectorAll("img");
        await Promise.all(Array.from(images).map(img => {
            if (!img.complete) {
                return new Promise(resolve => img.onload = resolve);
            }
        }));
    
        const canvas = await html2canvas(element, { useCORS: true });
        const imgData = canvas.toDataURL("image/png");
    
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`ThongTinTour_${tour?.tour_name}.pdf`);
        toast.success("Xuất PDF thành công!");
    };
    
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] ">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <FaShoppingBag className="text-blue-500 text-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!tour) return null;

    return (
        <div className="container mx-auto">
            {/* Navigation and Actions */}
            <div className="mb-4 flex justify-between items-center">
                <Link 
                    to="/admin/tour" 
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 bg-white shadow-md rounded-lg px-3 py-1.5"
                >
                    <FaArrowLeft className="mr-2 text-sm" /> Quay lại
                </Link>
                
                <div className="flex space-x-2">
                    <Link 
                        to={`/admin/tour/edit/${tour.tour_name}`} 
                        state={{id: tour.id}}
                        className="flex items-center text-sm bg-blue-500 text-white hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        <FaEdit className="mr-2 text-sm" /> Sửa
                    </Link>
                    
                    <button 
                        className="flex items-center text-sm bg-red-500 text-white hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        <FaTrash className="mr-2 text-sm" /> Xóa
                    </button>
                    
                    <button 
                        onClick={handleDownloadPDF}
                        className="flex items-center text-sm bg-gray-500 text-white hover:bg-gray-600 px-3 py-1.5 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        <FaPrint className="mr-2 text-sm" /> PDF
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-4" ref={printRef}>
                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-50 p-3 border-b border-blue-100">
                        <h2 className="text-base font-bold text-blue-800 flex items-center">
                            <FaTag className="mr-2 text-sm text-blue-600" /> 
                            Thông Tin Cơ Bản
                        </h2>
                    </div>
                    <div className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="flex flex-col">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{tour.tour_name}</h3>
                                    <div className="flex items-center text-xs text-gray-600 mb-3">
                                        <FaMapMarkerAlt className="mr-1.5 text-red-500 text-sm" />
                                        <span className="font-medium">{tour.destination}, {tour.area}</span>
                                    </div>
                                </div>
                                {/* Date Grid */}
                                <div className="grid grid-cols-2 gap-3 min-h-[80px] mt-auto">
                                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-between">
                                        <div className="text-xs text-gray-500 flex items-center">
                                            <FaCalendar className="mr-1.5 text-sm text-blue-500" />
                                            Ngày khởi hành
                                        </div>
                                        <div className="text-xs font-semibold text-gray-700 mt-1">
                                            {formatDate(tour.departure_date)}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-between">
                                        <div className="text-xs text-gray-500 flex items-center">
                                            <FaClock className="mr-1.5 text-sm text-green-500" />
                                            Ngày kết thúc
                                        </div>
                                        <div className="text-xs font-semibold text-gray-700 mt-1">
                                            {formatDate(tour.end_date)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col">
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Mô Tả Tour</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-3">{tour.description}</p>
                                </div>
                                {/* Quantity and Category Grid */}
                                <div className="grid grid-cols-2 gap-3 min-h-[80px] mt-auto">
                                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-between">
                                        <div className="text-xs text-gray-500 flex items-center">
                                            <FaUsers className="mr-1.5 text-sm text-purple-500" />
                                            Số lượng
                                        </div>
                                        <div className="text-xs font-semibold text-gray-700 mt-1">
                                            {tour.quantity} chỗ
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-3 rounded-lg flex flex-col justify-between">
                                        <div className="text-xs text-gray-500">Danh mục</div>
                                        <div className="text-xs font-semibold text-gray-700 mt-1">
                                            {tour.TourCategory?.category_name || 'Chưa phân loại'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Price Section */}
                        <div className="mt-4 grid md:grid-cols-2 gap-3">
                            <div className="bg-green-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-500">Giá người lớn</div>
                                <div className="text-sm font-bold text-green-700 mt-1">
                                    {formatPrice(tour.adult_price)} VNĐ
                                </div>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                                <div className="text-xs text-gray-500">Giá trẻ em</div>
                                <div className="text-sm font-bold text-purple-700 mt-1">
                                    {formatPrice(tour.child_price)} VNĐ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Images */}
                {tour.Images && tour.Images.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="bg-blue-50 p-3 border-b border-blue-100">
                            <h2 className="text-base font-bold text-blue-800">Hình Ảnh Tour</h2>
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {tour.Images.map((image) => (
                                    <div 
                                        key={image.id} 
                                        className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                                    >
                                        <img 
                                            src={src + image.image_url} 
                                            alt={`Hình ảnh ${tour.tour_name}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Schedule */}
                {tour.Schedules && tour.Schedules.length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg">
                        <div className="bg-blue-50 p-3 border-b border-blue-100">
                            <h2 className="text-base font-bold text-blue-800">Lịch Trình</h2>
                        </div>
                        <div className="p-4 space-y-3">
                            {tour.Schedules.sort((a, b) => a.day_number - b.day_number).map((schedule) => (
                                <div 
                                    key={schedule.id} 
                                    className="bg-gray-50 p-3 rounded-lg border-l-4 border-blue-500"
                                >
                                    <h3 className="text-sm font-semibold text-blue-700 mb-1">
                                        Ngày {schedule.day_number}
                                    </h3>
                                    <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: schedule.activities }}></p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* System Information */}
                <div className="bg-white rounded-xl shadow-lg">
                    <div className="bg-blue-50 p-3 border-b border-blue-100">
                        <h2 className="text-base font-bold text-blue-800 text-center">
                            Thông Tin Hệ Thống
                        </h2>
                    </div>
                    <div className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <div className="text-xs text-gray-500">ID Tour</div>
                                <div className="text-xs font-semibold text-gray-700 mt-1">{tour.id}</div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <div className="text-xs text-gray-500">Ngày tạo</div>
                                <div className="text-xs font-semibold text-gray-700 mt-1">
                                    {formatDate(tour.createdAt)}
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <div className="text-xs text-gray-500">Cập nhật lần cuối</div>
                                <div className="text-xs font-semibold text-gray-700 mt-1">
                                    {formatDate(tour.updatedAt)}
                                </div>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-center">
                                <div className="text-xs text-gray-500">Trạng thái</div>
                                <div className={`text-xs font-semibold mt-1 ${isExpired ? "text-red-500" : "text-green-500"}`}>
                                    {isExpired ? "Hết hạn" : "Còn hạn"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowTour