import Chat from "../../Customer/Component/Chat";
import About from "../../Customer/page/About/About";
import BookingPage from "../../Customer/page/Booking/BookingPage";
import Confirmation from "../../Customer/page/Booking/ConfirmationPage";
import PaymentFailure from "../../Customer/page/Booking/PaymentFailure";
import Contact from "../../Customer/page/Contact/Contact";
import getTourByCategory from "../../Customer/page/getTourByCategory/getTourByCategoty";
import Home from "../../Customer/page/Home/Home";
import isVerified from "../../Customer/page/isVerified/isVerified";
import ShowTour from "../../Customer/page/ShowTour/ShowTour";
import Tour from "../../Customer/page/Tour/Tour";

export const customerRoutes = [
    {
        path: "",
        Component: Home
    },
    {
        path: "contact",
        Component: Contact
    },
    {
        path: "destinations",
        Component: Tour
    },
    {
        path: "about",
        Component: About
    },
    {
        path: "show/tour/:tour_name",
        Component: ShowTour
    },
    {
        path: "booking/:tour_name",
        Component: BookingPage
    },
    {
        path: "booking/success",
        Component: Confirmation
    },
    {
        path: "payment-failed",
        Component: PaymentFailure
    },
    {
        path: "verify-email/:verificationToken",
        Component: isVerified
    },
    {
        path: ":category_name",
        Component: getTourByCategory
    },
    {
        path: "chat",
        Component: Chat
    }
]