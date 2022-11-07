// http://www.movable-type.co.uk/scripts/latlong.html
import { Airport } from "../components/airports/widget";
export function calculateDistancebyAirports(
  startAirport: Airport,
  destinationAirport: Airport
) {
  const lng1 = (startAirport.lng * Math.PI) / 180;
  const lng2 = (destinationAirport.lng * Math.PI) / 180;
  const lat1 = (startAirport.lat * Math.PI) / 180;
  const lat2 = (destinationAirport.lat * Math.PI) / 180;
  const dlon = lng2 - lng1;
  const dlat = lat2 - lat1;
  //   a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  const r = 6371; // metres
  return c * r * 0.539957; // in metres
}

export function removeDuplicateAirportbyIataCode(arr: Airport[]) {
  return arr.reduce((unique: Airport[], o) => {
    if (!unique.some((air: Airport) => air.iata_code === o.iata_code)) {
      unique.push(o);
    }
    return unique;
  }, []);
}
