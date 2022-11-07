import { memo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import { Spinner } from "../spinner";
import { DistanceType } from "../airports/widget";
import { useMediaQuery, useTheme } from "@mui/material";

const googleMapApiKey = process.env.REACT_APP_GOOGLEMAP_API_KEY as string;

interface AirportsMapProps {
  distance: DistanceType | null;
}

const AirportsMap = ({ distance }: AirportsMapProps): JSX.Element => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapApiKey,
  });

  if (!isLoaded) return <Spinner />;
  return <Map distance={distance} />;
};

function Map({ distance }: AirportsMapProps): JSX.Element {
  const theme = useTheme();
  return (
    <GoogleMap
      id="map-google"
      zoom={useMediaQuery(theme.breakpoints.down("sm")) ? 3 : 5}
      center={{ lat: 41.6, lng: -93.61 }}
      options={{
        gestureHandling: "greedy",
        fullscreenControl: false,
        mapTypeControl: false,
      }}
      mapContainerStyle={{
        width: "100%",
        height: "100vh",
      }}
    >
      {distance && (
        <>
          <Marker
            position={{
              lat: distance.startAirport.lat,
              lng: distance.startAirport.lng,
            }}
          ></Marker>
          <Marker
            position={{
              lat: distance.startAirport.lat,
              lng: distance.startAirport.lng,
            }}
            title={distance.startAirport.name}
            label="S"
          />

          <Marker
            position={{
              lat: distance.destinationAirport.lat,
              lng: distance.destinationAirport.lng,
            }}
            label="D"
            title={distance.destinationAirport.name}
          />
          <Polyline
            path={[
              {
                lat: distance.startAirport.lat,
                lng: distance.startAirport.lng,
              },
              {
                lat: distance.destinationAirport.lat,
                lng: distance.destinationAirport.lng,
              },
            ]}
            options={{
              strokeColor: "#ff0026",
              strokeOpacity: 1,
              strokeWeight: 3,
            }}
          />
        </>
      )}
    </GoogleMap>
  );
}

export default memo(AirportsMap);
