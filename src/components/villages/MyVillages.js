import { useEffect, useState } from "react"
import { NewVillage } from "./NewVillage"
import { Link } from "react-router-dom"
import villageIcon from "./villageIcon.png"
import "./MyVillages.css"

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
        <h1 className="page_header">My Villages</h1>

        <NewVillage getVillages={getVillages} townsfolkUserObject={townsfolkUserObject} />

        <section className="villages">
            {
                villages.map(
                    village => {
                        return <Link to={`/village/${village.id}`} key={`village--${village.id}`} className="village">
                            <img src={villageIcon} alt="village icon" className="village__icon" />
                            <h4>{village.name}</h4>
                        </Link>

                    }
                )
            }
        </section>

        <footer className="attribute">
            <div>
                <a href="https://www.flaticon.com/free-icons/village" title="village icons">Village icons created by Freepik - Flaticon</a>
            </div>
        </footer>

    </>
}