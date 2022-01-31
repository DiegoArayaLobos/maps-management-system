import styled from "styled-components";
import { primaryColor, scrollBarColor, dangerColor } from "../../../design/config";

interface TextAreaStyledInterface {
    validate: boolean;
}

export const TextAreaStyled = styled.div<TextAreaStyledInterface>`
    display: flex;
    width: 100%;
    textarea {
        width: inherit;
        height: 25vh;
        border: clamp(0.1em, 0.1vh, 0.1em) solid ${(props) => (props.validate ? dangerColor : primaryColor)};
        border-bottom: clamp(0.1em, 0.4vh, 0.3em) solid ${(props) => (props.validate ? dangerColor : primaryColor)};
        outline: none;
        font-weight: 300;
        font-family: "Roboto", sans-serif;
        font-size: 1rem;
        resize: none;
        border-radius: 0.2em;

        ::-webkit-scrollbar {
            width: 0.8em;
        }
        ::-webkit-scrollbar-thumb {
            background: ${scrollBarColor};
            border-radius: 1em;
            border: 0.2em solid white;
        }
    }
`;
