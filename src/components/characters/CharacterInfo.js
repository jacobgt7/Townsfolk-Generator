import { useNavigate } from "react-router-dom"

export const CharacterInfo = ({ selectedCharacter }) => {

    const navigate = useNavigate()
    //display info for selected character
    //A button for character details page
    return <section className="characterInfo box">
        {
            selectedCharacter ? <>
                <img src={selectedCharacter.imgURL} alt="pixel character avatar" className="characterAvatar" />
                <h2>{selectedCharacter.name}</h2>
                <div>{selectedCharacter?.gender?.name}</div>
                <div>{selectedCharacter.profession}</div>
                <button onClick={() => { navigate(`/character/${selectedCharacter.id}`) }}>Details</button>
            </>
                : <h3>Select a character to see info...</h3>

        }
    </section>
}