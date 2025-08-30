import React from 'react';

const statsData = [
  { label: 'Work Start %', value: '60%' },
  { label: 'Yet to Start %', value: '20%' },
  { label: 'At Client %', value: '15%' },
  { label: 'Concluded %', value: '5%' },
];

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
