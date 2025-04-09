import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { 
  FiUsers, 
  FiShoppingBag, 
  FiMessageSquare, 
  FiBarChart2,
  FiCreditCard,
  FiPackage,
  FiHome,
  FiTrendingUp
} from "react-icons/fi";

function Dashboard({ setCurrentTitle }) {
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    window.scroll(0, 0);
    setCurrentTitle("Trang chủ");
  }, [setCurrentTitle]);

  return (
    <div className="flex flex-col w-full bg-gray-50 min-h-screen p-4 md:p-6">
      {/* Welcome section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-indigo-800">Chào mừng {user?.name || "Admin"}!</h1>
        <p className="text-gray-600">Đây là tổng quan về hệ thống của bạn ngày hôm nay.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <div className="p-5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-indigo-100">Tổng người dùng</h3>
              <p className="text-xl font-bold text-white">1,234</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-green-100">Tổng sản phẩm</h3>
              <p className="text-xl font-bold text-white">567</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiCreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-amber-100">Doanh thu</h3>
              <p className="text-xl font-bold text-white">123.456.000đ</p>
            </div>
          </div>
        </div>
        <div className="p-5 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiMessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-red-100">Tin nhắn mới</h3>
              <p className="text-xl font-bold text-white">42</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Tổng quan hoạt động</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-md">Tuần</button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">Tháng</button>
              <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">Năm</button>
            </div>
          </div>
          <div className="flex items-center justify-center h-64">
            <div className="w-full h-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 border border-gray-100">
              <FiBarChart2 className="w-8 h-8 mr-2 text-indigo-300" />
              <span className="text-gray-500">Biểu đồ thống kê</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-indigo-700 font-medium">Người dùng mới</span>
                <FiTrendingUp className="text-green-500" />
              </div>
              <p className="text-xl font-bold text-indigo-800">+12.5%</p>
              <p className="text-xs text-indigo-700 mt-1">So với tuần trước</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-green-700 font-medium">Đơn hàng</span>
                <FiTrendingUp className="text-green-500" />
              </div>
              <p className="text-xl font-bold text-green-800">+18.2%</p>
              <p className="text-xs text-green-700 mt-1">So với tuần trước</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-700 font-medium">Doanh thu</span>
                <FiTrendingUp className="text-green-500" />
              </div>
              <p className="text-xl font-bold text-purple-800">+24.7%</p>
              <p className="text-xs text-purple-700 mt-1">So với tuần trước</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Hoạt động gần đây</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-indigo-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                NT
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Nguyễn Thành đã đăng nhập</p>
                <p className="text-xs text-gray-500">5 phút trước</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold">
                LH
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Lê Hương đã thêm sản phẩm mới</p>
                <p className="text-xs text-gray-500">30 phút trước</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                PT
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Phạm Tuấn đã cập nhật thông tin</p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-amber-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-semibold">
                TM
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">Trần Mai đã gửi tin nhắn mới</p>
                <p className="text-xs text-gray-500">4 giờ trước</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-600 text-sm font-medium rounded-lg hover:bg-indigo-100 transition-colors">
            Xem tất cả hoạt động
          </button>
        </div>
      </div>

      <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Danh sách người dùng mới nhất</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tham gia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">NT</div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Nguyễn Thành</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  nguyenthanh@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Người dùng
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  09/04/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Hoạt động
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-semibold">LH</div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Lê Hương</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  lehuong@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Quản lý
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  08/04/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Hoạt động
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-semibold">PT</div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Phạm Tuấn</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  phamtuan@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Người dùng
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  07/04/2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    Không hoạt động
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Sản phẩm nổi bật</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              Xem tất cả
            </button>
          </div>
          <ul className="space-y-4">
            <li className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FiPackage className="text-indigo-600 w-6 h-6" />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-800">iPhone 14 Pro Max</p>
                    <p className="text-sm font-bold text-green-600">28.500.000đ</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">Điện thoại</p>
                    <p className="text-xs font-medium text-indigo-600">Đã bán: 124</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiPackage className="text-green-600 w-6 h-6" />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-800">Macbook Pro M2</p>
                    <p className="text-sm font-bold text-green-600">32.900.000đ</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">Laptop</p>
                    <p className="text-xs font-medium text-indigo-600">Đã bán: 89</p>
                  </div>
                </div>
              </div>
            </li>
            <li className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiPackage className="text-purple-600 w-6 h-6" />
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-800">Apple Watch Series 8</p>
                    <p className="text-sm font-bold text-green-600">9.800.000đ</p>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-500">Đồng hồ</p>
                    <p className="text-xs font-medium text-indigo-600">Đã bán: 76</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Tin nhắn chưa đọc</h3>
            <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
              Xem tất cả
            </button>
          </div>
          <ul className="space-y-4">
            <li className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white text-sm font-semibold">
                  KL
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-800">Khách hàng Linh</p>
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">Mới</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Tôi muốn hỏi về sản phẩm...</p>
                  <p className="text-xs text-indigo-600 mt-1">10 phút trước</p>
                </div>
              </div>
            </li>
            <li className="p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white text-sm font-semibold">
                  HN
                </div>
                <div className="ml-3">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-800">Hoàng Nam</p>
                    <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full">Mới</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Khi nào có hàng trở lại?</p>
                  <p className="text-xs text-indigo-600 mt-1">35 phút trước</p>
                </div>
              </div>
            </li>
            <li className="p-3 bg-teal-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-semibold">
                  MT
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">Minh Tuấn</p>
                  <p className="text-xs text-gray-600 mt-1">Cảm ơn bạn đã hỗ trợ tôi...</p>
                  <p className="text-xs text-indigo-600 mt-1">1 giờ trước</p>
                </div>
              </div>
            </li>
          </ul>
          <button className="w-full mt-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
            Trả lời tin nhắn
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-6">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiHome className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium bg-white bg-opacity-30 px-2 py-1 rounded-md">Tháng 4</span>
          </div>
          <h4 className="text-lg font-semibold mb-1">Tổng truy cập</h4>
          <p className="text-3xl font-bold mb-2">24,827</p>
          <div className="flex items-center text-xs">
            <span className="flex items-center text-green-300">
              <FiTrendingUp className="mr-1" /> +12.5%
            </span>
            <span className="ml-2 text-indigo-100">So với tháng trước</span>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium bg-white bg-opacity-30 px-2 py-1 rounded-md">Tháng 4</span>
          </div>
          <h4 className="text-lg font-semibold mb-1">Đơn hàng</h4>
          <p className="text-3xl font-bold mb-2">1,253</p>
          <div className="flex items-center text-xs">
            <span className="flex items-center text-green-300">
              <FiTrendingUp className="mr-1" /> +18.3%
            </span>
            <span className="ml-2 text-green-100">So với tháng trước</span>
          </div>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-md text-white">
          <div className="flex justify-between items-center mb-3">
            <div className="p-3 bg-white bg-opacity-30 rounded-full">
              <FiUsers className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium bg-white bg-opacity-30 px-2 py-1 rounded-md">Tháng 4</span>
          </div>
          <h4 className="text-lg font-semibold mb-1">Khách hàng mới</h4>
          <p className="text-3xl font-bold mb-2">384</p>
          <div className="flex items-center text-xs">
            <span className="flex items-center text-green-300">
              <FiTrendingUp className="mr-1" /> +9.2%
            </span>
            <span className="ml-2 text-amber-100">So với tháng trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;