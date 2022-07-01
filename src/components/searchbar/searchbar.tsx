import { useContext, FunctionComponent, useEffect } from "react";
import { useState } from "react";
import { getNotes, search } from "@/db/pouch/notes";
import "./searchbar.css";
import { INote, SearchResult } from "@/model/interfaces";
import { NotesContext } from "@/components/NotesContext";
import Fuse from "fuse.js";
import { useNavigate } from "react-router-dom";
import { paths } from "@/router/Routes";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  const { addItem, setSearchOpen } = useContext(NotesContext);

  const navigate = useNavigate();

  useEffect(() => {
    searchMostRecentNotes().then(setResults);

    return () => {
      setResults([]);
    };
  }, []);

  const Search = (query: string) => {
    search(query).then((res) => setResults(res));
  };

  const searchMostRecentNotes = async (): Promise<SearchResult[]> => {
    return (await getNotes(10)).map((note) => {
      return { item: note as unknown as INote, matches: [] };
    });
  };

  return (
    <div className="relative shadow-sm">
      <div className="h-10 w-full  rounded-full flex justify-between pl-6 items-center relative">
        <input
          placeholder="Search"
          className="w-full h-full bg-transparent overflow-ellipsis"
          type="text"
          value={query}
          onChange={async (e) => {
            const { value } = e.target;
            setQuery(value);
            if (value) Search(value);
            else setResults(await searchMostRecentNotes());
          }}
        />
      </div>

      {results.length > 0 && (
        <div className="search-results rounded-b-lg overflow-hidden">
          {results.map((val) => {
            return (
              <SearchBarResult
                key={val.item.id}
                onResultClick={() => {
                  setQuery("");
                  addItem(val.item.id);
                  navigate(`${paths.panelWorkspace}#${val.item.id}`);
                  setSearchOpen(false);
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
  onResultClick;
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
      className="result bg-white text-left py-2 px-6 h-14"
      onClick={() => {
        onResultClick();
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

        {!matchTitle && !result.item.title && (
          <span className="italic opacity-50">No Title</span>
        )}
      </div>
      <div className="text-xs font-extralight">
        {matchText &&
          result.matches.map((match, idx) => {
            if (match.key === "text") {
              return <HighlightMatch key={idx} match={match} />;
            } else return null;
          })}
        {!matchText && result.item.text}

        {!matchText && !result.item.text && (
          <span className="italic opacity-50">Empty</span>
        )}
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
