import { useNavigate } from "react-router-dom"

export const CharacterList = ({ setSelectedCharacter, characters, mobileDisplay }) => {

    const navigate = useNavigate()

    return <section className="characters">
        {
            characters.map(
                character => {
                    return <div className="character"
                        key={`character--${character.id}`}
                        onClick={() => {
                            if (mobileDisplay) {
                                navigate(`/character/${character.id}`)
                            } else {
                                setSelectedCharacter(character)
                            }
                        }}>
                        <img src={character.imgURL} alt="pixel character avatar" className="characterAvatar" />
                        <h4>{character.name}</h4>
                    </div>
                }
            )
        }
    </section>
}