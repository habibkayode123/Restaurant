import React from "react";
import Main from "./components/MainComponent";

import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();

import { NavigationContainer } from "@react-navigation/native";
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    );
  }
}
