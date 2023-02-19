import {createRoot} from "react-dom/client";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import App from "./App";

const appElement = document.getElementById("app");

if (appElement) {
    const client = new ApolloClient({
        uri: "http://localhost:3000/graphql",
        cache: new InMemoryCache(),
    });

    const root = createRoot(appElement);

    root.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}
