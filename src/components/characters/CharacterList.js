export const CharacterList = ({ setSelectedCharacter, characters }) => {

    return <section className="characters">
        {
            characters.map(
                character => {
                    return <div className="character"
                        key={`character--${character.id}`}
                        onClick={() => {
                            setSelectedCharacter(character)
                        }}>
                        <img src={character.imgURL} alt="pixel character avatar" className="characterAvatar" />
                        <h4>{character.name}</h4>
                    </div>
                }
            )
        }
    </section>
}