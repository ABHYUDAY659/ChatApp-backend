# 💬 Real-Time Chat App (WebSocket)

A real-time chat application that allows users to join chat rooms and communicate instantly using WebSockets. This project uses:

- ⚙️ **Node.js + ws** for backend WebSocket communication


---

## 🔌 Features

### ✅ Backend (WebSocket Server)
- Built with `ws` library in Node.js
- Users can **join specific rooms**
- Messages are broadcast **only within that room**
- Users are **automatically removed** on disconnect
- Messages are sent in **real-time**
- JSON-based protocol for message types:
  - `"join"`: joins a room
  - `"chat"`: sends a chat message to the current room

---

## 🧠 Message Flow

### Join Room
```json
{
  "type": "join",
  "payload": {
    "roomId": "room123"
  }
}
