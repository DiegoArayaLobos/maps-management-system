import styled from "styled-components";
import { primaryColor, baseShadow, baseColor, dangerColor } from "../../../design/config";
export const LoginStyled = styled.div`
    width: 100vw;
    height: 100vh;
    background: ${primaryColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div.container {
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: clamp(17em, 10vh, 33em);
        height: clamp(30em, 10vh, 50em);
        padding: clamp(1em, 10vh, 2em) clamp(1em, 10vw, 2em);
        border-radius: 0.2em;
        ${baseShadow};

        div.section {
            display: flex;
            width: 100%;
            justify-content: center;
            position: relative;

            input {
                font-weight: 300;
                font-family: "Roboto", sans-serif;
                font-size: 1em;
                color: ${baseColor};
                background: transparent;
                width: 100%;
                height: 3em;
                border: 0;
                border-bottom: clamp(0.1em, 1vh, 0.1em) solid ${baseColor};
                border-radius: 0;
                outline: none;
            }

            input:hover,
            &:hover > input {
                border-bottom: clamp(0.1em, 1vh, 0.1em) solid ${primaryColor};
                transition: border-bottom 300ms;
            }

            input:focus {
                border-bottom: clamp(0.1em, 1vh, 0.1em) solid ${primaryColor};
                transition: border-bottom 300ms;
            }

            &:hover label,
            input:focus ~ label,
            input:active ~ label,
            input:visited ~ label,
            input:-webkit-autofill ~ label {
                transform: translateY(-14px) scale(0.8);
                color: ${primaryColor};
            }
            label.animation {
                transform: translateY(-14px) scale(0.8);
                color: ${primaryColor};
            }
            input:valid,
            input:-webkit-autofill {
                border-bottom: clamp(0.1em, 1vh, 0.1em) solid ${primaryColor};
            }

            input {
                // Background color
                &:-webkit-autofill {
                    box-shadow: 0 0 0 1000px #fff inset;
                }

                // Font styles
                &:-webkit-autofill::first-line {
                    font-family: "Roboto", sans-serif;
                    font-size: 1rem;
                    font-weight: 300;
                }
            }

            label {
                font-size: 1em;
                position: absolute;
                top: 0;
                left: 0;
                transform-origin: 0% 100%;
                text-align: initial;
                transform: translateY(14px);
                transition: all 200ms linear;
            }

            input.validate {
                color: ${dangerColor};
                border-bottom: clamp(0.1em, 1vh, 0.1em) solid ${dangerColor};
            }

            label.validate {
                color: ${dangerColor} !important;
            }

            button {
                cursor: pointer;
                width: inherit;
                height: 6vh;
                color: white;
                font-family: "Roboto", sans-serif;
                font-size: calc(1rem + 0.2vw);
                font-weight: 500;
                border-radius: 0.1em;
                margin: calc(0.1rem + 0.1vw);
                background: ${primaryColor};
                border: 0;
            }

            svg {
                width: clamp(4em, 10vw, 7em);
                height: clamp(4em, 10vw, 7em);
            }
        }
        div.section:last-child {
            span {
                cursor: pointer;
                font-weight: 100;
                font-size: calc(0.8rem + 0.1vw);
            }
        }
    }
`;
