import { useEffect, useState } from "react";
import { api, src } from "../../../../../Api";
import axiosClient from "../../../../api/axiosClient";
import { toast } from "react-toastify";

function MyReview({ setCurrentTitle }) {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRatings = async () => {
        try {
            const res = await axiosClient.get(`${api}/profile/ratings`);
            if (res.data.success) {
                setRatings(res.data.data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={`text-xl ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        setCurrentTitle("Đánh giá của tôi");
    }, [setCurrentTitle]);
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Đánh giá của tôi</h1>
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : ratings.length === 0 ? (
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <p className="text-gray-600">Bạn chưa có đánh giá nào.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {ratings.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4 border-b">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">{item.Tour.tour_name}</h2>
                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                        {item.Tour.area}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">{item.Tour.destination}</p>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center mb-3">
                                    <div className="flex mr-2">{renderStars(item.rating)}</div>
                                    <span className="text-sm text-gray-500">
                                        Đã đánh giá vào {formatDate(item.createdAt)}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4">{item.comment}</p>
                                {item.image && (
                                    <div className="mt-3">
                                        <img 
                                        src={src + item.image} 
                                        alt="Hình ảnh đánh giá" 
                                        className="rounded-lg max-h-48 object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyReview;