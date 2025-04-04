import { useState, useEffect } from "react";
import { api } from "../../../Api";
import axiosClient from "../../api/axiosClient";

const useBookings = (status) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                const response = await axiosClient.post(`${api}/admin/booking`, { status } );
                setBookings(response.data.data);
            } catch (err) {
                setError(err.message || "Đã có lỗi xảy ra!");
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [status]);

    return { bookings, loading, error, setBookings };
};

export default useBookings;
