import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {
  Provider,
  Client,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
  createClient,
  Subscription,
  defaultExchanges,
} from "urql";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { RecoilRoot } from "recoil";
import CSSReset from "@chakra-ui/core/dist/CSSReset";
import ThemeProvider from "@chakra-ui/core/dist/ThemeProvider";
import theme from "@chakra-ui/core/dist/theme";

const subscriptionClient = new SubscriptionClient(
  "ws://localhost:5000/graphql",
  {
    reconnect: true,
  }
);

const client = createClient({
  url: "http://localhost:5000/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => subscriptionClient.request(operation),
    }),
  ],
});
ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Provider value={client}>
          <App />
        </Provider>
        <CSSReset />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
