import hinh1 from "../../../../assets/BestTripsSection/hinh1.jpeg"
import hinh2 from "../../../../assets/BestTripsSection/hinh2.jpeg"
import hinh3 from "../../../../assets/BestTripsSection/hinh3.jpeg"
import travel from "../../../../assets/travel.png"
import trip from "../../../../assets/BestTripsSection/trip.png"

function BestTripsSection() {
    return (
        <>
            <div className="flex flex-col items-center p-4 lg:p-8 lg:flex-row relative overflow-hidden container mx-auto">
                <style>{`
                    @keyframes flyUpDown {
                        0% {
                            transform: translate(-50%, -50%) translateY(0);
                        }
                        50% {
                            transform: translate(-50%, -50%) translateY(-50px);
                        }
                        100% {
                            transform: translate(-50%, -50%) translateY(0);
                        }
                    }
                    @keyframes fadeInOut {
                        0% {
                            opacity: 1;
                            transform: scale(1); 
                        }
                        50% {
                            opacity: 0.3;
                            transform: scale(1.05); 
                        }
                        75% {
                            opacity: 0.5;
                            transform: scale(1.05);
                        }
                        100% {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                `}</style>
                <img
                    src={travel}
                    alt="Airplane Animation"
                    className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-30 z-0 animate-[flyUpDown_5s_ease-in-out_infinite]"
                />
                <div className="flex-1 max-w-full p-4 lg:max-w-[50%] lg:pr-8 relative z-10">
                    <p className="text-green-500 text-xl font-semibold mb-2">Giới Thiệu</p>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Chuyến Đi Tốt Nhất</h2>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                        Chúng tôi đảm bảo chất lượng dịch vụ tốt nhất, đội ngũ hướng dẫn viên chuyên nghiệp và sự tận tâm trong từng chi tiết. Chúng tôi sẽ là nguồn động lực tin cậy trong hành trình khám phá thế giới của bạn.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">Điểm đến độc đáo</div>
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">Trải nghiệm tuyệt vời</div>
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">Hoạt động thú vị</div>
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">Dịch vụ chất lượng</div>
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">Lịch trình linh hoạt</div>
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">Kỷ niệm đáng nhớ</div>
                        <div className="flex items-center text-gray-800 before:content-['•'] before:text-green-500 before:text-2xl before:mr-2">An toàn hàng đầu</div>
                    </div>
                    <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors">
                        Xem Thêm
                    </button>
                    <div className="absolute bottom-0 left-0 w-full h-[100px] bg-[url('/path/to/lines-decoration.png')] bg-no-repeat bg-bottom bg-contain opacity-30 z-[1]"></div>
                    <img src={trip} alt="Hot Air Balloon" className="absolute top-[-80px] left-[-30px] z-[1] animate-[fadeInOut_3s_ease-in-out_infinite]" />
                </div>
                <div className="image-content flex flex-col gap-4 flex-1 max-w-full lg:max-w-[50%] relative z-10">
                    <div className="relative">
                        <img
                            src={hinh1}
                            alt="Main Destination"
                            className="w-full h-[350px] object-cover rounded-xl border-4 border-yellow-400"
                        />
                        <img
                            src={hinh2}
                            alt="Traveler with Camera"
                            className="absolute bottom-[-180px] top-56 right-5 object-cover rounded-xl border-4 border-yellow-400 z-20"
                        />
                    </div>
                    <div className="small-images flex gap-4">
                        <img
                            src={hinh3}
                            alt="Beach Scene"
                            className="w-[400px] object-cover rounded-xl border-4 border-yellow-400"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default BestTripsSection;