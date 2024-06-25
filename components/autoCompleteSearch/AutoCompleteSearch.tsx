"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useI18n } from "../../locales/client";
import "./AutocompleteSearch.css";

export default function AutoCompleteSearch({
  blogData,
  setSearch,
}: {
  blogData: BlogData[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useI18n();

  return (
    <div className="autocomplete-search">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={blogData}
        getOptionLabel={(option) => option.title}
        noOptionsText={t("noOptions")}
        onChange={(_event, value) => {
          setSearch(value ? value.title : "");
        }}
        sx={{
          width: 300,
          "& .MuiAutocomplete-endAdornment": {
            display: "none",
          },
          "& .MuiInputLabel-root": {
            color: "grey",
            "&.Mui-focused": {
              color: "purple",
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "purple",
            },
            "&:hover fieldset": {
              borderColor: "darkviolet",
            },
            "&.Mui-focused fieldset": {
              borderColor: "purple",
            },
          },
        }}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            {...params}
            label={t("searchBlog")}
          />
        )}
      />
    </div>
  );
}
