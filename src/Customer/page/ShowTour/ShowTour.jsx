import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTourCus } from "../../Context/TourContext";
import { formatDate } from "../../../../Api";
import TourHeader from "./components/TourHeader"; // Đã bao gồm Image Slider
import QuickInfoCards from "./components/QuickInfoCards";
import PriceBanner from "./components/PriceBanner";
import TabNavigation from "./components/TabNavigation";
import TabContent from "./components/TabContent";
import { FaShoppingBag } from "react-icons/fa";

function ShowTour({ setCurrentTitle }) {
    const { fetchShowTour, loading, setTour, tour } = useTourCus();
    const location = useLocation();
    const id = location.state?.id;
    const [activeImage, setActiveImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [selectedTab, setSelectedTab] = useState("overview");

    useEffect(() => {
        if (!id) {
            toast.error("Lỗi: Không tìm thấy ID");
            return;
        }
        setTour(null);
        setCurrentTitle("Đang tải...");
        fetchShowTour(id);
    }, [id]);

    useEffect(() => {
        if (tour) {
            window.scrollTo(0, 0);
            setCurrentTitle(tour.tour_name);
        }
    }, [tour, setCurrentTitle]);

    if (loading)
    {
        return (
            <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                        <FaShoppingBag className="text-blue-500 text-lg" />
                    </div>
                </div>
            </div>
        )
    }
    if (!tour) {
        return (
        <div className="flex flex-col items-center justify-center min-h-[800px] bg-white rounded-2xl shadow-lg">
            <p className="text-lg text-gray-600 font-medium">Không tìm thấy thông tin tour</p>
            <p className="text-sm text-gray-500 mt-2">Vui lòng thử lại hoặc liên hệ hỗ trợ</p>
        </div>
        );
    }

    const numberOfDays = (new Date(tour.end_date) - new Date(tour.departure_date)) / (1000 * 60 * 60 * 24);

    return (
        <div className="mt-16 bg-white rounded-2xl shadow-lg overflow-hidden">
            <TourHeader
                    tour={tour}
                    isFavorite={isFavorite}
                    setIsFavorite={setIsFavorite}
                    images={tour.Images}
                    activeImage={activeImage}
                    setActiveImage={setActiveImage}
            />
            <div className="container mx-auto px-4 py-8">
                <QuickInfoCards tour={tour} numberOfDays={numberOfDays} formatDate={formatDate} />
                <PriceBanner tour={tour} />
                <TabNavigation selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <TabContent tour={tour} selectedTab={selectedTab} />
            </div>
        </div>
    );
}

export default ShowTour;