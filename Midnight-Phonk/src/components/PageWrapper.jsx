import React from 'react';

const PageWrapper = ({ children, title }) => (
  <div className="p-6 md:p-12 min-h-[60vh] bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
    <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8 lg:px-12">
      <h2 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-6 border-b pb-2">{title}</h2>
      {children}
    </div>
  </div>
);

export default PageWrapper;
