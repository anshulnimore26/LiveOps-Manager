import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../context/ClientContext';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AddClient = () => {
  const { addClient } = useClients();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addClient(formData);
    navigate('/dashboard/client');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-6">Add Client</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <InputField label="Client Name" name="name" value={formData.name} onChange={handleChange} required />
              <InputField label="Location" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="flex justify-end mt-8">
              <button type="button" onClick={() => navigate('/dashboard/client')} className="px-6 py-2 mr-2 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Save</button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}{props.required && <span className="text-red-500">*</span>}</label>
    <input {...props} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
  </div>
);

export default AddClient;
