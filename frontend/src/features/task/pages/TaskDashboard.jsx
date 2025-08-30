import React from 'react';
import { useTasks } from '../../../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Upload, XCircle, Search, SlidersHorizontal, User } from 'lucide-react';
import StatCircle from '../../people/components/StatCircle';
import taskIllustration from '../../../assets/task-illustration.svg'; // Assuming you have an illustration

const TaskDashboard = () => {
  const { tasks } = useTasks();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div className="w-[400px] p-6 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <header className="mb-6">
          <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400">Home / Task</h1>
        </header>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCircle percentage={0} label="Total" />
          <StatCircle percentage={0} label="Open" />
          <StatCircle percentage={0} label="WIP" />
          <StatCircle percentage={0} label="C" />
        </div>
        <h2 className="text-lg font-semibold mb-2">Task Activity</h2>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for Tasklist"
            className="w-full pl-10 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <img src={taskIllustration} alt="No tasks" className="w-48 h-48 mb-4" />
          <h3 className="text-lg font-semibold">You haven't created any Tasklist yet</h3>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">All Task</h1>
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate('/dashboard/task/upload')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <Upload size={18} className="mr-2" /> Upload Task
            </button>
            <button onClick={() => navigate('/dashboard/task/add')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
              <Plus size={18} className="mr-2" /> Add Task
            </button>
            <button onClick={() => navigate('/dashboard/task/manual-close')} className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center">
              <XCircle size={18} className="mr-2" /> Manual Close
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-md" />
            </div>
            <button className="p-2 border rounded-md"><SlidersHorizontal size={20} /></button>
            <button className="p-2 border rounded-md"><User size={20} /></button>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <img src={taskIllustration} alt="No tasks yet" className="w-64 h-64 mb-4" />
          <h2 className="text-xl font-bold">You haven't created any Task yet</h2>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
