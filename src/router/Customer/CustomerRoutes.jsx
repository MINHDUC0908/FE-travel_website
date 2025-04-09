// src/router/Customer/CustomerRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { customerRoutes } from "./Route";
import CustomerLayout from "../../Customer/CustomerLayout ";
import { TourCateProviderCus } from "../../Customer/Context/TourCategoryContext";
import { TourProviderCus } from "../../Customer/Context/TourContext";
import { AuthProviderCus } from "../../Customer/Context/AuthContext";
import { BookingProvider } from "../../Customer/Context/BookingTour";
import Profile from "../../Customer/page/Profile";
import Info from "../../Customer/page/Profile/Component/Info";
import HistoryBookings from "../../Customer/page/Profile/Component/HistoryBookings";
import MyReview from "../../Customer/page/Profile/Component/MyReview";


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
                <Route path="profile" element={<Profile />}>
                    <Route path="info" element={<Info setCurrentTitle={setCurrentTitle} />} />
                    <Route path="bookings" element={<HistoryBookings setCurrentTitle={setCurrentTitle} />} />
                    <Route path="reviews" element={<MyReview setCurrentTitle={setCurrentTitle} />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default CustomerRoutes;