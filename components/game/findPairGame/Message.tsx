import { useEffect, useState } from 'react';

type MessageProps = {
  message: string;
};

/**
 * This component receive a message and show for a timer of 2 seconds
 * @param message This is the message to show for 2 seconds
 * @returns
 */
export const Message: React.FC<MessageProps> = ({ message }) => {
  // Flip true means that show the back of the cards
  const [useMessage, setMessage] = useState(message);

  useEffect(() => {
    setMessage(message);
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() => setMessage(''));
  }, [message]);

  return (
    <div>
      <p>Message: {useMessage}</p>
    </div>
  );
};

export default Message;
