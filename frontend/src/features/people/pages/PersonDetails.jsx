import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePeople } from '../../../context/PeopleContext';
import { Map } from '../../../components/ui/Map';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const PersonDetails = () => {
  const { personId } = useParams();
  const { people } = usePeople();
  const navigate = useNavigate();
  const person = people.find(p => p.id === parseInt(personId));

  if (!person) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Person not found. </p>
        <button onClick={() => navigate('/dashboard/people')} className="text-blue-500 underline ml-2">Go to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-96 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col"
      >
        <div className="flex items-center mb-6">
          <button onClick={() => navigate('/dashboard/people')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold ml-4">Home / People</h1>
        </div>

        {/* Person Info */}
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center text-2xl font-bold">
            {person.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold">{person.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{person.email}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Contact: {person.contact}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Employee ID: {person.id}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Designation: {person.designation}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">GPS: {person.gps}</p>
          </div>
        </div>

        {/* Date of Activity */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Date of Activity</label>
          <div className="relative">
            <input type="text" defaultValue="31/08/2025" className="w-full p-2 pr-10 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* People Activity */}
        <div>
          <h3 className="font-bold mb-2">People Activity</h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search Client..." className="w-full pl-10 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
          </div>
          <div className="text-center py-10 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">User didn't perform any Activity</p>
          </div>
        </div>
      </motion.div>

      {/* Map View */}
      <div className="flex-1 relative">
        <div className="absolute top-6 left-6 z-10">
          <input type="text" placeholder="Search places or eLoc's..." className="w-72 p-2 rounded-md shadow-md bg-white dark:bg-gray-800" />
        </div>
        <Map center={[22.7196, 75.8577]} markers={[{ lat: 22.7196, lng: 75.8577, name: person.name, status: person.status }]} />
      </div>
    </div>
  );
};

export default PersonDetails;
