import React from "react";
import Layout from "../../layouts";
import Wrapper from "../../containers/apps/settings/wrapper";
import Sidebar from "../../containers/apps/settings/sidebar";
import Main from "../../containers/apps/settings/main";
import SEO from "../../components/seo";

const Settings: React.FC = () => {
    return (
        <Layout hasSidebar hideFooter>
            <SEO />
            <Wrapper>
                <Sidebar />
                <Main />
            </Wrapper>
        </Layout>
    );
};

export default Settings;
