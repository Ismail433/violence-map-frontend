import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Charts({ data }) {
  const countsByMonth = {};

  data.forEach(inc => {
    const month = new Date(inc.timestamp).toLocaleString('bn-BD', { year: 'numeric', month: 'short' });
    countsByMonth[month] = (countsByMonth[month] || 0) + 1;
  });

  const labels = Object.keys(countsByMonth);
  const counts = Object.values(countsByMonth);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'মাস ভিত্তিক ঘটনা সংখ্যা',
        data: counts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="w-64 bg-white p-4 overflow-auto">
      <h2 className="font-semibold mb-3">রিপোর্ট চার্ট</h2>
      <Bar data={chartData} />
    </div>
  );
}
