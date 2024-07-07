import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/global/Navbar";
import useAppContext from "../context/hook";

const RootLayout = () => {
  const [state] = useAppContext();
    console.log(state, "<<< state root layout");
    
  if (!state.isLogin) {
    return <Navigate to="/auth/login" />;
  }

  if (state.user.isAdmin) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
