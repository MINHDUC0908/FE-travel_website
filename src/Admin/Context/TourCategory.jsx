import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { api } from "../../../Api";


const TourCategoryContext = createContext()

export const TourCategoryProviderAdmin = ({ children }) => {
    const [tourCategories, setTourCategory] = useState("")
    const fetchTourCategory = async () => {
        try {
            const res = await axiosClient.get(api + "/admin/tourcategories")
            if (res.data.success)
            {
                setTourCategory(res.data.data)
            }
        } catch (error) {
            setError('Không thể tải danh sách tour');
        }
    }
    useEffect(() => {
        fetchTourCategory()
    }, [])
    return (
        <TourCategoryContext.Provider value={{tourCategories}}>
            {children}
        </TourCategoryContext.Provider>
    )
} 

export const useTourCategory = () => useContext(TourCategoryContext)