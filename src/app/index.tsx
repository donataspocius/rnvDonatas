import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

import { store } from "./state/store";
import MainTab from "./navigation/MainTab";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar translucent backgroundColor="transparent" />
      <MainTab />
    </Provider>
  );
}

export default App;
