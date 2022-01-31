import React from "react";
import Modal from "../../layout/Modal";
import { QrPreviewStyled } from "./QrPreviewStyled";

interface QrPreviewInterface {
    qr: any;
    showQR: boolean;
    handleClose: () => void;
}

const QrPreview = (props: QrPreviewInterface) => {
    const { qr, showQR, handleClose } = props;

    const content = <QrPreviewStyled>{qr}</QrPreviewStyled>;

    return <>{showQR && <Modal content={content} handleClose={handleClose} />}</>;
};

export default QrPreview;
