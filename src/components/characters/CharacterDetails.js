import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const CharacterDetails = () => {

    const { characterId } = useParams()

    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false)
    const [character, setCharacter] = useState({})
    const [editedCharacter, setEditedCharacter] = useState({
        name: character.name,
        genderId: character.genderId,
        imgURL: character.imgURL,
        profession: character.profession,
        background: character.background,
        villageId: character.villageId
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/characters/${characterId}?_expand=gender`)
                .then(res => res.json())
                .then((characterObj) => {
                    setCharacter(characterObj)
                })

        },
        []
    )

    //handle delete
    //handle save
    //display details in two columns
    //img at top center

    return <>
        <img src={character.imgURL} alt="character avatar" className="largeAvatar" />

    </>
}