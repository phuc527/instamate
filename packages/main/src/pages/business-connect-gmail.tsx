import React from "react";
import Logout from "src/containers/logout";
import Content from "../layouts/content";
import AuthContainer from "../containers/business/gmail";
import ConnectGmail from "../components/connect-gmail";

const BusinessConnectGmail: React.FC = () => {
    return (
        <div>
            <Content fullHeight>
                <Logout />
                <AuthContainer />
                <ConnectGmail />
            </Content>
        </div>
    );
};

export default BusinessConnectGmail;
