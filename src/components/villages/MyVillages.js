import { useEffect, useState } from "react"
import { NewVillage } from "./NewVillage"
import { Link } from "react-router-dom"
import villageIcon from "./villageIcon.png"

export const MyVillages = () => {

    const [villages, setVillages] = useState([])

    const localTownsfolkUser = localStorage.getItem("townsfolk_user")
    const townsfolkUserObject = JSON.parse(localTownsfolkUser)

    const getVillages = () => {
        fetch(`http://localhost:8088/villages?userId=${townsfolkUserObject.id}`)
            .then(res => res.json())
            .then((villagesArray) => {
                setVillages(villagesArray)
            })
    }

    useEffect(
        () => {
            getVillages()
        },
        []
    )

    //display user villages
    //villages are links to village details page


    return <>
        <h1>My Villages</h1>

        <NewVillage getVillages={getVillages} townsfolkUserObject={townsfolkUserObject} />

        <section className="villages">
            {
                villages.map(
                    village => {
                        return <div className="village" key={`village--${village.id}`}>
                            <Link to={`/village/${village.id}`} >
                                <img src={villageIcon} />
                                <h4>{village.name}</h4>
                            </Link>
                        </div>
                    }
                )
            }
        </section>

        <footer className="attribute"><a href="https://www.flaticon.com/free-icons/village" title="village icons">Village icons created by Freepik - Flaticon</a></footer>

    </>
}