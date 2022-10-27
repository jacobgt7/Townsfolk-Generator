import { useEffect, useState } from "react"

export const NewCharacter = ({ villageId, getCharacters }) => {

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
            fetch(`http://localhost:8088/genders`)
                .then(res => res.json())
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

        let firstName = ""
        let lastName = ""

        const selectedGender = newCharacter.genderId

        let randomNameAPI = ""

        if (selectedGender === 1) {
            randomNameAPI = "https://randomuser.me/api/?gender=male&nat=US"
        } else if (selectedGender === 2) {
            randomNameAPI = "https://randomuser.me/api/?gender=female&nat=US"
        } else {
            randomNameAPI = "https://randomuser.me/api/?nat=US"
        }

        fetch(randomNameAPI)
            .then(res => res.json())
            .then((randomUserData) => {
                firstName = randomUserData.results[0].name.first
                lastName = randomUserData.results[0].name.last
                const copy = { ...newCharacter }
                copy.name = firstName + " " + lastName
                setNewCharacter(copy)
            })

    }


    const handleCreateButtonClick = (event) => {
        event.preventDefault()

        fetch(`http://localhost:8088/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCharacter)
        }
        )
            .then(res => res.json())
            .then(() => {
                getCharacters()
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

    }

    //to do: random name assignment
    //button on form
    //fetches from api specifying gender and nation
    //combine first and last name from data
    //update newCharacter with combined name
    return <>
        <section className="newCharacterFormContainer">
            {
                showCharacterForm ? <>
                    <form className="newCharacterForm">
                        <fieldset>
                            {
                                genders.map(
                                    (gender) => {
                                        return <label key={`genderLabel--${gender.id}`}><input
                                            type="radio"
                                            required
                                            checked={gender.id === newCharacter.genderId}
                                            value={gender.id}
                                            onChange={
                                                (e) => {
                                                    const copy = { ...newCharacter }
                                                    copy.genderId = parseInt(e.target.value)
                                                    copy.imgURL = `https://avatars.dicebear.com/api/${gender.name}/${Math.random()}.svg`
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
                                    required
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
                        </fieldset>

                        <button onClick={handleCreateButtonClick}>Create</button>
                    </form>
                </>
                    :
                    <button onClick={() => { setShowCharacterForm(true) }}>New Character</button>
            }
        </section>
    </>

}