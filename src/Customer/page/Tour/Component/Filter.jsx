import { useEffect, useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useTourCategoryCus } from "../../../Context/TourCategoryContext";
import axios from "axios";
import { api } from "../../../../../Api";
import { useTourCus } from "../../../Context/TourContext";

function Filter({ isMobileFilterOpen, setTours }) {
    const { tourcategories } = useTourCategoryCus();
    const { fetchTour } = useTourCus()
    // State để lưu trữ các giá trị bộ lọc
    const [filters, setFilters] = useState({
        search: "",
        destination: "",
        priceMin: "",
        priceMax: "",
        departureDate: "",
        duration: "",
        types: [],
    });

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi checkbox (loại tour)
    const handleTypeChange = (e) => {
        const { value, checked } = e.target;
        setFilters((prev) => {
            if (checked) {
                return { ...prev, types: [...prev.types, value] };
            } else {
                return { ...prev, types: prev.types.filter((type) => type !== value) };
            }
        });
    };

    // Gửi request lọc
    const applyFilter = async () => {
        try {
            console.log(filters)
            const response = await axios.post(`${api}/tour/filter`, {
                search: filters.search,
                destination: filters.destination,
                priceMin: filters.priceMin ? Number(filters.priceMin) : undefined,
                priceMax: filters.priceMax ? Number(filters.priceMax) : undefined,
                departureDate: filters.departureDate,
                duration: filters.duration,
                types: filters.types,
            });

           if (response.data.success)
           {
                setTours(response.data.data)
           }
           window.scrollTo(0, 0)
        } catch (error) {
            console.error("Lỗi khi gọi API lọc:", error);
        }
    };
    // Gọi applyFilter khi filters thay đổi
    // useEffect(() => {
    //     applyFilter();
    // }, [filters]);
    // Xóa bộ lọc
    const clearFilter = () => {
        setFilters({
            search: "",
            destination: "",
            priceMin: "",
            priceMax: "",
            departureDate: "",
            duration: "",
            types: [],
        });
        fetchTour()
    };

    return (
        <div className={`col-span-full md:col-span-3 sticky top-20 ${isMobileFilterOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-20 border border-gray-100">
                {/* Thanh tìm kiếm */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaSearch className="mr-2 text-teal-500" />
                        Tìm Kiếm Tour
                    </h3>
                    <div className="relative">
                        <input
                            type="text"
                            name="search"
                            value={filters.search}
                            onChange={handleInputChange}
                            placeholder="Nhập điểm đến hoặc tên tour..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                        />
                        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Thanh lọc */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaFilter className="mr-2 text-teal-500" />
                        Lọc Tour
                    </h3>
                    <div className="space-y-5">
                        {/* Lọc theo điểm đến */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Điểm đến</label>
                            <select
                                name="destination"
                                value={filters.destination}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 transition-all"
                            >
                                <option value="">Tất cả điểm đến</option>
                                <option value="Miền Trung">Miền Trung</option>
                                <option value="Miền Nam">Miền Nam</option>
                                <option value="Miền Bắc">Miền Bắc</option>
                            </select>
                        </div>

                        {/* Lọc theo giá */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Khoảng giá</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    name="priceMin"
                                    value={filters.priceMin}
                                    onChange={handleInputChange}
                                    placeholder="Từ"
                                    className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    type="text"
                                    name="priceMax"
                                    value={filters.priceMax}
                                    onChange={handleInputChange}
                                    placeholder="Đến"
                                    className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                                />
                            </div>
                        </div>

                        {/* Lọc theo ngày khởi hành */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Ngày khởi hành</label>
                            <input
                                type="date"
                                name="departureDate"
                                value={filters.departureDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                            />
                        </div>

                        {/* Lọc theo số ngày */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian tour</label>
                            <select
                                name="duration"
                                value={filters.duration}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                            >
                                <option value="">Tất cả</option>
                                <option value="1-3">1-3 ngày</option>
                                <option value="4-7">4-7 ngày</option>
                                <option value="7-14">7-14 ngày</option>
                                <option value="14+">Trên 14 ngày</option>
                            </select>
                        </div>

                        {/* Loại tour */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Loại tour</label>
                            <div className="space-y-2">
                                {tourcategories && tourcategories.length > 0 && (
                                    tourcategories.map((item) => (
                                        <div key={item.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`type-${item.id}`}
                                                value={item.category_name}
                                                checked={filters.types.includes(item.category_name)}
                                                onChange={handleTypeChange}
                                                className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                                            />
                                            <label htmlFor={`type-${item.id}`} className="ml-2 text-sm text-gray-700">
                                                {item.category_name}
                                            </label>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Nút áp dụng */}
                        <div className="pt-2">
                            <button
                                onClick={applyFilter}
                                className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white px-4 py-3 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300"
                            >
                                Áp dụng bộ lọc
                            </button>
                            <button
                                onClick={clearFilter}
                                className="w-full text-gray-500 px-4 py-2 text-sm font-medium mt-2 hover:text-teal-600 transition-colors"
                            >
                                Xóa tất cả bộ lọc
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;