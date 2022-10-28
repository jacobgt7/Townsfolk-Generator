import { useEffect, useState } from "react"
import { NewVillage } from "./NewVillage"
import { Link } from "react-router-dom"
import villageIcon from "./villageIcon.png"
import "./MyVillages.css"
import { getVillages } from "../ApiManager"


export const MyVillages = () => {

    const [villages, setVillages] = useState([])

    const localTownsfolkUser = localStorage.getItem("townsfolk_user")
    const townsfolkUserObject = JSON.parse(localTownsfolkUser)


    useEffect(
        () => {
            getVillages(townsfolkUserObject)
                .then((villagesArray) => {
                    setVillages(villagesArray)
                })
        },
        []
    )

    //display user villages
    //villages are links to village details page


    return <>
        <h1 className="page_header">My Villages</h1>

        <NewVillage getVillages={getVillages} townsfolkUserObject={townsfolkUserObject} setVillages={setVillages} />

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