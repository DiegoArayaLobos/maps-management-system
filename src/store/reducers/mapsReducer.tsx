import { cities } from "../storage/cities";

const initState = {
    authError: null,
    message: "",
    cities,
    data: null,
    editingMarker: false,
    signOut: false,
};

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

interface DataEdited {
    id: string;
    lat: number;
    lng: number;
    region: string;
    commune: string;
    markers: Markers[];
}

interface Data {
    id: string;
    lat: number;
    lng: number;
    region: string;
    commune: string;
    markers: MarkersEdit[];
}

interface MapsReducerInterface {
    type: string;
    data?: any;
    err?: any;
}

const mapsReducer = (state = initState, action: MapsReducerInterface) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                authError: null,
            };
        case "SIGNOUT_SUCCESS":
            return {
                authError: null,
                message: "",
                cities,
                data: null,
                editingMarker: false,
                signOut: true,
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                authError: action.err,
            };
        case "GET_QR_LIST":
            return {
                ...state,
                data: action.data,
            };
        case "CREATE_QR":
            return {
                ...state,
                message: "create",
            };
        case "ERROR_CREATE_QR":
            return {
                ...state,
            };
        case "RESET_MESSAGE":
            return {
                ...state,
                message: "",
            };
        case "RESET_EDIT_MARKER":
            return {
                ...state,
                data: null,
                editingMarker: false,
            };
        case "GET_MARKER_EDIT":
            const data: Data = action.data;
            let dataEdited: DataEdited;

            let markersEdited: Markers[] = [];
            data.markers.forEach((marker: MarkersEdit, index: number) => {
                markersEdited = [...markersEdited, marker];
                const value: string = marker.type;
                const label: string = `${marker.type[0].toUpperCase()}${marker.type.slice(1)}`;
                markersEdited[index].type = { value, label };
            });

            dataEdited = {
                id: data.id,
                lat: data.lat,
                lng: data.lng,
                region: data.region,
                commune: data.commune,
                markers: markersEdited,
            };

            return {
                ...state,
                editingMarker: true,
                data: dataEdited,
            };
        default:
            return state;
    }
};

export default mapsReducer;
