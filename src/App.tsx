import React from "react";
import Canvas from "components/canvas/canvas";
import NoteList from "components/note-list/note-list";
import { Provider } from "react-redux";
import store from "store";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Canvas />
        <NoteList />
      </Provider>
    </div>
  );
}

export default App;
