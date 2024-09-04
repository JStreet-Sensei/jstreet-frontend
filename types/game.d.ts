import { DataItem } from "./types";

interface CardData extends DataItem {
  guessedFrom: number;
  selected: boolean;
}
