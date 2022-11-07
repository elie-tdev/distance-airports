import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import AirportsData from "./components/airports/data";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <AirportsData />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
