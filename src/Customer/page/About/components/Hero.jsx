import { AiOutlineArrowRight } from "react-icons/ai"


function Hero()
{
    return (
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-2xl p-10 text-white text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
                <p className="text-xl max-w-3xl mx-auto">
                    Chúng tôi là đơn vị hàng đầu về cung cấp dịch vụ du lịch, mang đến cho bạn những trải nghiệm du lịch tuyệt vời với giá cả hợp lý nhất.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <button className="bg-white text-blue-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 flex items-center">
                        <span>Khám Phá Tour</span>
                        <AiOutlineArrowRight className="ml-2" />
                    </button>
                    <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-500 transition duration-300">
                        Liên Hệ Ngay
                    </button>
                </div>
        </div>
    )
}

export default Hero