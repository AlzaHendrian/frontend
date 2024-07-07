import { RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";

export const publicRoutes: RouteObject[] = [
    {
        index: true,
        element: <HomePage />,
    },
];
