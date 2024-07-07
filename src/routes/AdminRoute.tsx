import { RouteObject } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";

export const adminRoutes: RouteObject[] = [
   {
      index:true,
      element: <AdminPage />,
   },
];
