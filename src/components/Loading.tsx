import React from 'react';

export default function MyLoading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Vòng tròn quay quay */}
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
      
      {/* Chữ Loading bên dưới */}
      <p className="text-white text-lg font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};
