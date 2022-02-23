/* eslint-disable import/no-extraneous-dependencies */
import { FC } from "react";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const OverlayScrollBar: FC = ({ children }) => {
    return (
        <SimpleBar style={{ maxHeight: "100%", width: "100%" }}>
            {children}
        </SimpleBar>
    );
};

export default OverlayScrollBar;
