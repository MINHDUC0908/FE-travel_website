import Booking from "../../Admin/page/booking/Booking";
import Dashboard from "../../Admin/page/dashboard";
import Tour from "../../Admin/page/tour";
import CreateTour from "../../Admin/page/tour/CreateTour/CreateTour";
import EditTour from "../../Admin/page/tour/EditTour/EditTour";

import ShowTour from "../../Admin/page/tour/ShowTour/ShowTour";

export const adminRoutes = [
    {
        path: "dashboard",
        Component: Dashboard,
    },
    {
        path: "tour",
        Component: Tour
    },
    {
        path: "tour/create",
        Component: CreateTour
    },
    {
        path: "tour/show/:tour_name",
        Component: ShowTour
    },
    {
        path: "tour/edit/:tour_name",
        Component: EditTour
    },
    {
        path: "booking",
        Component: Booking
    },
];
