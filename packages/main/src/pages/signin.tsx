import React from "react";
import Content from "../layouts/content";
import AuthContainer from "../containers/signin";

const SignIn: React.FC = () => {
    return (
        <div>
            <Content fullHeight>
                <AuthContainer />
            </Content>
        </div>
    );
};

export default SignIn;
