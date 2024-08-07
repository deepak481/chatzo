import { createContext, useEffect, useState } from 'react';
import { UserProfile } from '../Models/User';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../Services/AuthService';
import { toast } from 'react-toastify';
import React from 'react';
import axios from 'axios';

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    avatar: File,
    agreeTermConditions: boolean,
  ) => void;
  loginUser: (username: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    avatar: File,
    agreeTermConditions: boolean,
  ) => {
    await registerAPI(firstName, lastName, username, email, password, avatar, agreeTermConditions)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success('Login Success!');
          navigate('/search');
        }
      })
      .catch(() => toast.warning('Server error occured'));
  };

  const loginUser = async (username: string, password: string, rememberMe: boolean) => {
    await loginAPI(username, password, rememberMe)
      .then((res) => {
        if (res) {
          localStorage.setItem('token', res?.data.token);
          const userObj = {
            userName: res?.data.userName,
            email: res?.data.email,
          };
          localStorage.setItem('user', JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success('Login Success!');
          navigate('/search');
        }
      })
      .catch(() => toast.warning('Server error occured'));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
