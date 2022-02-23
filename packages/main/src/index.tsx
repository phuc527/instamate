import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import ThemeProvider from "./theme-provider";

const queryClient = new QueryClient();

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);
