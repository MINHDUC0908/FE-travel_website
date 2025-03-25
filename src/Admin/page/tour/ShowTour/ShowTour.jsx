import { useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom";
import { useTour } from "../../../Context/TourContext";
import { toast } from "react-toastify";
import { FaArrowLeft, FaEdit, FaMapMarkerAlt, FaPrint, FaShoppingBag, FaTrash, FaUsers } from "react-icons/fa";
import { formatDate, formatPrice, src } from "../../../../../Api";
import { isAfter } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ShowTour({ setCurrentTitle })
{
    const { fetchTourShow, loading, tour, setTour } = useTour();
    const printRef = useRef();
    // Khi ID thay đổi, reset product ngay lập tức
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
        
        // Đợi hình ảnh tải xong trước khi render
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
    
    return (
        <div>
            {
                loading ? (
                    <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                                <FaShoppingBag className="text-blue-500 text-lg" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6" ref={printRef}>
                        <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-100">
                                <FaArrowLeft className="mr-2 text-sm" /> Quay lại
                                </button>
                            </div>
                            
                            <div className="flex space-x-3">
                                <Link
                                to={`/admin/tour/edit/${tour.tour_name}`} state={{id: tour.id}}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg flex items-center font-medium transition-colors duration-200 border border-blue-100"
                                >
                                <FaEdit className="mr-2 text-sm" /> Chỉnh sửa
                                </Link>
                                
                                <button className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center font-medium transition-colors duration-200 border border-red-100">
                                <FaTrash className="mr-2 text-sm" /> Xóa
                                </button>
                                
                                <button
                                onClick={handleDownloadPDF}
                                className="bg-gray-50 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center font-medium transition-colors duration-200 border border-gray-200"
                                >
                                <FaPrint className="mr-2 text-sm" /> In
                                </button>
                            </div>
                        </div>
                        <div ref={printRef}>
                            <div className="bg-white rounded shadow">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-700">Thông tin cơ bản</h2>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="mb-4">
                                                <h3 className="font-bold text-gray-700">{tour.tour_name}</h3>
                                                <div className="flex items-center text-gray-600 mt-1">
                                                    <FaMapMarkerAlt className="mr-1 text-red-500" />
                                                    <span>{tour.destination}, {tour.area}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm text-gray-500">Ngày khởi hành</div>
                                                    <div className="font-medium">{formatDate(tour.departure_date)}</div>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm text-gray-500">Ngày kết thúc</div>
                                                    <div className="font-medium">{formatDate(tour.end_date)}</div>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm text-gray-500">Giá người lớn</div>
                                                    <div className="font-medium text-red-600">{formatPrice(tour.adult_price)}</div>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm text-gray-500">Giá trẻ em</div>
                                                    <div className="font-medium text-red-600">{formatPrice(tour.child_price)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div className="mb-4">
                                                <h3 className="text-sm uppercase font-semibold text-gray-500 mb-2">Mô tả tour</h3>
                                                <p className="text-gray-700">{tour.description}</p>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm text-gray-500">Số lượng</div>
                                                    <div className="font-medium flex items-center">
                                                        <FaUsers className="mr-1 text-blue-500" />
                                                        {tour.quantity} chỗ
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 p-3 rounded">
                                                    <div className="text-sm text-gray-500">Ngày tạo</div>
                                                    <div className="font-medium">{formatDate(tour.createdAt)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded shadow">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-700">Hình ảnh</h2>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {tour.Images && tour.Images.map((image) => (
                                            <div key={image.id} className="relative rounded overflow-hidden shadow-sm border border-gray-200">
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
                            <div className="bg-white rounded shadow">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-700">Lịch trình</h2>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-4">
                                        {tour.Schedules && tour.Schedules.sort((a, b) => a.day_number - b.day_number).map((schedule) => (
                                            <div key={schedule.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                                <h3 className="font-bold text-gray-700">Ngày {schedule.day_number}</h3>
                                                <p className="text-gray-600 mt-1">{schedule.activities}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded shadow">
                                <div className="p-4 border-b border-gray-200">
                                    <h2 className="text-lg font-bold text-gray-700 text-center">Thông tin hệ thống</h2>
                                </div>
                                <div className="p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                                        <div>
                                            <div className="text-sm text-gray-500">ID Tour</div>
                                            <div className="font-medium">{tour.id}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Ngày tạo</div>
                                            <div className="font-medium">{formatDate(tour.createdAt)}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Cập nhật lần cuối</div>
                                            <div className="font-medium">{formatDate(tour.updatedAt)}</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-500">Trạng thái</div>
                                            <div className={`font-medium ${isExpired ? "text-red-500" : "text-green-500"}`}>
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
        </div>
    )
}

export default ShowTour