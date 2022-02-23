import React from "react";
import Content from "../layouts/content";
import AuthContainer from "../containers/invitation-signup";

const InvitationSignUp: React.FC = () => {
    return (
        <div>
            <Content fullHeight>
                <AuthContainer />
            </Content>
        </div>
    );
};

export default InvitationSignUp;
