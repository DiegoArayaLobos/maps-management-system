import styled from "styled-components";

export const RootStyled = styled.div`
    div.container {
        padding: .8em;
        div.header {
            display: flex;
            justify-content: space-between;
            align-content: center;
            div.title {
                span {
                    font-size: calc(.5rem + 1vw);
                    font-weight: 500;
                }
            }
        }
    }
`;