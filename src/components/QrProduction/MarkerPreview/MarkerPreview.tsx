import Modal from "../../layout/Modal";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import CloseIcon from "@material-ui/icons/Close";
import React, { useEffect, useState } from "react";
import { MarkerPreviewStyled } from "./MarkerPreviewStyled";

interface Markers {
    lat: number;
    lng: number;
    type: { value: string; label: string };
    name: string;
    description: string;
    image: File | null | string;
}

interface MarkerPreviewInterface {
    editingMarker: boolean;
    marker: Markers;
    handleModalPreviewClose: () => void;
}

const MarkerPreview = (props: MarkerPreviewInterface) => {
    const { marker, editingMarker, handleModalPreviewClose } = props;

    const [imageState, setImageState] = useState<React.ReactElement>(
        <div className="imageDefault">
            <PhotoCameraIcon />
        </div>
    );

    useEffect(() => {
        if (!editingMarker) {
            let reader = new FileReader();
            marker.image !== null && typeof marker.image !== "string" && reader.readAsDataURL(marker.image);
            reader.onload = function () {
                const img = React.createElement("img", { src: reader.result });
                setImageState(img);
            };
        } else {
            if (typeof marker.image === "string") {
                const img = React.createElement("img", { src: marker.image });
                setImageState(img);
            }
            if (typeof marker.image !== "string") {
                let reader = new FileReader();
                marker.image !== null && typeof marker.image !== "string" && reader.readAsDataURL(marker.image);
                reader.onload = function () {
                    const img = React.createElement("img", { src: reader.result });
                    setImageState(img);
                };
            }
        }
    }, [editingMarker, marker]);

    const content = (
        <MarkerPreviewStyled>
            <div className="close">
                <CloseIcon onClick={handleModalPreviewClose} />
            </div>
            <div className="image">{imageState}</div>
            <div className="panel">
                <div className="section title">
                    <span>{marker.name}</span>
                </div>
                <div className="section description">
                    <span>{marker.description}</span>
                </div>
            </div>
        </MarkerPreviewStyled>
    );
    return (
        <>
            <Modal content={content} handleClose={handleModalPreviewClose} />
        </>
    );
};

export default MarkerPreview;
