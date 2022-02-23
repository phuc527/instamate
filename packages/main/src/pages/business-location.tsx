import React from "react";
import Logout from "src/containers/logout";
import Content from "../layouts/content";
import AuthContainer from "../containers/business/location";
import Location from "../components/location";

const BusinessLocation: React.FC = () => {
    return (
        <div>
            <Content fullHeight>
                <Logout />
                <AuthContainer />
                <Location />
            </Content>
        </div>
    );
};

export default BusinessLocation;
