import { useState } from "react"

export const NewVillage = ({ getVillages, townsfolkUserObject }) => {

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
        fetch(`http://localhost:8088/villages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVillage)
        })
            .then(res => res.json())
            .then(() => {
                getVillages()
                setDisplayForm(false)
            })


    }

    return <section className="newVillageForm">
        {
            displayForm ? <><input type="text" placeholder="Enter village name..." name="name" onChange={handleInput} />
                <button onClick={handleSaveButton}>Create Village</button></>
                : <button onClick={() => { setDisplayForm(true) }}>New Village</button>
        }
    </section>
}