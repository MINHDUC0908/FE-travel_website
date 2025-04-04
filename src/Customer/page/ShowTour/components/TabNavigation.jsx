function TabNavigation({ selectedTab, setSelectedTab }) {
    const tabs = [
        { id: "overview", label: "Tổng quan" },
        { id: "itinerary", label: "Lịch trình" },
        { id: "included", label: "Dịch vụ bao gồm" },
        { id: "reviews", label: "Đánh giá" },
    ];
  
    return (
        <div className="border-b mb-8">
            <div className="flex overflow-x-auto space-x-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`py-4 px-1 font-medium text-lg relative ${
                            selectedTab === tab.id ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-800"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TabNavigation