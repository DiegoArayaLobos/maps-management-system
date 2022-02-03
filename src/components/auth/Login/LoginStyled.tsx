import { Paper, TextField, Button } from "@mui/material";
import { amber, red } from "@mui/material/colors";
import styled from "styled-components";

export const LoginStyled = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background: ${amber[400]};
    
    svg.logo {
        width: 15em;
        height: 10em;
        position: absolute;
        top: -4em;
        padding-right: .66em;
    }

    span.authMessage {
        margin-bottom: 2em;
        font-weight: 400;
        font-size: .85em;
        color: ${red[700]};
        text-align: center;
    }
    `;

export const Main = styled(Paper)`
    padding: 6em 4em 4em;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Input = styled(TextField)`
    margin: 0 0 2.4em;
`;

export const ButtonStyled = styled(Button)`
    color: white;
`;
