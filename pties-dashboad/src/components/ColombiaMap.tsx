import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Colombia regions with comprehensive data
const colombiaRegions = [
  {
    id: 1,
    name: 'Bogotá D.C.',
    position: [4.7110, -74.0721] as [number, number],
    progress: 92,
    students: 320,
    schools: 18,
    avgScore: 8.7
  },
  {
    id: 2,
    name: 'Medellín, Antioquia',
    position: [6.2442, -75.5812] as [number, number],
    progress: 78,
    students: 195,
    schools: 12,
    avgScore: 7.8
  },
  {
    id: 3,
    name: 'Cali, Valle del Cauca',
    position: [3.4516, -76.5320] as [number, number],
    progress: 65,
    students: 140,
    schools: 8,
    avgScore: 6.9
  },
  {
    id: 4,
    name: 'Cartagena, Bolívar',
    position: [10.3997, -75.5144] as [number, number],
    progress: 45,
    students: 85,
    schools: 5,
    avgScore: 5.2
  },
  {
    id: 5,
    name: 'Bucaramanga, Santander',
    position: [7.1253, -73.1198] as [number, number],
    progress: 88,
    students: 175,
    schools: 10,
    avgScore: 8.3
  },
  {
    id: 6,
    name: 'Barranquilla, Atlántico',
    position: [10.9685, -74.7813] as [number, number],
    progress: 72,
    students: 160,
    schools: 9,
    avgScore: 7.4
  }
];

export type BubbleMetric = 'students' | 'schools' | 'avgScore';

const getBubbleSize = (region: typeof colombiaRegions[0], metric: BubbleMetric): number => {
  const baseSize = 5000; // Base radius in meters
  const maxValue = Math.max(...colombiaRegions.map(r => r[metric]));
  const normalizedValue = region[metric] / maxValue;
  
  switch (metric) {
    case 'students':
      return baseSize + (normalizedValue * 40000); // Scale for students (larger bubbles)
    case 'schools':
      return baseSize + (normalizedValue * 25000); // Scale for schools
    case 'avgScore':
      return baseSize + (normalizedValue * 30000); // Scale for average score
    default:
      return baseSize;
  }
};

const getMetricLabel = (metric: BubbleMetric): string => {
  switch (metric) {
    case 'students': return 'Estudiantes';
    case 'schools': return 'Colegios';
    case 'avgScore': return 'Puntaje Promedio';
    default: return '';
  }
};

const formatMetricValue = (value: number, metric: BubbleMetric): string => {
  switch (metric) {
    case 'students':
    case 'schools':
      return value.toString();
    case 'avgScore':
      return value.toFixed(1);
    default:
      return value.toString();
  }
};

interface ColombiaMapProps {
  className?: string;
  bubbleMetric: BubbleMetric;
}

const ColombiaMap: React.FC<ColombiaMapProps> = ({ className, bubbleMetric }) => {
  useEffect(() => {
    // Ensure Leaflet is properly initialized
    if (typeof window !== 'undefined') {
      // Any additional map setup can go here
    }
  }, []);

  return (
    <div className={`w-full h-full relative z-10 ${className || ''}`}>
      <MapContainer
        center={[4.5709, -74.2973]} // Center of Colombia
        zoom={6}
        style={{ 
          height: '100%', 
          width: '100%', 
          borderRadius: '12px',
          zIndex: 10
        }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {colombiaRegions.map((region) => (
          <React.Fragment key={region.id}>
            {/* Dynamic circle size based on selected metric */}
            <Circle
              center={region.position}
              radius={getBubbleSize(region, bubbleMetric)}
              pathOptions={{
                color: '#4a5570',
                fillColor: '#4a5570',
                fillOpacity: 0.3,
                weight: 2
              }}
            />
            
            {/* Marker for the region */}
            <Marker position={region.position}>
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-[#4a5570] mb-2">{region.name}</div>
                  <div className="space-y-1">
                    <div>Progreso: <span className="font-medium">{region.progress}%</span></div>
                    <div>Estudiantes: <span className="font-medium">{region.students}</span></div>
                    <div>Colegios: <span className="font-medium">{region.schools}</span></div>
                    <div>Puntaje Promedio: <span className="font-medium">{region.avgScore}</span></div>
                    <div className="pt-1 border-t">
                      <div className="text-xs text-gray-600">
                        Tamaño de burbuja: {getMetricLabel(bubbleMetric)}
                      </div>
                      <div className="font-medium text-[#4a5570]">
                        {formatMetricValue(region[bubbleMetric], bubbleMetric)}
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default ColombiaMap;
