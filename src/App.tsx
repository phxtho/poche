import Router from "@/router/Routes";
import "./App.css";
import NoteContextProvider from "@/components/NotesContext";

function App() {
  return (
    <div className="App">
      <NoteContextProvider>
        <Router />
      </NoteContextProvider>
    </div>
  );
}

export default App;
