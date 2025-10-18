import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div style={{ marginTop: "10px", marginBottom: "20px", marginLeft:"20px"}}>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}// searchterm keeps on updating
        style={{
          padding: "10px 10px",
          width: "400px",
          borderRadius: "10px",
          border: "2px solid gray",
          backgroundColor: "#fff8c6"
        }}
      />
    </div>
  );
}

export default SearchBar;
