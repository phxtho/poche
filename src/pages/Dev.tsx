import React from "react";
import Canvas from "components/canvas/canvas";
import { VscSearch } from "react-icons/vsc";

export default function Dev() {
  return (
    <div className="min-h-screen">
      <div id="top-bar" className="flex flex-row-reverse p-8">
        <div className="h-14 w-80 border border-black rounded-full flex justify-between pl-6 items-center">
          <input
            placeholder="Search"
            className="w-3/4 h-full bg-transparent overflow-ellipsis"
            type="text"
          />
          <button className="h-14 w-14 rounded-full bg-black text-white flex justify-center items-center">
            <VscSearch />
          </button>
        </div>
      </div>
      <Canvas />
    </div>
  );
}
