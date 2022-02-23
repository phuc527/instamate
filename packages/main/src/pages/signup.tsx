import React from "react";
import Content from "../layouts/content";
import AuthContainer from "../containers/signup";

const SignUp: React.FC = () => {
    return (
        <div>
            <Content fullHeight>
                <AuthContainer />
            </Content>
        </div>
    );
};

export default SignUp;
