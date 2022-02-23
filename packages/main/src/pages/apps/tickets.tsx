import React from "react";
import Layout from "../../layouts";
import Wrapper from "../../containers/apps/ticket/wrapper";
import Sidebar from "../../containers/apps/ticket/sidebar";
import Group from "../../containers/apps/ticket/group";
import Main from "../../containers/apps/ticket/main";
import SEO from "../../components/seo";

const Ticket: React.FC = () => {
    return (
        <Layout hasSidebar hideFooter>
            <SEO />
            <Wrapper>
                <Sidebar />
                <Group />
                <Main />
            </Wrapper>
        </Layout>
    );
};

export default Ticket;
