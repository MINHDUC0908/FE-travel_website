import { useEffect, useState } from "react";
import { api, formatPrice } from "../../../../../../Api";
import axiosClient from "../../../../../api/axiosClient";

export const Step1 = ({ tourData, setTourData }) => {
    const handleChange = (e) => {
        setTourData({ ...tourData, [e.target.name]: e.target.value });
    };

    const [tourCategories, setTourCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchTourCategory = async () => {
            try {
                const res = await axiosClient.get(api + '/admin/tourcategories')
                if (res.data.success) {
                    setTourCategories(res.data.data)
                }
            } catch (error) {
                console.error("Failed to fetch tour categories:", error)
            }
        }
        fetchTourCategory()
    }, [])

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Thông Tin Tour Mới
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tour Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Tên Tour <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="tour_name"
                        placeholder="VD: Khám phá Đà Lạt 3 ngày 2 đêm"
                        value={tourData.tour_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            transition duration-300 ease-in-out 
                            hover:border-blue-300"
                        required
                    />
                </div>

                {/* Destination */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Điểm Đến <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="destination"
                        placeholder="VD: Đà Lạt, Lâm Đồng"
                        value={tourData.destination}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            transition duration-300 ease-in-out 
                            hover:border-blue-300"
                        required
                    />
                </div>

                {/* Area */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Khu Vực <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="area"
                        value={tourData.area}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            transition duration-300 ease-in-out 
                            hover:border-blue-300"
                        required
                    >
                        <option value="Miền Bắc">Miền Bắc</option>
                        <option value="Miền Trung">Miền Trung</option>
                        <option value="Miền Nam">Miền Nam</option>
                    </select>
                </div>


                {/* Max Quantity */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Số Lượng Người Tối Đa
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        placeholder="VD: 20"
                        value={tourData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            transition duration-300 ease-in-out 
                            hover:border-blue-300"
                    />
                </div>

                {/* Adult Price */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Giá Người Lớn <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            name="adult_price"
                            placeholder="VD: 2,500,000"
                            value={tourData.adult_price}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                transition duration-300 ease-in-out 
                                hover:border-blue-300"
                            required
                        />
                        {tourData.adult_price && (
                            <div className="text-sm text-green-600 mt-1 font-medium">
                                {formatPrice(tourData.adult_price)} VNĐ
                            </div>
                        )}
                    </div>
                </div>

                {/* Child Price */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Giá Trẻ Em
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            name="child_price"
                            placeholder="VD: 1,200,000"
                            value={tourData.child_price}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                transition duration-300 ease-in-out 
                                hover:border-blue-300"
                        />
                        {tourData.child_price && (
                            <div className="text-sm text-green-600 mt-1 font-medium">
                                {formatPrice(tourData.child_price)} VNĐ
                            </div>
                        )}
                    </div>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Ngày Khởi Hành <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="departure_date"
                        value={tourData.departure_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            text-gray-700
                            transition duration-300 ease-in-out"
                        required
                    />
                </div>

                {/* End Date */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Ngày Kết Thúc <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="end_date"
                        value={tourData.end_date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            text-gray-700
                            transition duration-300 ease-in-out"
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div className="mt-6 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Mô Tả Tour <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <textarea
                        name="description"
                        placeholder="Nhập mô tả chi tiết về tour, bao gồm lịch trình, điểm tham quan, dịch vụ đi kèm..."
                        value={tourData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 
                            h-40 resize-none
                            transition duration-300 ease-in-out 
                            hover:border-blue-300"
                        required
                    />
                    <div className={`text-xs flex justify-between mt-2 
                        ${tourData.description.length < 30 ? 'text-red-500' : 'text-green-600'}`}>
                        <span>{tourData.description.length} ký tự</span>
                        <span>
                            {tourData.description.length < 30 
                                ? "Tối thiểu 30 ký tự" 
                                : "✅ Đạt yêu cầu"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tour Category */}
            <div className="mt-6 space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Danh Mục Tour <span className="text-red-500">*</span>
                </label>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 
                        text-gray-700
                        transition duration-300 ease-in-out"
                    required
                >
                    {tourCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.category_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}