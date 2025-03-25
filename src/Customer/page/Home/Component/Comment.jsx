import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Comment()
{
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true); // Khi component mount, hiển thị animation
    }, []);
    return (
        <div>
            <motion.div 
                className="mt-20 bg-teal-50 p-8 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                <h3 className="text-2xl font-bold text-teal-800 mb-6 text-center">💬 Khách Hàng Nói Gì Về Chúng Tôi</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            name: "Nguyễn Văn A",
                            avatar: "https://via.placeholder.com/100x100",
                            rating: 5,
                            comment: "Chuyến đi tuyệt vời nhất mà tôi từng trải nghiệm. Hướng dẫn viên rất thân thiện và chuyên nghiệp."
                        },
                        {
                            name: "Trần Thị B",
                            avatar: "https://via.placeholder.com/100x100",
                            rating: 5,
                            comment: "Tôi thích cách mà công ty sắp xếp lịch trình, đầy đủ nhưng không quá vội vàng. Sẽ quay lại lần sau!"
                        },
                        {
                            name: "Lê Văn C",
                            avatar: "https://via.placeholder.com/100x100",
                            rating: 4,
                            comment: "Dịch vụ rất tốt, giá cả phải chăng. Chỉ có điểm trừ nhỏ là thời gian nghỉ ngơi hơi ít."
                        }
                    ].map((testimonial, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                            <div className="flex items-center mb-4">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                                <div className="ml-3">
                                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className={`w-4 h-4 ${star <= testimonial.rating ? "text-yellow-400" : "text-gray-300"} fill-current`} viewBox="0 0 24 24">
                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">&ldquo;{testimonial.comment}&rdquo;</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default Comment