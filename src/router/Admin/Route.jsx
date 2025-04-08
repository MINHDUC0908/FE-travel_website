import Booking from "../../Admin/page/booking/Booking";
import Contact from "../../Admin/page/contact";
import Dashboard from "../../Admin/page/dashboard";
import Message from "../../Admin/page/message";
import Tour from "../../Admin/page/tour";
import CreateTour from "../../Admin/page/tour/CreateTour/CreateTour";
import EditTour from "../../Admin/page/tour/EditTour/EditTour";

import ShowTour from "../../Admin/page/tour/ShowTour/ShowTour";
import User from "../../Admin/page/user";

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
    {
        path: "users",
        Component: User
    },
    {
        path: "contact",
        Component: Contact
    },
    {
        path: "messages",
        Component: Message
    },
];
