import { RouteObject } from "react-router-dom";

// // Layout
import RootLayout from "../layouts/RouteLayout";
import AuthLayout from "../layouts/AuthLayout";
import AdminLayout from "../layouts/AdminLayout";

// // sub route
import { publicRoutes } from "./PublicRoute";
import { adminRoutes } from "./AdminRoute";
import { authRoutes } from "./AuthRoot";


const routes: RouteObject[] = [
   {
      path: "/",
      element: <RootLayout />,
      children: publicRoutes,
   },
   {
      path: "/admin",
      element: <AdminLayout />,
      children: adminRoutes,
   },
   {
      path: "/auth",
      element: <AuthLayout />,
      children: authRoutes,
   },
];

export default routes;
