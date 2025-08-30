import React from 'react';

const StatCircle = ({ percentage, label }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg className="w-24 h-24">
          <circle
            className="text-gray-200 dark:text-gray-700"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
          />
          <circle
            className="text-red-500"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="60"
            cy="60"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <span className="absolute text-xl font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {percentage}%
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{label}</p>
    </div>
  );
};

export default StatCircle;
