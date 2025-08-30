import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Download } from 'lucide-react';

const Step = ({ number, label, active }) => (
  <div className="flex items-center">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
      {number}
    </div>
    <p className={`ml-3 font-medium ${active ? 'text-blue-600' : 'text-gray-500'}`}>{label}</p>
  </div>
);

const UploadTask = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <header className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="mr-4"><ArrowLeft /></button>
        <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400">Home / Upload Task</h1>
      </header>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center items-center mb-12">
          <Step number={1} label="Upload File" active />
          <div className="w-32 mx-4 border-t-2 border-gray-200"></div>
          <Step number={2} label="Column Mapping" />
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Upload File</h2>
          <p className="text-gray-500 mb-6">Attachments</p>
          <div className="border-dashed border-2 border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center mb-6">
            <Upload className="mx-auto text-gray-400 mb-2" size={40} />
            <p>Add files</p>
          </div>
          <p className="text-red-500 text-sm mb-4">**File should be in following formats (.csv)</p>
          <a href="#" className="text-blue-600 flex items-center mb-6">
            <Download size={18} className="mr-2" />
            Click here to download Sample Worksheet
          </a>
          <div>
            <h3 className="font-bold mb-2">Note:</h3>
            <p className="text-sm text-gray-600">1. Task Summary column is mandatory</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTask;
