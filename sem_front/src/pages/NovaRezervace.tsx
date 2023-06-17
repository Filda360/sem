
import ReservationForm from "../components/ReservationForm";
import {useLocation} from "react-router-dom";

function NovaRezervace(){
    const {state} = useLocation();
    const { idMista, nazevMista, cenaZaNoc, nazevReviru } = state;

    return<>
        <ReservationForm idMista={idMista} nazevMista={nazevMista} cenaZaNoc={cenaZaNoc} nazevReviru={nazevReviru}/>
    </>
}

export default NovaRezervace