import styled from "styled-components";
import { dangerColor, grayColor2, primaryColor, successColor } from "../../../design/config";

interface MarkerModalStyledInterface {
    type: { value: string; label: string };
    imageMarker: File | null | string;
    validateFormMarkerModal: boolean;
}

export const MarkerModalStyled = styled.div<MarkerModalStyledInterface>`
    display: flex;
    height: 80vh;
    width: 80vw;

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

        div.section {
            display: flex;
            justify-content: space-between;
            align-items: center;

            label {
                margin-right: clamp(0.1em, 0.5vw, 1.2em);
            }

            div.title {
                span {
                    font-size: calc(1rem + 0.4vw);
                    font-weight: 600;
                }
            }

            div.inputContainer {
                display: flex;
                align-items: center;
                width: 100%;
            }

            div.selectContainer {
                display: flex;
                align-items: center;
                width: 100%;

                svg {
                    text-align: right;
                    width: calc(1rem + 1vw);
                }

                div.icons {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: width 200ms;
                    overflow: hidden;
                    visibility: ${(props) => (props.type.value !== "" ? "visible" : "hidden")};
                    width: ${(props) => (props.type.value !== "" ? "50%" : "0%")};
                }
            }

            div.selectImage {
                display: flex;
                width: 100%;
                input[type="file"] {
                    display: none;
                }

                button {
                    width: 100%;
                    height: 5vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: "Roboto", sans-serif;
                    font-size: calc(0.8rem + 0.1vw);
                    font-weight: 700;
                    border-radius: 0.2em;
                    transition: all 200ms;
                }

                button.fileImage {
                    ${(props) => {
                        const valid = `background: ${primaryColor}; color: inherit;`;
                        const invalid = `background: ${dangerColor}; color: white;`;
                        if (props.validateFormMarkerModal && props.imageMarker === null) {
                            return invalid;
                        } else {
                            return valid;
                        }
                    }};
                }
            }

            div.subtitle {
                margin-top: calc(0.2rem + 0.2vw);
                span {
                    font-size: calc(0.7rem + 0.4vw);
                    font-weight: 600;
                }
            }

            div.actions {
                display: flex;
                width: 100%;
                button {
                    width: 100%;
                    height: 5vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: "Roboto", sans-serif;
                    font-size: calc(0.8rem + 0.1vw);
                    border-radius: 0.2em;
                    transition: background 100ms linear;
                }

                button.danger {
                    margin-right: calc(0.1rem + 0.1vw);
                    color: ${dangerColor};
                    background: white;
                    border: calc(0.1rem + 0.1vw) solid ${dangerColor};
                }

                button.danger:hover,
                button.danger:active {
                    background: ${dangerColor};
                    font-weight: 100;
                    color: white;
                }

                button.submit {
                    margin-left: calc(0.1rem + 0.1vw);
                    color: white;
                    background: ${successColor};
                }
            }
        }
    }
`;
