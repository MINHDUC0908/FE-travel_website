import hagiang from "../../../../assets/hagiang.jpg";
import travel from "../../../../assets/travel.png";
import compass from "../../../../assets/compass.png";

function Banner() {
    return (
        <>
            <style>{`
                /* Animations */
                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInDelay {
                    0% { opacity: 0; transform: translateY(20px); }
                    50% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInLate {
                    0% { opacity: 0; transform: translateY(20px); }
                    75% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideUp {
                    0% { opacity: 0; transform: translateY(40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideUpDelay {
                    0% { opacity: 0; transform: translateY(40px); }
                    50% { opacity: 0; transform: translateY(40px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                @keyframes float {
                    0% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }

                @keyframes floatDelay {
                    0% { transform: translateY(0); }
                    25% { transform: translateY(-5px); }
                    75% { transform: translateY(-10px); }
                    100% { transform: translateY(0); }
                }

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }

                .animate-fadeInDelay {
                    animation: fadeInDelay 1.5s ease-out forwards;
                }

                .animate-fadeInLate {
                    animation: fadeInLate 2s ease-out forwards;
                }

                .animate-slideUp {
                    animation: slideUp 1s ease-out forwards;
                }

                .animate-slideUpDelay {
                    animation: slideUpDelay 1.5s ease-out forwards;
                }

                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }

                .animate-floatDelay {
                    animation: floatDelay 3s ease-in-out infinite;
                }

                /* Additional inline styles for elements */
                .banner-container {
                    position: relative;
                    width: 100%;
                    margin-top: -150px;
                    overflow: hidden;
                }

                .banner-image {
                    width: 100%;
                    height: 600px;
                    object-fit: cover;
                    filter: brightness(0.75);
                }

                @media (min-width: 768px) {
                    .banner-image {
                        height: 700px;
                    }
                }

                .gradient-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4), transparent);
                }

                .banner-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    color: white;
                    padding: 1rem;
                }

                .main-heading {
                    font-size: 2.5rem;
                    font-weight: 800;
                    letter-spacing: -0.025em;
                    line-height: 1.1;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                @media (min-width: 768px) {
                    .main-heading {
                        font-size: 3.75rem;
                    }
                }

                @media (min-width: 1024px) {
                    .main-heading {
                        font-size: 4.5rem;
                    }
                }

                .sub-heading {
                    margin-top: 1rem;
                    font-size: 1.125rem;
                    font-weight: 300;
                    letter-spacing: 0.025em;
                    opacity: 0.9;
                }

                @media (min-width: 768px) {
                    .sub-heading {
                        font-size: 1.5rem;
                    }
                }

                .search-container {
                    margin-top: 2rem;
                    display: flex;
                    justify-content: center;
                }

                .search-box {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    padding: 1rem;
                    border-radius: 0.75rem;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                @media (min-width: 768px) {
                    .search-box {
                        flex-direction: row;
                    }
                }

                .search-input {
                    padding: 0.5rem 1rem;
                    width: 16rem;
                    border-radius: 0.5rem;
                    outline: none;
                    transition: all 0.3s;
                }

                @media (min-width: 768px) {
                    .search-input {
                        width: 20rem;
                    }
                }

                .search-input:focus {
                    ring: 2px solid #3b82f6;
                }

                .search-button {
                    padding: 0.5rem 1.5rem;
                    background-color: #2563eb;
                    color: white;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                    transition: all 0.3s;
                }

                .search-button:hover {
                    background-color: #1d4ed8;
                    transform: scale(1.05);
                }

                .cta-button-container {
                    margin-top: 1.5rem;
                }

                .cta-button {
                    display: inline-block;
                    padding: 0.75rem 2rem;
                    background: linear-gradient(to right, #3b82f6, #14b8a6);
                    color: white;
                    font-weight: 600;
                    font-size: 1.125rem;
                    border-radius: 9999px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
                    transition: all 0.5s;
                }

                .cta-button:hover {
                    background: linear-gradient(to right, #2563eb, #0d9488);
                    transform: scale(1.1);
                }

                .stats-container {
                    margin-top: 2.5rem;
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    opacity: 0.8;
                }

                @media (min-width: 768px) {
                    .stats-container {
                        font-size: 1rem;
                    }
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                @media (min-width: 768px) {
                    .stat-number {
                        font-size: 1.875rem;
                    }
                }

                .icon-airplane {
                    position: absolute;
                    bottom: 2.5rem;
                    left: 2.5rem;
                    display: none;
                }

                @media (min-width: 768px) {
                    .icon-airplane {
                        display: block;
                    }
                }

                .icon-compass {
                    position: absolute;
                    bottom: 2.5rem;
                    right: 2.5rem;
                    display: none;
                }

                @media (min-width: 768px) {
                    .icon-compass {
                        display: block;
                    }
                }

                .icon-image {
                    width: 3rem;
                    height: 3rem;
                    opacity: 0.7;
                }
            `}</style>

            <div className="banner-container">
                <img src={hagiang} alt="Scenic Travel Destination Banner" className="banner-image" />
                <div className="gradient-overlay"></div>

                <div className="banner-content">
                    <h1 className="main-heading animate-fadeIn">
                        Khám Phá Việt Nam Cùng Chúng Tôi
                    </h1>
                    <p className="sub-heading animate-fadeInDelay">
                        Đặt Tour Du Lịch Dễ Dàng - Trải Nghiệm Đỉnh Cao
                    </p>

                    <div className="search-container animate-slideUp">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Tìm điểm đến mơ ước..."
                                className="search-input text-black"
                            />
                            <button className="search-button">
                                Tìm Kiếm
                            </button>
                        </div>
                    </div>

                    <div className="cta-button-container animate-slideUpDelay">
                        <a href="/destinations" className="cta-button">
                            Khám Phá Ngay
                        </a>
                    </div>

                    <div className="stats-container animate-fadeInLate">
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span>Điểm Đến</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">10K+</span>
                            <span>Khách Hàng Hài Lòng</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">24/7</span>
                            <span>Hỗ Trợ</span>
                        </div>
                    </div>
                </div>

                <div className="icon-airplane animate-float">
                    <img src={travel} alt="Airplane" className="icon-image" />
                </div>
                <div className="icon-compass animate-floatDelay">
                    <img src={compass} alt="Compass" className="icon-image" />
                </div>
            </div>
        </>
    );
}

export default Banner;