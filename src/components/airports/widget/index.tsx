import { useState } from "react";
import { Button, Paper, Typography, Box } from "@mui/material";
import { AutocompleteField } from "../../autocompleteField";
import AirportsMap from "../../map";
import {
  removeDuplicateAirportbyIataCode,
  calculateDistancebyAirports,
} from "../../../utils";

export interface Airport {
  name: string;
  country_code: string;
  iata_code: string;
  icao_code: string;
  lat: number;
  lng: number;
}

export interface DistanceType {
  value: number;
  startAirport: Airport;
  destinationAirport: Airport;
}

export interface AirportsEntity {
  response: Airport[];
}

interface AirportsWidgetProps {
  data?: Airport[];
  error?: string;
}

export function AirportsWidget({ data, error }: AirportsWidgetProps) {
  const airportsData = data && removeDuplicateAirportbyIataCode(data);
  const [startValue, setStartValue] = useState<Airport | null>(null);
  const [destinationValue, setDestinationValue] = useState<Airport | null>(
    null
  );
  const [distance, setDistance] = useState<DistanceType | null>(null);

  const onChangeStartValue = (evt: Airport) => {
    if (evt) setStartValue(evt);
  };

  const onChangeDestinationValue = (evt: Airport) => {
    if (evt) setDestinationValue(evt);
  };

  const onCalculate = () => {
    if (startValue && destinationValue) {
      setDistance({
        value: calculateDistancebyAirports(startValue, destinationValue),
        startAirport: startValue,
        destinationAirport: destinationValue,
      });
    }
  };

  return (
    <Box sx={{ padding: 0, borderRadius: 0 }}>
      <Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
          zIndex: 900,
        }}
      >
        <Paper
          sx={{
            marginRight: {
              xs: "0px",
              sm: "0px",
              md: "40px",
              lg: "40px",
            },
            marginLeft: {
              xs: "0px",
              sm: "0px",
              md: "40px",
              lg: "40px",
            },
            p: "32px 24px 24px",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
          >
            Airport Distance Calculator
          </Typography>
          <Box
            sx={{
              py: "20px",
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
              },
              gap: { xs: "12px", sm: "12px", md: "24px" },
            }}
          >
            {airportsData && (
              <AutocompleteField
                getOptionKey={(u: Airport) => u.name + u.iata_code}
                getOptionLabel={(u: Airport) => u.name}
                getFilterOptions={(u: Airport) => u.name + u.iata_code}
                value={startValue}
                options={airportsData}
                label="Starting Airport"
                placeholder="Input name or code(iata)"
                onChange={onChangeStartValue}
              />
            )}

            {airportsData && (
              <AutocompleteField
                getOptionKey={(u: Airport) => u.name + u.iata_code}
                getOptionLabel={(u: Airport) => u.name}
                getFilterOptions={(u: Airport) => u.name + u.iata_code}
                value={destinationValue}
                options={airportsData}
                label="Destination Airport"
                placeholder="Input name or code(iata)"
                onChange={onChangeDestinationValue}
              />
            )}
            <Box>
              <Button
                variant="contained"
                sx={{
                  height: "100%",
                  textTransform: "capitalize",
                  fontSize: "16px",
                  width: "100%",
                }}
                onClick={() => onCalculate()}
              >
                Calculate
              </Button>
            </Box>
          </Box>

          {distance ? (
            <Typography
              variant="body2"
              align="center"
              sx={{ fontWeight: "normal" }}
            >
              <b>{distance?.value.toFixed(2)} NM</b> is the distance from &nbsp;
              <b>{distance?.startAirport.name}</b> to{" "}
              <b>{distance?.destinationAirport.name}</b>
              &nbsp;in United States.
            </Typography>
          ) : (
            <Typography
              variant="body2"
              align="center"
              sx={{ fontWeight: "normal" }}
            >
              Please enter the airport names (or IATA code ) of the two airports
              between which you need to find the distance in the text boxs below
              and click the 'Calculate' button.
            </Typography>
          )}
        </Paper>
      </Box>

      <AirportsMap distance={distance} />
    </Box>
  );
}
