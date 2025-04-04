import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams, useSearchParams, Link } from 'react-router-dom';
import { FaTimes, FaHome, FaCreditCard, FaExclamationTriangle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useBookingTour } from '../../Context/BookingTour';
import { toast } from 'react-toastify';
import { useTourCus } from '../../Context/TourContext';

function PaymentFailure({setCurrentTitle}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [countdown, setCountdown] = useState(15);
    const [errorMessage, setErrorMessage] = useState('');
    const { tour, fetchShowTour } = useTourCus()
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const message = params.get('message');
        setErrorMessage(message || 'Thanh toán không thành công');

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [location.search, navigate]);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    useEffect(() => {
        if (!id)
        {
            toast.error("Lỗi khi xử lí dữ liệu")
        }
        fetchShowTour(id)
    }, [id])
    useEffect(() => {
        setCurrentTitle('Thanh toán thất bại')
    }, [setCurrentTitle])
    console.log(tour)
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-red-300 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center"
            >
                <motion.div
                    className="w-24 h-24 mx-auto bg-red-200 flex items-center justify-center rounded-full mb-6"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <FaTimes className="text-red-600 text-5xl" />
                </motion.div>

                <h2 className="text-2xl font-bold text-red-600">Thanh toán thất bại</h2>
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center">
                    <FaExclamationTriangle className="text-red-500 text-xl mr-3" />
                    <p className="text-red-700 font-medium">{errorMessage}</p>
                </div>

                <p className="mt-4 text-gray-600">
                    Giao dịch của bạn không thành công. Vui lòng kiểm tra thông tin thanh toán và thử lại.
                </p>

                <div className="mt-6 flex flex-col gap-4">
                    <Link to={`/booking/${tour?.tour_name}`} state={{ id: tour.id }}>
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md"
                        >
                            <FaCreditCard /> Thử thanh toán lại
                        </motion.div>
                    </Link>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md"
                        onClick={() => navigate('/')}
                    >
                        <FaHome /> Về trang chủ
                    </motion.button>
                </div>

                <p className="text-gray-500 mt-6 text-sm">
                    Bạn sẽ được chuyển hướng về trang chủ sau <span className="font-semibold text-gray-800">{countdown}</span> giây.
                </p>
            </motion.div>
        </div>
    );
}

export default PaymentFailure;