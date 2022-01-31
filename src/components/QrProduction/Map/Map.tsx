import GoogleMapReact, { ClickEventValue } from "google-map-react";
import MarkerConfirm from "../MarkerConfirm";
import MarkerTypes from "../MarkerTypes";
import { MapStyled } from "./MapStyled";

interface Markers {
    lat: number;
    lng: number;
    type: { value: string; label: string };
    name: string;
    description: string;
    image: File | null | string;
}

interface Map {
    latCity: number | null;
    lngCity: number | null;
    markers: Markers[];
    confirmCity: boolean;
    editCity: boolean;
    editPosition: boolean;
    selectorEditMarker: number | null;
    handleLatCity: (lat: number) => void;
    handleLngCity: (lng: number) => void;
    handleLatMarker: (lat: number) => void;
    handleLngMarker: (lng: number) => void;
    handleConfirmCity: (confirm: boolean) => void;
    handleModalOpen: () => void;
    handleDataModalPreview: (id: number | null) => void;
    handlePositionMarker: (lat: number, lng: number) => void;
}

const Map = (props: Map) => {
    const { latCity, lngCity, markers, confirmCity, editCity, editPosition, selectorEditMarker, handleLatCity, handleLngCity, handleConfirmCity, handleLatMarker, handleLngMarker, handleModalOpen, handleDataModalPreview, handlePositionMarker } = props;

    const center = {
        lat: -39,
        lng: -71.354083,
    };

    const handleOnClick = (e: ClickEventValue) => {
        if ((!confirmCity && !editCity) || (!confirmCity && editCity)) {
            handleLatCity(e.lat);
            handleLngCity(e.lng);
        }

        if (confirmCity && !editPosition) {
            handleLatMarker(e.lat);
            handleLngMarker(e.lng);
            handleModalOpen();
        }

        if (editPosition) {
            handlePositionMarker(e.lat, e.lng);
        }
    };

    return (
        <>
            <MapStyled confirmCity={confirmCity}>
                {GoogleMapReact && (
                    <GoogleMapReact bootstrapURLKeys={{ key: "PUT_YOUR_API_KEY", libraries: ["visualization"] }} defaultCenter={center} defaultZoom={4} onClick={handleOnClick}>
                        {latCity !== null && lngCity !== null && !confirmCity && <MarkerConfirm lat={latCity} lng={lngCity} handleConfirmCity={handleConfirmCity} />}
                        {latCity !== null && lngCity !== null && confirmCity && <MarkerTypes position="map" lat={latCity} lng={lngCity} type={"city"} />}
                        {markers.map((marker: Markers, index: number) => (
                            <MarkerTypes key={index} id={index} position="map" className={editPosition && selectorEditMarker === index ? "selected" : ""} lat={marker.lat} lng={marker.lng} type={marker.type.value} handleDataModalPreview={handleDataModalPreview} />
                        ))}
                    </GoogleMapReact>
                )}
            </MapStyled>
        </>
    );
};

export default Map;
