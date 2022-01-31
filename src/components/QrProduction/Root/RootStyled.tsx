import styled from "styled-components";
import { primaryColor } from "../../../design/config";

export const RootStyled = styled.div`
    display: flex;
    width: 100%;

    div.loadingModal {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: clamp(4em, 10vw, 8em);
        height: clamp(4em, 10vw, 8em);

        div.title {
            span {
                font-weight: 500;
            }
        }

        div.lds-ring {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
        }
        div.lds-ring div {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 64px;
            height: 64px;
            margin: 8px;
            border: 8px solid ${primaryColor};
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: ${primaryColor} transparent transparent transparent;
        }
        div.lds-ring div:nth-child(1) {
            animation-delay: -0.45s;
        }
        div.lds-ring div:nth-child(2) {
            animation-delay: -0.3s;
        }
        div.lds-ring div:nth-child(3) {
            animation-delay: -0.15s;
        }
        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
`;
