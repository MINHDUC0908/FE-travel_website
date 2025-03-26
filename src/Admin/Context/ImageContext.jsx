import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"; // ✅ Thêm axios
import { api } from "../../../Api";
import { useTour } from "./TourContext";
import axiosClient from "../../api/axiosClient";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const deleteImage = async (imageId) => {
        setLoading(true);
        try {
            const res = await axiosClient.delete(`${api}/admin/image/delete/${imageId}`);
            if (res.data.success)
            {
                toast.success("Xóa ảnh thành công")
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error(error.response?.data?.message || "Lỗi khi gửi yêu cầu.");
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };
    const handleImage = async (formdata) => {
        setLoading(true);
        try {
            // Đảm bảo formdata là multipart/form-data
            const res = await axiosClient.post(`${api}/admin/image/store`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.success) {
                toast.success("Thêm ảnh thành công");
                return res.data.image;
            } else {
                throw new Error("Thêm ảnh thất bại");
            }
        } catch (error) {
            console.error("API Error in handleImage:", error);
            toast.error(error.response?.data?.message || "Lỗi khi thêm ảnh.");
            return null;
        } finally {
            setLoading(false);
        }
    };
    return (
        <ImageContext.Provider value={{ deleteImage, loading, handleImage}}>
            {children}
        </ImageContext.Provider>
    );
};

export const useImage = () => useContext(ImageContext);
