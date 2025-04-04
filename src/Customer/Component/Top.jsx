import { useEffect, useState } from "react"
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";


function Top()
{
    const [showGoToTop, setShowgoToTop] = useState(false)
    useEffect(() => {
        const handScroll = () => {
            if (window.scrollY >= 200)
            {
                setShowgoToTop(true);
            } else {
                setShowgoToTop(false);
            }
        }
        window.addEventListener('scroll', handScroll);
        return () => {
            window.removeEventListener('scroll', handScroll);
            console.log('remove')
        }
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div>
            {showGoToTop && (
                <button
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#4B5EFA",
                        color: "white",
                        borderRadius: "50%",
                        bottom: "40px",
                        right: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                        border: "none",
                        cursor: "pointer",
                        transition: "opacity 0.3s",
                        opacity: showGoToTop ? 1 : 0,
                    }}
                    className="lg:bottom-10 lg:right-10"
                >
                    <MdOutlineKeyboardDoubleArrowUp size={24} />
                </button>
            )}
        </div>
    )
}
export default Top