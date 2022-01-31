import styled from "styled-components";

interface MapStyledInterface {
    confirmCity: boolean;
}

export const MapStyled = styled.div<MapStyledInterface>`
    width: inherit;
    height: 91vh;

    div {
        border-radius: ${(props) => (props.confirmCity ? "0.2em 0 0 0.2em" : "0.2em")};
        outline: none;
    }
`;
