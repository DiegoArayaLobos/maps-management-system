import styled from "styled-components";
import { primaryColor, baseShadow } from "../../../design/config";

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
                cursor: pointer;
                font-size: calc(0.8rem + 1vw);
                font-weight: 700;
                color: ${primaryColor};
            }
        }
    }
`;
