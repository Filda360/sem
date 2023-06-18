import './App.css'
import NavBar from "./components/NavBar";
import Mista from "./pages/Mista";
import MojeRezervace from "./pages/MojeRezervace";
import Home from "./pages/Home";
import Prihlaseni from "./pages/Prihlaseni";
import MojeUdaje from "./pages/MojeUdaje";
import NovaRezervace from "./pages/NovaRezervace";
import {Route, Routes} from "react-router-dom";
import Registrace from "./pages/Registrace";
import PridatMisto from "./pages/PridatMisto";


function App() {

    return <>
        <NavBar/>
        <div className={"container"}>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/Mista" element={<Mista/>}></Route>
                <Route path="/MojeRezervace" element={<MojeRezervace/>}></Route>
                <Route path="/Prihlaseni" element={<Prihlaseni/>}></Route>
                <Route path="/MojeUdaje" element={<MojeUdaje/>}></Route>
                <Route path="/Mista/NovaRezervace" element={<NovaRezervace/>}></Route>
                <Route path="/Registrace" element={<Registrace/>}></Route>
                <Route path="/PridatMisto" element={<PridatMisto/>}></Route>
            </Routes>
        </div>
    </>
}

export default App