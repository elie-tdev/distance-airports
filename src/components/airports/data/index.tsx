import { Spinner } from "../../spinner";
import { useApi } from "../../../api/use-api";
import { AirportsWidget, AirportsEntity } from "../widget";

export function useAirportsData() {
  const apiKey = process.env.REACT_APP_AIRLABS_API_KEY;
  const airportsEndpoint = `https://airlabs.co/api/v9/airports?country_code=US&api_key=${apiKey}`;
  return useApi<AirportsEntity>(airportsEndpoint);
}

export function AirportsData() {
  const { isLoading, data, error } = useAirportsData();

  return isLoading ? (
    <Spinner />
  ) : (
    <AirportsWidget data={data?.response} error={error?.message} />
  );
}

export default AirportsData;
