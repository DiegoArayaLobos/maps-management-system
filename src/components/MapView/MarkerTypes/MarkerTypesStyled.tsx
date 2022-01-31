import styled from "styled-components";
import { infoColor } from "../../../design/config";

interface MarkerTypesStyledInterface {
    position: string;
    onClick: () => void;
}

export const MarkerTypesStyled = styled.div<MarkerTypesStyledInterface>`
    ${(props) => {
        if (props.position === "map") {
            return `
                    position: absolute;
                    top: -5vh;
                    left: -5vw;
                    height: 4vw;
                    width: 10vw;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    svg {
                        font-size: 4em;
                        width: calc(0.8em + 1vw);
                        height: calc(0.8em + 1vw);
                    }`;
        }
        if (props.position === "form") {
            return `
    	            svg {
    	                font-size: 1em;
                        width: calc(1em + 1vw);
                        height: calc(1em + 1vw);
    	            }`;
        }
    }}

    &.selected {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        div.background {
            position: absolute;
            width: clamp(3em, 10vw, 5em);
            height: clamp(3em, 10vw, 5em);
            background: ${infoColor};
            border-radius: 50%;
            animation: pulseMarker 2s infinite;
            z-index: -1;
        }

        @keyframes pulseMarker {
            0% {
                background: transparent;
                color: ${infoColor};
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            }

            40% {
                background: ${infoColor};
                color: transparent;
                transform: scale(0.95);
                box-shadow: 0 0 0 0 ${infoColor};
            }

            50% {
                background: ${infoColor};
                color: transparent;
                transform: scale(0.95);
                box-shadow: 0 0 0 0 ${infoColor};
            }

            100% {
                background: transparent;
                color: ${infoColor};
                transform: scale(1);
                box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
            }
        }
    }
`;
