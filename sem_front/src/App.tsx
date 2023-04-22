import './App.css'
import NavBar from "./components/NavBar";
import ReservationsOffer from "./components/ReservationsOffer";
import VytvoritRezervaci from "./pages/VytvoritRezervaci";
import MojeRezervace from "./pages/MojeRezervace";
import Home from "./pages/Home";

function App() {
    let component
    switch (window.location.pathname){
        case "/VytvoritRezervaci":
            component = <VytvoritRezervaci/>
            break
        case "/MojeRezervace":
            component = <MojeRezervace/>
            break
        case "/Home":
            component = <Home/>
            break
    }
    return <>
        <NavBar/>
        {component}
    </>
}

export default App
