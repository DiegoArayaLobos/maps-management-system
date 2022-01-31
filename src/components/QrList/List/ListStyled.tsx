import styled from "styled-components";
import { dangerColor, hoverDangerColor, grayColor2, grayColor5, scrollBarColor, warningColor, hoverWarningColor } from "../../../design/config";

export const ListStyled = styled.div`
    div.table {
        display: flex;
        flex-direction: column;
        height: 82vh;
        div.head {
            border-bottom: calc(0.1em + 0.1vh) solid ${grayColor5};
            div.row {
                display: flex;
                height: 5vh;
                div.cell {
                    font-weight: 500;
                    width: 45%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                div.cell:first-child {
                    font-weight: 500;
                    width: 10%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                div.cell:last-child {
                    padding-right: clamp(1em, 1vw, 2em);
                }
            }
        }
        div.body {
            overflow-y: scroll;
            overflow-x: hidden;

            ::-webkit-scrollbar {
                cursor: pointer;
                width: clamp(1em, 1vw, 2em);
            }

            ::-webkit-scrollbar-thumb {
                background: ${scrollBarColor};
                border-radius: clamp(1em, 3vw, 2em);
                border: clamp(0.3em, 0.3vw, 0.4em) solid white;
            }

            ::-webkit-scrollbar-thumb:hover,
            ::-webkit-scrollbar-thumb:active {
                background: ${scrollBarColor};
            }

            div.row {
                display: flex;
                transition: all 5 0ms;
                position: relative;
                height: 5vh;
                div.cell {
                    font-weight: 300;
                    width: 45%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transition: all 100ms;
                }
                div.cell:first-child {
                    font-weight: 300;
                    width: 10%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                div.click {
                    cursor: pointer;
                }
                div.icon {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                div.options {
                    position: absolute;
                    padding: 0;
                    right: 0;
                    visibility: hidden;
                    width: 12%;
                    color: white;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    button {
                        height: 5vh;
                    }

                    button.edit {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: ${warningColor};
                        width: 50%;
                    }
                    button.delete {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: ${dangerColor};
                        width: 50%;
                    }
                    button.edit:hover {
                        background: ${hoverWarningColor};
                        width: 50%;
                    }

                    button.delete:hover {
                        background: ${hoverDangerColor};
                        width: 50%;
                    }
                }
            }
            div.row:hover {
                background: ${grayColor2};

                div.cell.options {
                    visibility: visible;
                    animation: displayOptions 200ms linear;
                }

                @keyframes displayOptions {
                    0% {
                        width: 0%;
                        color: transparent;
                    }

                    100% {
                        width: 12%;
                    }
                }
            }
        }
    }
`;
