import React from "react";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export type AutocompleteFieldProps<T> = {
  getOptionLabel: (value: T) => string;
  getOptionKey: (value: T) => string;
  getFilterOptions: (value: T) => string;
  options: Readonly<T[]>;
  label?: string;
  placeholder?: string;
  value: T | null;
  onChange: (value: T) => void;
};

export function AutocompleteField<T>(props: AutocompleteFieldProps<T>) {
  const {
    onChange,
    value,
    options,
    getOptionLabel,
    getOptionKey,
    getFilterOptions,
    label,
    placeholder,
  } = props;

  const filterOptions = createFilterOptions({
    stringify: (option: T) => getFilterOptions(option),
  });

  return (
    <Box
      sx={{
        width: "100%",
        "& div": {
          display: "flex",
          gap: 1,
        },
      }}
    >
      <Autocomplete
        multiple={false}
        style={{ width: "100%" }}
        options={options}
        getOptionLabel={(option) => getOptionLabel(option)}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={getOptionKey(option)}>
            {getOptionLabel(option)}
          </Box>
        )}
        value={value}
        onChange={(event: React.SyntheticEvent, newValue: T | null) => {
          if (newValue) onChange(newValue);
        }}
        filterOptions={filterOptions}
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
      />
    </Box>
  );
}
