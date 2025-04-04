import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 text-center transform transition-all duration-300">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <FaExclamationTriangle className="w-20 h-20 text-yellow-500 animate-pulse" />
                </div>

                {/* Tiêu đề */}
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">404 - Không Tìm Thấy Trang</h1>

                {/* Thông báo */}
                <p className="text-lg text-gray-600 mb-8">
                    Oops! Có vẻ như bạn đã lạc đường. Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
                </p>

                {/* Nút quay lại */}
                <Link
                    to="/"
                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                    Quay Về Trang Chủ
                </Link>
            </div>
        </div>
    );
}

export default NotFound;