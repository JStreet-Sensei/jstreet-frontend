interface learningContextType {
  topic: string;
  phrase: phraseType;
  selectPhrase: React.Dispatch<React.SetStateAction<phraseType>>;
}

interface phraseType {
  id: number;
  japanese: string;
  english?: string;
  description?: string;
}

export type { learningContextType, phraseType };
