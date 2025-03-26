import React from "react";
import {
    FaMapMarkerAlt,
    FaStar,
    FaHeart,
    FaRegHeart,
    FaBookmark,
    FaShareAlt,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { src } from "../../../../../Api";


const StarRating = ({ rating = 4.9, showCount = true }) => {
    return (
        <div className="flex items-center">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`${
                        star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"
                        } transition-colors duration-300`}
                    />
                ))}
            </div>
            {showCount && (
                <span className="ml-2 text-white text-opacity-80">({rating}/5)</span>
            )}
        </div>
    );
};

const TourHeader = ({
    tour,
    isFavorite,
    setIsFavorite,
    onBookTour,
    images,
    activeImage,
    setActiveImage,
}) => {
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                title: tour.tour_name,
                text: `Khám phá tour ${tour.tour_name}`,
                url: window.location.href,
                })
                .catch(console.error);
        } else {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => alert("Đã sao chép đường link"));
        }
    };

    const handlePrevImage = () => {
        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative h-[800px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={images && images[activeImage] ? src + images[activeImage].image_url : "placeholder"}
                    src={
                        images && images[activeImage]
                        ? src + images[activeImage].image_url
                        : "/api/placeholder/1200/600"
                    }
                    alt={tour.tour_name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                />
            </AnimatePresence>

            {images && images.length > 1 && (
                <>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                        aria-label="Ảnh trước"
                    >
                        <FaChevronLeft />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
                        aria-label="Ảnh sau"
                    >
                        <FaChevronRight />
                    </motion.button>
                </>
            )}

            {/* Overlay with Tour Info */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-20 pb-10 px-8 z-20"
            >
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between space-y-6 lg:space-y-0">
                        {/* Tour Information */}
                        <div className="w-full lg:w-2/3">
                            <motion.h1
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
                            >
                                {tour.tour_name}
                            </motion.h1>

                            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                                {/* Location */}
                                <div className="flex items-center">
                                    <FaMapMarkerAlt className="text-red-400 mr-2 text-xl" />
                                    <p className="text-white text-lg">
                                        {tour.location || "Địa điểm tuyệt vời"}
                                    </p>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center space-x-2">
                                    <StarRating rating={tour.rating} />
                                    {tour.rating_count && (
                                        <span className="text-gray-300 text-sm ml-2">
                                        ({tour.rating_count} đánh giá)
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-4">
                        {/* Favorite Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`
                                p-3 rounded-full transition-all duration-300
                                ${isFavorite ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}
                                `}
                                aria-label={isFavorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
                            >
                                {isFavorite ? <FaHeart /> : <FaRegHeart />}
                            </motion.button>

                            {/* Share Button */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleShare}
                                className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
                                aria-label="Chia sẻ tour"
                            >
                                <FaShareAlt />
                            </motion.button>

                            {/* Book Tour Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onBookTour}
                                className="
                                bg-gradient-to-r from-blue-600 to-blue-500 
                                text-white font-bold py-3 px-8 
                                rounded-full hover:from-blue-700 hover:to-blue-600 
                                transition-all shadow-lg 
                                flex items-center space-x-2
                                "
                            >
                                <FaBookmark className="mr-2" />
                                <span>Đặt tour ngay</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TourHeader;