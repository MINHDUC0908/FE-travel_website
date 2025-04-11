import { useEffect, useState } from "react";
import { api, src } from "../../../../../Api";
import axiosClient from "../../../../api/axiosClient";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaEye, FaHeart, FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaTrash} from "react-icons/fa";
import { Link } from "react-router-dom";

function Favorite({ setCurrentTitle }) {
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [show, setShow] = useState(false);
    
    const fetchFavorites = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get(api + "/favorite");
            if (res.data.success) {
                setFavorites(res.data.data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchFavorites();
    }, []);

    useEffect(() => {
        setCurrentTitle("Danh sách yêu thích");
    }, [setCurrentTitle]);


    const handleDelete = async (deleteId) => {
        try {
            const res = await axiosClient.delete(`${api}/favorite/delete/${deleteId}`);
            if (res.data.success) {
                toast.success(res.data.message);
                setFavorites((prev) => prev.filter((item) => item.id !== deleteId));
                setShow(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    }

    const ModalConfirmDelete = () => {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Xóa khỏi danh sách yêu thích</h3>
                        
                        <div className="mt-2">
                            <p className="text-sm text-gray-600">
                                Bạn có chắc chắn muốn xóa tour khỏi danh sách yêu thích?
                            </p>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center space-x-3">
                        <button
                            onClick={() => setShow(false)}
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={() => handleDelete(deleteId)}
                            type="button"
                            className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none shadow-sm"
                        >
                            Xóa khỏi yêu thích
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : favorites.length === 0 ? (
                <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
                    <div className="flex flex-col items-center justify-center">
                        <FaHeart className="text-red-400 text-5xl mb-3 " />
                        <p className="text-gray-600">Bạn chưa có tour yêu thích nào.</p>
                        <button 
                            onClick={() => window.location.href = "/destinations"}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                        >
                            Khám phá các tour du lịch
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2">
                            <FaHeart className="text-red-500 text-2xl" />
                            <h1 className="text-2xl font-bold">Danh sách yêu thích</h1>
                        </div>
                        <div className="flex items-center text-gray-600 pl-1">
                            <FaStar className="text-yellow-400 mr-2 text-sm" />
                            <p>Danh sách các tour bạn đã thêm vào yêu thích.</p>
                        </div>
                    </div>
                    {favorites.map((favorite) => (
                        <div
                            key={favorite.id}
                            className="bg-white rounded-lg p-4 border border-gray-200"
                        >
                            {/* Thông tin chính */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/5 flex-shrink-0">
                                    <img
                                        src={
                                            favorite.Tour?.Images && favorite.Tour.Images.length > 0
                                                ? `${src}${favorite.Tour.Images[0].image_url}`
                                                : "https://via.placeholder.com/150"
                                        }
                                        alt={favorite.Tour?.tour_name}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex-1 text-gray-700">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                                        {favorite.Tour?.tour_name || "Tour không xác định"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <FaCalendarAlt className="text-blue-500" />
                                            <span>
                                                {favorite.Tour?.departure_date
                                                    ? new Date(
                                                          favorite.Tour.departure_date
                                                      ).toLocaleDateString("vi-VN")
                                                    : "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <span>
                                                {favorite.Tour?.destination || "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaMoneyBillWave className="text-blue-500" />
                                            <span>
                                                {favorite.Tour?.adult_price
                                                    ? Number(favorite.Tour.adult_price).toLocaleString("vi-VN", {
                                                          style: "currency",
                                                          currency: "VND",
                                                      })
                                                    : "Chưa xác định"}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>{favorite.Tour?.area || "Khu vực chưa xác định"}</span>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {favorite.Tour?.description || "Không có mô tả"}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-3">
                                        <Link
                                            to={`/show/tour/${favorite.Tour?.tour_name}`}
                                            state={{ id: favorite.Tour?.id }}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition text-sm"
                                        >
                                            <FaEye className="text-white" />
                                            Xem chi tiết
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setDeleteId(favorite.id);
                                                setShow(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-red-500 text-red-500 rounded-lg shadow-md hover:bg-red-50 transition text-sm"
                                        >
                                            <FaTrash className="text-red-500" />
                                            Xóa yêu thích
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {
                show && <ModalConfirmDelete />
            }
        </>
    );
}

export default Favorite;