import LocationCityIcon from "@material-ui/icons/LocationCity";
import Observatorio from "../../../svg/Observatorio";
import Restaurante from "../../../svg/Restaurante";
import Banco from "../../../svg/Banco";
import CabañaModerna from "../../../svg/CabañaModerna";
import CabañaRustica from "../../../svg/CabañaRustica";
import Domo from "../../../svg/Domo";
import FoodTrack from "../../../svg/FoodTrack";
import Fuente from "../../../svg/Fuente";
import Gobierno from "../../../svg/Gobierno";
import Iglesia from "../../../svg/Iglesia";
import Policias from "../../../svg/Policias";
import { MarkerTypesStyled } from "./MarkerTypesStyled";

interface MarkerTypesInterface {
    lat?: number;
    lng?: number;
    type: string;
    position: string;
    id?: number | null;
    className?: string;
    handleDataModalPreview?: (id: number | null) => void;
}

const MarkerTypes = (props: MarkerTypesInterface) => {
    const { type, position, handleDataModalPreview = () => {}, id = null, className = "" } = props;
    return (
        <>
            <MarkerTypesStyled position={position} className={className} onClick={() => handleDataModalPreview(id)}>
                {type === "city" && <LocationCityIcon />}
                {type === "banco" && <Banco />}
                {type === "cabañaModerna" && <CabañaModerna />}
                {type === "cabañaRustica" && <CabañaRustica />}
                {type === "domo" && <Domo />}
                {type === "foodTrack" && <FoodTrack />}
                {type === "fuente" && <Fuente />}
                {type === "gobierno" && <Gobierno />}
                {type === "iglesia" && <Iglesia />}
                {type === "observatorio" && <Observatorio />}
                {type === "policias" && <Policias />}
                {type === "restaurante" && <Restaurante />}
            </MarkerTypesStyled>
        </>
    );
};

export default MarkerTypes;
