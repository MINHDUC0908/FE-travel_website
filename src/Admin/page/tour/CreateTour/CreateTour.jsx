import { useState, useEffect } from "react"; // Added useEffect
import { CalendarIcon, PlusCircleIcon, ArrowLeftIcon, ArrowRightIcon, ImageIcon, UploadIcon } from "lucide-react";
import { toast } from "react-toastify";
import { api } from "../../../../../Api";
import axios from "axios";
import { Step2 } from "./Component/Step2";
import { Step1 } from "./Component/Step1";
import { debounce, set } from "lodash";
import { FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../../api/axiosClient";
import { CKEditor } from "ckeditor4-react";

const Step3 = ({ itinerary, setItinerary }) => {
    const updateDay = (index, value) => {
        const newItinerary = [...itinerary];
        newItinerary[index].activities = value;
        setItinerary(newItinerary);
    };

    return (
        <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-blue-800 text-sm">
                    Nhập lịch trình chi tiết cho từng ngày của tour. Mỗi ngày cần có mô tả hoạt động.
                </p>
            </div>
            {itinerary.map((day, index) => (
                <div key={index} className="space-y-2">
                    <label className="text-lg font-semibold text-gray-700">Ngày {day.day}</label>
                    <CKEditor
                        initData={day.activities}
                        onChange={(event) => updateDay(index, event.editor.getData())}
                    />
                </div>
            ))}
        </div>
    );
};

function CreateTour() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false)
    const [tourData, setTourData] = useState({
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
    const [images, setImages] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const navigate = useNavigate()
    // Function to calculate the number of days between two dates
    const calculateDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    };

    // Update itinerary whenever departure_date or end_date changes
    useEffect(() => {
        const { departure_date, end_date } = tourData;
        if (departure_date && end_date) {
            const days = calculateDays(departure_date, end_date);
            if (days > 0) {
                const newItinerary = Array.from({ length: days }, (_, index) => ({
                    day: index + 1,
                    activities: itinerary[index]?.activities || "" // Preserve existing activities if any
                }));
                setItinerary(newItinerary);
            } else {
                setItinerary([]);
            }
        }
    }, [tourData.departure_date, tourData.end_date]);
    console.log(itinerary)
    const isFormValid = () => {
        if (step === 1) {
            return Object.entries(tourData).every(([key, value]) => {
                if (key === "description") return value.trim().length >= 30;
                return value.trim() !== "";
            });
        } else if (step === 2) {
            return images.length > 0;
        } else if (step === 3) {
            return itinerary.length > 0 && itinerary.every(day => day.activities.trim() !== "");
        }
        return false;
    };

    const handleNextStep = () => {
        if (isFormValid()) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        } else {
            toast.info(step === 1 
                ? "Vui lòng nhập đầy đủ thông tin tour! Mô tả tour cần tối thiểu 30 ký tự." 
                : step === 2 
                    ? "Vui lòng thêm ít nhất một hình ảnh cho tour!" 
                    : "Vui lòng nhập lịch trình chi tiết cho từng ngày!"
            );
        }
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    };

    const handleAddTour = debounce(async () => {
        setLoading(true)
        try {
            const formData = new FormData();
            formData.append("tour_name", tourData.tour_name);
            formData.append("destination", tourData.destination);
            formData.append("area", tourData.area);
            formData.append("quantity", tourData.quantity);
            formData.append("adult_price", tourData.adult_price);
            formData.append("child_price", tourData.child_price);
            formData.append("departure_date", tourData.departure_date);
            formData.append("end_date", tourData.end_date);
            formData.append("description", tourData.description);
            formData.append("itinerary", JSON.stringify(itinerary));

            if (images && images.length > 0) {
                images.forEach((image) => {
                    formData.append("image_url", image);
                });
            }

            const res = await axiosClient.post(api + "/admin/tour/store", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                toast.success("Thêm tour và ảnh thành công");
                navigate("/admin/tour")
            }
        } catch (error) {
            toast.error("Lỗi khi thêm tour: " + error.message);
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }, 1000); // Chờ 1 giây giữa các lần gọi
    if (loading)
    {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm animate-fade-in"></div>
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <FaShoppingBag className="text-blue-500 text-lg" />
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-6 px-8">
                    <h2 className="text-3xl font-bold text-white">
                        {step === 1 
                            ? "Tạo Tour Du Lịch Mới" 
                            : step === 2 
                                ? "Thêm Hình Ảnh Cho Tour" 
                                : "Nhập Lịch Trình Từng Ngày"}
                    </h2>
                    <p className="text-blue-100 mt-2">
                        {step === 1 
                            ? "Nhập thông tin chi tiết để tạo trải nghiệm du lịch tuyệt vời" 
                            : step === 2 
                                ? "Thêm hình ảnh đẹp để thu hút khách hàng" 
                                : "Nhập lịch trình chi tiết cho từng ngày của chuyến đi"}
                    </p>
                </div>

                <div className="px-8 pt-8">
                    <div className="flex items-center justify-center mb-10">
                        <div className="flex items-center w-full max-w-xl">
                            <div className="relative flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                                } font-bold text-lg shadow-md`}>
                                    1
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-700">Thông tin</span>
                            </div>
                            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                            <div className="relative flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                                } font-bold text-lg shadow-md`}>
                                    2
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-700">Hình ảnh</span>
                            </div>
                            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`}></div>
                            <div className="relative flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                    step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                                } font-bold text-lg shadow-md`}>
                                    3
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-700">Lịch trình</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-8 pb-8">
                    {step === 1 ? (
                        <form className="space-y-8">
                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <p className="text-blue-800 text-sm">
                                    Vui lòng điền đầy đủ thông tin để tạo tour du lịch mới. Tất cả các trường đều bắt buộc.
                                </p>
                            </div>
                            <Step1 tourData={tourData} setTourData={setTourData} />
                            <div className="pt-4">
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!isFormValid()}
                                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold shadow-md 
                                    ${isFormValid() 
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white" 
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    } transition-all duration-300`}
                                >
                                    <span>Tiếp Theo</span>
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    ) : step === 2 ? (
                        <div className="space-y-8">
                            <Step2 images={images} setImages={setImages} />
                            <div className="flex justify-between gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="w-1/2 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3.5 rounded-lg hover:bg-gray-200 transition-colors font-semibold shadow-sm"
                                >
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    <span>Quay Lại</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNextStep}
                                    disabled={!isFormValid()}
                                    className={`w-1/2 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold shadow-md 
                                    ${isFormValid() 
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white" 
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    } transition-all duration-300`}
                                >
                                    <span>Tiếp Theo</span>
                                    <ArrowRightIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <Step3 itinerary={itinerary} setItinerary={setItinerary} />
                            <div className="flex justify-between gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={handlePreviousStep}
                                    className="w-1/2 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3.5 rounded-lg hover:bg-gray-200 transition-colors font-semibold shadow-sm"
                                >
                                    <ArrowLeftIcon className="w-5 h-5" />
                                    <span>Quay Lại</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddTour}
                                    disabled={!isFormValid()}
                                    className={`w-1/2 flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold shadow-md 
                                    ${isFormValid() 
                                        ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white" 
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    } transition-all duration-300`}
                                >
                                    <span>{loading ? "Đang thêm tour" : "Hoành thành"}</span>
                                </button> 
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateTour;