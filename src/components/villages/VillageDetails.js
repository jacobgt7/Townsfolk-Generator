
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CharacterInfo } from "../characters/CharacterInfo"
import { CharacterList } from "../characters/CharacterList"
import { NewCharacter } from "../characters/NewCharacter"
import { DeleteVillage } from "./DeleteVillage"


export const VillageDetails = () => {

    const { villageId } = useParams()

    const localTownsfolkUser = localStorage.getItem("townsfolk_user")
    const townsfolkUserObject = JSON.parse(localTownsfolkUser)

    const [village, setVillage] = useState({
        name: "",
        userId: townsfolkUserObject.id
    })
    const [characters, setCharacters] = useState([])
    const [editName, setEditName] = useState(false)

    const getCharacters = () => {
        fetch(`http://localhost:8088/characters?villageId=${villageId}`)
            .then(res => res.json())
            .then((charactersArray) => {
                setCharacters(charactersArray)
            })
    }

    useEffect(
        () => {
            fetch(`http://localhost:8088/villages/${villageId}`)
                .then(res => res.json())
                .then((villageObj) => {
                    setVillage(villageObj)
                })

            getCharacters()

        },
        []
    )

    const handleSaveNameButton = () => {
        fetch(`http://localhost:8088/villages/${villageId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(village)
        }
        )
            .then(res => res.json())
            .then(() => {
                setEditName(false)
            })

    }

    return <>
        <div className="villageDetailsMainContainer">
            <NewCharacter village={village} getCharacters={getCharacters} />

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
                                <button onClick={handleSaveNameButton}>Save</button>
                            </>
                            :
                            <>
                                <h1>{village.name}</h1>
                                <button onClick={() => { setEditName(true) }}>Edit Name</button>
                            </>
                    }
                </div>

                <DeleteVillage />

                <img className="villageImg" />

                <CharacterList />
            </div>

            <CharacterInfo />
        </div>
    </>

}