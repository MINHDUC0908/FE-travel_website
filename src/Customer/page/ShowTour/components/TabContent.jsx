import { FaRegCalendarAlt, FaStar } from "react-icons/fa";

function TabContent({ tour, selectedTab }) {
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
    excluded: ["Đồ uống và chi phí cá nhân", "Tiền tip cho hướng dẫn viên và nhân viên", "Chi phí phát sinh do thiên tai, thời tiết"],
    reviews: [
      {
        name: "Nguyễn Văn A",
        avatar: "https://example.com/avatar1.jpg",
        rating: 5,
        comment: "Chuyến đi tuyệt vời! Vịnh Hạ Long đẹp tuyệt vời, du thuyền sang trọng và đồ ăn ngon...",
        date: "15/02/2025",
      },
      {
        name: "Trần Thị B",
        avatar: "https://example.com/avatar2.jpg",
        rating: 4,
        comment: "Phong cảnh tuyệt đẹp, hướng dẫn viên nhiệt tình. Chỉ tiếc là thời gian hơi ngắn.",
        date: "05/03/2025",
      },
    ],
  };

  const displayTour = { ...mockTour, ...tour };

  return (
    <div className="mb-12">
      {selectedTab === "overview" && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Giới thiệu chuyến đi</h2>
          <p className="prose max-w-none text-gray-700 text-lg leading-relaxed">{displayTour.description}</p>
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Điểm nổi bật</h2>
            <div className="bg-blue-50 p-6 rounded-2xl">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayTour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 text-lg">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "itinerary" && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
            <FaRegCalendarAlt className="text-blue-600 text-xl" />
            Lịch trình chi tiết
          </h2>
          <div className="relative space-y-8">
            {tour.Schedules.map((day, index) => (
              <div key={index} className="relative flex items-start group">
                {index < tour.Schedules.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-[2px] bg-blue-300 group-hover:bg-blue-500 transition-all"></div>
                )}
                <div className="flex-shrink-0 z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-semibold text-base shadow-md transition-all duration-300 group-hover:scale-110">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-6 p-3 bg-white shadow-md rounded-lg w-full">
                  <p className="text-gray-600 mt-1" dangerouslySetInnerHTML={{ __html: day.activities }}></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === "included" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Dịch vụ bao gồm</h2>
            <div className="bg-green-50 p-6 rounded-2xl">
              <ul className="space-y-4">
                {displayTour.included.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-green-600 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">
                      ✓
                    </span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Dịch vụ không bao gồm</h2>
            <div className="bg-red-50 p-6 rounded-2xl">
              <ul className="space-y-4">
                {displayTour.excluded.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center bg-red-600 text-white rounded-full w-6 h-6 mr-3 flex-shrink-0 mt-1">
                      ✗
                    </span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedTab === "reviews" && (
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Đánh giá từ khách hàng</h2>
          <div className="space-y-6">
            {displayTour.reviews.length > 0 ? (
              displayTour.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <img
                      src={review.avatar || "/api/placeholder/50/50"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">Chưa có đánh giá nào cho tour này.</p>
            )}
          </div>
          <div className="text-center mt-8">
            <button className="inline-flex items-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-full px-6 py-3 transition-colors">
              Xem tất cả đánh giá
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TabContent;