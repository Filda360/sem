
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function Home() {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <div className="text-center pb-5">
                    <h2>Vítejte na našich stránkách</h2>
                    <p className="lead">
                        Rybník Velký a Rybník Malý jsou opravdovým rájem pro vášnivé rybáře.
                        Obklopené malebnou krajinou a klidem přírody, tyto revíry nabízejí úžasnou možnost relaxace a odpočinku u vody.
                        Voda je zde křišťálově čistá a rybí bohatství je skutečně ohromující.
                    </p>
                    <p className="lead">
                        Naše rezervace vám umožňuje zarezervovat si rybářské místo na vybraném revíru, abyste mohli naplno vychutnat svou vášeň. Bez ohledu na to, zda jste začátečníkem nebo zkušeným rybářem, naše revíry jsou vhodné pro všechny úrovně dovedností. Jsme tu proto, abychom vám poskytli nezapomenutelné rybářské zážitky a zabezpečili, aby vaše návštěva byla plná radosti a úspěchů.
                    </p>
                    <p className="lead">
                        Doufáme, že vám naše rezervace na revírech Rybník Velký a Rybník Malý přinese mnoho nezapomenutelných momentů rybaření. Pokud máte nějaké otázky nebo potřebujete další informace, neváhejte nás kontaktovat. Jsme tu, abychom vám pomohli a zajišťovali vaše spokojenost. Užijte si svůj čas u vody a těšíme se na vaši návštěvu!
                    </p>
                </div>
                <Image src="https://drive.google.com/uc?export=view&id=1ZL78UAmW5i_KrWncjSKMRe7EWckHj4sY" alt="Rybník" fluid className="mb-4 rounded-4" />
            </div>
        </>
    );
}

export default Home;