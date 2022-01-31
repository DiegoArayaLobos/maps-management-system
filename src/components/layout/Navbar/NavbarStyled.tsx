import styled from "styled-components";
import { primaryColor, baseShadow, dangerColor } from "../../../design/config";

export const NavbarStyled = styled.div`
    nav {
        display: flex;
        background: ${primaryColor};
        height: 5vh;
        padding: 0 0.8em;
        ${baseShadow};

        div.brand {
            background: white;
            width: calc(8rem + 1vw);
            display: flex;
            justify-content: center;
            align-items: center;

            span {
                font-size: calc(0.8rem + 1vw);
                font-weight: 700;
                color: ${primaryColor};
            }
        }

        div.menu {
            display: flex;
            margin-left: 2vw;

            a {
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0 1vw;
                padding: 3vh 2vw;
                text-decoration: none;
                color: ${primaryColor};
                font-size: calc(0.4rem + 1vw);
                font-weight: 400;
                ${baseShadow};
            }

            a.active {
                padding: 3vh 2vw 2.5vh;
                border-bottom: 0.5vh solid ${primaryColor};
            }
        }

        div.logout {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: auto;
            overflow: hidden;

            div.logoutConfirm {
                cursor: pointer;
                height: 5vh;
                width: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
                svg {
                    color: ${primaryColor};
                    font-size: calc(0.7rem + 1vw);
                }
            }

            a {
                height: 5vh;
                width: 5vh;
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
                svg {
                    color: ${primaryColor};
                    border-radius: 50%;
                }
            }

            a:focus {
                svg {
                    font-size: calc(0.7rem + 1vw);
                    background: white;
                    color: ${dangerColor};
                    transform: scale(1);
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                    /* animation: pulse 2s infinite; */
                }
            }

            @keyframes pulse {
                0% {
                    background: white;
                    color: ${dangerColor};
                    transform: scale(1.2);
                    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
                }

                40% {
                    background: ${dangerColor};
                    color: white;
                    transform: scale(1);
                    box-shadow: 0 0 0 0 ${dangerColor};
                }

                50% {
                    background: ${dangerColor};
                    color: white;
                    transform: scale(1);
                    box-shadow: 0 0 0 0 ${dangerColor};
                }

                100% {
                    background: white;
                    color: ${dangerColor};
                    transform: scale(1.2);
                    box-shadow: 0 0 0 8px rgba(0, 0, 0, 0);
                }
            }
        }
    }
`;
