import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
export function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Spinner;
