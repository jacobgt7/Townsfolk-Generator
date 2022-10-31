import { useState } from "react"
import { addVillage } from "../ApiManager"

export const NewVillage = ({ getVillages, townsfolkUserObject, setVillages }) => {

    const [newVillage, setNewVillage] = useState({
        name: "",
        userId: townsfolkUserObject.id
    })

    const [displayForm, setDisplayForm] = useState(false)

    const handleInput = (event) => {
        const copy = { ...newVillage }
        copy[event.target.name] = event.target.value
        setNewVillage(copy)
    }

    const handleSaveButton = () => {
        addVillage(newVillage)
            .then(() => {
                getVillages(townsfolkUserObject)
                    .then((villagesArray) => {
                        setVillages(villagesArray)
                        setDisplayForm(false)
                    })
            })


    }

    return <section className="newVillageForm box">
        {
            displayForm ? <><input type="text" placeholder="Enter village name..." name="name" onChange={handleInput} />
                <button disabled={!newVillage.name} onClick={handleSaveButton}>Create Village</button></>
                : <button onClick={() => { setDisplayForm(true) }}>New Village</button>
        }
    </section>
}