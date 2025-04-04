import React, { useEffect } from "react";


function Contact({ setCurrentTitle }) {
    useEffect(() => {
        setCurrentTitle("Liên hệ")
        window.scroll(0, 0)
    }, [setCurrentTitle]);
    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen mt-16">
            <div className="container mx-auto p-4 pt-16 pb-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-800">Liên Hệ Với Chúng Tôi</h1>
                    <p className="text-gray-600 mt-2">Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi</p>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Thông tin liên hệ */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-6">Thông Tin Liên Hệ</h2>
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Địa Chỉ</h3>
                                        <p className="text-gray-600 mt-1">123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Điện Thoại</h3>
                                        <p className="text-gray-600 mt-1">0123.456.789</p>
                                        <p className="text-gray-600">0987.654.321</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Email</h3>
                                        <p className="text-gray-600 mt-1">info@viettravel.com</p>
                                        <p className="text-gray-600">support@viettravel.com</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-800">Giờ Làm Việc</h3>
                                        <p className="text-gray-600 mt-1">Thứ 2 - Thứ 6: 8:30 - 17:30</p>
                                        <p className="text-gray-600">Thứ 7: 8:30 - 12:00</p>
                                    </div>
                                </div>
                            </div>
                        
                            {/* Social Media Links */}
                            <div className="mt-8">
                                <h3 className="font-medium text-gray-800 mb-4">Kết Nối Với Chúng Tôi</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127c-.82-.088-1.643-.124-2.464-.124-2.44 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/></svg>
                                    </a>
                                    <a href="#" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.057 10.057 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/></svg>
                                    </a>
                                    <a href="#" className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                                    </a>
                                    <a href="#" className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.593 7.203a2.506 2.506 0 00-1.762-1.766c-1.566-.415-7.83-.42-7.83-.42s-6.265-.004-7.832.404a2.56 2.56 0 00-1.766 1.778c-.42 1.568-.42 4.834-.42 4.834s-.01 3.264.406 4.832a2.507 2.507 0 001.768 1.763c1.57.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.51 2.51 0 001.767-1.763c.417-1.57.417-4.832.417-4.832s.02-3.265-.409-4.833z"/><path fill="#fff" d="M9.996 15.005l.005-6.612 5.208 3.312-5.213 3.3z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    {/* Form Liên hệ */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-blue-800 mb-6">
                                Gửi Tin Nhắn Cho Chúng Tôi
                            </h2>

                            <form>
                                {/* Họ và tên & Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label 
                                            className="block text-gray-700 font-medium mb-2" 
                                            htmlFor="name"
                                        >
                                            Họ và tên
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nhập họ và tên của bạn"
                                        />
                                    </div>

                                    <div>
                                        <label 
                                            className="block text-gray-700 font-medium mb-2" 
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nhập địa chỉ email của bạn"
                                        />
                                    </div>
                                </div>

                                {/* Số điện thoại & Chủ đề */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label 
                                            className="block text-gray-700 font-medium mb-2" 
                                            htmlFor="phone"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Nhập số điện thoại của bạn"
                                        />
                                    </div>

                                    <div>
                                        <label 
                                            className="block text-gray-700 font-medium mb-2" 
                                            htmlFor="subject"
                                        >
                                            Chủ đề
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Chọn chủ đề</option>
                                            <option value="booking">Đặt tour</option>
                                            <option value="info">Yêu cầu thông tin</option>
                                            <option value="support">Hỗ trợ kỹ thuật</option>
                                            <option value="feedback">Góp ý, phản hồi</option>
                                            <option value="other">Khác</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Nội dung tin nhắn */}
                                <div className="mb-6">
                                    <label 
                                        className="block text-gray-700 font-medium mb-2" 
                                        htmlFor="message"
                                    >
                                        Nội dung tin nhắn
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nhập nội dung tin nhắn của bạn"
                                    ></textarea>
                                </div>

                                {/* Điều khoản & Điều kiện */}
                                <div className="flex items-center mb-6">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label 
                                        htmlFor="consent" 
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Tôi đồng ý với các 
                                        <a 
                                            href="#" 
                                            className="text-blue-600 hover:underline"
                                        >
                                            điều khoản và điều kiện
                                        </a> 
                                        của VietTravel
                                    </label>
                                </div>

                                {/* Nút gửi tin nhắn */}
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium 
                                            hover:bg-blue-700 transition transform hover:-translate-y-1"
                                >
                                    Gửi Tin Nhắn
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
                
                {/* Map */}
                <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6">Bản Đồ</h2>
                    <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-lg">Bản đồ Google Maps sẽ hiển thị tại đây</p>
                        {/* Trong thực tế, bạn sẽ tích hợp Google Maps API vào đây */}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">Câu Hỏi Thường Gặp</h2>

                    <div className="space-y-4">
                        {/* Câu hỏi 1 */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Làm thế nào để đặt tour du lịch?
                                </h3>
                                <svg
                                    className="h-5 w-5 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <div className="mt-2 text-gray-600">
                                Bạn có thể đặt tour trực tiếp trên website của chúng tôi bằng cách chọn tour phù hợp,
                                điền thông tin và hoàn tất thanh toán, hoặc liên hệ với chúng tôi qua điện thoại, email.
                            </div>
                        </div>

                        {/* Câu hỏi 2 */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Chính sách hủy tour như thế nào?
                                </h3>
                                <svg
                                    className="h-5 w-5 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <div className="mt-2 text-gray-600">
                                Chính sách hủy tour phụ thuộc vào từng loại tour cụ thể. Thông thường, nếu hủy trước
                                7 ngày, bạn sẽ được hoàn 80% chi phí. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết.
                            </div>
                        </div>

                        {/* Câu hỏi 3 */}
                        <div className="bg-white rounded-lg shadow p-4">
                            <button className="flex justify-between items-center w-full text-left">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Tôi có thể thanh toán bằng những phương thức nào?
                                </h3>
                                <svg
                                    className="h-5 w-5 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                            <div className="mt-2 text-gray-600">
                                Chúng tôi chấp nhận nhiều phương thức thanh toán bao gồm tiền mặt, chuyển khoản
                                ngân hàng, thẻ tín dụng/ghi nợ (Visa, MasterCard, JCB), và các ví điện tử như MoMo, VNPay, ZaloPay.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;