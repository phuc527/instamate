// import { Button } from "@doar/components";
import { Button } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { INotification } from "src/types/api/notifications";
import Title from "../../title";
import { SETTING } from "../constants";
import { StyledCard, StyledCardBody, StyledLabel, StyledLabelCheckBox, StyledText } from "../style";
import { StyledPlanInfo, StyledLabelCheck, StyledTitleWrap } from "./style";

interface IProps {
    newLeadNotification?: INotification | null;
    consultRequestEmail?: INotification | null;
    qualification?: INotification | null;
    question?: INotification | null;
    onChangeNotification: (name: string, on: boolean, email: boolean, sms: boolean) => void;
}
const PracticeNotifications: FC<IProps> = ({
    newLeadNotification,
    consultRequestEmail,
    qualification,
    question,
    onChangeNotification
}) => {
    const [onStateNewLead, setOnStateNewLead] = useState(false);
    const [onStateConsultRequest, setOnStateConsultRequest] = useState(false);
    const [onStateQualification, setOnStateQualification] = useState(false);
    const [onStateQuestion, setOnStateQuestion] = useState(false);

    const toggleNewLead = () => {
        setOnStateNewLead(o => !o)
        const NewLeadNotificationSms = newLeadNotification?.sms ? newLeadNotification?.sms : false
        const NewLeadNotificationEmail = newLeadNotification?.email ? newLeadNotification?.email : false
        onChangeNotification(SETTING.new_lead, !onStateNewLead, NewLeadNotificationEmail, NewLeadNotificationSms)
    };
    const toggleConsultRequest = () => {
        setOnStateConsultRequest(o => !o)
        const ConsultRequestSms = consultRequestEmail?.sms ? consultRequestEmail?.sms : false
        const ConsultRequestEmail = consultRequestEmail?.email ? consultRequestEmail?.email : false
        onChangeNotification(SETTING.consult_request, !onStateConsultRequest, ConsultRequestEmail, ConsultRequestSms)
    };
    const toggleQualification = () => {
        setOnStateQualification(o => !o)
        const QualificationSms = qualification?.sms ? qualification?.sms : false
        const QualificationEmail = qualification?.email ? qualification?.email : false
        onChangeNotification(SETTING.qualification, !onStateQualification, QualificationEmail, QualificationSms)
    };
    const toggleQuestion = () => {
        setOnStateQuestion(o => !o)
        const QuestionSms = question?.sms ? question?.sms : false
        const QuestionEmail = question?.email ? question?.email : false
        onChangeNotification(SETTING.question, !onStateQuestion, QuestionEmail, QuestionSms)
    };

    useEffect(() => {
        if (newLeadNotification) {
            setOnStateNewLead(newLeadNotification?.on)
        }
        if (consultRequestEmail) {
            setOnStateConsultRequest(consultRequestEmail?.on)
        }
        if (qualification) {
            setOnStateQualification(qualification?.on)
        }
        if (question) {
            setOnStateQuestion(question?.on)
        }
    }, [newLeadNotification, consultRequestEmail, qualification, question])

    return (
        <>
            <StyledTitleWrap>
                <Title>Practice Notifications</Title>
            </StyledTitleWrap>
            <StyledCard>
                <StyledCardBody>
                    <StyledLabel>New Lead Notifications</StyledLabel>
                    <StyledPlanInfo>Send me an email when i get anew lead</StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox >
                            <Button className={onStateNewLead ? 'on' : 'off'} onClick={() => toggleNewLead()} color='light' borderRadius='25px' height='25px' width='60px'>
                                <span className="pin" />
                            </Button>
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck >

                    <StyledLabel>Consult Request Email</StyledLabel>
                    <StyledPlanInfo>Send me an email when a client requests a consult</StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox >
                            <Button className={onStateConsultRequest ? 'on' : 'off'} onClick={() => toggleConsultRequest()} color='light' borderRadius='25px' height='25px' width='60px'>
                                <span className="pin" />
                            </Button>
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck >

                    <StyledLabel>Qualification</StyledLabel>
                    <StyledPlanInfo>Send me an email when a qualification</StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox >
                            <Button className={onStateQualification ? 'on' : 'off'} onClick={() => toggleQualification()} color='light' borderRadius='25px' height='25px' width='60px'>
                                <span className="pin" />
                            </Button>
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck >

                    <StyledLabel>Question</StyledLabel>
                    <StyledPlanInfo>Send me an email when a question</StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox >
                            <Button className={onStateQuestion ? 'on' : 'off'} onClick={() => toggleQuestion()} color='light' borderRadius='25px' height='25px' width='60px'>
                                <span className="pin" />
                            </Button>
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck >
                </StyledCardBody>
            </StyledCard>
        </>
    )
}

export default PracticeNotifications;
