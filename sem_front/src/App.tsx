import './App.css'
import NavBar from "./components/NavBar";
import VytvoritRezervaci from "./pages/VytvoritRezervaci";
import MojeRezervace from "./pages/MojeRezervace";
import Home from "./pages/Home";
import Prihlaseni from "./pages/Prihlaseni";
import MojeUdaje from "./pages/MojeUdaje";
import NovaRezervace from "./pages/NovaRezervace";
import {Route, Routes} from "react-router-dom";
import Registrace from "./pages/Registrace";


function App() {
    // let component
    // switch (window.location.pathname){
    //     case "/VytvoritRezervaci":
    //         component = <VytvoritRezervaci/>
    //         break
    //     case "/MojeRezervace":
    //         component = <MojeRezervace/>
    //         break
    //     case "/":
    //         component = <Home/>
    //         break
    //     case "/Prihlaseni":
    //         component = <Prihlaseni/>
    //         break
    //     case "/MojeUdaje":
    //         component = <MojeUdaje/>
    //         break;
    //     case "/NovaRezervace":
    //         component = <NovaRezervace/>
    //         break;
    // }
    // return <>
    //     <NavBar/>
    //     {component}
    // </>

    return <>
        <NavBar/>
        <div className={"container"}>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/VytvoritRezervaci" element={<VytvoritRezervaci/>}></Route>
                <Route path="/MojeRezervace" element={<MojeRezervace/>}></Route>
                <Route path="/Prihlaseni" element={<Prihlaseni/>}></Route>
                <Route path="/MojeUdaje" element={<MojeUdaje/>}></Route>
                <Route path="/VytvoritRezervaci/NovaRezervace" element={<NovaRezervace/>}></Route>
                <Route path="/Registrace" element={<Registrace/>}></Route>
            </Routes>
        </div>
    </>
}

export default App