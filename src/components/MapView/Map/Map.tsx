import GoogleMapReact from "google-map-react";
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

interface Data {
    id: string;
    region: string;
    commune: string;
    lat: number;
    lng: number;
    markers: Markers[];
}

interface MapInterface {
    data: Data;
    handleMarkerPreviewOpen: (id: number) => void;
}

const Map = (props: MapInterface) => {
    const { data, handleMarkerPreviewOpen } = props;

    return (
        <>
            <MapStyled>
                {data && (
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "PUT_YOUR_API_KEY", libraries: ["visualization"] }}
                        defaultCenter={{ lat: data.lat, lng: data.lng }}
                        defaultZoom={12}
                        options={{
                            fullscreenControl: false,
                        }}
                    >
                        {data.lat !== null && data.lng !== null && <MarkerTypes position="map" lat={data.lat} lng={data.lng} type={"city"} />}
                        {data.markers.map((marker: Markers, index: number) => (
                            <MarkerTypes key={index} id={index} position="map" lat={marker.lat} lng={marker.lng} type={marker.type.value} handleDataModalPreview={() => handleMarkerPreviewOpen(index)} />
                        ))}
                    </GoogleMapReact>
                )}
            </MapStyled>
        </>
    );
};

export default Map;
