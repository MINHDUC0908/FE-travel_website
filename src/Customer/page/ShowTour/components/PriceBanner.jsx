import React from "react";
import { FaMoneyBillWave, FaPhoneAlt, FaChild, FaUser, FaTicketAlt } from "react-icons/fa";
import { motion } from "framer-motion";

function PriceBanner({ tour }) {
    const adultPrice = parseFloat(tour.adult_price) || 3500000;
    const childPrice = parseFloat(tour.child_price) || 2500000;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative bg-white rounded-xl p-5 sm:p-6 mb-10 shadow-lg overflow-hidden border border-gray-200"
        >
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="text-gray-700 w-full lg:w-2/3 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-xl sm:text-2xl font-medium tracking-wide flex items-center text-gray-600"
                    >
                        <FaTicketAlt className="mr-2 text-pink-400" />
                        Giá Tour Chi Tiết
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-300 hover:shadow-md transition-transform transform hover:scale-105"
                        >
                            <div className="flex items-center gap-3">
                                <FaUser className="text-pink-400 text-2xl" />
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 tracking-wide">Người lớn</span>
                                    <span className="text-lg font-semibold text-pink-500">
                                        {adultPrice.toLocaleString()} VNĐ
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-300 hover:shadow-md transition-transform transform hover:scale-105"
                        >
                            <div className="flex items-center gap-3">
                                <FaChild className="text-purple-400 text-2xl" />
                                <div>
                                    <span className="block text-xs uppercase text-gray-500 tracking-wide">Trẻ em</span>
                                    <span className="text-lg font-semibold text-purple-500">
                                        {childPrice.toLocaleString()} VNĐ
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-center bg-green-50 p-3 rounded-lg border border-green-200"
                    >
                        <FaMoneyBillWave className="text-green-400 mr-2 text-lg" />
                        <span className="text-xs sm:text-sm font-medium text-green-600">
                            Chỉ cần đặt cọc 30% - Trả góp 0% lãi suất
                        </span>
                    </motion.div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <motion.a
                        href="tel:+84987654321"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center bg-blue-100 text-blue-700 py-2 px-5 rounded-full font-medium border border-blue-200 hover:bg-blue-200 transition w-full sm:w-auto"
                    >
                        <FaPhoneAlt className="mr-2" />
                        Gọi ngay
                    </motion.a>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-pink-400 text-white font-medium py-2 px-6 rounded-full hover:bg-pink-500 transition w-full sm:w-auto"
                    >
                        Đặt Tour Ngay
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default PriceBanner;
