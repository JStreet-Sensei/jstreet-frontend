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

interface DataItem {
  front: string;
  back: string;
  match: number;
}

interface ApiResponse {
  data: DataItem[];
}

export type guessQuickAnswer = {
  userId: number,
  gueesedAnswerId: number,
}

export type { learningContextType, phraseType, DataItem, ApiResponse };
