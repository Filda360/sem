import './App.css'
import NavBar from "./components/NavBar";
import VytvoritRezervaci from "./pages/VytvoritRezervaci";
import MojeRezervace from "./pages/MojeRezervace";
import Home from "./pages/Home";
import Prihlaseni from "./pages/Prihlaseni";
import MojeUdaje from "./pages/MojeUdaje";
import NovaRezervace from "./pages/NovaRezervace";


function App() {
    let component
    switch (window.location.pathname){
        case "/VytvoritRezervaci":
            component = <VytvoritRezervaci/>
            break
        case "/MojeRezervace":
            component = <MojeRezervace/>
            break
        case "/":
            component = <Home/>
            break
        case "/Prihlaseni":
            component = <Prihlaseni/>
            break
        case "/MojeUdaje":
            component = <MojeUdaje/>
            break;
        case "/NovaRezervace":
            component = <NovaRezervace/>
            break;
    }
    return <>
        <NavBar/>
        {component}
    </>
}

export default App