import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { ArrowLeft, MapPin, Phone, Navigation, Star, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const mapStyles = `
  .map-container {
    z-index: 1 !important;
    position: relative !important;
  }
  .map-container .leaflet-container {
    z-index: 1 !important;
    position: relative !important;
  }
  .map-container .leaflet-pane {
    z-index: 1 !important;
  }
  .map-container .leaflet-control-container {
    z-index: 10 !important;
  }
  .map-container .leaflet-popup {
    z-index: 40 !important;
  }
  .map-container .leaflet-marker-pane {
    z-index: 20 !important;
  }
  .map-container .leaflet-shadow-pane {
    z-index: 15 !important;
  }
  .map-container .leaflet-overlay-pane {
    z-index: 20 !important;
  }
`;

interface NearestHospitalProps {
  onNavigate: (page: string) => void;
}

interface Hospital {
  id: string;
  name: string;
  city: string;
  rating: number;
  phone: string;
  specialties: string[];
  coordinates: [number, number];
  distance?: number;
}

const hospitals: Hospital[] = [
  {
    id: '1',
    name: 'King Faisal Specialist Hospital',
    city: 'Riyadh',
    rating: 4.8,
    phone: '+966 11 464 7272',
    specialties: ['Cardiology', 'Oncology', 'Neurology'],
    coordinates: [24.7136, 46.6753]
  },
  {
    id: '2',
    name: 'Dr. Soliman Fakeeh Hospital',
    city: 'Jeddah',
    rating: 4.7,
    phone: '+966 12 665 5000',
    specialties: ['General Medicine', 'Surgery', 'Pediatrics'],
    coordinates: [21.4858, 39.1925]
  },
  {
    id: '3',
    name: 'Saudi German Hospital',
    city: 'Riyadh',
    rating: 4.6,
    phone: '+966 11 218 9999',
    specialties: ['Orthopedics', 'Dermatology', 'ENT'],
    coordinates: [24.6900, 46.6850]
  },
  {
    id: '4',
    name: 'Al Hammadi Hospital',
    city: 'Riyadh',
    rating: 4.5,
    phone: '+966 11 276 3333',
    specialties: ['Emergency', 'General Medicine'],
    coordinates: [24.7200, 46.6600]
  },
  {
    id: '5',
    name: 'Mouwasat Hospital',
    city: 'Dammam',
    rating: 4.7,
    phone: '+966 13 844 2222',
    specialties: ['Maternity', 'Pediatrics', 'Surgery'],
    coordinates: [26.4207, 50.0888]
  }
];

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const hospitalIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function NearestHospital({ onNavigate }: NearestHospitalProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hospitalsWithDistance, setHospitalsWithDistance] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      setUserLocation([24.7136, 46.6753]);
      calculateDistances([24.7136, 46.6753]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location: [number, number] = [latitude, longitude];
        setUserLocation(location);
        calculateDistances(location);
        setLoading(false);
      },
      (err) => {
        console.error('Error getting location:', err);
        setError('Unable to get your location. Using default location.');
        const defaultLocation: [number, number] = [24.7136, 46.6753];
        setUserLocation(defaultLocation);
        calculateDistances(defaultLocation);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const calculateDistances = (location: [number, number]) => {
    const hospitalsWithDist = hospitals.map(hospital => {
      const distance = calculateDistance(
        location[0],
        location[1],
        hospital.coordinates[0],
        hospital.coordinates[1]
      );
      return { ...hospital, distance };
    });

    hospitalsWithDist.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    setHospitalsWithDistance(hospitalsWithDist);
  };

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance.toFixed(1)}km`;
  };

  const openNavigation = (hospital: Hospital) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates[0]},${hospital.coordinates[1]}`;
    window.open(url, '_blank');
  };

  if (loading && !userLocation) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-[#005EB8]" size={48} />
          <p className="text-gray-600">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{mapStyles}</style>
      <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white px-5 py-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate('hospital-network')} className="text-gray-600">
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-gray-900 font-semibold">Nearest Hospitals</h1>
            <p className="text-xs text-gray-500">Find hospitals near you</p>
          </div>
          <button
            onClick={getCurrentLocation}
            className="p-2 text-[#005EB8] hover:bg-gray-100 rounded-lg"
            title="Refresh location"
          >
            <RefreshCw size={20} />
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-2 rounded-lg">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'map'
                ? 'bg-[#005EB8] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-[#005EB8] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            List View
          </button>
        </div>
      </header>

      {viewMode === 'map' && userLocation && (
        <div className="relative overflow-hidden" style={{ height: 'calc(100vh - 200px)', zIndex: 1 }}>
          <MapContainer
            center={userLocation}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
            className="map-container"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController center={userLocation} />
            
            <Marker position={userLocation} icon={defaultIcon}>
              <Popup>Your Location</Popup>
            </Marker>

            {hospitalsWithDistance.map((hospital) => (
              <Marker
                key={hospital.id}
                position={hospital.coordinates}
                icon={hospitalIcon}
                eventHandlers={{
                  click: () => setSelectedHospital(hospital)
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-semibold mb-1">{hospital.name}</h3>
                    <p className="text-gray-600 mb-1">{hospital.city}</p>
                    <p className="text-[#005EB8] font-medium">
                      {formatDistance(hospital.distance || 0)} away
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {selectedHospital && (
            <div className="absolute bottom-4 left-4 right-4 z-30">
              <Card className="p-4 bg-white shadow-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {selectedHospital.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin size={14} />
                      <span>{selectedHospital.city}</span>
                      <span className="text-[#005EB8] font-medium">
                        • {formatDistance(selectedHospital.distance || 0)} away
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{selectedHospital.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedHospital(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${selectedHospital.phone}`}
                    className="flex-1 py-2 px-3 bg-[#005EB8] text-white rounded-lg text-sm hover:bg-[#004A94] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                  <button
                    onClick={() => openNavigation(selectedHospital)}
                    className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Navigation size={16} />
                    Navigate
                  </button>
                </div>
              </Card>
            </div>
          )}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="px-5 py-6 space-y-4">
          {hospitalsWithDistance.map((hospital) => (
            <Card
              key={hospital.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setSelectedHospital(hospital);
                setViewMode('map');
              }}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-red-600" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-gray-900 font-semibold mb-1">
                        {hospital.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <MapPin size={14} />
                        <span>{hospital.city}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{hospital.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#005EB8] text-white">
                        {formatDistance(hospital.distance || 0)} away
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {hospital.specialties.slice(0, 3).map((specialty, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${hospital.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 py-2 px-3 bg-[#005EB8] text-white rounded-lg text-sm hover:bg-[#004A94] transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone size={16} />
                      Call
                    </a>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openNavigation(hospital);
                      }}
                      className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <Navigation size={16} />
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      </div>
    </>
  );
}

