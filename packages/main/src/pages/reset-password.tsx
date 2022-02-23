import React from "react";
import ResetPasswordContainer from "src/containers/reset-password";
import Layout from "../layouts";
import Content from "../layouts/content";

import SEO from "../components/seo";

const ResetPassword: React.FC = () => {
    return (
        <Layout>
            <SEO />
            <Content fullHeight>
                <ResetPasswordContainer />
            </Content>
        </Layout>
    );
};

export default ResetPassword;
