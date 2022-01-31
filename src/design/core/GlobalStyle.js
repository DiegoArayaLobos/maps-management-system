/**
 * @global Archivo global de los estilos css del proyecto
 */

import { createGlobalStyle } from 'styled-components';
import { baseColor, grayColor1 } from '../config';

const GlobalStyle = createGlobalStyle`
    html, body {
        font-family: 'Roboto', sans-serif;
        color: ${baseColor};
        font-size: clamp(1rem, 1.2vw, 1.7em);
        font-weight: 300;
        letter-spacing: clamp(.05rem, .1vw, .8em);
        user-select: none;
        overflow: hidden;
        background: ${grayColor1};
        padding: 0;
        margin: 0;
        box-sizing: border-box;        
    }
`;

export default GlobalStyle;