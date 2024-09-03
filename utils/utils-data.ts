import { ApiResponse, DataItem } from "../types/types";

//Fetch data from an API for pair game
export const fetchData = async (): Promise<DataItem[]> => {
  try {
    const response = await fetch("/api/data");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
