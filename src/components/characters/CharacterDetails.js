import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CharacterDetailsDisplay } from "./CharacterDetailsDisplay"
import { CharacterDetailsEdit } from "./CharacterDetailsEdit"
import "./CharacterDetails.css"

export const CharacterDetails = () => {

    const { characterId } = useParams()

    const navigate = useNavigate()

    const [editMode, setEditMode] = useState(false)
    const [genders, setGenders] = useState([])
    const [character, setCharacter] = useState({})

    const getCharacter = () => {
        fetch(`http://localhost:8088/characters/${characterId}?_expand=gender`)
            .then(res => res.json())
            .then((characterObj) => {
                setCharacter(characterObj)

            })
    }

    useEffect(
        () => {

            getCharacter()

            fetch(`http://localhost:8088/genders`)
                .then(res => res.json())
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

        fetch(`http://localhost:8088/characters/${characterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedCharacter)
        }
        )
            .then(res => res.json())
            .then(() => {
                getCharacter()
                setEditMode(false)
            })
    }

    const handleDelete = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/characters/${characterId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
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
                    <button onClick={handleSave} >Save</button>
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