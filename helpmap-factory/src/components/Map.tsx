// src/components/Map.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 定義資料介面 (跟 page.tsx 保持一致)
interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  category: string;
  address: string;
}

// 定義接收的參數
interface MapProps {
  places: Place[];
}

// 🎨 視覺系統：定義不同分類的顏色
const categoryColors: Record<string, string> = {
  '餐廳': '#FF9800',
  'cafe': '#795548', '咖啡廳': '#795548',
  '寵物旅館': '#9C27B0', '寵物友善飯店': '#9C27B0',
  '寵物醫院': '#F44336',
  '寵物美容': '#E91E63',
  '狗狗公園': '#4CAF50', '室外空間': '#4CAF50',
  '文創園區': '#607D8B',
  'default': '#888888'
};

// 製作彩色圓點圖標
const createIcon = (category: string) => {
  const color = categoryColors[category] || categoryColors['default'];
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export default function Map({ places }: MapProps) {
  return (
    <MapContainer 
      center={[25.0330, 121.5654]} 
      zoom={13} 
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* 遍歷資料，畫出每一個點 */}
      {places.map((place) => (
        <Marker 
          key={place.id} 
          position={[place.lat, place.lng]} 
          icon={createIcon(place.category)}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-lg mb-1" style={{ color: categoryColors[place.category] || '#333' }}>
                {place.name}
              </h3>
              <span className="text-xs text-white px-2 py-1 rounded-full mb-2 inline-block" 
                    style={{ backgroundColor: categoryColors[place.category] || '#888' }}>
                {place.category}
              </span>
              <p className="text-sm text-gray-600 mt-1">📍 {place.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}