import React, { useEffect } from "react";
import { match as Match } from "react-router-dom";
import { useAppDispatch } from "src/redux/hooks";
import { doGetLead } from "src/redux/slices/contacts/lead";
import Layout from "../../layouts";
import Main from "../../containers/apps/leads/main";

interface IProps {
    match: Match;
}
const Lead: React.FC<IProps> = ({ match }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (match.params) {
            const params = match.params as { id: number };
            dispatch(doGetLead(params.id));
        }
    }, [dispatch, match]);

    return (
        <Layout hideFooter>
            <Main />
        </Layout>
    );
};

export default Lead;
