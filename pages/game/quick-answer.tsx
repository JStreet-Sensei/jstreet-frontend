import { useSocket } from "@/components/context/SocketProvider";
import SocketProvider from '@/components/context/SocketProvider';
import GameQuickAnswer from "@/components/game/quickAnswer/GameQuickAnswer";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GameQuickAnswerPage() {
  const socket = useSocket();

  //GameQuickAnswer : This contains the problem user should answer, deals user can choose. 
  //If user chose one deal once, user can't change their choice because of preventing the strategy to click all deals quickly.
  //This components receive the problem and deals from web socket.
  //User can send the content id once.
  //The detail can be discussed more.

  //QuickAnswerTimer : This shows the time passed from the beginning of a turn.
  //The time can be 5~15?

  //QuickAnswerScore : This shows the current score of all users in the game.
  //From web socket this component can receive the resutl after every game.

  return (
    <>
      <SocketProvider parentSocket={socket} >
        <GameQuickAnswer></GameQuickAnswer>
        <QuickAnswerTimer></QuickAnswerTimer>
        <QuickAnswerScore></QuickAnswerScore>
      </SocketProvider>

    </>
  )
}
