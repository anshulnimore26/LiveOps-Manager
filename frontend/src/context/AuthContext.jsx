import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([
    { id: 1, email: 'manager@example.com', password: 'password', role: 'manager' },
    { id: 2, email: 'user@example.com', password: 'password', role: 'user' },
    { id: 3, email: 'admin@example.com', password: 'password', role: 'admin' },
  ]);

  const login = (credentials) => {
    // const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
    // if (foundUser) {
    //   setUser(foundUser);
    //   return foundUser;
    // }
    // return null;
    const dummyUser = { email: credentials.email, role: 'user' };
    setUser(dummyUser);
    return dummyUser;
  };

  const register = (userInfo) => {
    const userExists = users.some(u => u.email === userInfo.email);
    if (userExists) {
      return { error: 'User with this email already exists.' };
    }
    const newUser = { ...userInfo, id: users.length + 1 };
    setUsers([...users, newUser]);
    setUser(newUser);
    return { user: newUser };
  };

  const logout = () => {
    setUser(null);
  };

  const authContextValue = {
    user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
