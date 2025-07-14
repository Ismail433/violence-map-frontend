import React from 'react';

export default function Header({ mode, setMode }) {
  return (
    <header className="bg-gray-800 text-white flex items-center justify-between p-4">
      <h1 className="text-xl font-bold">সহিংসতা মানচিত্র</h1>
      <div>
        <label className="mr-2 font-medium">মোড:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="text-black p-1 rounded"
        >
          <option value="cluster">ক্লাস্টার</option>
          <option value="heatmap">হিটম্যাপ</option>
        </select>
      </div>
    </header>
  );
}
