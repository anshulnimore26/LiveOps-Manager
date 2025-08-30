import { motion } from 'framer-motion';
import { MapPin, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function UserInfo({ user }) {
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-lg shadow-lg p-6 mb-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full" />
            ) : (
              <span className="text-xl font-bold text-blue-600">
                {user.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
              <span>Email ID: {user.email}</span>
              <span>•</span>
              <span>Contact Number: {user.mobile}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/map')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Current Location</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10"
              >
                <button
                  onClick={() => navigate(`/user/${user.id}`)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigate(`/user/${user.id}/edit`)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mt-6">
        <div>
          <div className="text-sm text-gray-600">Employee ID</div>
          <div className="mt-1 font-medium text-gray-800">{user.employeeId || '--'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Designation</div>
          <div className="mt-1 font-medium text-gray-800">{user.designation || '--'}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">GPS Status</div>
          <div className="mt-1 font-medium text-red-600">Off</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">GPRS Status</div>
          <div className="mt-1 font-medium text-red-600">Off</div>
        </div>
      </div>
    </motion.div>
  );
}
