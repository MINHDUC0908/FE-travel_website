import About from "../../Customer/page/About/About";
import Home from "../../Customer/page/Home/Home";
import News from "../../Customer/page/News/New";
import ShowTour from "../../Customer/page/ShowTour/ShowTour";
import Tour from "../../Customer/page/Tour/Tour";

export const customerRoutes = [
    {
        path: "",
        Component: Home
    },
    {
        path: "contact",
        Component: News
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
    }
]