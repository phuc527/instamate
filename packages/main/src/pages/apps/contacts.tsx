import { FC } from "react";
import Layout from "../../layouts";
import Wrapper from "../../containers/apps/contacts/wrapper";
import Main from "../../containers/apps/contacts/main";
import SEO from "../../components/seo";

const Contacts: FC = () => {
    return (
        <Layout hasSidebar hideFooter>
            <SEO />
            <Wrapper>
                <Main />
            </Wrapper>
        </Layout>
    );
};

export default Contacts;
