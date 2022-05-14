import { createServer } from "https";
import { readFileSync } from "fs";
import { WebSocketServer } from "ws";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { useServer } from "graphql-ws/lib/use/ws";

import { schema } from "./graphql/schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const {
  SERVER_HOSTNAME = "",
  SERVER_PORT = "",
  CERT_FILE_PATH = "",
  CERT_KEY_PATH = "",
} = process.env;

export const startServer = async () => {
  const credentials = {
    key: readFileSync(CERT_KEY_PATH),
    cert: readFileSync(CERT_FILE_PATH),
  };

  const app = express();
  const httpServer = createServer(credentials, app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const serverCleanup = useServer({ schema }, wsServer);
  const apolloServer = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await new Promise<void>((resolve) =>
    httpServer.listen(Number(SERVER_PORT), SERVER_HOSTNAME, undefined, resolve)
  );
  console.log(
    `Server is running on https://${SERVER_HOSTNAME}:${SERVER_PORT} ...`
  );
};
