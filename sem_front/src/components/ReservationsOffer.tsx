import RevirSelect from "./RevirSelect";
import MistaList from "./MistaList";
import {RevirData} from "../data/RevirData";
import {useState} from "react";



function ReservationsOffer(){

    const [revir, setRevir] = useState<RevirData>();
    function onRevirSelected(revir: RevirData){
        setRevir(revir);
    }

    return <>
        <br/>
        <RevirSelect onSelectRevir={onRevirSelected}/>
        <MistaList revir={revir}/>
    </>
}

export default ReservationsOffer;