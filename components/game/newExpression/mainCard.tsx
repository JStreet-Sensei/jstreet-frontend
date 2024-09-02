import { useContext } from "react"
import { SelectedMaterial } from "../../../pages/game/learning"

//
const getPhrase = async (id: number) => {
    const result = "test string"
    // const fetched = await fetch("endopinturl")
    // const result: phraseType = fetched.json()
    return result
}

const MainCard = () => {
    const selectedMaterial = useContext(SelectedMaterial)

    return (
        <>
            <div className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                {selectedMaterial?.phrase!==undefined?(<>{selectedMaterial.phrase.japanese}</>):<>null</>}<br></br>
                {selectedMaterial?.phrase!==undefined?(<>{selectedMaterial.phrase.english}</>):<>null</>}<br></br>
                {selectedMaterial?.phrase!==undefined?(<>{selectedMaterial.phrase.description}</>):<>null</>}<br></br>
            </div>
        </>
    )
}

export default MainCard