import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";

import App from "./App";
import theme from "./theme";
import configureStore from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </Router>,
  document.getElementById("root")
);
