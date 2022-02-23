import { Button } from "@doar/components";
import { FC, useState, useEffect } from "react";
import { INotification } from "src/types/api/notifications";
import Title from "../../title";
import { SETTING } from "../constants";
import { StyledCard, StyledCardBody, StyledLabel, StyledLabelCheckBox, StyledLabelCheck, StyledText, StyledInput } from "../style";
import { StyledPlanInfo, StyledTitleWrap } from "./style";

interface IProps {
    bookConsultReminder?: INotification | null;
    uploadImageReminder?: INotification | null;
    onChangeNotification: (name: string, on: boolean, email: boolean, sms: boolean) => void;
}

const ClientReminders: FC<IProps> = ({
    bookConsultReminder,
    uploadImageReminder,
    onChangeNotification
}) => {
    const [onStateConsultReminder, setOnStateConsultReminder] = useState(false);
    const [onStateConsultReminderSms, setOnStateConsultReminderSms] = useState(false);
    const [onStateConsultReminderEmail, setOnStateConsultReminderEmail] = useState(false);

    const [onStateUploadImageReminder, setOnStateUploadImageReminder] = useState(false);
    const [onStateUploadImageReminderSms, setOnStateUploadImageReminderSms] = useState(false);
    const [onStateUploadImageReminderEmail, setOnStateUploadImageReminderEmail] = useState(false);

    useEffect(() => {
        if (bookConsultReminder) {
            const ConsultReminderSMS = bookConsultReminder?.sms ? bookConsultReminder?.sms : false
            const ConsultReminderEmail = bookConsultReminder?.email ? bookConsultReminder?.email : false
            setOnStateConsultReminder(bookConsultReminder?.on)
            setOnStateConsultReminderSms(ConsultReminderSMS)
            setOnStateConsultReminderEmail(ConsultReminderEmail)
        }
        if (uploadImageReminder) {
            const UploadImageReminderSMS = uploadImageReminder?.sms ? uploadImageReminder?.sms : false
            const UploadImageReminderEmail = uploadImageReminder?.email ? uploadImageReminder?.email : false
            setOnStateUploadImageReminder(uploadImageReminder?.on)
            setOnStateUploadImageReminderSms(UploadImageReminderSMS)
            setOnStateUploadImageReminderEmail(UploadImageReminderEmail)
        }
    }, [bookConsultReminder, uploadImageReminder])

    const toggleConsultReminder = () => {
        setOnStateConsultReminder(o => !o)
        onChangeNotification(SETTING.consult_reminder, !onStateConsultReminder, onStateConsultReminderEmail, onStateConsultReminderSms)
    };
    const toggleUploadImageReminder = () => {
        setOnStateUploadImageReminder(o => !o)
        onChangeNotification(SETTING.upload_image_reminder, !onStateUploadImageReminder, onStateUploadImageReminderEmail, onStateUploadImageReminderSms)
    };
    return (
        <>
            <StyledTitleWrap>
                <Title>Client Reminders</Title>
            </StyledTitleWrap>
            <StyledCard>
                <StyledCardBody>

                    <StyledLabel>Book Consult Reminder</StyledLabel>
                    <StyledPlanInfo>Send me an email reminders to book a consult after receiving an estimate</StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox >
                            <Button className={onStateConsultReminder ? 'on' : 'off'} onClick={() => toggleConsultReminder()} color='light' borderRadius='25px' height='25px' width='60px'>
                                <span className="pin" />
                            </Button>
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>

                        <StyledLabelCheckBox >
                            <StyledInput type='checkbox' disabled={!onStateConsultReminder} checked={onStateConsultReminderEmail} onChange={e => {
                                onChangeNotification(SETTING.consult_reminder, onStateConsultReminder, e.target.checked, onStateConsultReminderSms)
                                setOnStateConsultReminderEmail(e.target.checked)
                            }} />
                            <StyledText>Send Via Email</StyledText>
                        </StyledLabelCheckBox>
                        <StyledLabelCheckBox >
                            <StyledInput type='checkbox' disabled={!onStateConsultReminder} checked={onStateConsultReminderSms} onChange={e => {
                                onChangeNotification(SETTING.consult_reminder, onStateConsultReminder, onStateConsultReminderEmail, e.target.checked)
                                setOnStateConsultReminderSms(e.target.checked)
                            }} />
                            <StyledText>Send Via Text</StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck >


                    <StyledLabel>Update Image Reminders</StyledLabel>
                    <StyledPlanInfo>Send me an email right before I have appointment</StyledPlanInfo>
                    <StyledLabelCheck>
                        <StyledLabelCheckBox >
                            <Button className={onStateUploadImageReminder ? 'on' : 'off'} onClick={() => toggleUploadImageReminder()} color='light' borderRadius='25px' height='25px' width='60px'>
                                <span className="pin" />
                            </Button>
                            <StyledText>Enable Notification </StyledText>
                        </StyledLabelCheckBox>

                        <StyledLabelCheckBox >
                            <StyledInput type='checkbox' disabled={!onStateUploadImageReminder} checked={onStateUploadImageReminderEmail} onChange={e => {
                                onChangeNotification(SETTING.upload_image_reminder, onStateUploadImageReminder, e.target.checked, onStateUploadImageReminderSms)
                                setOnStateUploadImageReminderEmail(e.target.checked)
                            }} />
                            <StyledText>Send Via Email</StyledText>
                        </StyledLabelCheckBox>
                        <StyledLabelCheckBox >
                            <StyledInput type='checkbox' disabled={!onStateUploadImageReminder} checked={onStateUploadImageReminderSms} onChange={e => {
                                onChangeNotification(SETTING.upload_image_reminder, onStateUploadImageReminder, onStateUploadImageReminderEmail, e.target.checked)
                                setOnStateUploadImageReminderSms(e.target.checked)
                            }} />
                            <StyledText>Send Via Text</StyledText>
                        </StyledLabelCheckBox>
                    </StyledLabelCheck >

                </StyledCardBody>
            </StyledCard>
        </>
    )
}

export default ClientReminders;
