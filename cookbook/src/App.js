import logo from './logo.svg';
import React from 'react';
import Routing from './Routers/routes';
import store from "./Redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>

        <Routing />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
