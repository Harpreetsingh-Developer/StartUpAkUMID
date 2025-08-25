import React, { useState } from "react";
import "./SearchBarMain.scss";
import icons from "../../../../constants/icons";

const SearchBarMain = ({ placeholder = "Search...", onSearch }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="search-bar-main">
      <img src={icons.SearchIcon} alt="Search" className="search-bar-main-icon" />
      <input
        type="text"
        className="search-bar-main-input"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBarMain; 