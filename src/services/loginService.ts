import { API, setAuthToken } from "../api/api";
import { LoginResponse } from "../typescript";

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await API.post('login', { email, password });
    console.log(response, "response loginUser")
    const data = response.data;
    setAuthToken(data.token);
    return data;
  } catch (error) {
    throw error;
  }
};