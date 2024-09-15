import { useEffect, useState } from 'react';
import gameStyles from '@/styles/Game.module.css';

type MessageProps = {
  message: string;
};

/**
 * This component receive a message and show for a timer of 2 seconds
 * @param message This is the message to show for 2 seconds
 * @returns
 */
export const Message: React.FC<MessageProps> = ({ message }) => {
  const [messagesQueue, setMessagesQueue] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  useEffect(() => {
    setMessagesQueue((prevQueue) => [...prevQueue, message]);
  }, [message]);

  useEffect(() => {
    if (messagesQueue.length === 0) return;

    setCurrentMessage(messagesQueue[0]);

    const timer = setTimeout(() => {
      setCurrentMessage('');
      setMessagesQueue((prevQueue) => prevQueue.slice(1));
    }, 1500);

    return () => clearTimeout(timer);
  }, [messagesQueue]);

  return (
    <div className="w-full flex justify-center items-center">
      <p className="text-white text-4xl font-bold h-5">{currentMessage}</p>
    </div>
  );
};

export default Message;
