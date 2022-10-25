import { useEffect, useState } from "react"

export const NewCharacter = ({ village, getCharacters }) => {

    const [newCharacter, setNewCharacter] = useState({
        name: "",
        genderId: 0,
        imgURL: "",
        profession: "",
        background: "",
        villageId: village.id

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
            })

    }


    return <>
        <section className="newCharacterForm">
            {
                showCharacterForm ? <>
                    <form>
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
                        </fieldset>

                        <fieldset>
                            {
                                genders.map(
                                    (gender) => {
                                        return <><label key={`genderLabel--${gender.id}`}><input
                                            type="radio"
                                            required
                                            key={`gender--${gender.id}`}
                                            checked={gender.id === newCharacter.genderId}
                                            value={gender.id}
                                            onChange={
                                                (e) => {
                                                    const copy = { ...newCharacter }
                                                    copy.genderId = parseInt(e.target.value)
                                                    copy.imgURL = `https://avatars.dicebear.com/api/${gender.name}/${Math.random()}.svg`
                                                    setNewCharacter(copy)
                                                }
                                            } /> {gender.name}</label> </>
                                    }
                                )
                            }
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