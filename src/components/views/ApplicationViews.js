import { Routes, Route, Outlet } from "react-router-dom"
import { MyVillages } from "../villages/MyVillages"

export const ApplicationViews = () => {

    return <>

        <Routes>
            <Route path="/" element={
                <Outlet />
            } >

                <Route path="villages" element={<MyVillages />} />
                <Route path="village/:villageId" element={<></>} />
            </Route>
        </Routes>

    </>

}