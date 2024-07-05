import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import { UserContext } from '../../context/UserContext';

const Navbar: React.FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate()

  if (!userContext) {
    throw new Error('useContext must be used within a UserContextProvider');
  }

  const [state, dispatch] = userContext;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    console.log('success logout');
    navigate('/login');
  }
    

    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const useScroll = (threshold: number = 50) => {
      
        useEffect(() => {
          const handleScroll = () => {
            if (window.scrollY > threshold) {
              setIsScrolled(true);
            } else {
              setIsScrolled(false);
            }
          };
      
          window.addEventListener('scroll', handleScroll);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
          };
        }, [threshold]);
        
    }

    useScroll(50); 

    
    if (location.pathname === '/login' || location.pathname === '/register') {
        return null;
    }
    
      
    return (
        <>
        
            <div className='h-[70px] bg-[#2F3645]'>
            <nav className={`p-4 fixed w-full top-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent text-white'}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <h3 className="text-xl font-bold">Test FullStack</h3>
                    <div className="flex space-x-4">
                    </div>
                    <Button variant="danger" onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </nav>
        </div>
        </>
        
    );
};

export default Navbar
