import React from "react";
import { motion } from "framer-motion";

const CardSection = () => {
    const cards = [
        {
            icon: "✨",
            title: "Hoạt động đặc biệt",
            description:
                "Chúng tôi mang đến những trải nghiệm độc đáo trong mỗi chuyến đi. Khám phá văn hóa mới và tận hưởng hành trình đầy cảm hứng.",
        },
        {
            icon: "🗺️",
            title: "Hướng dẫn tận tâm",
            description:
                "Đội ngũ hướng dẫn viên tận tâm luôn đồng hành, chia sẻ kiến thức và đảm bảo bạn có hành trình tuyệt vời nhất.",
        },
        {
            icon: "🌍",
            title: "Lịch trình linh hoạt",
            description:
                "Lịch trình được thiết kế linh hoạt, phù hợp với sở thích và nhu cầu riêng, để hành trình thêm phần thoải mái.",
        },
        {
            icon: "📍",
            title: "Điểm đến đa dạng",
            description:
                "Khám phá những điểm đến đa dạng, từ thiên nhiên hùng vĩ đến các thành phố sôi động, tất cả đều chờ bạn trải nghiệm.",
        },
    ];

    // Animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen flex flex-wrap justify-center items-center gap-8 p-8 bg-gradient-to-b from-gray-50 to-white">
            {cards.map((card, index) => (
                <motion.div
                    key={index}
                    className="relative w-80 h-[400px] bg-white text-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-between text-center transform transition-all duration-500 hover:shadow-xl hover:scale-105 border border-gray-100 overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    transition={{ delay: index * 0.1 }}
                >
                    {/* Subtle Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-teal-50/30 to-blue-50/30 opacity-20 rounded-2xl"></div>
                    <div className="absolute top-4 left-4 w-3 h-3 bg-teal-200 rounded-full shadow-md animate-pulse"></div>
                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-200 rounded-full shadow-md animate-pulse delay-150"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-200 to-blue-200 opacity-50"></div>

                    {/* Card Content */}
                    <div className="flex flex-col items-center">
                        <div className="text-5xl mb-6 text-teal-500 animate-bounce">{card.icon}</div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-800 tracking-wide">
                            {card.title}
                        </h3>
                        <div className="w-12 h-1 bg-gradient-to-r from-teal-300 to-blue-300 rounded-full mb-4"></div>
                        <p className="text-sm text-gray-600 leading-relaxed px-2">{card.description}</p>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-100/20 to-blue-100/20 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </motion.div>
            ))}
        </div>
    );
};

export default CardSection;