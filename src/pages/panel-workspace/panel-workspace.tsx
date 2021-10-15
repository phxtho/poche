import React, { useEffect } from "react";
import SearchBar from "components/searchbar/searchbar";
import { useSelector } from "react-redux";
import { ICanvas, ICanvasCard } from "model/interfaces";
import EditorContainer from "components/editor-container/editor-container";
import AddNoteFAB from "components/add-note-fab/add-note-fab";
import "./panel-workspace.css";
import { useNavigate } from "@reach/router";

export default function PanelWorkspace() {
  const cards: ICanvasCard[] = useSelector(
    (state: { openCanvas: ICanvas }) => state.openCanvas.items
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (cards.length == 0) {
      navigate("/experiment-501.V2");
    }
  }, [cards, navigate]);

  return (
    <div className="min-h-screen">
      <div id="top-bar" className="hidden md:flex flex-row-reverse p-8">
        <SearchBar />
      </div>
      <div className="editor-list">
        {cards.map((card, idx) => (
          <EditorContainer key={idx} id={card.id} />
        ))}
      </div>

      <AddNoteFAB />
    </div>
  );
}
