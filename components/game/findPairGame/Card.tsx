type CardProps = {
  frontText: string;
  backText: string;
};

export const Card: React.FC<CardProps> = ({ frontText, backText }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <p className="title">{frontText}</p>
          <p>Hover Me</p>
        </div>
        <div className="flip-card-back">
          <p className="title">{backText}</p>
          <p>Leave Me</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
