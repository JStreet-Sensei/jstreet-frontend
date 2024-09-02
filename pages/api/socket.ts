import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIO } from "../../globals/types/next";
import { Server } from "socket.io";
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as IOServer } from "socket.io";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io");

    // Forziamo il tipo di `res.socket.server` a `NetServer`
    const httpServer: NetServer = res.socket.server as any;

    // Inizializziamo Socket.IO utilizzando il server HTTP
    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket: Socket) => {
      const user_id = socket.handshake.query.user_id;
      console.log("New client connected" + user_id);

      socket.on("message", (msg: string) => {
        console.log("Message received:", msg);
        io.emit("message", msg); // Invia il messaggio a tutti i client
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
