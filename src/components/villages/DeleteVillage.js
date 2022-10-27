import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const DeleteVillage = ({ villageId, characters }) => {

    const [showConfirmationDelete, setShowConfirmationDelete] = useState(false)

    const navigate = useNavigate()

    const handleDelete = () => {
        characters.forEach(
            character => {
                fetch(`http://localhost:8088/characters/${character.id}`, {
                    method: "DELETE"
                })
            }
        )

        fetch(`http://localhost:8088/villages/${villageId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
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