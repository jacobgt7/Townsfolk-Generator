import { Routes, Route, Outlet } from "react-router-dom"
import { CharacterDetails } from "../characters/CharacterDetails"
import { MyVillages } from "../villages/MyVillages"
import { VillageDetails } from "../villages/VillageDetails"

export const ApplicationViews = () => {

    return <>

        <Routes>
            <Route path="/" element={
                <Outlet />
            } >

                <Route path="villages" element={<MyVillages />} />
                <Route path="village/:villageId" element={<VillageDetails />} />
                <Route path="character/:characterId" element={<CharacterDetails />} />

            </Route>
        </Routes>

    </>

}