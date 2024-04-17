// components/AuthProvider.js
import React, { createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin } from '../api/authService';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  token: null,
  email: null, 
  nn: null, 
  idCl: null 
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        email: action.payload.email,
        nn: action.payload.nn,
        idCl: action.payload.idCl
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (username, password) => {
    try {
      const { token, email, nn, idCl } = await apiLogin(username, password);
      
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('nn', nn);
      await AsyncStorage.setItem('idCl', idCl);
      dispatch({ type: 'LOGIN', payload: { token, email, nn, idCl } });
    } catch (error) {
      
      console.error('Login failed:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('nn');
    await AsyncStorage.removeItem('idCl');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
