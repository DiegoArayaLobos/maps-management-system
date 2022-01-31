/**
 * Archivo de configuración de @keyframes
 */

export const ripple = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: .5;
        }        
        100% {
            width: 150px;
            height: 150px;
            opacity: 0;
        }
`;

export const fadeIn = `
    @keyframes fadeIn {
        from {
            opacity: 0;  
            visibility: hidden;
        }  
        to {
            opacity: 1;  
            visibility: visible;
        }
      }
`;

export const fadeOut = `
    @keyframes fadeOut {
        from {
            opacity: 1;  
            visibility: visible;        
        }
        to {
            opacity: 0;  
            visibility: hidden;        
        }
    }
`;

export const slideIn = `
    @keyframes slideIn {
        from {
            top: 0;
        }
        to {
            top: 50%;
        }
    }
`;

export const slideOut = `
    @keyframes slideOut {
        from {
            top: 50%;    
        }
        to {
            top: 0;     
        }
    }
`;