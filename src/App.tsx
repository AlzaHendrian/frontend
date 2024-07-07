import React, { useContext, useEffect, useState, useRef } from 'react';
import { API, setAuthToken } from './api/api';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './context/UserContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './routes/Index';


const router = createBrowserRouter(routes);

const App: React.FC = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const [state, dispatch] = userContext;
  const [isLoading, setIsLoading] = useState(true);
  
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const initializeApp = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token); // Setel token untuk autentikasi
        try {
          const response = await API.get('check-auth');
          const payload = { ...response.data.data, token };

          // Update state untuk menunjukkan bahwa pengguna sudah login
          dispatch({
            type: 'USER_SUCCESS',
            payload,
          });

        } catch (error) {
          console.error('Gagal memuat data pengguna:', error);
          // Atur state untuk menunjukkan bahwa autentikasi gagal
          dispatch({ type: 'AUTH_ERROR' });
        }


      } else {
        // Jika tidak ada token, atur state untuk menunjukkan bahwa pengguna belum login
        dispatch({ type: 'AUTH_ERROR' });
      }
      setIsLoading(false); // Setelah semua proses selesai, berhenti loading
      isInitialized.current = true;
    };

    initializeApp();
  }, [dispatch, state]);

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
    ) 
};

export default App;
