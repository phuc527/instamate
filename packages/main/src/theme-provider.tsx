import { GlobalStyle } from "@doar/shared/css";
import { ThemeProvider, themes } from "@doar/shared/styled";
import { FC } from "react";

const Theme: FC = ({ children }) => {
    return (
        <ThemeProvider theme={themes.light}>
            <GlobalStyle />
            {children}
        </ThemeProvider>
    );
};

export default Theme;
