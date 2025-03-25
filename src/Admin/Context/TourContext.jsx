import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"; // ✅ Thêm axios
import { api } from "../../../Api";
import axiosClient from "../../api/axiosClient";

const TourContext = createContext();

export const TourProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [tour, setTour] = useState("");
    const [tours, setTours] = useState([]);
    const fetchTours = async () => {
        setLoading(true)
        try {
            const res = await axios.get(api + "/admin/tour/index",
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
                }
            );
            if (res.data && res.data.data) {
                setTours(res.data.data);
            }
        } catch (err) {
            setError('Không thể tải danh sách tour');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500)
        }
    };
    useEffect(() => {
        fetchTours();
    }, []);
    const fetchTourShow = async (tourId) => {
        setLoading(true);
        try {
            const res = await axiosClient.get(`${api}/admin/tour/show/${tourId}`);
            console.log("API Response:", res.data); 
            if (res.data.success) {
                setTour(res.data.data);
            } else {
                setTour(null);
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
    const updateTour = async (tourId, updatedData) => {
        setLoading(true);
        try {
            const response = await axiosClient.put(`${api}/admin/tour/update/${tourId}`, updatedData); 
            setTour(response.data.data);
        } catch (error) {
            toast.error("Cập nhật tour thất bại!");
            throw error;
        } finally {
            setLoading(false);
        }
    };
    const destroy = async (tourId) => {
        try {
            const res = await axiosClient.delete(api + `/admin/tour/delete/${tourId}`)
            if (res.data.success)
            {
                toast.success("Xóa tour thành công");
                setTours((prev) => prev.filter((tour) => tour.id !== tourId));
            }
        } catch (error) {
            
        }
    }
    return (
        <TourContext.Provider value={{ fetchTourShow, loading, tour, setTour, updateTour, destroy, tours, fetchTours }}>
            {children}
        </TourContext.Provider>
    );
};

export const useTour = () => useContext(TourContext);
