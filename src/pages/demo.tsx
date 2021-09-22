import React from "react";
import Editor from "components/remirror-editor/remirror-editor";
import SearchBar from "components/searchbar/searchbar";

export default function Demo() {
  return (
    <div className="min-h-screen">
      <div id="top-bar" className="flex flex-row-reverse p-8">
        <SearchBar />
      </div>
    </div>
  );
}
