import { API } from "../api/api";

export const checkAuth = async () => {
    try {
      const response = await API.get('check-auth');
      console.log(response.data.data, "<<< data cek auth")
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };