import React from "react";
import Layout from "../../layouts";
import Wrapper from "../../containers/apps/ticket/wrapper";
import Sidebar from "../../containers/apps/ticket/sidebar";
import Main from "../../containers/apps/ticket/mention/main";
import SEO from "../../components/seo";
import GroupMention from "../../containers/apps/ticket/mention";

const Mentions: React.FC = () => {

    return (
        <Layout hasSidebar hideFooter>
            <SEO />
            <Wrapper>
                <Sidebar />
                <GroupMention />
                <Main />
            </Wrapper>
        </Layout>
    );
};

export default Mentions;
