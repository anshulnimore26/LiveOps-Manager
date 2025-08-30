import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../context/ClientContext';
import { motion } from 'framer-motion';
import { Plus, Upload, Search } from 'lucide-react';
import { Map } from '../components/ui/Map';

const Client = () => {
  const { clients } = useClients();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Clients', value: '100%' },
    { label: 'Clients Created', value: '0%' },
    { label: 'At Client Location', value: '0%' },
    { label: 'Visited', value: '0%' },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-1/3 p-8 flex flex-col bg-white dark:bg-gray-800">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Home / Client</h1>
          </div>
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">Today's Stats: 0</p>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6 text-gray-900 dark:text-white">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => navigate('/dashboard/add-client')}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus size={20} className="mr-2" />
              Add Client
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white">
              <Upload size={20} className="mr-2" />
              Upload
            </button>
          </div>
          <div className="text-gray-900 dark:text-white">
            <h2 className="text-lg font-bold mb-4">Client Activity</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div className="mt-4">
              {filteredClients.length > 0 ? (
                <ul className="space-y-2">
                  {filteredClients.map(client => (
                    <li key={client.id} className="p-2 border-b dark:border-gray-700">{client.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 mt-4">No client activity.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <div className="w-2/3 relative">
        <div className="absolute top-6 left-6 z-10">
          <input type="text" placeholder="Search places or eLoc's..." className="w-72 p-2 rounded-md shadow-md bg-white dark:bg-gray-800" />
        </div>
        <Map center={[22.7196, 75.8577]} />
      </div>
    </div>
  );
};

export default Client;
