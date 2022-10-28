import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteCharacter, deleteVillage } from "../ApiManager"

export const DeleteVillage = ({ villageId, characters }) => {

    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false)

    const navigate = useNavigate()

    const handleDelete = () => {
        characters.forEach(
            character => {
                deleteCharacter(character)
            }
        )

        deleteVillage(villageId)
            .then(() => {
                navigate("/villages")
            })

    }

    return <div className="deleteButtonsContainer">
        {
            showConfirmationDelete ? <>
                Are you sure?
                <button className="delete" onClick={handleDelete}>Yes!</button>
                <button onClick={() => { setShowConfirmationDelete(false) }}>No! Wait!</button>
            </>
                : <button className="delete" onClick={() => { setShowConfirmationDelete(true) }}>Delete Village</button>
        }
    </div>
}