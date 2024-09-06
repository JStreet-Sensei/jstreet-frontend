import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { NextApiResponseServerIO } from "@/types/next";
import { Server } from "socket.io";
import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as IOServer } from "socket.io";
import { CardData, Lobby, Player } from "@/types/game";
import { isEqual } from "lodash";

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
      let player: Player;
      let matchDeck: CardData[];

      if (username) {
        // In case of username is an array we keep only first username
        if (Array.isArray(username)) username = username[0];
        // Create the player and save
        const playerInit: Player = { username, score: 0 };
        player = playerInit;
        // Push only if is not inside the lobby
        if (lobby.players.indexOf(player)) lobby.players.push(player);

        console.log("New client connected " + username);
        console.log("New lobby status is: ", lobby);

        // Send the new lobby to everyone
        io.emit("join", lobby);
      }
      // Send broadcast message
      socket.on("message", (msg: string) => {
        console.log("Message received:", msg);
        io.emit("message", msg); // Send a message to all clients
      });

      // When a user press Start to start the game the status will propagate to everyone
      socket.on("start", () => {
        console.log("Game start!");
        io.emit("start");
      });

      socket.on("gameUpdate", (cardDeck: CardData) => {
        console.log("Receivde a deck check if send...");
        if (isEqual(cardDeck, matchDeck)) console.log("Deck is equal, skip...");
        else {
          io.emit("gameUpdate", cardDeck);
          console.log("Send update...");
        }
      });

      socket.on("disconnect", () => {
        // Send the new lobby to everyone
        io.emit("left", lobby);
        // Remove player from lobby
        if (player) {
          // Remove from the array
          const usernameIndex = lobby.players.indexOf(player);
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
