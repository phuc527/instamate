import styled, { device, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div`
    width: 100%;
    border-left: 1px solid ${themeGet("colors.border")};
    height: 100%;
    background: #fff;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    ${device.small} {
        width: 400px;
    }
`;

export const StyledNoteContainer = styled.div`
    padding: 20px;
    min-height: 300px;
    & .title {
        font-weight: 600;
        font-size: 1rem;
    }
    & .emptyNote {
        margin-top: 50px;
    }
`;

export const StyledNoteForm = styled.div`
    padding: 0 20px 20px;
    border-top: 1px solid ${themeGet("colors.border")};
    min-height: 85px;
    margin-top: auto;
    .form {
        display: flex;
        .icon {
            margin-top: 10px;
        }
        textarea {
            border: none;
            min-height: 70px;
            :focus {
                box-shadow: none;
            }
        }
    }
    .submit {
        text-align: end;
        margin-top: 10px;
    }
`;
