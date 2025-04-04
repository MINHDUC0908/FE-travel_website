import axios from "axios";
import { useState } from "react";
import { api } from "../../../../../Api";


function Filter( { isMobileFilterOpen, setTours, id }) 
{
    const [filter, setFilters] = useState({
        priceMin: "",
        priceMax: "",
        area: [],
        duration: "",
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => (
            { 
                ...prev, [name]: value 
            }));
    };
    const handleTypeChange = (e, category) => {
        const { value, checked } = e.target;
        setFilters((prev) => {
            if (checked) {
                return { ...prev, [category]: [...prev[category], value] };
            } else {
                return { ...prev, [category]: prev[category].filter((type) => type !== value) };
            }
        });
    };
    console.log(id)
    const fetchTourByFilter = async () => {
        try {
            console.log(filter)
            const res = await axios.post(api + "/tourCategory/tours-by-category/filter", {
                priceMin: filter.priceMin ? Number(filter.priceMin) : undefined,
                priceMax: filter.priceMax ? Number(filter.priceMax) : undefined,
                area: filter.area.length > 0 ? filter.area : undefined,
                duration: filter.duration ? filter.duration : undefined,
                category_id: id
            })
            if (res.data.success) {
                setTours(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching tours:", error);
        }
    }
    return (
        <>
            <div className={`md:col-span-3 bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-fit sticky top-24 ${isMobileFilterOpen ? 'block' : 'hidden md:block'}`}>
                <h3 className="font-semibold text-lg text-gray-800 mb-4">Bộ lọc tìm kiếm</h3>
                <div className="space-y-5">
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Khoảng giá</h4>
                        <div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    name="priceMin"
                                    value={filter.priceMin}
                                    onChange={handleInputChange}
                                    placeholder="Từ"
                                    className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                                />
                                <span className="text-gray-500">-</span>
                                <input
                                    type="number"
                                    name="priceMax"
                                    value={filter.priceMax}
                                    onChange={handleInputChange}
                                    placeholder="Đến"
                                    className="w-1/2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Khu vực</h4>
                        <div className="space-y-2">
                            {['Miền Bắc', 'Miền Trung', 'Miền Nam'].map((area, index) => (
                                <div key={index} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={`area-${index}`} 
                                        className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400" 
                                        value={area} // ✅ Đặt giá trị thực tế
                                        onChange={(e) => handleTypeChange(e, "area")}
                                    />
                                    <label htmlFor={`area-${index}`} className="ml-2 text-sm text-gray-600">{area}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Thời gian</h4>
                        <div className="space-y-2">
                            <div>
                                <select
                                    name="duration"
                                    value={filter.duration}
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
                        </div>
                    </div>
                </div>
                <button onClick={fetchTourByFilter} className="w-full mt-6 bg-teal-500 hover:bg-teal-600 text-white py-2.5 rounded-lg font-medium transition-colors">
                    Áp dụng bộ lọc
                </button>
            </div>
        </>
    )
}

export default Filter;