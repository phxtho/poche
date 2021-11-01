import React, { useContext } from "react";
import { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { search } from "db/pouch/notes";
import "./searchbar.css";
import { SearchResult } from "model/interfaces";
import NotesContext from "components/NotesContext";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult>();

  const { items, addItem } = useContext(NotesContext);

  const Search = (query: string) => {
    search(query).then((res) => setResults(res));
  };

  return (
    <div className="relative shadow-sm">
      <div className="h-10 w-72  rounded-full flex justify-between pl-6 items-center relative">
        <input
          placeholder="Search"
          className="w-3/4 h-full bg-transparent overflow-ellipsis"
          type="text"
          value={query}
          onChange={(e) => {
            const { value } = e.target;
            setQuery(value);
            Search(value);
          }}
          onFocus={(e) => setFocused(true)}
          onBlur={(e) => setFocused(false)}
        />
        <button className="h-10 w-10 rounded-full bg-black text-white flex justify-center items-center">
          <VscSearch />
        </button>
      </div>

      {query !== "" && results?.total_rows > 0 && (
        <div className="search-results rounded-b-lg overflow-hidden">
          {results?.rows?.map((val, idx) => {
            return (
              <button
                key={idx}
                className="result"
                onClick={(_) => {
                  addItem(items, val.doc.id);
                  setQuery("");
                }}
              >
                {val.doc.title ?? val.doc.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
