import React, { createContext, useContext } from 'react';

// Crea el contexto
export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token') || null,
  email: localStorage.getItem('email') || null,
  nn: localStorage.getItem('nn') || null, // Incluyendo nn
  idCl: localStorage.getItem('idCl') || null // Incluyendo idCl
};



export const useAuth = () => useContext(AuthContext);
