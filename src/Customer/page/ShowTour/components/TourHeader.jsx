import React, { useEffect } from "react";
import {
    FaMapMarkerAlt,
    FaStar,
    FaHeart,
    FaRegHeart,
    FaShareAlt,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { src } from "../../../../../Api";
import { Link } from "react-router-dom";

const StarRating = ({ rating = 4.9, showCount = true }) => {
    return (
        <div className="flex items-center">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`${
                            star <= Math.round(rating) ? "text-amber-200" : "text-gray-500"
                        } text-xs sm:text-sm`}
                    />
                ))}
            </div>
            {showCount && (
                <span className="ml-2 text-gray-300 text-xs sm:text-sm">({rating})</span>
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
                    text: `Experience the elegance of ${tour.tour_name}`,
                    url: window.location.href,
                })
                .catch(console.error);
        } else {
            navigator.clipboard
                .writeText(window.location.href)
                .then(() => alert("Link copied to clipboard"));
        }
    };

    const handlePrevImage = () => {
        setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index) => {
        setActiveImage(index);
    };
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 8000);

        return () => clearInterval(interval); 
    }, [images.length]);
    return (
        <div className="relative text-center h-screen overflow-hidden font-sans">
            <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {images && images.length > 0 && (
                        <motion.div
                            key={activeImage}
                            className="relative w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            <motion.img
                                src={
                                    images[activeImage]
                                        ? src + images[activeImage].image_url
                                        : "/api/placeholder/1600/900"
                                }
                                alt={tour.tour_name}
                                className="absolute inset-0 w-full h-full object-cover blur-sm brightness-95"
                                initial={{ scale: 1.2 }}
                                animate={{ scale: 1.15 }}
                                transition={{ duration: 4, ease: "easeOut" }}
                            />
                            <motion.img
                                src={
                                    images[activeImage]
                                    ? src + images[activeImage].image_url
                                    : "/api/placeholder/1600/900"
                                }
                                alt={tour.tour_name}
                                className="relative w-[90%] sm:w-[85%] md:w-[80%] h-auto rounded-lg shadow-2xl border border-amber-200/20 z-10"
                                style={{
                                    maxWidth: "55%",
                                    height: "auto",
                                    imageRendering: "auto", // Hoặc thử 'crisp-edges' nếu ảnh là PNG
                                    filter: "none", // Xóa hiệu ứng làm mờ không cần thiết
                                }}
                                initial={{ y: 30, scale: 1 }} // Giữ nguyên scale = 1 để tránh co kéo
                                animate={{ y: 0, scale: 1 }} 
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            />

                            <motion.div
                                className="absolute bottom-[-15%] sm:bottom-[-10%] w-[90%] sm:w-[85%] md:w-[80%] h-[12%] bg-gradient-to-t from-black/30 to-transparent rounded-b-lg overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.6 }}
                                transition={{ duration: 1.5, delay: 0.3 }}
                            >
                                <img
                                    src={
                                        images[activeImage]
                                            ? src + images[activeImage].image_url
                                            : "/api/placeholder/1600/900"
                                    }
                                    alt="Reflection"
                                    className="w-full h-full object-cover scale-y-[-1] opacity-25"
                                />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {images && images.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="absolute bottom-16 sm:bottom-20 left-1/3 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 w-full max-w-[90%] sm:max-w-[70%] md:max-w-[60%] overflow-x-auto px-2 sm:px-0"
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 rounded-md overflow-hidden cursor-pointer border-2 ${
                                index === activeImage
                                    ? "border-amber-200"
                                    : "border-gray-500/50"
                            } hover:border-amber-200/70 transition-all`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <img
                                src={src + image.image_url}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
            <motion.div
                initial={{ opacity: 0, x: 150 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11/12 sm:w-80 md:w-80 max-w-xl bg-black/85 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-xl border border-amber-200/10 z-20 flex flex-col items-center text-center md:max-h-[70vh]"
            >
                <h1 className="text-xl sm:text-2xl font-light text-white tracking-widest mb-3 sm:mb-4">
                    {tour.tour_name}
                </h1>
                <div className="flex items-center mb-3 sm:mb-4">
                    <FaMapMarkerAlt className="text-amber-200 mr-2 text-sm sm:text-base" />
                    <span className="text-gray-200 text-xs sm:text-sm">
                        {tour.destination || "Timeless Destination"}
                    </span>
                </div>
                <div className="mb-4 sm:mb-6">
                    <StarRating rating={tour.rating} />
                </div>
                <div className="flex flex-col space-y-3 sm:space-y-4 w-full">
                    <div className="flex justify-center space-x-3 sm:space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsFavorite(!isFavorite)}
                            className={`p-2 rounded-full ${
                                isFavorite
                                    ? "bg-amber-200 text-black"
                                    : "bg-white/10 text-amber-200 hover:bg-white/20"
                            } transition-colors`}
                        >
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShare}
                            className="p-2 rounded-full bg-white/10 text-amber-200 hover:bg-white/20 transition-colors"
                        >
                            <FaShareAlt />
                        </motion.button>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onBookTour}
                        className="bg-gradient-to-r from-amber-200 to-amber-300 text-black py-2 px-4 sm:px-6 rounded-full font-medium hover:from-amber-300 hover:to-amber-400 transition-all shadow-md w-full"
                    >
                        <Link to={`/booking/${tour.tour_name}`} state={{ id: tour.id }}>
                            Book Now
                        </Link>
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default TourHeader;