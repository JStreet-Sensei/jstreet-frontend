import { useContext, useEffect } from "react"
import { SelectedMaterial } from "../../../pages/game/flash-card"
import { phraseType } from "../../../types/types";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/";

export const FlashCard = () => {

    const selectedMaterial = useContext(SelectedMaterial)

    useEffect(() => {
        async () => {
            const phrase = await getOneCard()
            selectedMaterial?.selectPhrase(phrase)
        }
    }, [])

    interface oneCardResult {
        (): Promise<phraseType>
    }
    const getOneCard: oneCardResult = async () => {
        const fetched = await fetch(BACKEND_URL)
        const result: Promise<phraseType> = await fetched.json()
        return result
    }


    return (
        <>
            <div className="block max-w-full p-6 m-10 bg-white border border-gray-200 rounded-lg shadow 
            hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <p className="title">
                                Flip card front
                                {selectedMaterial?.phrase !== undefined ? (<>{selectedMaterial.phrase.english}</>) : <>null</>}<br></br>
                            </p>
                        </div>
                        <div className="flip-card-back">
                            <p className="title">
                                Flip card back
                                {selectedMaterial?.phrase !== undefined ? (<>{selectedMaterial.phrase.japanese}</>) : <>null</>}<br></br>
                                {selectedMaterial?.phrase !== undefined ? (<>{selectedMaterial.phrase.description}</>) : <>null</>}<br></br>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}