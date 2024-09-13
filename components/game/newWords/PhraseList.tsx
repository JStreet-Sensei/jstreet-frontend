import { useContext } from 'react';
import { SelectedMaterial } from '@/pages/game/learning';

//get all phrase based on topic
const getAllPhrase = async (id: number) => {
  const result = 'test string';
  // const fetched = await fetch("endopinturl")
  // const result: phraseType = fetched.json()
  return result;
};

const PhraseList = () => {
  const selectedMaterial = useContext(SelectedMaterial);

  return (
    <>
      <div
        className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={() => {
          selectedMaterial?.selectPhrase({ id: 2, japanese: 'よっす' });
        }}
      >
        topic is :{selectedMaterial?.topic}
        phrase is :{selectedMaterial?.phrase.japanese}
        よっす
      </div>
      <div
        className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        onClick={() => {
          selectedMaterial?.selectPhrase({
            id: 3,
            japanese: 'おっす',
            english: 'hi',
            description: 'short version of おはようございます',
          });
        }}
      >
        topic is :{selectedMaterial?.topic}
        おっす
      </div>
      <div
        className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        topic is :{selectedMaterial?.topic}
        うっす
      </div>
      <div
        className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        topic is :{selectedMaterial?.topic}
        はいよ
      </div>
      <div
        className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        topic is :{selectedMaterial?.topic}
        わかった！
      </div>
    </>
  );
};

export default PhraseList;
