import React from "react";
import { Provider } from "react-redux"; // Import the Provider
import store from "./redux/store"; // Import the store
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
