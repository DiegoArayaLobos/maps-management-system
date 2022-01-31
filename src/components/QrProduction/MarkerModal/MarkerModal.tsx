import Modal from "../../layout/Modal";
import Button from "../../layout/Button";
import Input from "../../layout/Input";
import Select from "../../layout/Select";
import TextArea from "../../layout/TextArea";
import MarkerType from "../MarkerTypes";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { MarkerModalStyled } from "./MarkerModalStyled";

interface Markers {
    lat: number;
    lng: number;
    type: { value: string; label: string };
    name: string;
    description: string;
    image: File | null | string;
}

interface MarkerModalInterface {
    type: { value: string; label: string };
    nameMarker: string;
    descriptionMarker: string;
    validateFormMarkerModal: boolean;
    imageMarker: File | null | string;
    selectorEditMarker: number | null;
    marker: Markers | null;
    editingMarker: boolean;
    handleModalClose: () => void;
    handleMarkers: (lat: number, lng: number, type: { value: string; label: string }, name: string, description: string, image: File | null | string) => void;
    handleType: (option: { value: string; label: string }) => void;
    handleNameMarker: (name: string) => void;
    handleDescriptionMarker: (description: string) => void;
    handleImageMarker: (image: File | string | null) => void;
    handleSaveMarker: () => void;
}

const MarkerModal = (props: MarkerModalInterface) => {
    const { type, nameMarker, descriptionMarker, validateFormMarkerModal, imageMarker, selectorEditMarker, marker, editingMarker, handleModalClose, handleType, handleNameMarker, handleDescriptionMarker, handleImageMarker, handleSaveMarker } = props;
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [imageState, setImageState] = useState<React.ReactElement>(
        <div className="imageDefault">
            <PhotoCameraIcon />
        </div>
    );
    const options = [
        { value: "banco", label: "Banco" },
        { value: "cabañaModerna", label: "Cabaña moderna" },
        { value: "cabañaRustica", label: "Cabaña Rustica" },
        { value: "domo", label: "Domo" },
        { value: "foodTrack", label: "Food track" },
        { value: "fuente", label: "Fuente" },
        { value: "gobierno", label: "Gobierno" },
        { value: "iglesia", label: "Iglesia" },
        { value: "observatorio", label: "Observatorio" },
        { value: "policias", label: "Policías" },
        { value: "restaurante", label: "Restaurante" },
    ];

    const handleChange = (event: React.ChangeEvent): void => {
        const target = event.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        const fileReNamed = new File([file], `${Date.now()}${file.name}`, { type: file.type });
        handleImageMarker(fileReNamed);
        let reader = new FileReader();
        reader.readAsDataURL(fileReNamed);
        reader.onload = function () {
            const img = React.createElement("img", { src: reader.result });
            setImageState(img);
        };
    };

    const handleChangeSelect = (e: { value: string; label: string } | null) => {
        e !== null && handleType(e);
    };

    const handleChangeName = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        handleNameMarker(target.value);
    };

    const handleChangeDescription = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement;
        handleDescriptionMarker(target.value);
    };

    const handleClick = (): void => {
        if (hiddenFileInput.current !== null) {
            hiddenFileInput.current.click();
        }
    };

    useEffect(() => {
        if (selectorEditMarker !== null && marker !== null && editingMarker === false) {
            handleType(marker.type);
            handleNameMarker(marker.name);
            handleDescriptionMarker(marker.description);
            if (marker.image !== null && typeof marker.image !== "string") {
                let reader = new FileReader();
                handleImageMarker(marker.image);
                reader.readAsDataURL(marker.image);
                reader.onload = function () {
                    const img = React.createElement("img", { src: reader.result });
                    setImageState(img);
                };
            }
        }

        if (selectorEditMarker !== null && marker !== null && editingMarker === true) {
            handleType(marker.type);
            handleNameMarker(marker.name);
            handleDescriptionMarker(marker.description);
            if (typeof marker.image === "string") {
                const img = React.createElement("img", { src: marker.image });
                setImageState(img);
                handleImageMarker(marker.image);
            } else if (marker.image !== null && typeof marker.image !== "string") {
                let reader = new FileReader();
                handleImageMarker(marker.image);
                reader.readAsDataURL(marker.image);
                reader.onload = function () {
                    const img = React.createElement("img", { src: reader.result });
                    setImageState(img);
                };
            }
        }
    }, [selectorEditMarker, marker]);

    const content = (
        <MarkerModalStyled type={type} imageMarker={imageMarker} validateFormMarkerModal={validateFormMarkerModal}>
            <div className="image">{imageState}</div>
            <div className="panel">
                <div className="section">
                    <div className="title">
                        <span>Configuración del Marcador</span>
                    </div>
                </div>
                <div className="section">
                    <div className="inputContainer">
                        <label htmlFor="">Nombre:</label>
                        <Input id="name" value={nameMarker} onChange={handleChangeName} validate={validateFormMarkerModal && nameMarker === "" ? true : false} />
                    </div>
                </div>
                <div className="section">
                    <div className="selectContainer">
                        <label htmlFor="">Tipo:</label>
                        <Select id="type" options={options} value={type} onChange={handleChangeSelect} validate={validateFormMarkerModal && type.value === "" ? true : false} />
                        <div className="icons">
                            <label htmlFor="">Icono:</label>
                            <MarkerType type={type.value} position={"form"} />
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="selectImage">
                        <input type="file" ref={hiddenFileInput} onChange={handleChange} />
                        <Button className={"fileImage"} content={"Seleccione una imagen"} onClick={handleClick} />
                    </div>
                </div>
                <div className="section">
                    <div className="subtitle">
                        <span>Descripción</span>
                    </div>
                </div>
                <div className="section">
                    <TextArea id="description" value={descriptionMarker} onChange={handleChangeDescription} validate={validateFormMarkerModal && descriptionMarker === "" ? true : false} />
                </div>
                <div className="section">
                    <div className="actions">
                        <Button className={"danger"} content={"Cancelar"} onClick={handleModalClose} />
                        <Button className={"submit"} content={"Guardar"} onClick={handleSaveMarker} />
                    </div>
                </div>
            </div>
        </MarkerModalStyled>
    );

    return (
        <>
            <Modal content={content} handleClose={handleModalClose} />
        </>
    );
};

export default MarkerModal;
