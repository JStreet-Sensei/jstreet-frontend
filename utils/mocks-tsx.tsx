import React, { createContext, ReactElement, useEffect, useState } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { learningContextType, phraseType } from "../types/types";

export const SelectedMaterial = createContext<learningContextType | null>(null);

const TopicPhraseProviders = ({ children }: { children: React.ReactNode }) => {
  const TOPICS = ["First Contact", "Playing together", "Drinking"];
  const [selectedTopic, setSelectedTopic] = React.useState(TOPICS[0]);
  const [selectedPhrase, setSelectedPhrase] = React.useState<phraseType>({
    id: 1,
    japanese: "よっす",
    english: "Hi",
    description: "よっす is shorter version of おはようございます",
  });

  console.log(selectedTopic, selectedPhrase, "hoge");
  return (
    <SelectedMaterial.Provider
      value={{
        topic: selectedTopic,
        phrase: selectedPhrase,
        selectPhrase: setSelectedPhrase,
      }}
    >
      {children}
    </SelectedMaterial.Provider>
  );
};

const underTopicPhraseContextRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: TopicPhraseProviders, ...options });

export * from "@testing-library/react";
// export default TopicPhraseProviders
export default underTopicPhraseContextRender;
