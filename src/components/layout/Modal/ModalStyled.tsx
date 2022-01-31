import styled from "styled-components";
import { baseShadow } from "../../../design/config";

export const ModalStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    div.background {
        opacity: 1;
        position: fixed;
        z-index: -1;
        height: 100vh;
        width: 100vw;
        background: rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(clamp(0.1em, 0.1vw, 0.2em));
        animation: showModal 100ms linear;
    }

    div.container {
        opacity: 1;
        background: white;
        margin: 0.8em;
        border-radius: 0.2em;
        ${baseShadow};
        animation: showModal 100ms linear;
    }

    @keyframes showModal {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;
