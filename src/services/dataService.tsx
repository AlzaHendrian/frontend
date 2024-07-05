import { API } from "../api/api";
import { User } from "../typescript";

export const getAllUsers = async (): Promise<User[]> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await API.get('users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "response getAllUsers");
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };