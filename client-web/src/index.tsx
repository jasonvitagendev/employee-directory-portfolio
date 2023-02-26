import {createRoot} from "react-dom/client";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import App from "./App";

const appElement = document.getElementById("app");

if (appElement) {
    const client = new ApolloClient({
        uri: `${process.env.GRAPHQL_API}`,
        cache: new InMemoryCache(),
    });

    const root = createRoot(appElement);

    root.render(
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    );
}
