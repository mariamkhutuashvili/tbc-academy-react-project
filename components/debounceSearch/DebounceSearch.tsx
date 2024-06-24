"use client";

import { useI18n } from "../../locales/client";
import { ChangeEvent } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function DebounceSearch({ onChange }: SearchProps) {
  const t = useI18n();
  return (
    <div className="search-container">
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t("searchProducts")}
          className="search-input"
          onChange={onChange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
