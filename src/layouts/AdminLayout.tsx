import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import useAppContext from "../context/hook";
import AdminPage from "../pages/admin/AdminPage";

const AdminLayout = () => {

    const [state] = useAppContext();

    if (!state.isLogin) {
        return <Navigate to="/auth/login" />;
    }

    if (!state.user.isAdmin) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default AdminLayout;
