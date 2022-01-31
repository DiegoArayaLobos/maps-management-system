import styled from "styled-components";
import { baseColor, baseShadow, infoColor } from "../../../design/config";

export const MarkerConfirmStyled = styled.div`
    position: absolute;
    top: -5vh;
    left: -7vw;
    height: 4vw;
    width: 14vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg {
        color: ${baseColor};
        animation: location 2s infinite linear;
    }

    svg:hover ~ div.info {
        opacity: 1;
    }

    div.info {
        text-align: center;
        position: absolute;
        top: calc(0.2rem + 5vh);
        margin-top: 1vh;
        padding: calc(0.5em + 0.1vw) calc(0.7em + 0.1vw);
        background: white;
        ${baseShadow};
        opacity: 0;
        transition: opacity 100ms linear;
        pointer-events: none;
    }

    @keyframes location {
        0% {
            color: black;
        }

        40% {
            color: ${infoColor};
        }

        70% {
            color: ${infoColor};
        }

        100% {
            color: black;
        }
    }
`;
