import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTourCus } from "../../Context/TourContext";
import { formatDate } from "../../../../Api";
import LoadingSpinner from "./components/LoadingSpinner";
import TourHeader from "./components/TourHeader"; // Đã bao gồm Image Slider
import QuickInfoCards from "./components/QuickInfoCards";
import PriceBanner from "./components/PriceBanner";
import TabNavigation from "./components/TabNavigation";
import TabContent from "./components/TabContent";

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

    const handleBookTour = () => {
        // Logic đặt tour ở đây
        console.log("Đặt tour:", tour.tour_name);
    };

    if (loading) return <LoadingSpinner />;
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
                    onBookTour={handleBookTour}
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