import { useEffect, useState } from 'react';
import { Map, Stats, UserInfo, ActionBar, Sidebar, useToast, Header } from '../components';

const currentUser = {
  name: 'Dharamchand Patle',
  email: 'dharamchandpatle917@gmail.com',
  mobile: '8283827162',
  employeeId: '--',
  designation: '--',
};

export function PeopleDashboard() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
          addToast({
            type: 'error',
            message: 'Unable to get your location.'
          });
        }
      );
    } else {
      setLoading(false);
      addToast({
        type: 'error',
        message: 'Geolocation is not supported by your browser'
      });
    }
  }, [addToast]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Sidebar />
      <Header />
      <main className="ml-64 pt-24 px-8 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <span className="text-blue-600 dark:text-blue-400">Home</span>
          <span className="text-gray-400 dark:text-gray-500">/</span>
          <span className="text-gray-600 dark:text-gray-300">People</span>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <ErrorBoundary>
            <Stats />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <UserInfo user={currentUser} />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ActionBar onAdd={handleAddPerson} onSearch={handleSearch} />
          </ErrorBoundary>

          <ErrorBoundary>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
            >
              {loading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-600 dark:text-gray-300">Loading map...</p>
                </div>
              </div>
            )}
            
            {error && !loading && (
              <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex flex-col items-center space-y-4 max-w-md mx-auto text-center px-4">
                  <div className="w-12 h-12 text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
            
            <Map
              center={currentLocation ? [currentLocation.lat, currentLocation.lng] : undefined}
              markers={
                currentLocation
                  ? [
                      {
                        ...currentLocation,
                        name: currentUser.name,
                        status: 'Active',
                      },
                    ]
                  : []
              }
            />
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
}