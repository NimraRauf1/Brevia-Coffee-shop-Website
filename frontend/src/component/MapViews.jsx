
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getLocations } from "../api";

export default function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getLocations().then(res => setLocations(res.data));
  }, []);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "500px" }}
        zoom={5}
        center={{ lat: 30.3753, lng: 69.3451 }}
      >
        {locations.map(loc => (
          <Marker
            key={loc.id}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            title={loc.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
