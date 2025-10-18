import React from "react";

const EmptyState = ({ 
  title = "No Data Available", 
  description = "We couldn't find any data to show here.", 
  image = "https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png", 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <img
        src={image}
        alt="Empty State"
        className="w-60 h-auto mb-8 opacity-90"
        draggable="false"
      />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-gray-500 max-w-md mb-6">
        {description}
      </p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
