import styled from "styled-components";
import { dangerColor, grayColor2, grayColor3, infoColor, primaryColor, scrollBarColor, successColor, warningColor } from "../../../design/config";

export const PanelStyled = styled.div`
    width: 50%;
    animation: showPanel 500ms;
    padding: clamp(1em, 10vw, 2.3em);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div.section {
        display: flex;
        justify-content: space-between;
        align-items: center;

        div.title {
            span {
                font-size: calc(1rem + 0.4vw);
                font-weight: 600;
            }
        }

        div.subtitle {
            span {
                font-size: calc(0.8rem + 0.4vw);
                font-weight: 600;
            }
        }

        div.location {
            display: flex;
            align-items: center;
            width: 100%;
            span {
                width: 100%;
                text-align: center;
                margin: 0 clamp(0.1em, 0.5vw, 1.2em);
                border-bottom: clamp(0.1em, 0.4vh, 0.2em) solid ${primaryColor};
            }
        }

        div.selectContainer {
            display: flex;
            align-items: center;
            width: 100%;

            label {
                margin-right: clamp(0.1em, 0.5vw, 1.2em);
            }
        }

        div.edit {
            width: 10%;
            button {
                width: 100%;
                height: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-family: "Roboto", sans-serif;
                font-size: calc(0.8rem + 0.1vw);
                font-weight: 100;
                border-radius: 0.1em;
                margin: calc(0.1rem + 0.1vw);
            }

            button.edit {
                background: ${warningColor};
            }
        }

        div.markers {
            background: ${grayColor2};
            height: 30vh;
            width: 100%;
            border-radius: 0.2em;
            overflow-y: auto;
            ::-webkit-scrollbar {
                width: 0.8em;
            }
            ::-webkit-scrollbar-thumb {
                background: ${scrollBarColor};
                border-radius: 1em;
                border: 0.2em solid ${grayColor2};
            }

            div.markersEmpty {
                display: flex;
                justify-content: center;
                align-items: center;
                height: inherit;

                span {
                    font-weight: 100;
                    text-align: center;
                }
            }

            div.markersEmpty.validate {
                span {
                    font-weight: 300;
                    color: ${dangerColor};
                }
            }

            div.row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                div.td {
                    width: 100%;
                    text-align: center;
                }
                div.td.action {
                    width: 30%;
                    button {
                        width: 100%;
                        height: 5vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: transparent;
                        font-family: "Roboto", sans-serif;
                        font-size: calc(0.8rem + 0.1vw);
                        font-weight: 100;
                        border-radius: 0.1em;
                        transition: all 100ms linear;
                    }
                    button.position:hover,
                    button.position:active {
                        background: ${infoColor};
                        font-weight: 100;
                        color: white;
                    }
                    button.edit:hover,
                    button.edit:active {
                        background: ${warningColor};
                        font-weight: 100;
                        color: white;
                    }
                    button.danger:hover,
                    button.danger:active {
                        background: ${dangerColor};
                        font-weight: 100;
                        color: white;
                    }
                }
            }
            div.row:nth-child(odd) {
                background: ${grayColor3};
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

    @keyframes showPanel {
        from {
            width: 0%;
        }

        to {
            width: 50%;
        }
    }
`;
