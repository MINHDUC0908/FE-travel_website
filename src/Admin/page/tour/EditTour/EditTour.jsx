import { useEffect, useState } from "react";
import { useTour } from "../../../Context/TourContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaInfoCircle, FaShoppingBag,FaSave,FaImage,FaTimes,FaArrowLeft,FaGlobe,FaExclamationCircle} from "react-icons/fa";
import { MdBrowserUpdated } from "react-icons/md";
import { useTourCategory } from "../../../Context/TourCategory";
import ImageModal from "./components/Image";
import Schedule from "./components/Schedule";

function EditTour({ setCurrentTitle }) {
    const { fetchTourShow, loading, tour, setTour, updateTour } = useTour();
    const { tourCategories } = useTourCategory()
    console.log(tourCategories)
    const location = useLocation();
    const id = location.state?.id;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tour_name: "",
        destination: "",
        area: "",
        quantity: "",
        adult_price: "",
        child_price: "",
        departure_date: "",
        end_date: "",
        description: "",
        category_id: ""
    });
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [schedule, setSchedule] = useState(null)
    const handleSchedule = (schedule) => {
        setShowModal(true)
        setSchedule(schedule)
    }
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            window.scrollTo(0, 0);
            setCurrentTitle(tour.tour_name);
            setFormData({
                tour_name: tour.tour_name || "",
                destination: tour.destination || "",
                area: tour.area || "",
                quantity: tour.quantity || "",
                adult_price: tour.adult_price || "",
                child_price: tour.child_price || "",
                departure_date: tour.departure_date,
                end_date: tour.end_date,
                description: tour.description || "",
                category_id: tour.category_id || "",
            });
        }
    }, [tour]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await updateTour(id, formData);
            toast.success("Cập nhật tour thành công");
            navigate("/admin/tour");
        } catch (error) {
            console.error("Đã xảy ra lỗi khi cập nhật tour");
        } finally {
            setIsSubmitting(false);
        }
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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                <div className="flex items-center mb-6">
                    <button 
                        onClick={() => navigate("/admin/tour")}
                        className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <FaArrowLeft className="mr-2" />
                        <span>Quay lại danh sách</span>
                    </button>
                </div>
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
                        <h2 className="text-3xl font-bold text-white flex items-center">
                            <FaShoppingBag className="mr-3" />
                            Chỉnh sửa tour
                        </h2>
                        {tour && (
                            <p className="text-blue-100 mt-2">
                                ID: {id} - {tour.tour_name}
                            </p>
                        )}
                    </div>
                    {tour && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 flex items-center">
                            <FaInfoCircle className="mr-2 text-blue-500" />
                            <span>Bạn đang chỉnh sửa thông tin cho tour <strong>{tour.tour_name}</strong></span>
                        </div>
                    )}
                    

                    <form onSubmit={handleSubmit} className="p-8">
                        {/* Thông tin cơ bản */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                                Thông tin cơ bản
                            </h3>
                            
                            <div className="mb-6">
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <FaInfoCircle className="mr-2 text-blue-600" />
                                    Tên tour <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="tour_name"
                                    value={formData.tour_name}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${formErrors.tour_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                    placeholder="Nhập tên tour..."
                                />
                                {formErrors.tour_name && (
                                    <p className="mt-1 text-sm text-red-500 flex items-center">
                                        <FaExclamationCircle className="mr-1" />
                                        {formErrors.tour_name}
                                    </p>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-2">
                                        <FaMapMarkerAlt className="mr-2 text-blue-600" />
                                        Điểm đến <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${formErrors.destination ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        placeholder="Nhập điểm đến..."
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-2">
                                        <FaGlobe className="mr-2 text-blue-600" />
                                        Khu vực
                                    </label>
                                    <input
                                        type="text"
                                        name="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                        placeholder="Nhập khu vực..."
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <FaUsers className="mr-2 text-blue-600" />
                                    Số lượng người tham gia <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className={`w-full p-3 border ${formErrors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                    placeholder="Nhập số lượng..."
                                    min="1"
                                />
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                                Thông tin giá
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-2">
                                        <FaMoneyBillWave className="mr-2 text-blue-600" />
                                        Giá người lớn (VND) <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="adult_price"
                                        value={formData.adult_price}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${formErrors.adult_price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        placeholder="Nhập giá người lớn..."
                                        min="0"
                                    />
                                </div>
                                
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-2">
                                        <FaMoneyBillWave className="mr-2 text-blue-600" />
                                        Giá trẻ em (VND) <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="child_price"
                                        value={formData.child_price}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${formErrors.child_price ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        placeholder="Nhập giá trẻ em..."
                                        min="0"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                                Thời gian
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-2">
                                        <FaCalendarAlt className="mr-2 text-blue-600" />
                                        Ngày khởi hành <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="departure_date"
                                        value={formData.departure_date ? new Date(formData.departure_date).toISOString().split('T')[0] : ''}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${formErrors.departure_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                    />
                                </div>
                                
                                <div>
                                    <label className="flex items-center text-gray-700 font-medium mb-2">
                                        <FaCalendarAlt className="mr-2 text-blue-600" />
                                        Ngày kết thúc <span className="text-red-500 ml-1">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formData.end_date ? new Date(formData.end_date).toISOString().split('T')[0] : ''}
                                        onChange={handleChange}
                                        className={`w-full p-3 border ${formErrors.end_date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                    />

                                </div>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-200">
                                Mô tả tour
                            </h3>
                            
                            <div>
                                <label className="flex items-center text-gray-700 font-medium mb-2">
                                    <FaInfoCircle className="mr-2 text-blue-600" />
                                    Mô tả chi tiết
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="6"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                                    placeholder="Nhập mô tả chi tiết về tour..."
                                />
                            </div>
                        </div>
                    
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                                Danh mục tour
                            </h3>
                            <div className="relative w-full max-w-xs">
                                <select
                                    name="tourCategory"
                                    id="tourCategory"
                                    value={formData.category_id} 
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:border-gray-400"
                                >
                                    {tourCategories && tourCategories.length > 0 ? (
                                        tourCategories.map(tourCategory => (
                                            <option
                                                key={tourCategory.id}
                                                value={tourCategory.id}
                                                className="text-gray-700 w-full"
                                            >
                                                {tourCategory.category_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>Không có danh mục</option>
                                    )}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                    </svg>
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
                                        <div key={schedule.id} className="flex justify-between items-center border-l-4 border-blue-500 pl-4 py-2">
                                            <div>
                                                <h3 className="font-bold text-gray-700">Ngày {schedule.day_number}</h3>
                                                <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: schedule.activities }}></p>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                type="button"
                                                onClick={() => handleSchedule(schedule)}
                                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 tooltip-container">
                                                <MdBrowserUpdated className="w-4 h-4" />
                                                <span className="tooltip">Chỉnh sửa lịch trình</span>
                                            </motion.button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => setShowImageDialog(true)}
                                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg transition-all hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <FaImage className="mr-2" />
                                Chỉnh sửa hình ảnh
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => navigate("/admin/tour")}
                                className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-lg transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                <FaTimes className="mr-2" />
                                Hủy
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium rounded-lg transition-all hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Đang cập nhật...
                                    </>
                                ) : (
                                    <>
                                        <FaSave className="mr-2" />
                                        Cập nhật tour
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </div>
            </motion.div>
            {
                showImageDialog && <ImageModal images={tour.Images} tour={tour} setShowImageDialog={setShowImageDialog} setTour={setTour} />
            }
            <style>{`
                .tooltip-container {
                    position: relative;
                }
                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background-color: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.2s;
                    z-index: 40;
                }
                .tooltip-container:hover .tooltip {
                    opacity: 1;
                    visibility: visible;
                }
            `}</style>
            {
                showModal && <Schedule schedule={schedule} setShowModal={setShowModal} setTour={setTour} />
            }
        </div>
        
    );
}

export default EditTour;