import React, { createContext, useState, useContext } from 'react';
import { dummyData } from '../data/dummyData';

const PeopleContext = createContext();

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState(dummyData);

  const addPerson = (person) => {
    const newPerson = {
      ...person,
      id: people.length + 1,
      avatar: `https://i.pravatar.cc/150?u=${people.length + 1}`
    };
    setPeople(prevPeople => [newPerson, ...prevPeople]);
  };

  const getPersonById = (id) => {
    return people.find(p => p.id.toString() === id);
  };

  return (
    <PeopleContext.Provider value={{ people, addPerson, getPersonById }}>
      {children}
    </PeopleContext.Provider>
  );
};
