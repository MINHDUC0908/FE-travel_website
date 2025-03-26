import React from "react";
import { FaMoneyBillWave, FaPhoneAlt, FaChild, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

function PriceBanner({ tour }) {
  const adultPrice = parseFloat(tour.adult_price) || 3500000;
  const childPrice = parseFloat(tour.child_price) || 2500000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-6 mb-10 shadow-xl overflow-hidden relative"
    >
      {/* Background subtle decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Price Info */}
        <div className="text-white space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-lg font-semibold tracking-wide"
          >
            Giá tour
          </motion.div>
          
          {/* Price Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Adult Price */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg"
            >
              <FaUser className="text-yellow-300 text-xl" />
              <div>
                <span className="block text-sm font-medium">Người lớn</span>
                <span className="text-2xl font-bold text-yellow-300">
                  {adultPrice.toLocaleString()} VNĐ
                </span>
              </div>
            </motion.div>

            {/* Child Price */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center space-x-3 bg-white/10 p-3 rounded-lg"
            >
              <FaChild className="text-yellow-300 text-xl" />
              <div>
                <span className="block text-sm font-medium">Trẻ em</span>
                <span className="text-2xl font-bold text-yellow-300">
                  {childPrice.toLocaleString()} VNĐ
                </span>
              </div>
            </motion.div>
          </div>

          {/* Promotion Info */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex items-center text-sm md:text-base"
          >
            <FaMoneyBillWave className="text-yellow-300 mr-2" />
            <span className="text-yellow-300 font-medium">
              Đặt cọc chỉ 30% - Hỗ trợ trả góp 0%
            </span>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 md:mt-0 flex space-x-4">
          <motion.a
            href="tel:+84987654321"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="
              flex items-center bg-white/20 text-white font-medium 
              py-3 px-5 rounded-full transition-colors duration-300
              hover:shadow-md"
          >
            <FaPhoneAlt className="mr-2" />
            <span>Gọi tư vấn</span>
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fefcbf" }}
            whileTap={{ scale: 0.95 }}
            className="
              bg-white text-blue-700 font-bold py-3 px-8 
              rounded-full transition-colors duration-300 shadow-lg 
              hover:text-blue-800 flex items-center space-x-2"
          >
            <span>Đặt tour ngay</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default PriceBanner;