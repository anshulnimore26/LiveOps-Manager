import { useState, useEffect } from 'react';
import { Activity, Users, Briefcase, CheckSquare, Search, Plus, Upload, MapPin, MoreVertical, Edit, Trash2, Minus } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { PeopleFormModal } from '../components/PeopleFormModal';
import { Map } from '../components/Map';

const locationCoordinates = {
  'Mumbai': { lat: 19.0760, lng: 72.8777 },
  'Delhi': { lat: 28.7041, lng: 77.1025 },
  'Bangalore': { lat: 12.9716, lng: 77.5946 },
  'Kolkata': { lat: 22.5726, lng: 88.3639 }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('people');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [showActions, setShowActions] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India
  const [people, setPeople] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Field Executive",
      status: "Active",
      location: "Mumbai",
      lastActive: "2 mins ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
      employeeId: "FE001",
      email: "rajesh@example.com",
      mobile: "9876543210",
      designation: "Junior Executive",
      skillSets: "Sales, Customer Service",
      monthlyTarget: "₹50,000"
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Area Manager",
      status: "In Meeting",
      location: "Delhi",
      lastActive: "5 mins ago",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      employeeId: "AM002",
      email: "priya@example.com",
      mobile: "9876543211",
      designation: "Manager",
      skillSets: "Team Management, Strategy",
      monthlyTarget: "₹150,000"
    },
    {
      id: 3,
      name: "Arun Patel",
      role: "Field Agent",
      status: "On Route",
      location: "Bangalore",
      lastActive: "Just now",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=arun",
      employeeId: "FA003",
      email: "arun@example.com",
      mobile: "9876543212",
      designation: "Junior Executive",
      skillSets: "Field Operations, Documentation",
      monthlyTarget: "₹75,000"
    }
  ]);

  const tabs = [
    { id: 'people', name: 'People', icon: Users },
    { id: 'client', name: 'Client', icon: Briefcase },
    { id: 'task', name: 'Task', icon: CheckSquare }
  ];

  const stats = [
    { label: "Work Start", value: "85%" },
    { label: "Yet to Start", value: "15%" },
    { label: "At Client", value: "60%" },
    { label: "Concluded", value: "40%" }
  ];

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-500',
      'In Meeting': 'bg-yellow-500',
      'On Route': 'bg-blue-500',
      'Break': 'bg-slate-500'
    };
    return colors[status] || 'bg-slate-500';
  };

  const handleAddPerson = (formData) => {
    const newPerson = {
      id: people.length + 1,
      ...formData,
      status: "Active",
      lastActive: "Just now",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name.toLowerCase().replace(/\s+/g, '')}`
    };
    setPeople([...people, newPerson]);
  };

  const handleEditPerson = (formData) => {
    setPeople(people.map(p => 
      p.id === editingPerson.id 
        ? { ...p, ...formData }
        : p
    ));
    setEditingPerson(null);
  };

  const handleDeletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      setPeople(people.filter(p => p.id !== id));
    }
  };

  // Close actions menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowActions(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-8">
          <Activity className="w-6 h-6" />
          <span className="text-xl font-bold tracking-wide">LiveOps</span>
        </div>
        
        <nav className="space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'people' ? (
            <div className="space-y-6">
              {/* Header with Breadcrumb */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-blue-600">Home</span>
                  <span className="text-slate-400">/</span>
                  <span className="text-slate-600">People</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
              </div>

              {/* Person Details Card */}
              <Card className="mb-6">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <button className="p-2 rounded-full bg-blue-50 text-blue-600">
                        <Users className="w-6 h-6" />
                      </button>
                      <div>
                        <h2 className="text-xl font-semibold">Dharamchand Patle</h2>
                        <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                          <span>Email ID: dharamchandpatle917@gmail.com</span>
                          <span>•</span>
                          <span>Contact Number: 8283827162</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-600">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Current Location
                        </span>
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-50">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mt-6">
                    <div>
                      <div className="text-sm text-slate-600">Employee ID</div>
                      <div className="mt-1 font-medium">--</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">Designation</div>
                      <div className="mt-1 font-medium">--</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">GPS Status</div>
                      <div className="mt-1 font-medium text-red-600">Off</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600">GPRS Status</div>
                      <div className="mt-1 font-medium text-red-600">Off</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Section */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-[600px] relative">
                  <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 w-80">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">People Activity</h3>
                      <div className="text-sm text-slate-600">{new Date().toLocaleDateString()}</div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center text-slate-600 py-8">
                        User didn't perform any Activity
                      </div>
                    </div>
                  </div>
                  {/* Map Container */}
                  <div className="w-full h-full bg-slate-100">
                    {/* Map Controls */}
                    <div className="absolute right-4 top-4 flex flex-col gap-2">
                      <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                        <Minus className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                        <MapPin className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50">
                        <div className="w-4 h-4 flex items-center justify-center">⊕</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Action Bar */}
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => {
                      setEditingPerson(null);
                      setIsFormOpen(true);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    Add People
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                </div>
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search people..."
                    className="pl-10 pr-4 py-2 w-64 rounded-lg border border-slate-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Map Card */}
                <Card className="col-span-2 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <h2 className="font-semibold text-lg">Live Location Map</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="h-[400px] bg-gradient-to-br from-slate-100 to-white rounded-lg relative overflow-hidden shadow-inner">
                      {/* Map Placeholder */}
                      <div className="absolute inset-0 bg-slate-200">
                        {filteredPeople.map(person => (
                          <div
                            key={person.id}
                            className="absolute"
                            style={{
                              left: `${(locationCoordinates[person.location].lng + 180) * (100 / 360)}%`,
                              top: `${(90 - locationCoordinates[person.location].lat) * (100 / 180)}%`
                            }}
                          >
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(person.status)} animate-pulse`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Team List */}
                <Card className="col-span-1 max-h-[500px] overflow-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h2 className="font-semibold text-lg">Field Team</h2>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-200 bg-white">
                    {filteredPeople.map(person => (
                      <div key={person.id} className="p-4 hover:bg-slate-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={person.avatar}
                              alt={person.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <div>
                              <div className="font-medium">{person.name}</div>
                              <div className="text-sm text-slate-600">
                                {person.role} • {person.location}
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActions(showActions === person.id ? null : person.id);
                              }}
                              className="p-1 hover:bg-slate-100 rounded-full"
                            >
                              <MoreVertical className="w-5 h-5 text-slate-500" />
                            </button>
                            {showActions === person.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
                                <button
                                  onClick={() => {
                                    setEditingPerson(person);
                                    setIsFormOpen(true);
                                    setShowActions(null);
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeletePerson(person.id);
                                    setShowActions(null);
                                  }}
                                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-slate-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <div className="text-slate-600">
                            Last active: {person.lastActive}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(person.status)}`} />
                            <span>{person.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'client' && (
            <div className="text-center text-slate-600 py-12">
              Client management interface will be implemented here
            </div>
          )}

          {activeTab === 'task' && (
            <div className="text-center text-slate-600 py-12">
              Task management interface will be implemented here
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Person Modal */}
      <PeopleFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPerson(null);
        }}
        onSubmit={editingPerson ? handleEditPerson : handleAddPerson}
        initialData={editingPerson}
      />
    </div>
  );
}
