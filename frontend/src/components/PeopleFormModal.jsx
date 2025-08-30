import { X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';

export function PeopleFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    employeeId: '',
    role: '',
    email: '',
    mobile: '',
    location: '',
    designation: '',
    skillSets: '',
    monthlyTarget: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number';
    }
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit Team Member' : 'Add New Team Member'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.name ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Employee ID<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.employeeId ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Enter employee ID"
              />
              {errors.employeeId && (
                <p className="text-red-500 text-sm mt-1">{errors.employeeId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Role<span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.role ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select role</option>
                <option value="Field Executive">Field Executive</option>
                <option value="Area Manager">Area Manager</option>
                <option value="Field Agent">Field Agent</option>
                <option value="Sales Executive">Sales Executive</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.email ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.mobile ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Enter mobile number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Location<span className="text-red-500">*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.location ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select location</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Designation<span className="text-red-500">*</span>
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${
                  errors.designation ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select designation</option>
                <option value="Junior Executive">Junior Executive</option>
                <option value="Senior Executive">Senior Executive</option>
                <option value="Manager">Manager</option>
                <option value="Senior Manager">Senior Manager</option>
              </select>
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Skill Sets
              </label>
              <input
                type="text"
                name="skillSets"
                value={formData.skillSets}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-slate-300"
                placeholder="Enter skill sets (comma separated)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Monthly Target
              </label>
              <input
                type="text"
                name="monthlyTarget"
                value={formData.monthlyTarget}
                onChange={handleChange}
                className="w-full p-2 border rounded-md border-slate-300"
                placeholder="Enter monthly target"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? 'Update' : 'Add'} Team Member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
