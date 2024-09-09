import { useSocket } from '@/context/SocketProvider';
import { ClientGameState } from '@/types/game';
import { useEffect, useState, useRef } from "react";
import type { phraseType as dealType } from '@/types/types';

export default function GameQuickAnswer() {
  const { socket } = useSocket();

  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null); //Question to show each user
  const [currentTurn, setCurrentTurn] = useState(0); //Current turn
  const [player, setPlayer] = useState<ClientGameState | null>(null)
  const [deals, setDeals] = useState<dealType[] | null>(null)
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const [timer, setTimer] = useState(15); // 15 seconds timer
  const intervalRef = useRef(null); // Reference for the timer interval

  const players: string[] = []; // Todo: need to plyers type 'GameContexType'
  const initialPlayerScores: Record<string, number>[] = (players.map((el) => Object.fromEntries([[el, 0]])))
  const [playerScores, setPlayerScores] = useState(initialPlayerScores);

  useEffect(() => {
    //Open socket
    if (socket) {
      socket.on("newQuestion", (question: string) => {
        // Todo: link the question (English ver)
        setCurrentQuestion(question);
        setSelectedCardId(null); // Reset card selection
      });

      socket.on("correctAnswer", (playerName: string) => {
        handleCorrectAnswer(playerName);
      });
    }

    return () => {
      if (socket) {
        socket.off("newQuestion");
        socket.off("correctAnswer");
      }
    };
  }, [socket]);

  const handleCardSelect = (cardId: number, playerName: string) => {
    setSelectedCardId(cardId);
    socket.emit("answerSelected", Object.fromEntries([[cardId, playerName]]));
  };

  const handleCorrectAnswer = (playerName: string) => {
    let newPlayerScores = playerScores
    for (let i = 0; i <= newPlayerScores.length - 1; i++) {
      const key = Object.keys(newPlayerScores[i])[0]
      if (key === playerName) {
        const previousScore = newPlayerScores[i][key]
        newPlayerScores[i] = Object.fromEntries([[key, previousScore + 1]])
      }
    }
    setPlayerScores(newPlayerScores)
  };

  return (
    <div>
      <h2>Quick Answer Game</h2>
      {
        (
          <>
            <p>
              Current Turn: {currentTurn} / {maxTurns}
            </p>
            <p>Time Left: {timer}s</p>

            {currentQuestion && (
              <div>
                <h3>Question: {currentQuestion}</h3>
                <p>Choose your answer:</p>
                {deals?.map((elem) => {
                  return (
                    <div key={elem.id} onClick={() => { handleCardSelect(elem.id, gameState.gameState.playerName) }}>
                      {elem.content}
                    </div>
                  )
                })}
              </div>
            )}

            <div>
              <h4>Scores:</h4>
              {playerScores.map((elem, ind) => (
                <p key={ind}>
                  {Object.keys(elem)[0]}: {Object.values(elem)[0]} points
                </p>
              ))}
            </div>
          </>
        )
      }
    </div>
  );
}
