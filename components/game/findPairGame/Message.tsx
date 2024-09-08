import { useEffect, useState } from "react";

type MessageProps = {
  message: string;
};

export const Message: React.FC<MessageProps> = ({ message }) => {
  // Flip true means that show the back of the cards
  const [useMessage, setMessage] = useState(message);

  useEffect(() => {
    setMessage(message);
    new Promise((resolve) => setTimeout(resolve, 2000)).then(() =>
      setMessage(""),
    );
  }, [message]);

  return (
    <div>
      <p>Message: {useMessage}</p>
    </div>
  );
};

export default Message;
