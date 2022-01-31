import { ModalStyled } from "./ModalStyled";

interface ModalInterface {
    content: JSX.IntrinsicAttributes;
    handleClose?: () => void;
}

const Modal = (props: ModalInterface) => {
    const { content, handleClose = () => {} } = props;

    return (
        <>
            <ModalStyled>
                <div className="background" onClick={handleClose} />
                <div className="container">{content}</div>
            </ModalStyled>
        </>
    );
};

export default Modal;
