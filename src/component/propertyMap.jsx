import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import L from 'leaflet';
// These imports are CRITICAL - you must import Leaflet CSS!
import 'leaflet/dist/leaflet.css';

const PropertyMap = ({ property }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Make sure Leaflet is defined and mapRef exists
    if (!L || !mapRef.current || !property) return;

    // Make sure the height is set (crucial)
    if (mapRef.current) {
      mapRef.current.style.height = '400px';
    }

    // Clean up existing map instance if it exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const loadMap = async () => {
      try {
        setMapLoaded(false);
        setMapError(false);
        
        // Use only property.location for geocoding
        const locationString = property.location;
        
        // First try to geocode using Nominatim
        let lat = 25.2048;  // Default Dubai coordinates
        let lon = 55.2708;
        
        try {
          const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}`;
          const response = await axios.get(geocodeUrl, {
            headers: {
              'User-Agent': 'PropertyWebsite/1.0',
            }
          });
          
          if (response.data && response.data.length > 0) {
            lat = parseFloat(response.data[0].lat);
            lon = parseFloat(response.data[0].lon);
            console.log("Geocoded coordinates:", lat, lon);
          } else {
            console.warn("Geocoding failed, using default coordinates");
          }
        } catch (geocodeError) {
          console.error("Geocoding error:", geocodeError);
          // Continue with default coordinates
        }
        
        // Create the map instance
        const map = L.map(mapRef.current, {
          center: [lat, lon],
          zoom: 15,
          preferCanvas: true
        });
        
        // Store the map instance for cleanup
        mapInstanceRef.current = map;
        
        // Add tile layer - IMPORTANT: This must load properly
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);
        
        // Add marker
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(`<b>${property.house_name}</b><br>${property.house_type || ''} ${property.for ? '• ' + property.for : ''}`).openPopup();
        
        // Trigger a map resize after a short delay to ensure proper rendering
        setTimeout(() => {
          map.invalidateSize();
          setMapLoaded(true);
        }, 300);
        
      } catch (err) {
        console.error("Map loading error:", err);
        setMapError(true);
        setMapLoaded(true); // To hide loading indicator
      }
    };
    
    // Allow DOM to update before loading map
    setTimeout(loadMap, 100);
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [property]);
  
  return (
    <div className="map-container relative">
      <div 
        ref={mapRef} 
        className="h-96 w-full rounded-lg"
        style={{ height: '400px', background: "#f0f0f0" }}
      ></div>
      
      {/* Loading overlay */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-lg z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0e2f4e] mb-3"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      
      {/* Error overlay */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-lg z-10">
          <div className="text-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-gray-700 font-medium">Unable to load map</p>
            <p className="text-gray-500 text-sm mt-1">Please check your connection or try again later</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;