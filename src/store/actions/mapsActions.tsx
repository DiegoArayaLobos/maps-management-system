interface Markers {
    lat: number;
    lng: number;
    type: { value: string; label: string };
    name: string;
    description: string;
    image: File | null | string;
}

interface MarkersFormatted {
    lat: number;
    lng: number;
    type: string;
    name: string;
    description: string;
    image?: File | null | string;
}

export const createQR = (latCity: number | null, lngCity: number | null, region: { value: string; label: string }, commune: { value: string; label: string }, markers: Markers[], id: string | null, imagesToDelete: string[] | null) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        let data = {
            lat: latCity,
            lng: lngCity,
            region: region.value,
            commune: commune.value,
        };
        if (id === null) {
            return firestore
                .collection("Markers")
                .add({
                    lat: data.lat,
                    lng: data.lng,
                    region: data.region,
                    commune: data.commune,
                })
                .then((r: any) => {
                    const markersData: MarkersFormatted[] = markers.map((marker: Markers) => {
                        let markerData: MarkersFormatted = {
                            lat: marker.lat,
                            lng: marker.lng,
                            type: marker.type.value,
                            name: marker.name,
                            description: marker.description,
                        };
                        if (marker.image !== null && typeof marker.image !== "string") {
                            firebase
                                .uploadFile(`images`, marker.image, `images`, { metadata: { contentType: "image/jpg" } })
                                .then((r: any) => console.log(r))
                                .catch((e: any) => console.log(e));
                            markerData = {
                                ...markerData,
                                image: `images/${marker.image?.name}`,
                            };
                        }
                        if (marker.image !== null && typeof marker.image === "string") {
                            markerData = {
                                ...markerData,
                                image: firebase.storage().refFromURL(marker.image).fullPath,
                            };
                        }
                        return markerData;
                    });
                    return firestore
                        .collection("Markers")
                        .doc(r.id)
                        .set({
                            lat: data.lat,
                            lng: data.lng,
                            region: data.region,
                            commune: data.commune,
                            markers: markersData,
                        })
                        .then(() => {
                            dispatch({ type: "CREATE_QR" });
                        })
                        .catch((e: any) => dispatch({ type: "ERROR_CREATE_QR" }));
                })
                .catch((e: any) => {
                    dispatch({ type: "ERROR_CREATE_QR" });
                });
        } else {
            const markersData: MarkersFormatted[] = markers.map((marker: Markers) => {
                let markerData: MarkersFormatted = {
                    lat: marker.lat,
                    lng: marker.lng,
                    type: marker.type.value,
                    name: marker.name,
                    description: marker.description,
                };
                if (marker.image !== null && typeof marker.image !== "string") {
                    firebase
                        .uploadFile(`images`, marker.image, `images`, { metadata: { contentType: "image/jpg" } })
                        .then((r: any) => console.log(r))
                        .catch((e: any) => console.log(e));
                    markerData = {
                        ...markerData,
                        image: `images/${marker.image?.name}`,
                    };
                }
                if (marker.image !== null && typeof marker.image === "string") {
                    markerData = {
                        ...markerData,
                        image: firebase.storage().refFromURL(marker.image).fullPath,
                    };
                }
                return markerData;
            });

            const storage = firebase.storage();

            imagesToDelete !== null &&
                imagesToDelete.forEach((image: string) => {
                    let desertRef = storage.ref(firebase.storage().refFromURL(image).fullPath);
                    desertRef.delete().catch((error: any) => console.log(error));
                });

            return firestore
                .collection("Markers")
                .doc(id)
                .set({
                    lat: data.lat,
                    lng: data.lng,
                    region: data.region,
                    commune: data.commune,
                    markers: markersData,
                })
                .then((r: any) => {
                    dispatch({ type: "CREATE_QR" });
                })
                .catch((e: any) => {
                    dispatch({ type: "ERROR_CREATE_QR" });
                });
        }
    };
};

export const resetMessage = () => {
    return (dispatch: any) => dispatch({ type: "RESET_MESSAGE" });
};
export const resetEditMarker = () => {
    return (dispatch: any) => dispatch({ type: "RESET_EDIT_MARKER" });
};

export const getQrList = () => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firestore = getFirestore();
        return firestore
            .collection("Markers")
            .get()
            .then((snapshot: any) => {
                if (snapshot.empty) {
                    return "No matching users.";
                } else {
                    const data = snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
                    dispatch({ type: "GET_QR_LIST", data });
                }
            })
            .catch((e: any) => {
                dispatch({ type: "ERROR_CREATE_QR" });
            });
    };
};

export const deleteMarker = (id: string) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        firestore
            .collection("Markers")
            .doc(id)
            .get()
            .then((snapshot: any) => {
                if (snapshot.exist) {
                    return "No matching document.";
                } else {
                    const data = snapshot.data();
                    data.markers.forEach((marker: Markers) => {
                        let desertRef = storage.ref(marker.image);
                        desertRef.delete().catch((error: any) => console.log(error));
                    });
                    return firestore
                        .collection("Markers")
                        .doc(id)
                        .delete()
                        .then(() => {
                            dispatch({ type: "DELETE_QR" });
                        })
                        .catch((e: any) => {
                            dispatch({ type: "ERROR_DELETE_QR" });
                        });
                }
            })
            .catch((e: any) => {
                dispatch({ type: "ERROR_SEARCH_QR_DELETE" });
            });
    };
};

export const getMarkerEdit = (id: string) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        return firestore
            .collection("Markers")
            .doc(id)
            .get()
            .then((snapshot: any) => {
                if (snapshot.data() === undefined) {
                    return "No matching.";
                } else {
                    const data = {
                        ...snapshot.data(),
                        id,
                    };

                    data.markers.forEach((marker: Markers) => {
                        firebase
                            .storage()
                            .ref(marker.image)
                            .getDownloadURL()
                            .then((url: any) => {
                                marker.image = url;
                            });
                    });
                    dispatch({ type: "GET_MARKER_EDIT", data });
                }
            })
            .catch((e: any) => {
                dispatch({ type: "ERROR_GET_MARKER_EDIT" });
            });
    };
};

export const signIn = (email: string, password: string) => {
    return (dispatch: any, getState: any, { getFirebase, getFirestore }: any) => {
        const firebase = getFirebase();

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((resp: any) => {
                dispatch({ type: "LOGIN_SUCCESS" });
            })
            .catch((err: any) => {
                dispatch({ type: "LOGIN_ERROR", err });
            });
    };
};

export const signOut = () => {
    return (dispatch: any, getState: any, { getFirebase }: any) => {
        const firebase = getFirebase();
        firebase
            .auth()
            .signOut()
            .then(() => {
                dispatch({ type: "SIGNOUT_SUCCESS" });
            });
    };
};
