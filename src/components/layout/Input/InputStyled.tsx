import styled from "styled-components";
import { primaryColor, baseColor, dangerColor } from "../../../design/config";

interface InputStyledInterface {
    validate: boolean;
}

export const InputStyled = styled.div<InputStyledInterface>`
    display: flex;
    width: 100%;
    input {
        font-weight: 300;
        font-family: "Roboto", sans-serif;
        font-size: 1rem;
        color: ${baseColor};
        background: transparent;
        width: 100%;
        height: calc(1em + 2vh);
        border: none;
        outline: none;
        border-bottom: clamp(0.1em, 0.4vh, 0.2em) solid ${(props) => (props.validate ? dangerColor : primaryColor)};
    }

    input:-webkit-autofill::first-line,
    input:-webkit-autofill,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active,
    input:-webkit-autofill:hover {
        font-family: "Roboto", sans-serif;
        box-shadow: 0 0 0 50px white inset;
        font-size: 1rem;
        font-weight: 300;
    }
`;
