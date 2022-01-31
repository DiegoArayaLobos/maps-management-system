import styled from "styled-components";
import { grayColor2, scrollBarColor } from "../../../design/config";

export const MarkerPreviewStyled = styled.div`
    display: flex;
    height: 80vh;
    width: 80vw;
    position: relative;

    div.close {
        cursor: pointer;
        position: absolute;
        right: clamp(0.7em, 1vh, 1.7em);
        top: clamp(0.5em, 1vh, 1.5em);
    }

    div.image {
        img {
            width: 50vw;
            height: 100%;
            border-radius: 0.2rem 0 0 0.2rem;
        }
        div.imageDefault {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50vw;
            height: 100%;
            background: ${grayColor2};
            border-radius: 0.2rem 0 0 0.2rem;
            svg {
                font-size: clamp(10em, 10vw, 12em);
            }
        }
    }

    div.panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: clamp(1em, 10vw, 2.3em);
        width: 100%;

        div.section.title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            height: 7%;
            span {
                font-size: calc(1rem + 0.4vw);
                font-weight: 600;
            }
        }
        div.section.description {
            height: 97%;
            overflow-y: scroll;
            margin-top: calc(0.2rem + 0.2vw);
            padding-right: calc(0.5rem + 0.5vw);
            text-align: justify;

            ::-webkit-scrollbar {
                width: 0.35em;
            }

            ::-webkit-scrollbar-thumb {
                background: ${scrollBarColor};
                border-radius: 1em;
            }

            span {
                font-size: calc(0.7rem + 0.4vw);
                font-weight: 100;
            }
        }
    }
`;
