//User can play learning page.

import React, { useState, useEffect, createContext } from "react";
import { phraseType, learningContextType } from "../../types/types";
import PhraseList from "../../components/game/flashCard/PhraseList";
import { FlashCard } from "../../components/game/flashCard/FlashCard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const TOPICS = ["First Contact", "Playing together", "Drinking"]
export const SelectedMaterial = createContext<learningContextType | null>(null)

const FlashCardPage = () => {
  const [selectedTopic, setSelectedTopic] = useState(TOPICS[0])
  const [selectedPhrase, setSelectedPhrase] = useState<phraseType>({
    id: 0,
    japanese: "loading...",
  })

  //Just test for appearence, put useEffect here.
  useEffect(() => {
    setSelectedPhrase({
      id: 1,
      japanese: "よっす",
      english: "Hi",
      description: "よっす is shorter version of おはようございます"
    })
  }, [])

  return (
    <>
      <SelectedMaterial.Provider value={{ topic: selectedTopic, phrase: selectedPhrase, selectPhrase: setSelectedPhrase }}>
        <div className="grid grid-cols-3 gap-4">
          <div>
            Lets practice flash-card!
            <FlashCard></FlashCard>
          </div>
          <div>
            Each phrase list
            <PhraseList></PhraseList>
          </div>
          <div>
            Choose topic
            {TOPICS.map((elem, ind) => {
              return (
                <div className="block max-w-sm p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" key={ind}
                  onClick={() => {
                    setSelectedTopic(elem)
                  }}>
                  {elem}
                </div>
              )
            })}
          </div>
        </div>
      </SelectedMaterial.Provider>
    </>
  );
};

export default FlashCardPage;
