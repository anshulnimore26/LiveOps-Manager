import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PeopleList = ({ people }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {people.map((person) => (
          <Link to={`/person/${person.id}`} key={person.id}>
            <motion.div 
              className="p-4 border dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex flex-col items-center">
                <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full mb-4" />
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{person.role}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default PeopleList;
