/**
 * Archivo de configuración de @colores
 */

 function hexToRGB(hex, alpha, bright = 1) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + (r * bright) + ", " + (g * bright) + ", " + (b * bright) + ", " + alpha + ")";
    } else {
        return "rgb(" + (r * bright) + ", " + (g * bright) + ", " + (b * bright) + ")";
    }
}

export const primaryColor = '#fdd835';
export const secondaryColor = '#00bfa5';
export const baseColor = '#444444';
export const successColor = '#4caf50';
export const warningColor = '#fdd835';
export const dangerColor = '#e53935';
export const hoverWarningColor = hexToRGB(warningColor, 1, .91);
export const hoverDangerColor = hexToRGB(dangerColor, 1, .91);
export const infoColor = '#4fc3f7';
export const scrollBarColor = '#cfd8dc';
export const grayColor1 = '#fafafa';
export const grayColor2 = '#f5f5f5';
export const grayColor3 = '#eeeeee';
export const grayColor4 = '#e0e0e0';
export const grayColor5 = '#bdbdbd';
export const grayColor6 = '#9e9e9e';
export const grayColor7 = '#757575';
export const grayColor8 = '#616161';
export const grayColor9 = '#424242';
export const grayColor10 = '#212121';