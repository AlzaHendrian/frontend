import React, { useContext, useEffect, useState } from 'react';
import { API, setAuthToken } from './api/api';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes/Index'; // Sesuaikan path dengan lokasi hook useAppContext
import useAppContext from './context/hook';
import { checkAuth } from './services/authService';

const router = createBrowserRouter(routes);

const App: React.FC = () => {
  const [ state, dispatch ] = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      if (localStorage.token) {
        const success = await checkAuth(dispatch);
        if (!success) {
          dispatch({ type: 'AUTH_ERROR' });
        }
      } else {
        dispatch({ type: 'AUTH_ERROR' });
      }
      setIsLoading(false);
    };

    initializeApp();
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;


  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
