import Card from "../../layout/Card";
import QrPreview from "../QrPreview";
import List from "../List";
import { RouteComponentProps } from "react-router-dom";
import { useState, useEffect, ComponentType } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { getMarkerEdit, deleteMarker } from "../../../store/actions/mapsActions";
import { RootStyled } from "./RootStyled";
var QRCode = require("qrcode.react");

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

interface RootInterface extends RouteComponentProps<any> {
    data: Data[];
    cities: Cities;
    editingMarker: boolean;
    getQrList: () => void;
    getMarkerEdit: (id: string) => void;
    deleteMarker: (id: string) => void;
}

const Root = (props: RootInterface) => {
    const { data, cities, editingMarker, history, getMarkerEdit, deleteMarker } = props;

    const [showQR, setShowQR] = useState<boolean>(false);
    const [QRId, setQRId] = useState<null | string>(null);

    const handleQROpen = (): void => {
        setShowQR(true);
    };
    const handleQRClose = (): void => {
        setShowQR(false);
        setQRId(null);
    };

    const handleQRId = (id: string) => setQRId(id);

    useEffect(() => {
        if (editingMarker) {
            history.push("/qr-production");
        }
    }, [editingMarker, history]);

    const content: JSX.IntrinsicAttributes = (
        <>
            <QrPreview qr={<QRCode value={`https://maps-management-system.firebaseapp.com/map-view/${QRId}`} />} showQR={showQR} handleClose={handleQRClose} />
            <RootStyled>
                <div className="container">
                    <div className="header">
                        <div className="title">
                            <span>Lista de códigos QR</span>
                        </div>
                    </div>
                    <div className="body">
                        <List data={data} cities={cities} handleOpenQR={handleQROpen} getMarkerEdit={getMarkerEdit} deleteMarker={deleteMarker} handleQRId={handleQRId} />
                    </div>
                </div>
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
        data: state.firestore.ordered.Markers,
        cities: state.maps.cities,
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getMarkerEdit: (id: string) => dispatch(getMarkerEdit(id)),
        deleteMarker: (id: string) => dispatch(deleteMarker(id)),
    };
};

export default compose<ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        {
            collection: "Markers",
        },
    ])
)(Root);
