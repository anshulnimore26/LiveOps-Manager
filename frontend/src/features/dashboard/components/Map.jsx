import { motion } from 'framer-motion';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Minus, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function MapControls({ onZoomIn, onZoomOut, onCenter }) {
  return (
    <div className="absolute right-4 top-4 flex flex-col gap-2">
      <button
        onClick={onZoomIn}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        onClick={onCenter}
        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        <MapPin className="w-4 h-4" />
      </button>
    </div>
  );
}

function ActivityPanel({ date, activities = [] }) {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 w-80"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">People Activity</h3>
        <div className="text-sm text-gray-600">{date}</div>
      </div>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            User didn't perform any Activity
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
              <div>
                <div className="font-medium">{activity.title}</div>
                <div className="text-sm text-gray-600">{activity.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function MapComponent({ center, zoom, markers = [] }) {
  const map = useMap();

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleCenter = () => map.setView(center, zoom);

  return (
    <>
      <MapControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCenter={handleCenter}
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            <div className="p-2">
              <div className="font-medium">{marker.name}</div>
              <div className="text-sm text-gray-600">{marker.status}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export function Map({ center = [20.5937, 78.9629], zoom = 5, markers = [] }) {
  const [mapInstance, setMapInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onMapReady = useCallback((map) => {
    setMapInstance(map);
    setIsLoading(false);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[600px] relative bg-gray-100 rounded-lg overflow-hidden"
    >
      <ActivityPanel date={new Date().toLocaleDateString()} />
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        zoomControl={false}
        whenReady={onMapReady}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapComponent center={center} zoom={zoom} markers={markers} />
      </MapContainer>
    </motion.div>
  );
}
