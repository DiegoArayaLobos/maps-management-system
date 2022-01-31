import styled from "styled-components";
import { baseColor, baseShadow, dangerColor, grayColor3, primaryColor, scrollBarColor } from "../../../design/config";

interface SelectStyledInterface {
    validate: boolean;
}

export const SelectStyled = styled.div<SelectStyledInterface>`
    width: 100%;
    .filter {
        & div {
            outline: none;
        }
        &__control {
            border: 0;
            border-bottom: clamp(0.1em, 0.4vh, 0.2em) solid ${(props) => (props.validate ? dangerColor : primaryColor)};
            border-radius: 0;

            &--is-focused {
                border-color: none;
                box-shadow: none;
            }
        }

        &__control:hover {
            border-bottom: clamp(0.1em, 0.4vh, 0.2em) solid ${(props) => (props.validate ? dangerColor : primaryColor)};
        }

        &__menu {
            ${baseShadow};
            border-radius: 0;
            z-index: 3;
        }

        &__menu-list {
            padding: 0;

            ::-webkit-scrollbar {
                width: 0.8em;
            }

            ::-webkit-scrollbar-track {
            }

            ::-webkit-scrollbar-thumb {
                background: ${scrollBarColor};
                border-radius: 1em;
                border: 0.2em solid white;
            }
        }

        &__option {
            background: white;
            color: ${baseColor};

            &--is-focused {
                background: ${grayColor3} !important;
            }
            &--is-selected {
                background: ${grayColor3} !important;
            }
        }

        &__option {
            background: white;
        }

        &__group {
            padding: 0;
        }

        &__group-heading {
            margin-top: 1em;
            font-size: 0.8em;
        }
    }
`;
