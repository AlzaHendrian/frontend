import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext"


interface PrivateRouteProps {
    element: React.ReactNode;
    path: string;
    isAuthenticated?: boolean;
    isAdmin?: boolean;
  }
  
export function PrivateRouteLogin() {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error('useContext must be used within a UserContextProvider');
    }
    const [state] = userContext;

    const isAuthenticated = !!localStorage.getItem('token')
    const isAdmin = !!localStorage.getItem('isAdmin')

    if (!isAuthenticated) {
        return <Outlet />;
    }
    return <Outlet />
}



