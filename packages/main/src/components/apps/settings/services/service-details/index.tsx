import {
    TabList,
    Tab,
    TabContent,
    TabPanel,
    Row,
    Col,
    Container,
    Spinner,
} from "@doar/components";
import { FC, useEffect } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetProcedureStaff } from "src/redux/slices/settings/services/procedureStaff";
import { doGetStaffs } from "src/redux/slices/settings/manage-users/active-staffs";
import { match as Match, useHistory } from "react-router-dom";
import { doGetProcedure } from "src/redux/slices/settings/services/procedure";
import Title from "../../title";
import DetailAddonsInformation from "./basic-details/addons";
import BasicInformation from "./basic-details/basic-information";
import {
    StyledTabWrap,
    StyledWrap,
    StyledBackArrow,
    StyledLoading,
} from "./style";
import AddonsSetting from "./assistant-settings/addon-setting";
import Pricing from "./pricing";

interface IProps {
    match: Match;
}
const ServiceDetails: FC<IProps> = ({ match }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const { procedure, loading } = useAppSelector((store) => ({
        procedure: store.setting.services.procedure.procedure,
        loading: store.setting.services.procedure.loading,
    }));

    const onBack = () => {
        history.push("/settings/services");
    };

    useEffect(() => {
        if (match?.params) {
            const params = match.params as { id: number };
            dispatch(doGetProcedure(params.id));
        }
    }, [dispatch, match]);

    useEffect(() => {
        if (procedure) {
            dispatch(doGetProcedureStaff(procedure.id));
        }
    }, [dispatch, procedure]);

    useEffect(() => {
        dispatch(
            doGetStaffs({
                keyword: null,
            })
        );
    }, [dispatch]);

    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col>
                        <Title>
                            <StyledBackArrow onClick={onBack}>
                                <ArrowLeftCircle size={26} />
                            </StyledBackArrow>
                            Service details
                        </Title>
                        {loading ? (
                            <StyledLoading>
                                <Spinner />
                            </StyledLoading>
                        ) : (
                            <StyledTabWrap variation="line">
                                <TabList>
                                    <Tab>Basic Details</Tab>
                                    <Tab>Pricing</Tab>
                                    <Tab>Assistant Settings</Tab>
                                </TabList>
                                <TabContent>
                                    <TabPanel>
                                        <Row>
                                            <Col
                                                col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                xl={5}
                                            >
                                                <BasicInformation />
                                            </Col>
                                            <Col
                                                col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                xl={7}
                                            >
                                                <DetailAddonsInformation />
                                            </Col>
                                        </Row>
                                    </TabPanel>
                                    <TabPanel>
                                        <Pricing />
                                    </TabPanel>
                                    <TabPanel>
                                        <Row>
                                            <Col
                                                col
                                                xs={12}
                                                sm={12}
                                                md={12}
                                                lg={12}
                                                xl={5}
                                            >
                                                <AddonsSetting />
                                            </Col>
                                        </Row>
                                    </TabPanel>
                                </TabContent>
                            </StyledTabWrap>
                        )}
                    </Col>
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default ServiceDetails;
