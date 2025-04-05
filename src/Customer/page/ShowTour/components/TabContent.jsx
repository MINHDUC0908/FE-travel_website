import { useState } from "react";
import { FaRegCalendarAlt, FaStar } from "react-icons/fa";
import axiosClient from "../../../../api/axiosClient";
import { api } from "../../../../../Api";
import { toast } from "react-toastify";
import Rating from "./Rating";

const TabContent = ({ tour, selectedTab }) => {
    const mockTour = {
        description:
            "Hành trình khám phá kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi được bao phủ bởi làn nước xanh ngọc bích...",
        highlights: [
            "Khám phá hang Sung Sốt - hang động đẹp nhất Vịnh Hạ Long",
            "Ngắm hoàng hôn và bình minh tuyệt đẹp trên vịnh",
            "Trải nghiệm chèo thuyền kayak khám phá các hang động và vịnh nhỏ",
            "Thưởng thức đặc sản hải sản tươi ngon trên du thuyền 5 sao",
            "Tham gia lớp học nấu ăn và làm bánh trên tàu",
            "Ngủ đêm trên vịnh trong phòng sang trọng hướng biển",
        ],
        included: [
            "Xe đưa đón khứ hồi từ Hà Nội",
            "Hướng dẫn viên chuyên nghiệp",
            "Du thuyền 5 sao với phòng tiện nghi đầy đủ",
            "Các bữa ăn theo chương trình",
            "Hoạt động trên tàu và vé tham quan",
            "Bảo hiểm du lịch",
        ],
        excluded: [
            "Đồ uống và chi phí cá nhân",
            "Tiền tip cho hướng dẫn viên và nhân viên",
            "Chi phí phát sinh do thiên tai, thời tiết",
        ],
        reviews: [
        {
            name: "Nguyễn Văn A",
            avatar: "https://example.com/avatar1.jpg",
            rating: 5,
            comment: "Chuyến đi tuyệt vời! Vịnh Hạ Long đẹp mê hồn, du thuyền sang trọng và đồ ăn ngon.",
            date: "15/02/2025",
        },
        {
            name: "Trần Thị B",
            avatar: "https://example.com/avatar2.jpg",
            rating: 4,
            comment: "Phong cảnh tuyệt đẹp, hướng dẫn viên nhiệt tình. Chỉ tiếc thời gian hơi ngắn.",
            date: "05/03/2025",
        },
        ],
    };
    const displayTour = { ...mockTour, ...tour };
    
    return (
        <section className="mb-12 font-sans">
            {selectedTab === "overview" && (
                <div className="space-y-10">
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Giới thiệu chuyến đi</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">{displayTour.description}</p>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Điểm nổi bật</h3>
                        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {displayTour.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full flex-shrink-0">
                                ✓
                                </span>
                                <span className="text-gray-700 text-base">{highlight}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
            )}
            {selectedTab === "itinerary" && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <FaRegCalendarAlt className="text-blue-600" />
                        Lịch trình chi tiết
                    </h2>
                    <div className="space-y-8 relative">
                        {tour.Schedules.map((day, index) => (
                        <div key={index} className="flex items-start group relative">
                            {index < tour.Schedules.length - 1 && (
                            <div className="absolute left-6 top-12 h-[calc(100%-2.5rem)] w-0.5 bg-blue-200 group-hover:bg-blue-400 transition-colors" />
                            )}
                            <div className="flex-shrink-0 z-10">
                            <span className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-semibold shadow-lg group-hover:bg-blue-700 transition-all">
                                {index + 1}
                            </span>
                            </div>
                            <div className="ml-6 p-4 bg-white rounded-lg shadow-md w-full hover:shadow-lg transition-shadow">
                            <div
                                className="text-gray-600 text-base leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: day.activities }}
                            />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Tab: Included/Excluded */}
            {selectedTab === "included" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dịch vụ bao gồm</h2>
                        <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                        <ul className="space-y-4">
                            {displayTour.included.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-green-600 text-white rounded-full flex-shrink-0">
                                ✓
                                </span>
                                <span className="text-gray-700 text-base">{item}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Dịch vụ không bao gồm</h2>
                        <div className="bg-red-50 p-6 rounded-xl shadow-sm">
                        <ul className="space-y-4">
                            {displayTour.excluded.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="flex items-center justify-center w-6 h-6 bg-red-600 text-white rounded-full flex-shrink-0">
                                ✗
                                </span>
                                <span className="text-gray-700 text-base">{item}</span>
                            </li>
                            ))}
                        </ul>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === "reviews" && (
                <Rating tour={tour} />
            )}
        </section>
    );
};

export default TabContent;