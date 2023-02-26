import express from "express";
import http from "node:http";
import {ApolloServer} from "@apollo/server";
import {readFileSync} from "node:fs";
import path from "node:path";
import {resolvers} from "./resolvers";
import cors from "cors";
import bodyParser from "body-parser";
import {expressMiddleware} from "@apollo/server/express4";
import {CustomContext} from "./types/context";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";

async function start() {
    const app = express();

    const httpServer = http.createServer(app);

    const typeDefs = readFileSync(
        path.join(__dirname, "./static/schema.graphql"),
        {
            encoding: "utf-8",
        }
    );

    const apolloServer = new ApolloServer<CustomContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });

    await apolloServer.start();

    app.use(
        "/graphql",
        cors(),
        bodyParser.json(),
        expressMiddleware(apolloServer)
    );

    httpServer.listen(
        {
            port: process.env.PORT || 3000,
        },
        () => {
            console.log(
                `🚀 Server is ready at http://localhost:${
                    process.env.PORT || 3000
                }/graphql`
            );
        }
    );
}

try {
    start();
} catch (err) {
    console.error(err);
}
