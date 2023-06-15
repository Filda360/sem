import './App.css'
import NavBar from "./components/NavBar";
import VytvoritRezervaci from "./pages/VytvoritRezervaci";
import MojeRezervace from "./pages/MojeRezervace";
import Home from "./pages/Home";
import Prihlaseni from "./pages/Prihlaseni";


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
        case "/Prihlaseni":
            component = <Prihlaseni/>
            break
    }
    return <>
        <NavBar/>
        {component}
    </>
}

export default App