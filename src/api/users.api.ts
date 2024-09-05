import axios from 'axios';
import {User} from "../types.ts";

const usersApi = axios.create({
  baseURL: "http://localhost:8000/api/",
})

export const logIn = async (email: string, password: string) => {
  try {
    return await usersApi.post("login/", { email, password });

  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const signUp = async (user: User) => {
  //console.log('user api:', user)
  return await usersApi.post("register/", user);
}

export const LogOut = async (jwt:string, refresh: string) => {
  if(jwt && refresh) {
    //console.log('jwt:', jwt, 'refresh:', refresh);
    const config = {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    };

    return await usersApi.post("logout/", {"refresh": refresh}, config);
  }
}