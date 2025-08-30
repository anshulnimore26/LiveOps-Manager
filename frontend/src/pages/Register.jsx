import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    employeeId: '',
    designation: '',
    skills: '',
    officeLocation: '',
    claimLimit: '',
    costFactor: '',
    workImage: false,
    workComments: false,
    checkInRestriction: false,
    autoTracking: false,
    role: 'user',
    status: 'Yet to Start'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const { error: registerError } = register(formData);
    if (registerError) {
      setError(registerError);
    } else {
      navigate('/dashboard/people');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-animated-gradient dark:bg-animated-gradient-dark p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Register</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Employee Name" name="name" value={formData.name} onChange={handleChange} required />
            <InputField label="Employee Id" name="employeeId" value={formData.employeeId} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <InputField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            <InputField label="Mobile Number" name="contact" value={formData.contact} onChange={handleChange} required />
            <InputField label="Monthly Claim Limit(Rs)" name="claimLimit" type="number" value={formData.claimLimit} onChange={handleChange} />
            <InputField label="Cost Factor" name="costFactor" type="number" value={formData.costFactor} onChange={handleChange} />
            <InputField label="Skill Sets" name="skills" value={formData.skills} onChange={handleChange} />
            <InputField label="Office Location" name="officeLocation" value={formData.officeLocation} onChange={handleChange} />
            <InputField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <ToggleSwitch label="Start work/Conclude work image" name="workImage" checked={formData.workImage} onChange={handleChange} />
            <ToggleSwitch label="Odometer values" name="odometer" checked={formData.odometer} onChange={handleChange} />
            <ToggleSwitch label="Start work/Conclude work comments" name="workComments" checked={formData.workComments} onChange={handleChange} />
            <ToggleSwitch label="Auto Tracking" name="autoTracking" checked={formData.autoTracking} onChange={handleChange} />
            <ToggleSwitch label="Unique ID Based Access" name="uniqueIdAccess" checked={formData.uniqueIdAccess} onChange={handleChange} />
            <ToggleSwitch label="Check-in Boundary Restriction" name="checkInRestriction" checked={formData.checkInRestriction} onChange={handleChange} />
          </div>
          <div className="flex justify-end pt-6">
            <button type="submit" className="w-full md:w-auto py-3 px-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Register
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
    <input {...props} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
  </div>
);

const ToggleSwitch = ({ label, name, checked, onChange }) => (
  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

export default Register;
