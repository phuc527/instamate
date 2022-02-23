import { Button, Col, Container, Row, Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useRef, useState } from "react";
import { Edit3, Trash } from "react-feather";
import OverlayScrollBar from "src/components/overlay-scroll-bar";
import { useAppSelector } from "src/redux/hooks";
import Address1 from "./address-1";
import Address2 from "./address-2";
import DateOfBirth from "./date-of-birth";
import Email from "./email";
import EmailOptOut from "./email-opt-out";
import FirstName from "./first-name";
import Gender from "./gender";
import HeightFeet from "./height-feet";
import HeightInch from "./height-inch";
import LastName from "./last-name";
import Source from "./lead-source";
import MedicalCondition from "./medical-condition";
import PhoneNumber from "./phone";
import Provider from "./provider";
import Smoker from "./smoker";
import SMSOptOut from "./sms-opt-out";
import {
    StyledButtonsWrap,
    StyledInfoWrap,
    StyledNoInfo,
    StyledTitle,
    StyledWrap,
} from "./style";
import Weight from "./weight";

const PersonalInfo: FC = () => {
    const { loading, lead } = useAppSelector((store) => store.contact.lead);
    const ref = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState(300);

    useEffect(() => {
        if (ref?.current && ref.current.offsetWidth) {
            setContainerWidth(ref.current.offsetWidth);
        }
    }, [ref]);

    return (
        <StyledWrap ref={ref}>
            <OverlayScrollBar>
                <Container className="container">
                    {loading ? (
                        <div className="loading">
                            <Spinner />
                        </div>
                    ) : (
                        <div style={{ height: "100%" }}>
                            <StyledButtonsWrap>
                                <Button
                                    variant="outlined"
                                    color="dark"
                                    ml="10px"
                                >
                                    <div className="icon">
                                        <Trash size={15} strokeWidth={2.5} />
                                    </div>
                                    Delete
                                </Button>
                            </StyledButtonsWrap>
                            <Row className="row">
                                <Col
                                    p={0}
                                    pr={containerWidth > 576 ? "20px" : "0"}
                                    col={containerWidth > 576 ? 6 : 12}
                                    borderRight={
                                        containerWidth > 576
                                            ? `1px solid ${classic.border}`
                                            : "None"
                                    }
                                    borderBottom={
                                        containerWidth <= 576
                                            ? `1px solid ${classic.border}`
                                            : "None"
                                    }
                                    pb={containerWidth <= 576 ? "20px" : "0"}
                                >
                                    <StyledTitle>Basic information</StyledTitle>
                                    <FirstName />
                                    <LastName />
                                    <Email />
                                    <PhoneNumber />
                                    <DateOfBirth />
                                    <Address1 />
                                    <Address2 />
                                    <EmailOptOut />
                                    <SMSOptOut />
                                    <Source />
                                </Col>
                                <Col
                                    p={0}
                                    pl={containerWidth > 576 ? "20px" : "0"}
                                    col={containerWidth > 576 ? 6 : 12}
                                >
                                    <StyledTitle>
                                        Medical information
                                    </StyledTitle>
                                    <Gender />
                                    <Provider />
                                    <MedicalCondition />
                                    <Smoker />
                                    <Weight />
                                    <StyledInfoWrap className="bmi">
                                        <div className="label">BMI</div>
                                        <div className="space" />
                                        <div className="content">
                                            {lead?.bmi || (
                                                <StyledNoInfo>
                                                    &#8212;
                                                </StyledNoInfo>
                                            )}
                                            <div className="editIcon">
                                                <Edit3
                                                    size={18}
                                                    color={classic.gray500}
                                                />
                                            </div>
                                        </div>
                                    </StyledInfoWrap>
                                    <HeightFeet />
                                    <HeightInch />
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </OverlayScrollBar>
        </StyledWrap>
    );
};

export default PersonalInfo;
