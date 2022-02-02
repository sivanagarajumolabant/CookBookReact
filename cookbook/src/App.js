import logo from './logo.svg';

import Routing from './Routers/routes';
import  store  from "./Redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={store}>
  
  <Routing/>
  </Provider>
  );
}

export default App;
