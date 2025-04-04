import { createContext, useContext, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { api } from "../../../Api";


const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
    const [tour, setTour] = useState("")

    const bookingTourDetail = async (id) => {
        try {
            const res = await axiosClient.get(api + `/booking/show/${id}`)
            if (res.data.success)
            {
                setTour(res.data.data)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    }
    return (
        <BookingContext.Provider value={{bookingTourDetail, tour}}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBookingTour = () => useContext(BookingContext)