import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CharacterDetailsDisplay } from "./CharacterDetailsDisplay"
import { CharacterDetailsEdit } from "./CharacterDetailsEdit"
import "./CharacterDetails.css"
import { deleteCharacter, getCharacter, getGenders, replaceCharacter } from "../ApiManager"

export const CharacterDetails = () => {

    const { characterId } = useParams()

    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false)
    const [genders, setGenders] = useState([])
    const [character, setCharacter] = useState({})



    useEffect(
        () => {

            getCharacter(characterId)
                .then((characterObj) => {
                    setCharacter(characterObj)

                })

            getGenders()
                .then((gendersArray) => {
                    setGenders(gendersArray)
                })


        },
        []
    )

    useEffect(
        () => {
            setEditedCharacter({
                name: character.name,
                genderId: character.genderId,
                imgURL: character.imgURL,
                profession: character.profession,
                background: character.background,
                villageId: character.villageId
            })
        },
        [character]
    )

    const [editedCharacter, setEditedCharacter] = useState({
        name: character.name,
        genderId: character.genderId,
        imgURL: character.imgURL,
        profession: character.profession,
        background: character.background,
        villageId: character.villageId
    })

    const handleCancel = (event) => {
        event.preventDefault()

        setEditedCharacter({
            name: character.name,
            genderId: character.genderId,
            imgURL: character.imgURL,
            profession: character.profession,
            background: character.background,
            villageId: character.villageId
        })

        setEditMode(false)
    }

    const handleSave = (event) => {
        event.preventDefault()

        replaceCharacter(characterId, editedCharacter)
            .then(() => {
                getCharacter(characterId)
                    .then((characterObj) => {
                        setCharacter(characterObj)

                    })
                setEditMode(false)
            })
    }

    const handleDelete = (event) => {
        event.preventDefault()

        deleteCharacter(character)
            .then(() => {
                navigate(`/village/${character.villageId}`)
            })
    }


    return <div className="characterDetailsMainContainer" >
        <img src={character.imgURL} alt="character avatar" className="largeAvatar" />

        <div className="characterDetailsInnerContainer" >
            {
                editMode ? <CharacterDetailsEdit
                    genders={genders}
                    editedCharacter={editedCharacter}
                    setEditedCharacter={setEditedCharacter}
                />
                    : <CharacterDetailsDisplay character={character} />
            }
        </div>

        <div className="characterDetails__buttons">
            {
                editMode ? <>
                    <button onClick={handleCancel}>Cancel</button>
                    <button disabled={!editedCharacter.name} onClick={handleSave} >Save</button>
                    <button className="delete" onClick={handleDelete} >Delete</button>
                </>
                    : <>
                        <button onClick={() => { navigate(`/village/${character.villageId}`) }} >Back</button>
                        <button onClick={() => { setEditMode(true) }} >Edit</button>
                    </>
            }
        </div>

    </div>
}