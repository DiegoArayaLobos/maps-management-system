import Button from "../../layout/Button";
import Select from "../../layout/Select";
import GpsNotFixedIcon from "@material-ui/icons/GpsNotFixed";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useHistory } from "react-router-dom";
import { PanelStyled } from "./PanelStyled";

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
    type: { value: string; label: string };
    name: string;
    description: string;
    image: File | null | string;
}

interface PanelInterface {
    location: string;
    region: { value: string; label: string };
    commune: { value: string; label: string };
    markers: Markers[];
    validateFormPanel: boolean;
    cities: Cities;
    handleRegion: (region: { value: string; label: string }) => void;
    handleCommune: (region: { value: string; label: string }) => void;
    handlePositionCity: () => void;
    handleSaveCity: () => void;
    handleEditMarker: (id: number | null) => void;
    handleDeleteMarker: (id: number) => void;
    handleEditPosition: (id: number) => void;
    resetEditMarker: () => void;
}

const Panel = (props: PanelInterface) => {
    const { location, markers, region, validateFormPanel, commune, cities, handleRegion, handleCommune, handlePositionCity, handleSaveCity, handleEditMarker, handleDeleteMarker, handleEditPosition, resetEditMarker } = props;
    const history = useHistory();

    let regions = cities.regions.map((city) => {
        return {
            label: city.name,
            value: city.number,
        };
    });

    const citiesFiltered = cities.regions.filter((city) => city.number === region.value);

    let communes = citiesFiltered.length > 0 ? citiesFiltered[0].communes.map((communes, index: number) => ({ value: index.toString(), label: communes.name })) : [{ value: "", label: "Seleccione una región" }];

    const handleRegionSelect = (e: { value: string; label: string } | null) => {
        e !== null && handleRegion(e);
        handleCommune({ value: "", label: "Seleccione una comuna" });
    };

    const handleCommuneSelect = (e: { value: string; label: string } | null) => {
        e !== null && handleCommune(e);
    };

    const handleCancel = () => {
        resetEditMarker();
        history.push("/");
    };

    return (
        <>
            <PanelStyled>
                <div className="section">
                    <div className="title">
                        <span>Configuración de Ciudad</span>
                    </div>
                </div>
                <div className="section">
                    <div className="location">
                        <label htmlFor="location">Locación:</label>
                        <span>{location}</span>
                    </div>
                    <div className="edit">
                        <Button content={<CreateIcon />} className={"edit"} onClick={handlePositionCity} />
                    </div>
                </div>
                <div className="section">
                    <div className="selectContainer">
                        <label htmlFor="">Región:</label>
                        <Select id="regionSelect" value={region} onChange={handleRegionSelect} options={regions} defaultValue={{ value: "", label: "Seleccione una región" }} isSearchable={true} validate={validateFormPanel && region.value === "" ? true : false} />
                    </div>
                </div>
                <div className="section">
                    <div className="selectContainer">
                        <label htmlFor="">Ciudad:</label>
                        <Select id="communeSelect" value={commune} onChange={handleCommuneSelect} options={communes} defaultValue={{ value: "", label: "Seleccione una comuna" }} isSearchable={true} validate={validateFormPanel && commune.value === "" ? true : false} />
                    </div>
                </div>
                <div className="section">
                    <div className="subtitle">
                        <span>Marcadores</span>
                    </div>
                </div>
                <div className="section">
                    <div className="markers">
                        {markers.map((marker: Markers, index: number) => {
                            return (
                                <div key={index} className="row">
                                    <div className="td">
                                        <div className="name">{marker.name}</div>
                                    </div>
                                    <div className="td">
                                        <div className="type">{marker.type.label}</div>
                                    </div>
                                    <div className="td action">
                                        <Button content={<GpsNotFixedIcon />} className={"position"} onClick={() => handleEditPosition(index)} />
                                    </div>
                                    <div className="td action">
                                        <Button content={<CreateIcon />} className={"edit"} onClick={() => handleEditMarker(index)} />
                                    </div>
                                    <div className="td action">
                                        <Button content={<DeleteForeverIcon />} className={"danger"} onClick={() => handleDeleteMarker(index)} />
                                    </div>
                                </div>
                            );
                        })}
                        {markers.length === 0 && (
                            <div className={`markersEmpty ${validateFormPanel && markers.length === 0 ? "validate" : ""}`}>
                                <span>{validateFormPanel && markers.length === 0 ? "Primero debe hacer click en el mapa para crear marcadores" : "Click en el mapa para crear marcadores"}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="section">
                    <div className="actions">
                        <Button content={"Cancelar"} className={"danger"} onClick={handleCancel} />
                        <Button content={"Guardar"} className={"submit"} onClick={handleSaveCity} />
                    </div>
                </div>
            </PanelStyled>
        </>
    );
};

export default Panel;
