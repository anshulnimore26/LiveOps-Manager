import React, { useState } from 'react';
import { usePeople } from '../../../context/PeopleContext';
import { Map } from '../../../components/ui/Map';
import { Search, Plus, Upload, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StatCircle from '../components/StatCircle';

const PeopleListItem = ({ person }) => (
  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
    <img src={person.avatar} alt={person.name} className="w-10 h-10 rounded-full" />
    <div className="ml-4">
      <p className="font-semibold">{person.name} ({person.employeeId})</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">No Activity</p>
      <p className="text-xs text-gray-400">at Location is not available</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { people } = usePeople();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const downloadCSV = () => {
    const headers = ["ID", "Name", "Email", "Employee ID", "Role"];
    const rows = people.map(p => [p.id, p.name, p.email, p.employeeId, p.role].join(','));
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "people_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div className="w-[400px] p-6 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <header className="mb-6">
          <h1 className="text-lg font-medium text-gray-500 dark:text-gray-400">Home / People</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Today's stats: {people.length}</p>
        </header>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCircle percentage={0} label="Work Start" />
          <StatCircle percentage={100} label="Yet to Start" />
          <StatCircle percentage={0} label="At Client" />
          <StatCircle percentage={0} label="Conclude" />
        </div>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => navigate('/add-people')}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={20} className="mr-2" />
            Add People
          </button>
          <button 
            onClick={downloadCSV}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-900 dark:text-white"
          >
            <Upload size={20} className="mr-2" />
            Download
          </button>
        </div>

        <div className="flex-1 flex flex-col">
          <h2 className="text-lg font-semibold mb-2">People Live Location</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search People..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <SlidersHorizontal size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredPeople.map(person => (
              <PeopleListItem key={person.id} person={person} />
            ))}
          </div>
          <footer className="p-2 border-t text-sm text-gray-500">
            Showing 1 to {filteredPeople.length} of {people.length} entries
          </footer>
        </div>
      </div>
      <div className="flex-1 relative">
        <div className="absolute top-6 left-6 z-10">
          <input type="text" placeholder="Search places or eLoc's..." className="w-72 p-2 rounded-md shadow-md bg-white dark:bg-gray-800" />
        </div>
        <Map center={[22.7196, 75.8577]} />
      </div>
    </div>
  );
};

export default Dashboard;
