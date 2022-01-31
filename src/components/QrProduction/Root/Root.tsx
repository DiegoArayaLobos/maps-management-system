import Card from "../../layout/Card";
import MarkerModal from "../MarkerModal";
import MarkerPreview from "../MarkerPreview";
import Map from "../Map";
import Panel from "../Panel";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { createQR, resetMessage, resetEditMarker } from "../../../store/actions/mapsActions";
import { useEffect, useState, ComponentType } from "react";
import { RootStyled } from "./RootStyled";
import Modal from "../../layout/Modal";

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

interface MarkersEdit {
    lat: number;
    lng: number;
    type: string & { value: string; label: string };
    name: string;
    description: string;
    image: File | null | string;
}

interface Data {
    id: string;
    lat: number;
    lng: number;
    region: string;
    commune: string;
    markers: MarkersEdit[];
}

interface RootInterface extends RouteComponentProps {
    message: string;
    cities: Cities;
    editingMarker: boolean;
    markerToEdit: Data;
    createQR: (latCity: number | null, lngCity: number | null, region: { value: string; label: string }, commune: { value: string; label: string }, markers: Markers[], id: string | null, imagesToDelete: string[] | null) => void;
    resetMessage: () => void;
    resetEditMarker: () => void;
}

const Root = (props: RootInterface) => {
    const { createQR, resetMessage, resetEditMarker, message, cities, editingMarker, history, markerToEdit } = props;

    //Panel data
    const [latCity, setLatCity] = useState<number | null>(null);
    const [lngCity, setLngCity] = useState<number | null>(null);
    const [region, setRegion] = useState<{ value: string; label: string }>({ value: "", label: "Seleccione una región" });
    const [commune, setCommune] = useState<{ value: string; label: string }>({ value: "", label: "Seleccione una comuna" });

    //Marker Array
    const [markers, setMarkers] = useState<Markers[]>([]);

    //Marker City data
    const [confirmCity, setConfirmCity] = useState<boolean>(false);
    const [editCity, setEditCity] = useState<boolean>(false);

    //Modal data
    const [latMarker, setLatMarker] = useState<number | null>(null);
    const [lngMarker, setLngMarker] = useState<number | null>(null);
    const [type, setType] = useState<{ value: string; label: string }>({ value: "", label: "Seleccione una opción" });
    const [nameMarker, setNameMarker] = useState<string>("");
    const [descriptionMarker, setDescriptionMarker] = useState<string>("");
    const [imageMarker, setImageMarker] = useState<File | null | string>(null);
    const [imagesToDelete, setImagesToDelete] = useState<string[] | null>(null);

    //Modals state
    const [showModalMarker, setShowModalMarker] = useState<boolean>(false);
    const [showPreviewMarker, setShowPreviewMarker] = useState<boolean>(false);

    //Validate forms states
    const [validateFormPanel, setValidateFormPanel] = useState<boolean>(false);
    const [validateFormMarkerModal, setValidateFormMarkerModal] = useState<boolean>(false);

    //Selector marker
    const [selectorMarker, setSelectorMarker] = useState<number | null>(null);
    const [selectorEditMarker, setSelectorEditMarker] = useState<number | null>(null);

    //Data marker edit
    const [marker, setMarker] = useState<Markers | null>(null);

    //Edit position state
    const [editPosition, setEditPosition] = useState<boolean>(false);

    //Modal load state
    const [loadingModal, setLoadingModal] = useState<boolean>(false);

    //Handlers Panel
    const handleLatCity = (lat: number): void => setLatCity(lat);
    const handleLngCity = (lng: number): void => setLngCity(lng);
    const handleRegion = (region: { value: string; label: string }): void => setRegion(region);
    const handleCommune = (region: { value: string; label: string }): void => setCommune(region);

    //Handler Markers Array
    const handleMarkers = (lat: number, lng: number, type: { value: string; label: string }, name: string, description: string, image: File | null | string): void => setMarkers((arrPrev: Markers[]) => [...arrPrev, { lat: lat, lng: lng, type: type, name: name, description: description, image: image }]);

    //Handler City data
    const handlePositionCity = (): void => {
        setConfirmCity(!confirmCity);
        setEditCity(!editCity);
    };
    const handleConfirmCity = (confirm: boolean): void => {
        setConfirmCity(confirm);
        handleEditCity(false);
    };
    const handleEditCity = (edit: boolean): void => setEditCity(edit);

    //Handlers Modal data
    const handleLatMarker = (lat: number | null): void => setLatMarker(lat);
    const handleLngMarker = (lng: number | null): void => setLngMarker(lng);
    const handleType = (option: { value: string; label: string }): void => setType(option);
    const handleNameMarker = (name: string): void => setNameMarker(name);
    const handleDescriptionMarker = (description: string): void => setDescriptionMarker(description);
    const handleImageMarker = (image: File | null | string): void => setImageMarker(image);

    //Handlers Modals state
    const handleModalOpen = (): void => setShowModalMarker(true);
    const handleModalClose = (): void => {
        handleLatMarker(null);
        handleLngMarker(null);
        handleType({ value: "", label: "Seleccione una opción" });
        handleNameMarker("");
        handleDescriptionMarker("");
        handleImageMarker(null);
        setShowModalMarker(false);
        setValidateFormMarkerModal(false);
        setSelectorEditMarker(null);
    };
    const handleModalPreviewOpen = (): void => setShowPreviewMarker(true);
    const handleModalPreviewClose = (): void => setShowPreviewMarker(false);
    const handleEditPositionOpen = (): void => setEditPosition(true);
    const handleEditPositionClose = (): void => setEditPosition(false);

    const handleDataModalPreview = (id: number | null): void => {
        setSelectorMarker(id);
        handleModalPreviewOpen();
    };

    const handleEditMarker = (id: number | null): void => {
        setSelectorEditMarker(id);
        handleModalOpen();
    };

    const handleEditPosition = (id: number): void => {
        if ((!editPosition && selectorEditMarker === null) || (editPosition && selectorEditMarker !== id)) {
            handleEditPositionOpen();
            setSelectorEditMarker(id);
        } else {
            handleEditPositionClose();
            setSelectorEditMarker(null);
        }
    };

    const handlePositionMarker = (lat: number, lng: number) => {
        if (selectorEditMarker !== null) {
            let arrPrev: Markers[] = [...markers];
            arrPrev[selectorEditMarker].lat = lat;
            arrPrev[selectorEditMarker].lng = lng;
            setMarkers(arrPrev);
            setSelectorEditMarker(null);
            setEditPosition(false);
        }
    };

    const handleEditDataMarker = (lat: number, lng: number, type: { value: string; label: string }, name: string, description: string, image: File | null | string): void => {
        if (selectorEditMarker !== null) {
            let arrPrev: Markers[] = [...markers];
            arrPrev[selectorEditMarker].lat = lat;
            arrPrev[selectorEditMarker].lng = lng;
            arrPrev[selectorEditMarker].type = type;
            arrPrev[selectorEditMarker].name = name;
            arrPrev[selectorEditMarker].description = description;
            arrPrev[selectorEditMarker].image = image;
            setMarkers(arrPrev);
            setSelectorEditMarker(null);
        }
    };

    const handleDeleteMarker = (id: number): void => {
        let image = markers[id].image;
        if (!(image instanceof File) && image !== null) {
            handleImagesToDelete(image);
        }
        let arrPrev: Markers[] = [...markers];
        arrPrev.splice(id, 1);
        setMarkers(arrPrev);
    };

    const handleImagesToDelete = (image: string) => setImagesToDelete((arrPrev: string[] | null) => (arrPrev !== null ? [...arrPrev, image] : [image]));

    const handleSaveMarker = () => {
        let error = false;
        setValidateFormMarkerModal(true);
        if (nameMarker.trim() === "") {
            error = true;
        }
        if (type.value === "") {
            error = true;
        }
        if (imageMarker === null) {
            error = true;
        }
        if (descriptionMarker.trim() === "") {
            error = true;
        }

        if (!error && latMarker !== null && lngMarker !== null) {
            if (selectorEditMarker !== null) {
                handleEditDataMarker(latMarker, lngMarker, type, nameMarker, descriptionMarker, imageMarker);
            } else {
                handleMarkers(latMarker, lngMarker, type, nameMarker, descriptionMarker, imageMarker);
            }
            handleModalClose();
        }
    };

    const handleSaveCity = () => {
        let error = false;
        setValidateFormPanel(true);
        if (region.value === "") {
            error = true;
        }
        if (commune.value === "") {
            error = true;
        }
        if (markers.length === 0) {
            error = true;
        }
        if (!error) {
            if (editingMarker) {
                createQR(latCity, lngCity, region, commune, markers, markerToEdit.id, imagesToDelete);
            } else {
                createQR(latCity, lngCity, region, commune, markers, null, null);
            }
            setLoadingModal(true);
        }
    };

    const handleCoordinatesToUTM = (lat: number | null, lng: number | null): string => {
        if (lat !== null && lng !== null) {
            let x, y;
            let latn = Math.abs(lat); /* Devuelve el valor absoluto de un número, sea positivo o negativo */
            let latgr = Math.floor(latn * 1); /* Redondea un número hacia abajo a su entero más cercano */
            let latmin = Math.floor((latn - latgr) * 60); /* Vamos restando el número entero para transformarlo en minutos */
            let latseg = ((latn - latgr) * 60 - latmin) * 60; /* Restamos el entero  anterior ahora para segundos */
            let latc = latgr + "º" + latmin + "'" + latseg.toFixed(2) + '"'; /* Prolongamos a centésimas de segundo */
            if (lat > 0) {
                x = latc + "N"; /* Si el número original era positivo, es Norte */
            } else {
                x = latc + "S"; /* Si el número original era negativo, es Sur */
            } /* Repetimos el proceso para la longitud (Este, -W-Oeste) */
            let lngn = Math.abs(lng);
            let lnggr = Math.floor(lngn * 1);
            let lngmin = Math.floor((lngn - lnggr) * 60);
            let lngseg = ((lngn - lnggr) * 60 - lngmin) * 60;
            let lngc = lnggr + "º" + lngmin + "'" + lngseg.toFixed(2) + '"';
            if (lng > 0) {
                y = lngc + "E";
            } else {
                y = lngc + "W";
            }
            return `${x} ${y}`;
        } else {
            return "";
        }
    };

    const location = handleCoordinatesToUTM(latCity, lngCity);

    const loadingContent = (
        <RootStyled>
            <div className="loadingModal">
                <div className="title">
                    <span>{message === "create" ? "Listo!" : "Cargando ..."}</span>
                </div>
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </RootStyled>
    );

    useEffect(() => {
        if (selectorEditMarker !== null) {
            setMarker(markers[selectorEditMarker]);
            handleLatMarker(markers[selectorEditMarker].lat);
            handleLngMarker(markers[selectorEditMarker].lng);
        }
    }, [selectorEditMarker, markers]);

    useEffect(() => {
        if (message === "create") {
            setTimeout(() => {
                resetEditMarker();
                resetMessage();
                history.push("/");
            }, 500);
        }
    }, [message, history, resetMessage, resetEditMarker]);

    useEffect(() => {
        if (editingMarker && markerToEdit !== null) {
            handleLatCity(markerToEdit.lat);
            handleLngCity(markerToEdit.lng);
            handleRegion({ value: markerToEdit.region, label: cities.regions.filter((region) => region.number === markerToEdit.region)[0].name });
            handleCommune({ value: markerToEdit.commune, label: cities.regions.filter((region) => region.number === markerToEdit.region)[0].communes[parseInt(markerToEdit.commune)].name });
            setConfirmCity(true);
            setMarkers(markerToEdit.markers);
        }
    }, [editingMarker, markerToEdit, cities]);

    const content: JSX.IntrinsicAttributes = (
        <>
            {loadingModal && <Modal content={loadingContent} />}
            {showModalMarker && <MarkerModal type={type} nameMarker={nameMarker} descriptionMarker={descriptionMarker} validateFormMarkerModal={validateFormMarkerModal} imageMarker={imageMarker} marker={marker} selectorEditMarker={selectorEditMarker} editingMarker={editingMarker} handleType={handleType} handleModalClose={handleModalClose} handleMarkers={handleMarkers} handleNameMarker={handleNameMarker} handleDescriptionMarker={handleDescriptionMarker} handleImageMarker={handleImageMarker} handleSaveMarker={handleSaveMarker} />}
            {showPreviewMarker && selectorMarker !== null && <MarkerPreview editingMarker={editingMarker} marker={markers[selectorMarker]} handleModalPreviewClose={handleModalPreviewClose} />}
            <RootStyled>
                {/* Map Component */}
                <Map latCity={latCity} lngCity={lngCity} markers={markers} confirmCity={confirmCity} editCity={editCity} editPosition={editPosition} selectorEditMarker={selectorEditMarker} handleLatCity={handleLatCity} handleLngCity={handleLngCity} handleConfirmCity={handleConfirmCity} handleLatMarker={handleLatMarker} handleLngMarker={handleLngMarker} handleModalOpen={handleModalOpen} handleDataModalPreview={handleDataModalPreview} handlePositionMarker={handlePositionMarker} />
                {/* Panel Component */}
                {((confirmCity && !editCity) || (!confirmCity && editCity)) && <Panel location={location} markers={markers} region={region} handleRegion={handleRegion} commune={commune} validateFormPanel={validateFormPanel} cities={cities} handleCommune={handleCommune} handlePositionCity={handlePositionCity} handleSaveCity={handleSaveCity} handleEditMarker={handleEditMarker} handleDeleteMarker={handleDeleteMarker} handleEditPosition={handleEditPosition} resetEditMarker={resetEditMarker} />}
            </RootStyled>
        </>
    );
    return (
        <>
            <Card content={content} />
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        editingMarker: state.maps.editingMarker,
        message: state.maps.message,
        cities: state.maps.cities,
        markerToEdit: state.maps.data,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        createQR: (latCity: number, lngCity: number, comunne: { value: string; label: string }, region: { value: string; label: string }, markers: Markers[], id: string | null, imagesToDelete: string[] | null) => dispatch(createQR(latCity, lngCity, comunne, region, markers, id, imagesToDelete)),
        resetMessage: () => dispatch(resetMessage()),
        resetEditMarker: () => dispatch(resetEditMarker()),
    };
};

export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps))(Root);
