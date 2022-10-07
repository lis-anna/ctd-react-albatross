import React from "react";
import style from "./PageStyles.module.css";
import { useState } from "react";
import { useEffect } from "react";

const options = [
  { label: "Alphabetically", value: "Title" },
  { label: "Newest first", value: "createdTime" },
  { label: "Oldest first", value: "oldest" },
  { label: "High priority first", value: "Priotity" },
];

function SortingSection({ onChangeSorting, todo }) {
  const [sortingOption, setSortingOption] = useState("Title");

  return (
    <div className={style.sortingSection}>
      <label htmlFor="sortSelect"> Sort </label>
      <select
        id="sortSelect"
        value={sortingOption}
        onChange={(event) => {
          setSortingOption(event.target.value);
          onChangeSorting(event.target.value);
        }}
        className={style.sortingList}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default SortingSection;
