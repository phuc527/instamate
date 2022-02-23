import { Col, Row } from "@doar/components";
import { FC } from "react";
import { useAppSelector } from "src/redux/hooks";
import Categories from "./categories";
import Description from "./description";
import Gender from "./gender";
import Consult from "./is-consult";
import OnlineBooking from "./online-booking";
import ServiceName from "./service-name";
import { StyledCard, StyledTitlePanel } from "./style";
import Surgical from "./surgical";

const BasicInformation: FC = () => {
    const { procedure } = useAppSelector(
        (store) => store.setting.services.procedure
    );

    return (
        <div>
            <StyledTitlePanel>Basic Information</StyledTitlePanel>
            <StyledCard>
                <Row>
                    <Col col>
                        <ServiceName
                            id={procedure?.id || 0}
                            name={procedure?.name || ""}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col col>
                        <Categories
                            id={procedure?.id || 0}
                            categoryName={
                                procedure?.service_categories[0].name || ""
                            }
                        />
                    </Col>
                    <Col col>
                        <Gender
                            id={procedure?.id || 0}
                            gender={procedure?.gender || ""}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col col={6}>
                        <OnlineBooking
                            id={procedure?.id || 0}
                            onlineBooking={procedure?.online_booking || false}
                        />
                    </Col>
                    <Col col={6}>
                        <Surgical
                            id={procedure?.id || 0}
                            surgical={procedure?.surgical || false}
                        />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col col={6}>
                        <Consult
                            id={procedure?.id || 0}
                            isConsult={procedure?.consult || false}
                        />
                    </Col>
                    <Col col={6} />
                </Row>
                <br />
                <Row>
                    <Col>
                        <Description
                            id={procedure?.id || 0}
                            description={procedure?.description || ""}
                        />
                    </Col>
                </Row>
            </StyledCard>
            <br />
        </div>
    );
};

export default BasicInformation;
