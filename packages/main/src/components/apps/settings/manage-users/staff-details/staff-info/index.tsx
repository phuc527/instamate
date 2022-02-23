import { Col, Row } from "@doar/components";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "src/redux/hooks";
import DefaultAvatar from "@doar/shared/images/default-avatar.png";
import StaffOnlineBooking from "./staff-online-booking";
import StaffPhone from "./staff-phone";
import StaffType from "./staff-type";
import StaffName from "./staff-name";
import StaffEmail from "./staff-email";
import StaffAvatar from "./staff-avatar";
import StaffLocation from "./staff-location";
import { StyledCard } from "./style";

const StaffInfo: FC = () => {
    const { staff } = useAppSelector(store => store.setting.manage_users.activeStaffs);
    const [name, setName] = useState('');
    useEffect(() => {
        if (staff) {
            setName([staff?.first_name, staff?.last_name].join(" "))
        }
    }, [staff])
    return (
        <div>
            <StyledCard>
                <Row>
                    <Col>
                        <StaffAvatar
                            id={staff?.id || 0}
                            avatar={staff?.photo || DefaultAvatar}
                        />
                    </Col>
                    <Col col={6} />
                </Row>
                <Row>
                    <Col col={6}>
                        <StaffName
                            id={staff?.id || 0}
                            name={name || ''}
                        />
                    </Col>
                    <Col col={6}>
                        <StaffPhone
                            id={staff?.id || 0}
                            phone={staff?.phone || ''}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col col={6}>
                        <StaffEmail
                            id={staff?.id || 0}
                            email={staff?.email || ''}
                        />
                    </Col>
                    <Col col={6}>
                        <StaffType
                            id={staff?.id || 0}
                            type={staff?.title || ''}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col col={6}>
                        <StaffLocation
                            idStaff={staff?.id || 0}
                            staffLocation={staff?.location || null}
                        />
                    </Col>
                    <Col col={6}>
                        <StaffOnlineBooking
                            id={staff?.id || 0}
                            isOnlineBooking={staff?.online_booking || false}
                        />
                    </Col>
                </Row>
                <br />
            </StyledCard>
            <br />
        </div>
    )
}

export default StaffInfo;
