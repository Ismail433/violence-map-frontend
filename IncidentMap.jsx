import React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ResetView({ center }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, 7);
  }, [center, map]);
  return null;
}

export default function IncidentMap({ data, mode }) {
  const center = [23.685, 90.356];

  if (mode === 'heatmap') {
    const points = data.map(inc => [
      inc.latitude,
      inc.longitude,
      0.5
    ]);
    return (
      <>
        <ResetView center={center} />
        <HeatmapLayer
          points={points}
          longitudeExtractor={m => m[1]}
          latitudeExtractor={m => m[0]}
          intensityExtractor={m => m[2]}
          radius={15}
          blur={20}
          max={1.0}
        />
      </>
    );
  }

  return (
    <>
      <ResetView center={center} />
      <MarkerClusterGroup>
        {data.map((inc) => (
          <Marker
            key={inc.id}
            position={[inc.latitude, inc.longitude]}
            icon={markerIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{inc.title || 'ঘটনা'}</h3>
                <p>{new Date(inc.timestamp).toLocaleString('bn-BD')}</p>
                <p>{inc.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </>
  );
}
