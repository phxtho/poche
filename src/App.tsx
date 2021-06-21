import React from "react";
import Routes from "router/Routes";
import { Provider } from "react-redux";
import store from "store";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routes />
      </Provider>
    </div>
  );
}

export default App;
