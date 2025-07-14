import React from 'react';

export default function Sidebar({ dateRange, setDateRange }) {
  return (
    <aside className="w-64 bg-gray-100 p-4 overflow-auto">
      <h2 className="font-semibold mb-3">তারিখ অনুযায়ী ফিল্টার</h2>
      <div className="flex flex-col space-y-2">
        <label>শুরু তারিখ:</label>
        <input
          type="date"
          value={dateRange.start ? dateRange.start.toISOString().slice(0, 10) : ''}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value ? new Date(e.target.value) : null }))}
          className="p-1 border rounded"
        />
        <label>শেষ তারিখ:</label>
        <input
          type="date"
          value={dateRange.end ? dateRange.end.toISOString().slice(0, 10) : ''}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value ? new Date(e.target.value) : null }))}
          className="p-1 border rounded"
        />
      </div>
    </aside>
  );
}
