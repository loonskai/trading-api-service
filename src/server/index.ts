import { createServer } from "https";
import { readFileSync } from "fs";
import { WebSocketServer } from "ws";

const {
  SERVER_HOSTNAME = "",
  SERVER_PORT = "",
  CERT_FILE_PATH = "",
  CERT_KEY_PATH = "",
} = process.env;

export const startServer = () => {
  const options = {
    key: readFileSync(CERT_KEY_PATH),
    cert: readFileSync(CERT_FILE_PATH),
  };
  const server = createServer(options, (_, res) => {
    res.writeHead(200);
    res.end("Hello world\n");
  });

  const wss = new WebSocketServer({ server });
  wss.on("connection", (ws) => {
    ws.on("message", (data) => {
      console.log("received: %s", data);
      ws.send("pong");
    });
  });

  server.listen(Number(SERVER_PORT), SERVER_HOSTNAME, undefined, () => {
    console.log(
      `Server is running on https://${SERVER_HOSTNAME}:${SERVER_PORT} ...`
    );
  });
};
