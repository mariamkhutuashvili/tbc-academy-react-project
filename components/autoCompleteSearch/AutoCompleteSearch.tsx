"use client";

import { Autocomplete, TextField } from "@mui/material";
import { useI18n } from "../../locales/client";

export default function AutoCompleteSearch({
  blogData,
  setSearch,
}: {
  blogData: BlogData[];
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useI18n();

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={blogData}
        getOptionLabel={(option) => option.title}
        onChange={(_event, value) => {
          setSearch(value ? value.title : "");
        }}
        sx={{
          width: 300,
          "& .MuiAutocomplete-endAdornment": {
            display: "none",
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
