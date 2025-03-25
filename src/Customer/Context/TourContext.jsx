import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../../../Api";

const TourContext = createContext()

export const TourProviderCus = ({ children}) => {
    const [tours, setTours] = useState("")
    const [tour, setTour] = useState("")
    const [loading, setLoading] = useState(false)
    const fetchTour = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/tour")
            if (res.data.success)
            {
                setTours(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchShowTour = async (id) => {
        setLoading(true);
        try {
            console.log("Fetching tour with ID:", id); // ✅ Log ID
            const res = await axios.get(api + `/tour/show/${id}`);
            console.log("API Response:", res.data); // ✅ Log phản hồi API
            if (res.data.success) {
                setTour(res.data.data);
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error(error.response?.data?.message || "Lỗi khi gửi yêu cầu.");
            setTour(null);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    
    useEffect(() => {
        fetchTour()
    }, [])
    return (
        <TourContext.Provider value={{ tours, fetchShowTour, loading, setTour, tour }}>
            {children}
        </TourContext.Provider>
    )
}

export const useTourCus = () => useContext(TourContext)