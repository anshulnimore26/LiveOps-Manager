import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download } from 'lucide-react';

const ManualClose = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="mr-4"><ArrowLeft /></button>
        <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400">Home / Upload Task For Manual Close</h1>
      </header>
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Upload Task</h2>
        <p className="text-gray-500 mb-6">Attachments</p>
        <div className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center mb-6">
          <Upload className="mx-auto text-gray-400 mb-2" size={40} />
          <p>Add files</p>
        </div>
        <p className="text-red-500 text-sm mb-4">**File should be in following formats (.xls or .xlsx)</p>
        <a href="#" className="text-blue-600 flex items-center mb-6">
          <Download size={18} className="mr-2" />
          Click here to download Task for Manual Closer
        </a>
        <div>
          <h3 className="font-bold mb-2">Note:</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Task id column is mandatory.</li>
            <li>
              <p>Task Status</p>
              <ul className="list-disc list-inside pl-6">
                <li>Unassigned = 1, Assigned = 2</li>
                <li>Read = 3, Wip = 4</li>
                <li>Pending = 5, Completed = 6</li>
                <li>Completed Early = 7, Completed Later =8</li>
                <li>Manual Close = 9</li>
              </ul>
            </li>
            <li className="font-bold text-blue-600">Only Task with Manul close status i.e 9 will be updated, rest status code changed will not be effected.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ManualClose;
