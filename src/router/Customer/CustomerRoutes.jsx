// src/router/Customer/CustomerRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { customerRoutes } from "./Route";
import CustomerLayout from "../../Customer/CustomerLayout ";
import { TourCateProviderCus } from "../../Customer/Context/TourCategoryContext";
import { TourProviderCus } from "../../Customer/Context/TourContext";
import { AuthProviderCus } from "../../Customer/Context/AuthContext";
import { BookingProvider } from "../../Customer/Context/BookingTour";


function CustomerRoutes({ setCurrentTitle }) {
    return (
        <Routes>
            <Route
                path="*"
                element={
                    <TourCateProviderCus>
                        <TourProviderCus>
                            <AuthProviderCus>
                                <BookingProvider>
                                    <CustomerLayout />
                                </BookingProvider>
                            </AuthProviderCus>
                        </TourProviderCus>
                    </TourCateProviderCus>
                }
            >
                {customerRoutes.map((item, index) => (
                    <Route
                        key={index}
                        path={item.path}
                        element={<item.Component setCurrentTitle={setCurrentTitle} />}
                    />
                ))}
            </Route>
        </Routes>
    );
}

export default CustomerRoutes;