import { FaUser, FaPhone, FaBirthdayCake, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useAuthCus } from "../../../Context/AuthContext";
import { api, formatDate, src } from "../../../../../Api";
import axiosClient from "../../../../api/axiosClient";

function Info({ setCurrentTitle }) {
    const { user, setUser } = useAuthCus();
    const [isEditing, setIsEditing] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(user?.image_url ? `${src}${user.image_url}` : "/default-avatar.png");
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: user?.name || "Khách Du Lịch",
        phone: user?.phone || "",
        birthDate: user?.birthDate || "",
        address: user?.address || "",
        avatar: null, // Lưu file ảnh mới nếu có
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result); // Hiển thị preview
                setFormData((prev) => ({ ...prev, avatar: file })); // Lưu file gốc để gửi lên server
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("phone", formData.phone);
        dataToSend.append("birthDate", formData.birthDate);
        dataToSend.append("address", formData.address);
        if (formData.avatar) dataToSend.append("avatar", formData.avatar);

        try {
            console.log("Dữ liệu gửi đi:", Object.fromEntries(dataToSend));
            const res = await axiosClient.post(`${api}/profile/update`, dataToSend, 
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            if (res.data.success) 
            {
                setUser(res.data.data)
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Lỗi khi cập nhật:", error);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user?.name || "Khách Du Lịch",
            phone: user?.phone || "",
            birthDate: user?.birthDate || "",
            address: user?.address || "",
            avatar: null,
        });
        setAvatarPreview(user?.image_url ? `${src}${user.image_url}` : "/default-avatar.png");
        setIsEditing(false);
    };
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn lên đầu trang khi component được render
        setCurrentTitle("Thông Tin Cá Nhân"); // Cập nhật tiêu đề trang
    }, [setCurrentTitle])
    return (
        <div className="space-y-8 p-6">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
                <FaUser className="text-blue-500" />
                <span>Thông Tin Cá Nhân</span>
            </h2>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative group w-40 h-40 rounded-full overflow-hidden border-4 border-blue-100 shadow-md">
                            <img
                                src={avatarPreview}
                                alt="Avatar"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {isEditing && (
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                >
                                    <FaCloudUploadAlt className="text-white text-3xl" />
                                </label>
                            )}
                            <input
                                id="avatar-upload"
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-center text-gray-800">{formData.name}</h3>
                    </div>

                    <div className="flex-1">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Họ và tên</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="Nhập họ và tên"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Số điện thoại</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaPhone className="text-blue-500" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="Nhập số điện thoại"
                                                pattern="[0-9]{10}"
                                                title="Số điện thoại phải có 10 chữ số"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Ngày sinh</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaBirthdayCake className="text-blue-500" />
                                            </div>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleInputChange}
                                                className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Địa chỉ</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaMapMarkerAlt className="text-blue-500" />
                                            </div>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                                placeholder="Nhập địa chỉ"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center space-x-4 pt-4">
                                    <button
                                        type="submit"
                                        className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <FaSave />
                                        <span>Lưu thông tin</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex items-center space-x-2 bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <FaTimes />
                                        <span>Hủy</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Họ và tên</label>
                                        <div className="flex items-center space-x-3">
                                            <FaUser className="text-blue-500" />
                                            <p className="text-lg font-medium text-gray-800">{formData.name}</p>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Số điện thoại</label>
                                        <div className="flex items-center space-x-3">
                                            <FaPhone className="text-blue-500" />
                                            <p className="text-lg font-medium text-gray-800">{formData.phone || "Chưa cập nhật"}</p>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Ngày sinh</label>
                                        <div className="flex items-center space-x-3">
                                            <FaBirthdayCake className="text-blue-500" />
                                            <p className="text-lg font-medium text-gray-800">{formData.birthDate || "Chưa cập nhật"}</p>
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-500 mb-1">Địa chỉ</label>
                                        <div className="flex items-center space-x-3">
                                            <FaMapMarkerAlt className="text-blue-500" />
                                            <p className="text-lg font-medium text-gray-800">{formData.address || "Chưa cập nhật"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
                                    >
                                        <FaEdit />
                                        <span>Chỉnh sửa thông tin</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thông tin bổ sung</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <label className="text-sm font-medium text-blue-700">Email</label>
                        <p className="text-lg text-gray-800 mt-2">{user?.email || "email@example.com"}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                        <label className="text-sm font-medium text-green-700">Ngày tham gia</label>
                        <p className="text-lg text-gray-800 mt-2">{formatDate(user?.createdAt)}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                        <label className="text-sm font-medium text-purple-700">Chuyến đi đã đặt</label>
                        <p className="text-lg text-gray-800 mt-2">{user?.bookings?.length || 0} chuyến</p>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center space-x-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <h4 className="font-medium text-yellow-700">Lưu ý quan trọng</h4>
                    </div>
                    <p className="text-gray-700">Vui lòng cập nhật thông tin cá nhân chính xác để nhận được các ưu đãi và dịch vụ tốt nhất từ chúng tôi.</p>
                </div>
            </div>
        </div>
    );
}

export default Info;