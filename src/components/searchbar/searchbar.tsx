import { useContext, FunctionComponent } from "react";
import { useState } from "react";
import { VscSearch } from "react-icons/vsc";
import { search } from "@/db/pouch/notes";
import "./searchbar.css";
import { SearchResult } from "@/model/interfaces";
import NotesContext from "@/components/NotesContext";
import Fuse from "fuse.js";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const { items, addItem } = useContext(NotesContext);

  const navigate = useNavigate();
  const location = useLocation();
  const pathToPanel = "/poche/p";

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

      {query !== "" && results.length > 0 && (
        <div className="search-results rounded-b-lg overflow-hidden">
          {results.map((val) => {
            return (
              <SearchBarResult
                key={val.item.id}
                onResultClick={() => {
                  setQuery("");
                  addItem(items, val.item.id);
                  if (location.pathname !== pathToPanel) navigate(pathToPanel);
                }}
                result={val}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface SearchBarResultProps {
  onResultClick?;
  result: SearchResult;
}

const SearchBarResult: FunctionComponent<SearchBarResultProps> = ({
  result,
  onResultClick,
}) => {
  const matchTitle = result.matches.some((match) => match.key === "title");
  const matchText = result.matches.some((match) => match.key === "text");

  return (
    <button
      className="result bg-white text-left p-2"
      onClick={(_) => {
        onResultClick?.();
      }}
    >
      <div className="text-sm">
        {matchTitle &&
          result.matches.map((match, idx) => {
            if (match.key === "title") {
              return <HighlightMatch key={idx} match={match} />;
            } else return null;
          })}
        {!matchTitle && result.item.title}
      </div>
      <div className="text-xs font-extralight">
        {matchText &&
          result.matches.map((match, idx) => {
            if (match.key === "text") {
              return <HighlightMatch key={idx} match={match} />;
            } else return null;
          })}
        {!matchText && result.item.text}
      </div>
    </button>
  );
};

interface HiglightMatchProps {
  match: Fuse.FuseResultMatch;
}
const HighlightMatch: FunctionComponent<HiglightMatchProps> = ({ match }) => {
  const [[start, end]] = match.indices;
  return (
    <>
      {match.value?.substring(0, start)}
      <span className="bg-yellow-300">
        {match.value?.substring(start, end)}
      </span>
      {match.value?.substring(end, match.value?.length)}
    </>
  );
};
