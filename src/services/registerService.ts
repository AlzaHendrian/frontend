import { API } from "../api/api";

interface RegisterUserData {
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: string;
    email: string;
    password: string;
  }
  
  export const registerUser = async (userData: RegisterUserData) => {
    try {
      const response = await API.post('register', userData);
      console.log(response, "<<< respon register")
      return response.data.data;
    } catch (error:any) {
      throw new Error(error.response?.data?.message || 'Failed to register');
    }  
  };
  