export const CharacterDetailsEdit = ({ genders, editedCharacter, setEditedCharacter }) => {

    const handleUserInputText = (event) => {
        const copy = { ...editedCharacter }
        copy[event.target.name] = event.target.value
        setEditedCharacter(copy)
    }

    return <>
        <form className="characterDetails__column">
            <fieldset>
                <label htmlFor="editCharacterName">
                    Name
                    <input
                        type="text"
                        required
                        id="editCharacterName"
                        value={editedCharacter?.name}
                        name="name"
                        onChange={handleUserInputText} />
                </label>
            </fieldset>

            <fieldset>
                {
                    genders.map(
                        (gender) => {
                            return <label key={`genderLabel--${gender.id}`}><input
                                type="radio"
                                required
                                checked={gender.id === editedCharacter?.genderId}
                                value={gender.id}
                                onChange={
                                    (e) => {
                                        const copy = { ...editedCharacter }
                                        copy.genderId = parseInt(e.target.value)
                                        copy.imgURL = `https://avatars.dicebear.com/api/${gender.name.toLowerCase()}/${Math.random()}.svg`
                                        setEditedCharacter(copy)
                                    }
                                } /> {gender.name}</label>
                        }
                    )
                }
            </fieldset>

            <fieldset>
                <label htmlFor="editedCharacterProfession">
                    Profession
                    <input
                        type="text"
                        id="editedCharacterProfession"
                        value={editedCharacter?.profession}
                        name="profession"
                        onChange={handleUserInputText} />
                </label>
            </fieldset>
        </form>

        <form className="characterDetails__column">
            <fieldset className="characterBackground">
                <label htmlFor="editedCharacterBackground">Background</label>
                <textarea id="editedCharacterBackground"
                    name="background"
                    cols="50"
                    rows="12"
                    onChange={handleUserInputText}
                    value={editedCharacter?.background}
                ></textarea>

            </fieldset>
        </form>
    </>
}