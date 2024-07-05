export interface LoginResponse {
    code: number;
    data: {
      name: string;
      email: string;
      password: string;
      token: string;
      isAdmin?: boolean;
    };
  }


  export interface User {
    id: number;
    firstname: string;
    lastname: string;
    dateofbirth: string; 
    gender: string;
    email: string
  }