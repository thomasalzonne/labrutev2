import { Routes, Route } from "react-router"
import Brutes from "./pages/brutes"
import Home from "./pages/home"
import Arene from "./pages/arene"
import Fight from "./pages/fight"

export default function Router(){
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/brutes" element={<Brutes/>}/>
            <Route path="/arene/:id" element={<Arene/>}/>
            <Route path="/fight" element={<Fight/>} />
        </Routes>
    )
}