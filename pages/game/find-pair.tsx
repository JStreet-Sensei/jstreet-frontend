//User can play quick answer game.
"use client";
import GameStateProvider from "../../components/context/GameStateProvider";
import SocketProvider from "../../components/context/SocketProvider";
import GamePair from "../../components/GamePair";
import isEqual from "lodash/isEqual";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { CardData, GameState, Lobby } from "@/types/game";
import { getSession } from "next-auth/react";
import { clone, compact } from "lodash";
import { DataItem } from "@/types/types";
import { fetchData, prepareCardDeck } from "@/utils/utils-data";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const FindPair = () => {
  // Socket or state
  const [useSocket, setSocket] = useState<Socket>({} as Socket);
  const [useGameState, setGameState] = useState<GameState>({
    message: "",
    lobby: null,
    playerName: "",
    playerId: 0,
    cardDeck: [] as CardData[],
    turn: 1, // First player
  } as GameState);

  // State if game is ready or not
  const [isGameStateReady, setGameStateReady] = useState(false);
  const [isSocketReady, setSocketReady] = useState(false);

  // Card states
  const [useCardData, setCardData] = useState<DataItem[]>([] as DataItem[]);
  const [useCardDeck, setCardDeck] = useState<CardData[]>([]);

  // Initilialize Card Deck
  useEffect(() => {
    fetchData().then((data) => {
      setCardData(data);
    });
  }, []);

  // Initiliaze card deck
  useEffect(() => {
    setCardDeck(prepareCardDeck(useCardData));
  }, [useCardData]);

  // Save the card deck inside the game state
  useEffect(() => {
    setGameState((prevState) => {
      prevState.cardDeck = useCardDeck;
      return prevState;
    });
  }, [useCardDeck]);

  // Initilialize gameState and socket
  useEffect(() => {
    console.log("Initilialize gameState");
    getSession().then((session) => {
      setGameState((prevGameState) => {
        prevGameState.playerName = session?.user.username || "Player";
        prevGameState.playerId = session?.user.pk || 0;
        return prevGameState;
      });
      setGameStateReady(true);
    });
  }, []);

  useEffect(() => {}, [useGameState]);

  // Initilialize socket after the gameState
  useEffect(() => {
    if (isGameStateReady) {
      const newSocket: Socket = io({
        query: {
          user_id: useGameState.playerId,
          username: useGameState.playerName,
        },
        path: "/api/socket",
      });

      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("start", () => {
        console.log("Game is started");
      });

      newSocket.on("join", (lobby: Lobby) => {
        console.log("New player joined the lobby", lobby);
        if (lobby) {
          const clone = structuredClone(lobby);
          setGameState(() => {
            const gameState = structuredClone(useGameState);
            gameState.lobby = clone;
            return gameState;
          });
        }
      });

      newSocket.on("left", (lobby: Lobby) => {
        console.log("A player left the lobby", lobby);
        if (lobby) {
          const clone = structuredClone(lobby);
          setGameState(() => {
            const gameState = structuredClone(useGameState);
            gameState.lobby = clone;
            return gameState;
          });
        }
      });

      // Get the update of the deck
      newSocket.on("gameUpdate", (cardDeck: CardData[], turn: number) => {
        console.log("Received an update");
        setGameState(() => {
          const newGameState = clone(useGameState);
          newGameState.cardDeck = cardDeck;
          return newGameState;
        });
      });

      newSocket.on("message", (msg: string) => {
        console.log("New message:", msg);
        // useGameState().message = msg;
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      setSocket(newSocket);
      setSocketReady(true);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isGameStateReady]);

  // Get the update from the child and emit to every client!
  const handleUpdateDeck = (cardDeck: CardData[]) => {
    if (!isEqual(cardDeck, useGameState.cardDeck)) {
      console.log(
        "Handle and update of the deck. Current game state",
        useGameState.cardDeck,
        " New deck is ",
        cardDeck,
      );
      setGameState(() => {
        const gameState = clone(useGameState);
        gameState.cardDeck = cardDeck;
        return gameState;
      });
      console.log("Send update to everyone");
    }
    useSocket.emit("gameUpdate", cardDeck);
  };

  if (!isGameStateReady || !isSocketReady) {
    return (
      <div>
        <h1>Please wait...</h1>
        <p>The game is still loading...</p>
      </div>
    );
  }

  return (
    <div>
      <SocketProvider parentSocket={useSocket}>
        <GameStateProvider parentGameState={useGameState}>
          <GamePair
            gameState={useGameState}
            handleUpdateDeck={handleUpdateDeck}
          ></GamePair>
        </GameStateProvider>
      </SocketProvider>
    </div>
  );
};

export default FindPair;
