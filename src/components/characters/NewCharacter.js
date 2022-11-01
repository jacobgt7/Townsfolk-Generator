import { useEffect, useState } from "react"
import { getGenders, getRandomUser, addCharacter, getRandomProfession } from "../ApiManager"
import { RandomCharacter } from "./RandomCharacter"


export const NewCharacter = ({ villageId, getCharacters, setCharacters }) => {

    const [newCharacter, setNewCharacter] = useState({
        name: "",
        genderId: 0,
        imgURL: "",
        profession: "",
        background: "",
        villageId: parseInt(villageId)

    })
    const [genders, setGenders] = useState([])
    const [showCharacterForm, setShowCharacterForm] = useState(false)

    useEffect(
        () => {
            getGenders()
                .then((gendersArray) => {
                    setGenders(gendersArray)
                })

        },
        []
    )


    const handleUserInputText = (event) => {
        const copy = { ...newCharacter }
        copy[event.target.name] = event.target.value
        setNewCharacter(copy)
    }

    const handleRandomNameButton = (event) => {
        event.preventDefault()

        const selectedGender = newCharacter.genderId

        let randomUserAPI = ""

        if (selectedGender === 1) {
            randomUserAPI = "https://randomuser.me/api/?gender=male&nat=US"
        } else if (selectedGender === 2) {
            randomUserAPI = "https://randomuser.me/api/?gender=female&nat=US"
        } else {
            randomUserAPI = "https://randomuser.me/api/?nat=US"
        }

        return getRandomUser(randomUserAPI)
            .then((randomUserData) => {
                const firstName = randomUserData.results[0].name.first
                const lastName = randomUserData.results[0].name.last
                const copy = { ...newCharacter }
                copy.name = firstName + " " + lastName
                setNewCharacter(copy)
            })

    }

    const handleRandomProfessionButton = (event) => {
        event.preventDefault()

        return getRandomProfession()
            .then((professionObj) => {
                const copy = { ...newCharacter }
                copy.profession = professionObj.name
                setNewCharacter(copy)
            })
    }


    const handleCreateButtonClick = (event) => {
        event.preventDefault()

        addCharacter(newCharacter)
            .then(() => {
                getCharacters(villageId)
                    .then(charactersArray => {
                        setCharacters(charactersArray)
                        setShowCharacterForm(false)
                        setNewCharacter({
                            name: "",
                            genderId: 0,
                            imgURL: "",
                            profession: "",
                            background: "",
                            villageId: parseInt(villageId)
                        })
                    })
            })

    }

    const handleCreateRandomCharacter = (event) => {
        event.preventDefault()

        newCharacter.genderId = Math.ceil(Math.random() * 2)
        const genderName = genders.find(gender => gender.id === newCharacter.genderId).name

        newCharacter.imgURL = `https://avatars.dicebear.com/api/${genderName.toLowerCase()}/${Math.random()}.svg`

        handleRandomProfessionButton(event)
            .then(() => {

                return handleRandomNameButton(event)
            })
            .then(() => {
                handleCreateButtonClick(event)

            })



    }


    return <>
        <section className="newCharacterFormContainer box">
            {
                showCharacterForm ? <>
                    <form className="newCharacterForm">
                        <fieldset>
                            {
                                genders.map(
                                    (gender) => {
                                        return <label key={`genderLabel--${gender.id}`}><input
                                            type="radio"
                                            checked={gender.id === newCharacter.genderId}
                                            value={gender.id}
                                            onChange={
                                                (e) => {
                                                    const copy = { ...newCharacter }
                                                    copy.genderId = parseInt(e.target.value)
                                                    copy.imgURL = `https://avatars.dicebear.com/api/${gender.name.toLowerCase()}/${Math.random()}.svg`
                                                    setNewCharacter(copy)
                                                }
                                            } /> {gender.name}</label>
                                    }
                                )
                            }
                        </fieldset>

                        <fieldset>
                            <label htmlFor="newCharacterName">
                                Name
                                <input
                                    type="text"
                                    id="newCharacterName"
                                    value={newCharacter.name}
                                    name="name"
                                    onChange={handleUserInputText} />
                            </label>
                            <button onClick={handleRandomNameButton} >Random</button>
                        </fieldset>


                        <fieldset>
                            <label htmlFor="newCharacterProfession">
                                Profession
                                <input
                                    type="text"
                                    id="newCharacterProfession"
                                    value={newCharacter.profession}
                                    name="profession"
                                    onChange={handleUserInputText} />
                            </label>
                            <button onClick={handleRandomProfessionButton} >Random</button>
                        </fieldset>

                        <button disabled={!newCharacter.name || !newCharacter.genderId}
                            onClick={handleCreateButtonClick}>Create</button>
                        <RandomCharacter genders={genders}
                            setShowCharacterForm={setShowCharacterForm}
                            villageId={villageId}
                            setCharacters={setCharacters}
                        />
                    </form>
                </>
                    :
                    <button onClick={() => { setShowCharacterForm(true) }}>New Character</button>

            }
        </section>
    </>

}