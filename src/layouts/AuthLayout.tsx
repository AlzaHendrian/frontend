import { Navigate, Outlet } from "react-router-dom";
import useAppContext from "../context/hook";

const AuthLayout = () => {
    const [state] = useAppContext();

    if (state.isLogin) {
        if(state.user.isAdmin){
            return <Navigate to="/admin" />;
        }
        return <Navigate to="/" />;
    }

   return (
      <>
         <Outlet />
      </>
   );
};

export default AuthLayout;
