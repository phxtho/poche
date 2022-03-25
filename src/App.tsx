import Router from "@/router/Routes";
import "./App.css";
import NoteContextProvider from "@/components/NotesContext";

function App() {
  return (
    <NoteContextProvider>
      <Router />
    </NoteContextProvider>
  );
}

export default App;
