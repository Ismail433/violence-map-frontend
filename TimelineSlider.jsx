import React, { useState, useEffect } from 'react';

export default function TimelineSlider({ incidents, setDateRange }) {
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [range, setRange] = useState([0, 100]);

  useEffect(() => {
    if (incidents.length === 0) return;
    const dates = incidents.map(i => new Date(i.timestamp).getTime());
    const min = Math.min(...dates);
    const max = Math.max(...dates);
    setMinDate(min);
    setMaxDate(max);
    setRange([min, max]);
    setDateRange({ start: new Date(min), end: new Date(max) });
  }, [incidents, setDateRange]);

  const onChange = (e) => {
    const val = Number(e.target.value);
    setRange([minDate, val]);
    setDateRange({ start: new Date(minDate), end: new Date(val) });
  };

  if (!minDate || !maxDate) return null;

  return (
    <div className="p-2">
      <label className="block mb-1 font-semibold">টাইমলাইন ফিল্টার</label>
      <input
        type="range"
        min={minDate}
        max={maxDate}
        value={range[1]}
        onChange={onChange}
        step={24 * 3600 * 1000}
        className="w-full"
      />
      <div className="flex justify-between text-sm mt-1">
        <span>{new Date(minDate).toLocaleDateString('bn-BD')}</span>
        <span>{new Date(range[1]).toLocaleDateString('bn-BD')}</span>
      </div>
    </div>
  );
}
