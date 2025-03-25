import Dashboard from "../../Admin/page/dashboard";
import Tour from "../../Admin/page/tour";
import Create_Tour from "../../Admin/page/tour/Create_Tour/Create_tour";
import EditTour from "../../Admin/page/tour/edit_tour/Edit_tour";
import ShowTour from "../../Admin/page/tour/ShowTour/ShowTour";

export const menu = [
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
        Component: Create_Tour
    },
    {
        path: "tour/show/:tour_name",
        Component: ShowTour
    },
    {
        path: "tour/edit/:tour_name",
        Component: EditTour
    },
];
