import MyLocationIcon from "@material-ui/icons/MyLocation";
import { MarkerConfirmStyled } from "./MarkerConfirmStyled";
interface MarkerConfirmInterface {
    lat: number;
    lng: number;
    handleConfirmCity: (confirm: boolean) => void;
}
const MarkerConfirm = (props: MarkerConfirmInterface) => {
    const { handleConfirmCity } = props;
    return (
        <>
            <MarkerConfirmStyled>
                <MyLocationIcon onClick={() => handleConfirmCity(true)} />
                <div className="info">
                    <span>Click para confirmar</span>
                </div>
            </MarkerConfirmStyled>
        </>
    );
};

export default MarkerConfirm;
