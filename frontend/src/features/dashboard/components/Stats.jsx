import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const stats = [
  { id: 'work-start', label: 'Work Start', value: '100%', color: 'from-green-500 to-green-600' },
  { id: 'yet-to-start', label: 'Yet to Start', value: '0%', color: 'from-yellow-500 to-yellow-600' },
  { id: 'at-client', label: 'At Client', value: '0%', color: 'from-blue-500 to-blue-600' },
  { id: 'concluded', label: 'Conclude', value: '0%', color: 'from-purple-500 to-purple-600' },
];

export function Stats({ refreshInterval = 60000 }) {
  const [currentStats, setCurrentStats] = useState(stats);
  const [isLoading, setIsLoading] = useState(false);

  // Simulating real-time stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setCurrentStats(stats.map(stat => ({
          ...stat,
          value: `${Math.floor(Math.random() * 100)}%`
        })));
        setIsLoading(false);
      }, 500);
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval]);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-4 gap-4 mb-6"
    >
      {currentStats.map((stat) => (
        <motion.div
          key={stat.id}
          whileHover={{ scale: 1.02 }}
          className={`bg-white rounded-lg shadow-lg p-4 relative overflow-hidden ${
            isLoading ? 'opacity-50' : 'opacity-100'
          } transition-opacity`}
        >
          <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${stat.color}`} />
          <div className="ml-3">
            <motion.div 
              key={stat.value}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-3xl font-bold text-gray-800"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm font-medium text-gray-500 mt-1">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
