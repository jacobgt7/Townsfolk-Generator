
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CharacterInfo } from "../characters/CharacterInfo"
import { CharacterList } from "../characters/CharacterList"
import { NewCharacter } from "../characters/NewCharacter"
import { DeleteVillage } from "./DeleteVillage"
import "./VillageDetails.css"
import villageDetailsPic from "./villageDetailsPic.png"
import { getCharacters, getVillage, replaceVillage } from "../ApiManager"


export const VillageDetails = () => {

    const { villageId } = useParams()

    const localTownsfolkUser = localStorage.getItem("townsfolk_user")
    const townsfolkUserObject = JSON.parse(localTownsfolkUser)

    const [village, setVillage] = useState({
        name: "",
        userId: townsfolkUserObject.id
    })
    const [characters, setCharacters] = useState([])
    const [selectedCharacter, setSelectedCharacter] = useState(null)
    const [editName, setEditName] = useState(false)





    useEffect(
        () => {
            getVillage(villageId)
                .then((villageObj) => {
                    setVillage(villageObj)
                })

            getCharacters(villageId)
                .then((charactersArray) => {
                    setCharacters(charactersArray)
                })

        },
        []
    )

    const handleSaveNameButton = () => {
        replaceVillage(village)
            .then(() => {
                setEditName(false)
            })

    }

    return <>
        <div className="villageDetailsMainContainer">
            <NewCharacter villageId={villageId} getCharacters={getCharacters} setCharacters={setCharacters} />

            <div className="villageDetailsInnerContainer">
                <div className="villageNameContainer">
                    {
                        editName ?
                            <>
                                <input type="text" value={village.name} onChange={
                                    (e) => {
                                        const copy = { ...village }
                                        copy.name = e.target.value
                                        setVillage(copy)
                                    }
                                } />
                                <button disabled={!village.name} onClick={handleSaveNameButton}>Save</button>
                            </>
                            :
                            <>
                                <h1>{village.name}</h1>
                                <button onClick={() => { setEditName(true) }}>Edit Name</button>
                            </>
                    }
                </div>

                <DeleteVillage villageId={villageId} characters={characters} />

                <img className="villageImg" src={villageDetailsPic} alt="pixel art of a village" />

                <CharacterList characters={characters} setSelectedCharacter={setSelectedCharacter} />
            </div>

            <CharacterInfo selectedCharacter={selectedCharacter} />
        </div>
    </>

}