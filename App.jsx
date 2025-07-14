import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './index.css';

import Header from './components/Header';
import IncidentMap from './components/IncidentMap';
import Sidebar from './components/Sidebar';
import Charts from './components/Charts';
import TimelineSlider from './components/TimelineSlider';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function App() {
  const [incidents, setIncidents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [mode, setMode] = useState('cluster'); // 'cluster' or 'heatmap'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/incidents')
      .then(res => res.json())
      .then(data => {
        setIncidents(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      const filteredData = incidents.filter(inc => {
        const time = new Date(inc.timestamp);
        return time >= dateRange.start && time <= dateRange.end;
      });
      setFiltered(filteredData);
    } else {
      setFiltered(incidents);
    }
  }, [dateRange, incidents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg animate-pulse">🌀 ডেটা লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <Header mode={mode} setMode={setMode} />
      <div className="flex flex-1">
        <Sidebar dateRange={dateRange} setDateRange={setDateRange} />
        <div className="relative w-full h-full">
          <MapContainer center={[23.685, 90.356]} zoom={7} className="h-full w-full z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <IncidentMap data={filtered} mode={mode} />
          </MapContainer>
          <div className="absolute bottom-0 w-full z-10 bg-white/80 backdrop-blur">
            <TimelineSlider incidents={incidents} setDateRange={setDateRange} />
          </div>
        </div>
        <Charts data={filtered} />
      </div>
    </div>
  );
}
