import React, { createContext, useState, useContext } from 'react';
import { dummyClients } from '../data/dummyClients';

const ClientContext = createContext();

export const useClients = () => useContext(ClientContext);

export const ClientProvider = ({ children }) => {
  const [clients, setClients] = useState(dummyClients);

  const addClient = (client) => {
    setClients([...clients, { ...client, id: clients.length + 1 }]);
  };

  return (
    <ClientContext.Provider value={{ clients, addClient }}>
      {children}
    </ClientContext.Provider>
  );
};
