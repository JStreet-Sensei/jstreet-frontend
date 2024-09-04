import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIO } from "../../globals/types/next";
import { Server } from "socket.io";
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as IOServer } from "socket.io";
import { Lobby } from "../../globals/types/game";

export const config = {
  api: {
    bodyParser: false,
  },
};

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.io");

    // Define the lobby
    const lobby: Lobby = {
      name: "Game",
      owner: "",
      players: [],
    };

    const httpServer: NetServer = res.socket.server as any;

    const io = new IOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket: Socket) => {
      // Get data from query connection
      const user_id = socket.handshake.query.user_id;
      let username = socket.handshake.query.username;

      if (username) {
        // In case of username is an array we keep only first username
        if (Array.isArray(username)) username = username[0];
        // Push only if is not inside the lobby
        if (lobby.players.indexOf(username)) lobby.players.push(username);

        console.log("New client connected " + username);
        console.log("New lobby status is: ", lobby);

        // Send the new lobby to everyone
        io.emit("join", lobby);
      }
      socket.on("message", (msg: string) => {
        console.log("Message received:", msg);
        io.emit("message", msg); // Send a message to all clients
      });

      // When a user press Start to start the game the status will propagate to everyone
      socket.on("start", () => {
        console.log("Game start!");
        io.emit("start");
      });

      socket.on("disconnect", () => {
        // Remove player from lobby
        if (username) {
          // Remove from the array
          const usernameIndex = lobby.players.indexOf(username);
          if (usernameIndex !== -1) lobby.players.splice(usernameIndex, 1);

          // Update all the user is disconnected
          io.emit("left", lobby);
          console.log("Client left and emit and update to everyone. ");
        }

        console.log("Client disconnected ", username);
      });
    });

    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
