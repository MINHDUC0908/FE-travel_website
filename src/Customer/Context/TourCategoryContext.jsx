import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../../../Api";

const TourCategoryContext = createContext()

export const TourCateProviderCus = ({ children}) => {
    const [tourcategories, setTourCategory] = useState("")
    const fetchTourCategory = async () => {
        try {
            const res = await axios.get(api + "/tourCategory")
            if (res.data.success)
            {
                setTourCategory(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTourCategory()
    }, [])
    const tourValue = useMemo(() => ({ tourcategories }), [tourcategories]);
    return (
        <TourCategoryContext.Provider value={tourValue}>
            {children}
        </TourCategoryContext.Provider>
    )
}

export const useTourCategoryCus = () => useContext(TourCategoryContext)