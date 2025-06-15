import { WebSocketServer, WebSocket } from "ws";

// Start WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Define a type for connected users with their socket and room
interface User {
  socket: WebSocket;
  room: string;
}

// Store all connected users
let allSockets: User[] = [];

// Handle new connections
wss.on("connection", (socket) => {
  console.log("🔌 New user connected");

  // Handle incoming messages from this client
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());

    // User is joining a room
    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId
      });
      console.log(`👥 User joined room ${parsedMessage.payload.roomId}`);
    }

    // User is sending a chat message
    if (parsedMessage.type === "chat") {
      // Find the room of the current socket
      const sender = allSockets.find(user => user.socket === socket);
      const currentUserRoom = sender?.room;

      // Broadcast to others in the same room
      allSockets.forEach(user => {
        if (user.room === currentUserRoom) {
          user.socket.send(parsedMessage.payload.message);
        }
      });
    }
  });

  // Handle client disconnection
  socket.on("close", () => {
    allSockets = allSockets.filter(user => user.socket !== socket);
    console.log("❌ User disconnected and removed");
  });
});
