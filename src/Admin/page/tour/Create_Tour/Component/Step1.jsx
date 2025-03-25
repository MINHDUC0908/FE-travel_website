import { useState } from "react";
import { formatPrice } from "../../../../../../Api";

export const Step1 = ( { tourData, setTourData }) => {
    const handleChange = (e) => {
        setTourData({ ...tourData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Tên Tour</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="tour_name"
                            placeholder="VD: Khám phá Đà Lạt 3 ngày 2 đêm"
                            value={tourData.tour_name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Điểm Đến</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="destination"
                            placeholder="VD: Đà Lạt, Lâm Đồng"
                            value={tourData.destination}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Khu Vực</label>
                    <div className="relative">
                        <input
                            type="text"
                            name="area"
                            placeholder="VD: Miền Trung, Tây Nguyên"
                            value={tourData.area}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số Lượng Người Tối Đa</label>
                    <div className="relative">
                        <input
                            type="number"
                            name="quantity"
                            placeholder="VD: 20"
                            value={tourData.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Giá Người Lớn</label>
                    <div className="relative">
                        <input
                            type="number"
                            name="adult_price"
                            placeholder="VD: 2500000"
                            value={tourData.adult_price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                        {tourData.adult_price && (
                            <div className="text-sm text-gray-500 mt-1">
                                {formatPrice(tourData.adult_price)} VNĐ
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Giá Trẻ Em</label>
                    <div className="relative">
                        <input
                            type="number"
                            name="child_price"
                            placeholder="VD: 1200000"
                            value={tourData.child_price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                        {tourData.child_price && (
                            <div className="text-sm text-gray-500 mt-1">
                                {formatPrice(tourData.child_price)} VNĐ
                            </div>
                        )}
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Ngày Khởi Hành</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="departure_date"
                            value={tourData.departure_date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Ngày Kết Thúc</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="end_date"
                            value={tourData.end_date}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm pl-4"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Mô Tả Tour</label>
                <div className="relative">
                    <textarea
                        name="description"
                        placeholder="Nhập mô tả chi tiết về tour, bao gồm lịch trình, điểm tham quan, dịch vụ đi kèm..."
                        value={tourData.description}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none shadow-sm"
                    />
                    <div className="text-xs text-gray-500 mt-1 flex justify-between">
                        <span>{tourData.description.length} ký tự</span>
                        <span>{tourData.description.length < 30 ? "Tối thiểu 30 ký tự" : "👍 Đạt yêu cầu"}</span>
                    </div>
                </div>
            </div>
        </>
    )
}