import React from "react";
import { render } from "react-dom";
import "./styles.scss";
import { AppContainer } from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

render(
    <Provider store={store}>

            <AppContainer />

    </Provider>,
    document.getElementById("app")
);

