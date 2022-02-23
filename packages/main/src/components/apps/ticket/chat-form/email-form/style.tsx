import { Input } from "@doar/components";
import styled, { css, device, themeGet } from "@doar/shared/styled";

export const StyledWrap = styled.div<{ hasError: boolean; hasThread: boolean }>`
    background-color: #fff;
    padding-top: 10px;
    margin-top: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .quill {
        flex: 1 0 auto;

        ${({ hasError }) =>
            hasError &&
            css`
                border-bottom: 1px solid ${themeGet("colors.danger")};
            `};
    }
    .ql {
        &-container {
            border-bottom-right-radius: 0.25rem;
            border-bottom-left-radius: 0.25rem;
            border-color: transparent !important;
            /* border-color: ${themeGet("colors.border")} !important; */
            height: 100%;
            font-size: 13px;
            max-height: 350px;
            overflow-y: auto;
            ${device.large} {
                font-size: 14px;
            }

            ${({ hasThread }) =>
                !hasThread &&
                css`
                    min-height: 356px;
                `};
        }
        &-editor {
            /* padding: 20px; */
            padding: 0;
            height: 100%;
            ${({ hasThread }) =>
                !hasThread &&
                css`
                    min-height: 354px;
                `};

            color: ${themeGet("colors.text")};
        }
        &-blank::before {
            left: 0 !important;
        }
    }
    ${(props) =>
        props.theme.name === "dark" &&
        css`
            background-color: ${themeGet("colors.darkdarken5")};
            .ql-editor {
                color: ${themeGet("colors.gray500")};
            }
            .ql-snow.ql-toolbar button {
                .ql-stroke {
                    stroke: ${themeGet("colors.gray700")};
                }
                &:hover,
                &:focus {
                    background-color: ${themeGet("colors.gray900")};
                    .ql-stroke {
                        stroke: #fff;
                    }
                }
            }
        `}
`;

export const StyledToolbarWrap = styled.div`
    margin-top: 10px;
    align-items: center;
    justify-content: start;
    display: flex;
`;

export const StyledToolbar = styled.div`
    padding: 0px !important;
    border: 0 !important;
    .ql {
        &-toolbar {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
        }
        &-formats {
            display: inline-flex;
        }
    }
`;

export const StyledForm = styled.form`
    min-height: 500px;
    display: flex;
    flex-direction: column;
`;

export const StyledInput = styled(({ ...rest }) => <Input {...rest} />)`
    border-bottom: 1px solid ${themeGet("colors.gray200")};

    ${({ state }) =>
        state === "error" &&
        css`
            /* box-shadow: 0 0 0 0.2rem rgb(220 53 69 / 25%); */
            border-bottom: 1px solid ${themeGet("colors.danger")};
        `};
`;

export const StyledThread = styled.div`
    margin-top: 10px;
`;

export const StyledBlockQuote = styled.blockquote`
    border-left: 1px solid ${themeGet("colors.gray300")};
    padding-left: 10px;
    margin: 10px;
`;
