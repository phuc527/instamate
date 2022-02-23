import { Col, Container, Row } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { getNotificationsApi } from "src/api/notification/notification";
import { useAppDispatch } from "src/redux/hooks";
import { doUpdateNotificationSetting } from "src/redux/slices/settings/notfication/notification-setting";
import { INotification } from "src/types/api/notifications";
import { toastError } from "src/utils/toast";
import ClientNotifications from "./client-notifications";
import ClientReminders from "./client-reminders";
import { SETTING } from "./constants";
import PracticeNotifications from "./practice-notifications";
import { StyledWrap } from "./style";

const Notification: FC = () => {
    const dispatch = useAppDispatch();
    const [defaultNotifications, setDefaultNotifications] = useState<INotification[] | []>()
    const [uploadImageReminder, setUploadImageReminder] = useState<INotification | null>()
    const [imageUpload, setImageUpload] = useState<INotification | null>()
    const [estimateLink, setEstimateLink] = useState<INotification | null>()
    const [consultReminder, setConsultReminder] = useState<INotification | null>()
    const [newLead, setNewLead] = useState<INotification | null>()
    const [consultRequest, setConsultRequest] = useState<INotification | null>()
    const [qualification, setQualification] = useState<INotification | null>()
    const [question, setQuestion] = useState<INotification | null>()

    useEffect(() => {
        setDefaultNotifications([]);
        getNotificationsApi()
            .then((res) => {
                const newNotifications = res.data
                    .map(i => ({
                        id: i.id,
                        project_id: i.project_id,
                        on: i.on,
                        sms: i.sms,
                        email: i.email,
                        setting: i.setting
                    }))

                setDefaultNotifications(newNotifications)
            })
            .catch((e) => {
                toastError(e);
            })
    }, []);

    useEffect(() => {
        if (defaultNotifications) {
            for (let i = 0; i < defaultNotifications?.length; i += 1) {
                if (defaultNotifications[i].setting === SETTING.image_upload) {
                    setImageUpload(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.upload_image_reminder) {
                    setUploadImageReminder(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.estimate_link) {
                    setEstimateLink(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.new_lead) {
                    setNewLead(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.consult_reminder) {
                    setConsultReminder(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.consult_request) {
                    setConsultRequest(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.question) {
                    setQuestion(defaultNotifications[i])
                } else if (defaultNotifications[i].setting === SETTING.qualification) {
                    setQualification(defaultNotifications[i])
                }
            }
        }
    }, [defaultNotifications])

    const onChangeNotification = (name: string, on: boolean, email?: boolean, sms?: boolean) => {
        switch (name) {
            case SETTING.new_lead:
                dispatch(doUpdateNotificationSetting({ ...newLead, on }))
                setNewLead({
                    ...newLead, on
                })
                break;
            case SETTING.consult_request:
                dispatch(doUpdateNotificationSetting({ ...consultRequest, on }))
                setConsultRequest({
                    ...consultRequest, on
                })
                break;
            case SETTING.consult_reminder:
                dispatch(doUpdateNotificationSetting({ ...consultReminder, on, email, sms }))
                setConsultReminder({
                    ...consultReminder, on, email, sms
                })
                break;
            case SETTING.estimate_link:
                dispatch(doUpdateNotificationSetting({ ...estimateLink, on, email, sms }))
                setEstimateLink({
                    ...estimateLink, on, email, sms
                })
                break;
            case SETTING.image_upload:
                dispatch(doUpdateNotificationSetting({ ...imageUpload, on, email, sms }))
                setImageUpload({
                    ...imageUpload, on, email, sms
                })
                break;
            case SETTING.upload_image_reminder:
                dispatch(doUpdateNotificationSetting({ ...uploadImageReminder, on, email, sms }))
                setUploadImageReminder({
                    ...uploadImageReminder, on, email, sms
                })
                break;
            case SETTING.question:
                dispatch(doUpdateNotificationSetting({ ...question, on }))
                setQuestion({
                    ...question, on
                })
                break;
            case SETTING.qualification:
                dispatch(doUpdateNotificationSetting({ ...qualification, on }))
                setQualification({
                    ...qualification, on
                })
                break;
            default:
                break;
        }
    }

    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col={12} sm={12} md={12} lg={12} xl={8}>

                        <ClientNotifications
                            estimateEmailNotification={estimateLink}
                            imageUploadLink={imageUpload}
                            onChangeNotification={(name, on, email, sms) => onChangeNotification(name, on, email, sms)}
                        />

                        <ClientReminders
                            bookConsultReminder={consultReminder}
                            uploadImageReminder={uploadImageReminder}
                            onChangeNotification={(name, on, email, sms) => onChangeNotification(name, on, email, sms)}
                        />
                        <PracticeNotifications
                            newLeadNotification={newLead}
                            consultRequestEmail={consultRequest}
                            qualification={qualification}
                            question={question}
                            onChangeNotification={(name, on, email, sms) => onChangeNotification(name, on, email, sms)}
                        />
                    </Col>
                </Row>
            </Container>
        </StyledWrap >
    )
}

export default Notification;
