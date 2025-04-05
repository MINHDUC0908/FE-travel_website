import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosClient from "../../../../api/axiosClient";
import { api, src } from "../../../../../Api";
import axios from "axios";

function Rating({ tour })
{
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);
    const [ratings, setRatings] = useState([]);
    const handleEvaluate = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.append("rating", rating);
            formData.append("comment", comment);
            if (file) {
                formData.append("image", file); // Truyền ảnh duy nhất
            }
            formData.append("tour_id", tour.id); // 👈 trùng với key bên backend
            const res = await axiosClient.post(api + "/rating/store", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            if (res.data.success)
            {
                toast.success("Đánh giá của bạn đã được gửi thành công!");
                setRatings((prev) => [...prev, res.data.data]);
                setComment("");
                setRating(0);
                setSelectedImage(null);
                setFile(null);
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    } 
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setFile(file)
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // Kiểm tra kích thước 5MB
                toast.error("Ảnh vượt quá 5MB, vui lòng chọn ảnh khác!");
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl); // Lưu URL để preview
            setFile(file); // Lưu file để gửi lên server
        }
    }

    useEffect(() => {
        const fetchRating = async () => {
            try {
                const res = await axios.post(api + "/rating", { tour_id: tour.id });
                if (res.data.success) {
                    setRatings(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching ratings:", error);
                toast.error("Có lỗi xảy ra khi tải đánh giá!");
            }
        }
        fetchRating();
    }, [tour.id])
    console.log(ratings);
    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, i) => (
            <FaStar 
                key={i} 
                className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} 
            />
        ));
    };
    return (
        <>
            <div className="mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-100">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Đánh giá trải nghiệm của bạn
                    </h3>
                
                    <form className="space-y-8">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Bạn đánh giá tour này như thế nào?</label>
                            <div className="flex  items-center mb-2 gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`w-8 h-8 cursor-pointer transition-all duration-200 ${
                                            (hover || rating) >= star ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        onClick={() => setRating(star)}
                                    />
                                ))}
                            </div>
                            <p className="text-sm font-medium">
                                {rating === 1 && <span className="text-red-600">Không hài lòng</span>}
                                {rating === 2 && <span className="text-orange-600">Tạm được</span>}
                                {rating === 3 && <span className="text-yellow-600">Bình thường</span>}
                                {rating === 4 && <span className="text-green-600">Hài lòng</span>}
                                {rating === 5 && <span className="text-blue-600">Tuyệt vời</span>}
                            </p>
                        </div>
                        
                        <div>
                            <label htmlFor="review-comment" className="block text-sm font-semibold text-gray-700 mb-3">
                                Chia sẻ trải nghiệm của bạn
                            </label>
                            <textarea
                                id="review-comment"
                                name="comment"
                                rows="5"
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Hãy chia sẻ những trải nghiệm tuyệt vời của bạn với tour này..."
                            ></textarea>
                        </div>
                        
                        {/* Phần upload ảnh */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Thêm hình ảnh kỷ niệm
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-blue-500 transition-colors"
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.add('border-blue-500'); // Thay đổi viền khi kéo vào
                                    }}
                                    onDragLeave={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('border-blue-500'); // Trả lại viền khi rời
                                    }}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        e.currentTarget.classList.remove('border-blue-500');
                                        handleDragOver(e)
                                    }}
                                >
                                    <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                    <label className="cursor-pointer text-center">
                                        <span className="text-blue-600 font-medium mb-1 block">Tải ảnh lên</span>
                                        <span className="text-gray-500 text-sm">hoặc kéo và thả ảnh vào đây</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            multiple
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>

                                <div className="border border-gray-200 rounded-xl p-4">
                                    <h4 className="font-medium text-gray-700 mb-2">Hình ảnh đã chọn</h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {
                                            selectedImage ? (
                                                <img
                                                    src={selectedImage}
                                                    alt="Selected"
                                                    className="w-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <p className="text-gray-500 text-sm">Chưa có ảnh nào được chọn</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">Định dạng hỗ trợ: JPG, PNG, GIF (tối đa 5MB/ảnh)</p>
                        </div>

                        
                        <div className="text-right mt-6">
                            <button
                                onClick={handleEvaluate}
                                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                Gửi đánh giá
                            </button>
                        </div>
                    </form>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Đánh giá từ khách hàng
                </h2>

                {/* Ratings list section */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                    {ratings && ratings.length > 0 ? (
                        <div>
                            {/* Average Rating Header */}
                            <div className="bg-blue-50 p-6 border-b border-gray-100">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold text-gray-800">Đánh giá trung bình</h3>
                                        <p className="text-gray-600 text-sm mt-1">{ratings.length} đánh giá từ khách hàng</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-4xl font-bold text-blue-600 mr-3">
                                            {(ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)}
                                        </span>
                                        <div className="flex">
                                            {renderStars(Math.round(ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Individual Reviews */}
                            <div className="divide-y divide-gray-100">
                                {ratings.map((item) => (
                                    <div key={item.id} className="p-6">
                                        <div className="flex items-start">
                                            <div className="mr-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                                    {item.User?.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-semibold text-gray-800">{item.User?.name}</h4>
                                                    <span className="text-sm text-gray-500">
                                                        {new Date(item.createdAt).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div className="flex mb-3">
                                                    {renderStars(item.rating)}
                                                </div>
                                                
                                                {item.comment && (
                                                    <p className="text-gray-700 mb-4">{item.comment}</p>
                                                )}
                                                
                                                {item.image && (
                                                    <div className="mt-3">
                                                        <img 
                                                            src={src + item.image} 
                                                            alt="Hình ảnh kỷ niệm" 
                                                            className="rounded-lg max-h-60 hover:opacity-90 transition-opacity cursor-pointer" 
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-10 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có đánh giá nào</h3>
                            <p className="text-gray-500">Hãy là người đầu tiên đánh giá tour này!</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Rating;