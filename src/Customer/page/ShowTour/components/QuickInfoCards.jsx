import React from "react";
import { FaCalendarAlt, FaUsers, FaStar, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

function QuickInfoCards({ tour, numberOfDays, formatDate }) {
    const cardData = [
        {
            icon: <FaCalendarAlt className="text-xl" />,
            title: "Thời gian",
            value: `${numberOfDays} ngày ${numberOfDays - 1} đêm`,
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
        },
        {
            icon: <FaUsers className="text-xl" />,
            title: "Số người",
            value: tour.quantity || "2-15 người",
            bgColor: "bg-green-50",
            textColor: "text-green-600",
        },
        {
            icon: <FaStar className="text-xl" />,
            title: "Đánh giá",
            value: tour.rating ? `${tour.rating}/5` : "4.8/5",
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-600",
        },
        {
            icon: <FaClock className="text-xl" />,
            title: "Khởi hành",
            value: formatDate(tour.departure_date) || "Hàng ngày",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {cardData.map((card, index) => (
                <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
                whileHover={{ scale: 1.03, shadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                className={`
                    ${card.bgColor} p-6 rounded-2xl shadow-sm 
                    hover:shadow-lg transition-all duration-300 
                    flex flex-col justify-between h-full
                `}
                >
                {/* Header */}
                    <div className="flex items-center mb-3">
                        <span className={`${card.textColor} mr-3`}>{card.icon}</span>
                        <h3 className={`font-semibold text-lg ${card.textColor}`}>
                        {card.title}
                        </h3>
                    </div>

                    <p className="text-lg font-medium text-gray-800 leading-tight">
                        {card.value}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}

export default QuickInfoCards;