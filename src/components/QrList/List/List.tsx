import CropFreeIcon from "@material-ui/icons/CropFree";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Button from "../../layout/Button";
import { useHistory } from "react-router-dom";
import { ListStyled } from "./ListStyled";

interface Cities {
    name: string;
    regions: {
        name: string;
        romanNumber: string;
        number: string;
        communes: {
            name: string;
        }[];
    }[];
}

interface Markers {
    lat: number;
    lng: number;
    type: string;
    name: string;
    description: string;
    image: File | null | string;
}

interface Data {
    id: string;
    region: string;
    commune: string;
    markers: Markers[];
}

interface ListInterface {
    data: Data[];
    cities: Cities;
    handleOpenQR: () => void;
    getMarkerEdit: (id: string) => void;
    deleteMarker: (id: string) => void;
    handleQRId: (id: string) => void;
}

const List = (props: ListInterface) => {
    const { data, cities, handleOpenQR, getMarkerEdit, deleteMarker, handleQRId } = props;

    const history = useHistory();

    const handleEditMarker = (id: string) => {
        getMarkerEdit(id);
    };
    const handleDeleteMarker = (id: string) => deleteMarker(id);
    const handleViewMap = (id: string) => history.push(id);
    const handleQR = (id: string) => {
        handleQRId(id);
        handleOpenQR();
    };

    return (
        <>
            <ListStyled>
                <div className="table">
                    <div className="head">
                        <div className="row">
                            <div className="cell">#</div>
                            <div className="cell">Ciudad</div>
                            <div className="cell">QR / Mapa</div>
                        </div>
                    </div>
                    <div className="body">
                        {data && cities ? (
                            data.map((city: Data, index: number) => (
                                <div key={city.id} className="row">
                                    <div className="cell">{index + 1}</div>
                                    <div className="cell">{cities.regions.filter((region) => region.number === city.region)[0].name}</div>
                                    <div className="cell">
                                        <div className="click icon" onClick={() => handleQR(city.id)}>
                                            <CropFreeIcon />
                                        </div>
                                        <div className="click icon" onClick={() => handleViewMap(`/map-view/${city.id}`)}>
                                            <VisibilityIcon />
                                        </div>
                                    </div>
                                    <div className="cell click options">
                                        <Button className="edit" content={<CreateIcon />} onClick={() => handleEditMarker(city.id)} />
                                        <Button className="delete" content={<DeleteForeverIcon />} onClick={() => handleDeleteMarker(city.id)} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>cargando ...</div>
                        )}
                    </div>
                </div>
            </ListStyled>
        </>
    );
};

export default List;
