import React from "react";
import Logout from "src/containers/logout";
import Content from "../layouts/content";
import AuthContainer from "../containers/business/project";
import Project from "../components/project";



const BusinessProject: React.FC = () => {
    return (
        <div>
            <Content fullHeight>
                <Logout />
                <AuthContainer />
                <Project />
            </Content>
        </div>
    );
};

export default BusinessProject;
