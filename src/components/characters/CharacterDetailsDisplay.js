export const CharacterDetailsDisplay = ({ character }) => {

    return <>
        <div className="characterDetails__column" >
            <div><b>Name:</b> {character.name}</div>
            <div><b>Gender:</b> {character?.gender?.name}</div>
            <div><b>Profession:</b> {character.profession}</div>
        </div>

        <div className="characterDetails__column">
            <div className="characterBackgroundDisplay"><b>Background:</b> {character.background}</div>
        </div>
    </>
}