import Card from "../../layout/Card";
import MarkerPreview from "../MarkerPreview";
import Map from "../Map";
import Navbar from "../Navbar";
import { connect } from "react-redux";
import { compose } from "redux";
import { getMarkerEdit } from "../../../store/actions/mapsActions";
import { useEffect, useState, ComponentType } from "react";
import { useParams } from "react-router-dom";
import { RootStyled } from "./RootStyled";

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

interface RootInterface {
    data: Data;
    auth: any;
    getMarkerEdit: (id: string) => void;
}

const Root = (props: RootInterface) => {
    const { data, auth, getMarkerEdit } = props;
    const { id }: { id: string } = useParams();
    const [showMarkerPreview, setShowMarkerPreview] = useState<boolean>(false);
    const [selectorMarker, setSelectorMarker] = useState<number | null>(null);
    const handleMarkerPreviewOpen = (id: number) => {
        setShowMarkerPreview(true);
        setSelectorMarker(id);
    };
    const handleMarkerPreviewClose = () => {
        setShowMarkerPreview(false);
        setSelectorMarker(null);
    };

    useEffect(() => getMarkerEdit(id), []);

    const content: JSX.IntrinsicAttributes = (
        <>
            {showMarkerPreview && selectorMarker !== null && <MarkerPreview marker={data.markers[selectorMarker]} handleModalPreviewClose={handleMarkerPreviewClose} />}
            <RootStyled>
                <Map data={data} handleMarkerPreviewOpen={handleMarkerPreviewOpen} />
            </RootStyled>
        </>
    );
    return (
        <>
            {auth.isEmpty && auth.isLoaded && <Navbar />}
            <Card content={content} />
        </>
    );
};

const mapStateToProps = (state: any) => {
    return {
        auth: state.firebase.auth,
        data: state.maps.data,
        cities: state.maps.cities,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getMarkerEdit: (id: string) => dispatch(getMarkerEdit(id)),
    };
};

export default compose<ComponentType>(connect(mapStateToProps, mapDispatchToProps))(Root);
