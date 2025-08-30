import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeople } from '../context/PeopleContext';
import { ArrowLeft } from 'lucide-react';

const FormToggle = ({ label, description }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const AddPeople = () => {
  const navigate = useNavigate();
  const { addPerson } = usePeople();
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeId: '',
    email: '',
    mobileNumber: '',
    monthlyClaimLimit: '',
    costFactor: '',
    skill: '',
    officeLocation: '',
    designation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPerson({
      id: Date.now(),
      name: formData.employeeName,
      ...formData
    });
    navigate('/dashboard/people');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">User Registration</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              <div>
                <label className="block text-sm font-medium mb-1">Employee Name *</label>
                <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Employee Id</label>
                <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Monthly Claim Limit(Rs)</label>
                <input type="number" name="monthlyClaimLimit" value={formData.monthlyClaimLimit} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cost Factor</label>
                <input type="text" name="costFactor" value={formData.costFactor} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select Skill</label>
                <input type="text" name="skill" value={formData.skill} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" placeholder="Skill Sets" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select office Location</label>
                <input type="text" name="officeLocation" value={formData.officeLocation} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" placeholder="Office Location" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Select designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600" placeholder="Designation" />
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <FormToggle label="Start work/Conclude work Image" description="Enable the feature if you want to mandate the employee to add images before starting or concluding the work." />
              <FormToggle label="Start work/Conclude work Comments" description="Enable the feature if you want to mandate the employee to add comments or reason for the start and conclude work activity." />
              <FormToggle label="Unique ID Based Access" description="Enable the feature if you want to bound your employee with particular device." />
              <FormToggle label="Check-in Boundary Restriction" description="This feature restricts a field user to check-in if he is out of the radius of Client location." />
              <FormToggle label="Odometer values" description="Enable the feature if you want to mandate the employee to start and end odometer of their vehicle for every start and conclude work." />
              <FormToggle label="Auto Tracking" description="This feature allows you to get the user location automatically based on the selected working days." />
            </div>

            <div className="flex justify-end mt-8">
              <button type="button" onClick={() => navigate('/dashboard/people')} className="px-6 py-2 mr-2 rounded-md bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPeople;
