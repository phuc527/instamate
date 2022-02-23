import { Col, Container, Row } from "@doar/components";
import { FC } from "react";
import { ArrowLeftCircle } from "react-feather";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doSetStaff } from "src/redux/slices/settings/manage-users/active-staffs";
import UserProcedureTable from "../../services/procedures-table/user-procedure-table";
import Title from "../../title";
import StaffInfo from "./staff-info";
import { StyledBackArrow, StyledWrap } from "./style";


const StaffDetails: FC = () => {
    const dispatch = useAppDispatch();
    const { staff } = useAppSelector(store => ({
        staff: store.setting.manage_users.activeStaffs.staff
    }));

    const onBack = () => {
        dispatch(doSetStaff(null));
    }
    return (
        <StyledWrap>
            <Container>
                <Title>
                    <StyledBackArrow onClick={onBack}>
                        <ArrowLeftCircle size={26} />
                    </StyledBackArrow>
                    User details
                </Title>

                <Row>
                    <Col col xs={12} sm={12} md={12} lg={12} xl={5.5}>
                        <StaffInfo />
                    </Col>
                    <Col col xs={12} sm={12} md={12} lg={12} xl={6.5}>
                        <UserProcedureTable
                            idStaff={staff?.id}
                        />
                    </Col>
                </Row>
            </Container>
        </StyledWrap>


    )
}

export default StaffDetails;
