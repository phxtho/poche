import React from "react";
import { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import "./searchbar.css";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const Search = (query: string): any[] => {
    return [1, 2, 3];
  };

  return (
    <div className="relative">
      <div className="h-14 w-80 border border-black rounded-full flex justify-between pl-6 items-center relative">
        <input
          placeholder="Search"
          className="w-3/4 h-full bg-transparent overflow-ellipsis"
          type="text"
          value={query}
          onChange={(e) => {
            const { value } = e.target;
            setQuery(value);
            setResults(Search(value));
          }}
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
        />
        <button className="h-14 w-14 rounded-full bg-black text-white flex justify-center items-center">
          <VscSearch />
        </button>
      </div>

      {focused && query != "" && (
        <div className="search-results border border-black border-t-0 rounded-b-lg overflow-hidden">
          {results.map((val, idx) => {
            return (
              <button key={idx} className="result">
                {val}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
