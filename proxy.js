const WebSocket = require("ws");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./chat.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const chatProto = grpc.loadPackageDefinition(packageDefinition).chat;

const grpcClient = new chatProto.ChatService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Nouveau client WebSocket connecté.");

  const roomId = "room1"; // Changer dynamiquement selon le besoin
  grpcClient.GetChatHistory({ room_id: roomId }, (error, response) => {
    if (error) {
      console.error("Erreur lors de la récupération de l’historique:", error);
    } else {
      ws.send(JSON.stringify({ history: response.messages }));
    }
  });

  const grpcStream = grpcClient.Chat();

  grpcStream.on("data", (chatStreamMessage) => {
    console.log("Message reçu du serveur gRPC:", chatStreamMessage);
    ws.send(JSON.stringify(chatStreamMessage));
  });

  grpcStream.on("error", (err) => {
    console.error("Erreur dans le stream gRPC:", err);
    ws.send(JSON.stringify({ error: err.message }));
  });

  grpcStream.on("end", () => {
    console.log("Stream gRPC terminé.");
    ws.close();
  });

  ws.on("message", (message) => {
    console.log("Message reçu du client WebSocket:", message);
    try {
      const parsed = JSON.parse(message);
      grpcStream.write(parsed);
    } catch (err) {
      console.error("Erreur lors du parsing du message JSON:", err);
      ws.send(JSON.stringify({ error: "Format JSON invalide" }));
    }
  });

  ws.on("close", () => {
    console.log("Client WebSocket déconnecté, fermeture du stream gRPC.");
    grpcStream.end();
  });
});

console.log("Proxy WebSocket démarré sur ws://localhost:8080");
