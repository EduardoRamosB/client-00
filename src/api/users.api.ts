import axios from 'axios';
import { User } from "../types.ts";

const usersApi = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const logIn = async (email: string, password: string) => {
  try {
    return await usersApi.post("login/", { email, password });
  } catch (error) {
    console.error("Login API error:", error);
    throw error;
  }
};

export const signUp = async (user: User) => {
  //console.log('user:', user)
  try {
    return await usersApi.post("register/", user);
  } catch (error) {
    console.error("SignUp API error:", error);
    throw error;
  }
};

export const LogOut = async (jwt: string, refresh: string) => {
  if (jwt && refresh) {
    const config = {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    };

    return await usersApi.post("logout/", { "refresh": refresh }, config);
  }
};
