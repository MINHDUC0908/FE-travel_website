import { useState } from "react";
import { AiFillSafetyCertificate, AiOutlineCheck } from "react-icons/ai";
import { BsCalendarCheck, BsGraphUp } from "react-icons/bs";
import { FaAward, FaBus, FaCalendarAlt, FaGlobe, FaHistory, FaHotel, FaMapMarkedAlt, FaMapMarkerAlt, FaPlane, FaUserFriends, FaUtensils } from "react-icons/fa";
import { MdTravelExplore, MdVerified } from "react-icons/md";


function Mission()
{
    const [activeTab, setActiveTab] = useState("vision");
    const services = [
        { title: "Tour Trong Nước", icon: <FaMapMarkedAlt />, description: "Khám phá vẻ đẹp Việt Nam với hàng trăm tour được thiết kế riêng cho từng mùa và sở thích." },
        { title: "Tour Quốc Tế", icon: <FaPlane />, description: "Khám phá thế giới với các tour châu Á, châu Âu, châu Mỹ và châu Úc được tổ chức chuyên nghiệp." },
        { title: "Đặt Khách Sạn", icon: <FaHotel />, description: "Lựa chọn từ hàng nghìn khách sạn đạt chuẩn với giá ưu đãi dành riêng cho khách hàng." },
        { title: "Dịch Vụ Vận Chuyển", icon: <FaBus />, description: "Dịch vụ xe đưa đón sân bay, thuê xe riêng, và các phương tiện di chuyển chất lượng cao." },
        { title: "Ẩm Thực Đặc Sắc", icon: <FaUtensils />, description: "Trải nghiệm văn hóa ẩm thực địa phương với các nhà hàng được chọn lọc kỹ lưỡng." },
        { title: "Tour Theo Yêu Cầu", icon: <BsCalendarCheck />, description: "Tạo hành trình riêng biệt cho cá nhân, gia đình hoặc nhóm với lịch trình linh hoạt." }
    ];
    return (
        <>
            <div className="mb-16 bg-white rounded-xl shadow-md overflow-hidden">
                <div className="grid md:grid-cols-3">
                    <div className="bg-blue-500 text-white p-8">
                        <h3 className="text-2xl font-bold mb-6">Tìm Hiểu Thêm Về Chúng Tôi</h3>
                        <div className="space-y-2">
                            <button 
                                onClick={() => setActiveTab("vision")}
                                className={`w-full text-left py-3 px-4 rounded-lg transition ${activeTab === "vision" ? "bg-white text-blue-500" : "hover:bg-blue-600"}`}
                            >
                                Tầm Nhìn
                            </button>
                            <button 
                                onClick={() => setActiveTab("mission")}
                                className={`w-full text-left py-3 px-4 rounded-lg transition ${activeTab === "mission" ? "bg-white text-blue-500" : "hover:bg-blue-600"}`}
                            >
                                Sứ Mệnh
                            </button>
                            <button 
                                onClick={() => setActiveTab("values")}
                                className={`w-full text-left py-3 px-4 rounded-lg transition ${activeTab === "values" ? "bg-white text-blue-500" : "hover:bg-blue-600"}`}
                            >
                                Giá Trị Cốt Lõi
                            </button>
                        </div>
                    </div>
                    <div className="md:col-span-2 p-8">
                        {activeTab === "vision" && (
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Tầm Nhìn</h3>
                                <p className="text-gray-600 mb-4">
                                Trở thành công ty du lịch hàng đầu Việt Nam, được biết đến với dịch vụ chất lượng vượt trội và những trải nghiệm du lịch độc đáo, góp phần quảng bá vẻ đẹp của đất nước và con người Việt Nam đến bạn bè quốc tế.
                                </p>
                                <p className="text-gray-600 mb-4">
                                Chúng tôi hướng tới việc ứng dụng công nghệ hiện đại vào ngành du lịch, tạo ra nền tảng đặt tour trực tuyến tiện lợi nhất cho người dùng, đồng thời duy trì chất lượng dịch vụ con người không thể thay thế.
                                </p>
                                <p className="text-gray-600">
                                Đến năm 2030, chúng tôi đặt mục tiêu mở rộng mạng lưới đến 50 quốc gia, phục vụ hơn 1 triệu khách hàng mỗi năm và trở thành thương hiệu du lịch uy tín trong khu vực Đông Nam Á.
                                </p>
                            </div>
                        )}
                        {activeTab === "mission" && (
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Sứ Mệnh</h3>
                                <p className="text-gray-600 mb-4">
                                Mang đến cho khách hàng những trải nghiệm du lịch an toàn, chất lượng với giá cả hợp lý, đáp ứng mọi nhu cầu từ cá nhân đến đoàn thể.
                                </p>
                                <p className="text-gray-600 mb-4">
                                Xây dựng môi trường làm việc chuyên nghiệp, nơi mỗi nhân viên đều có cơ hội phát triển và sáng tạo, cùng nhau góp phần vào sự phát triển bền vững của công ty.
                                </p>
                                <p className="text-gray-600 mb-4">
                                Hợp tác với các đối tác trong và ngoài nước để tạo ra những sản phẩm du lịch đa dạng, đồng thời hỗ trợ phát triển kinh tế địa phương tại các điểm du lịch.
                                </p>
                                <p className="text-gray-600">
                                Quảng bá vẻ đẹp của Việt Nam đến với du khách trong nước và quốc tế, góp phần xây dựng hình ảnh đất nước thân thiện, hiếu khách và giàu bản sắc văn hóa.
                                </p>
                            </div>
                        )}
                        {activeTab === "values" && (
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Giá Trị Cốt Lõi</h3>
                                <div className="space-y-4">
                                <div className="flex items-start">
                                    <AiOutlineCheck className="text-green-500 text-xl mt-1 mr-3" />
                                    <div>
                                    <h4 className="font-semibold">Khách hàng là trọng tâm</h4>
                                    <p className="text-gray-600">Mọi quyết định đều dựa trên lợi ích và trải nghiệm của khách hàng.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <AiOutlineCheck className="text-green-500 text-xl mt-1 mr-3" />
                                    <div>
                                    <h4 className="font-semibold">Chất lượng không thỏa hiệp</h4>
                                    <p className="text-gray-600">Cam kết duy trì tiêu chuẩn chất lượng cao nhất trong mọi dịch vụ.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <AiOutlineCheck className="text-green-500 text-xl mt-1 mr-3" />
                                    <div>
                                    <h4 className="font-semibold">Sáng tạo và đổi mới</h4>
                                    <p className="text-gray-600">Không ngừng tìm kiếm những ý tưởng mới để cải thiện dịch vụ và trải nghiệm.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <AiOutlineCheck className="text-green-500 text-xl mt-1 mr-3" />
                                    <div>
                                    <h4 className="font-semibold">Trách nhiệm xã hội</h4>
                                    <p className="text-gray-600">Hoạt động có trách nhiệm với môi trường và cộng đồng địa phương.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <AiOutlineCheck className="text-green-500 text-xl mt-1 mr-3" />
                                    <div>
                                    <h4 className="font-semibold">Đạo đức kinh doanh</h4>
                                    <p className="text-gray-600">Minh bạch, trung thực và công bằng trong mọi giao dịch.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow">
                        <div className="text-4xl text-blue-500 mb-4">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Mission