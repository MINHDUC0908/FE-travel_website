import { FaAward, FaHandshake, FaHistory, FaUserFriends } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import traveltoViteNam from "../../../../assets/travel-to-VietNam.jpg"

function OurStory() {
    const stats = [
        { number: "50,000+", title: "Khách Hàng Hài Lòng", icon: <FaUserFriends /> },
        { number: "1,000+", title: "Tour Đa Dạng", icon: <MdTravelExplore /> },
        { number: "500+", title: "Đối Tác Toàn Cầu", icon: <FaHandshake /> },
        { number: "30+", title: "Giải Thưởng & Chứng Nhận", icon: <FaAward /> }
    ];

    return (
        <>
            {/* Statistics Section */}
            <div className="mb-16 bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map((stat, index) => (
                        <div key={index} className="p-4">
                            <div className="flex justify-center mb-4">
                                <div className="text-blue-500 text-4xl">{stat.icon}</div>
                            </div>
                            <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</h3>
                            <p className="text-gray-600">{stat.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Our Story Section */}
            <div className="mb-16">
                <div className="flex items-center mb-6">
                    <FaHistory className="text-3xl text-blue-500 mr-4" />
                    <h2 className="text-3xl font-bold">Câu Chuyện Của Chúng Tôi</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    {/* Story Text */}
                    <div>
                        <p className="text-gray-600 mb-4">
                            Được thành lập vào năm 2015, chúng tôi bắt đầu với một ý tưởng đơn giản: tạo ra những chuyến đi du lịch chất lượng, dễ dàng tiếp cận với mọi người.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Sau nhiều năm phát triển, chúng tôi tự hào là đối tác tin cậy của hơn 50,000 khách hàng, với mạng lưới rộng khắp tại các điểm du lịch nổi tiếng trong và ngoài nước.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Chúng tôi không chỉ đơn thuần cung cấp tour du lịch, mà còn mang đến những trải nghiệm văn hóa độc đáo, những khám phá mới mẻ về ẩm thực, con người và phong cảnh thiên nhiên kỳ vĩ.
                        </p>
                        <p className="text-gray-600">
                            Sứ mệnh của chúng tôi là kết nối mọi người với những điểm đến tuyệt vời, tạo ra những kỷ niệm khó quên trong cuộc sống của bạn và góp phần phát triển du lịch bền vững.
                        </p>
                    </div>
                    
                    {/* Story Image */}
                    <div className="rounded-xl overflow-hidden shadow-lg">
                        <img 
                            src={traveltoViteNam}
                            alt="Our Story" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default OurStory;