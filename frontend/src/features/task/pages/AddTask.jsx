import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../../../context/TaskContext';
import { ArrowLeft, Upload } from 'lucide-react';

const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();
  const [formData, setFormData] = useState({
    summary: '',
    description: '',
    taskList: '',
    priority: 'None',
    taskType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(formData);
    navigate('/dashboard/task');
  };

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <header className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4"><ArrowLeft /></button>
        <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400">Home / Task / Add Task</h1>
      </header>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Create a new Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" name="summary" placeholder="Task Summary *" onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700" required />
            <textarea name="description" placeholder="Task Description" onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 md:col-span-2"></textarea>
            <input type="text" name="taskList" placeholder="Add to existing Task List" onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700" />
            <select name="priority" onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700">
              <option value="None">Priority: None</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input type="text" name="taskType" placeholder="Task Type" onChange={handleChange} className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700" />
          </div>
          <div className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <Upload className="mx-auto text-gray-400 mb-2" size={40} />
            <p>Add files</p>
          </div>
          <div className="flex justify-end mt-8">
            <button type="button" onClick={() => navigate('/dashboard/task')} className="px-6 py-2 mr-2 rounded-md bg-gray-200 dark:bg-gray-600">Cancel</button>
            <button type="submit" className="px-6 py-2 rounded-md bg-blue-600 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
