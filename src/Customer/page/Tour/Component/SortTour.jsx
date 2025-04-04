import { useState, useEffect } from "react";

function SortTour({ tours, setTours }) {
    const [sortBy, setSortBy] = useState("default");
    
    useEffect(() => {
        let sortedData = [...tours]; // Tạo một bản sao của dữ liệu tours
        switch (sortBy) {
            case "price-asc":
                sortedData.sort((a, b) => a.adult_price - b.adult_price);
                break;
            case "price-desc":
                sortedData.sort((a, b) => b.adult_price - a.adult_price);
                break;
            case "date-asc":
                sortedData.sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));
                break;
            case "popular":
                sortedData.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
            case "default":
                sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break
            default:
                break;
        }
    
        if (JSON.stringify(sortedData) !== JSON.stringify(tours)) {
            setTours(sortedData);
        }
    }, [sortBy, tours]);

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
                Tìm thấy <span className="font-semibold text-teal-600">{tours?.length || 0}</span> tour
            </div>
            <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sắp xếp:</span>
                <select
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50"
                    value={sortBy}
                    onChange={handleSortChange}
                >
                    <option value="default">Mặc định</option>
                    <option value="popular">Phổ biến</option>
                    <option value="price-asc">Giá tăng dần</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="date-asc">Ngày gần nhất</option>
                </select>
            </div>
        </div>
    );
}

export default SortTour;