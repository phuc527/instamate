import { Avatar, CardBody } from "@doar/components";
import moment from "moment";
import { FC, useState } from "react";
import ClockIcon from "src/components/svg/ClockIcon";
import HospitalIcon from "src/components/svg/HospitalIcon";
import LocationIcon from "src/components/svg/LocationIcon";
import StethoscopeIcon from "src/components/svg/StethoscopeIcon";
import { Appointment as AppointmentType } from "src/types/api/ticket";
import { StyledSeenAllText } from "../estimate/style";
import {
    StyledCard,
    StyledContentItem,
    StyledContentText,
    StyledContentTitle,
    StyledProcedureContentItem,
    StyledProcedureItem,
    StyledProceduresCol,
    StyledSubTitle,
} from "./style";

type Props = {
    appointment: AppointmentType;
};

const Appointment: FC<Props> = ({ appointment }) => {
    const [showAll, setShowAll] = useState(false);

    return (
        <StyledCard>
            <CardBody>
                <StyledSubTitle>Appointment Detail</StyledSubTitle>
                <div>
                    <StyledContentItem>
                        <StyledContentTitle>
                            <StethoscopeIcon /> <span>Provider:</span>
                        </StyledContentTitle>

                        <StyledContentText>
                            <Avatar size="xs" status="online">
                                <img
                                    src={
                                        appointment.staff?.photo ||
                                        `https://ui-avatars.com/api/?name=${String(
                                            appointment.staff?.first_name
                                        )}+${String(
                                            appointment.staff?.last_name
                                        )}`
                                    }
                                    alt="Avatar"
                                />
                            </Avatar>
                            <span>
                                {[
                                    appointment.staff?.first_name,
                                    appointment.staff?.last_name,
                                ].join(" ")}
                            </span>
                        </StyledContentText>
                    </StyledContentItem>
                    {appointment.event?.location && (
                        <StyledContentItem>
                            <StyledContentTitle>
                                <LocationIcon /> <span>Location:</span>
                            </StyledContentTitle>

                            <StyledContentText>
                                {appointment.event?.location?.name.toUpperCase()}
                            </StyledContentText>
                        </StyledContentItem>
                    )}
                    <StyledContentItem>
                        <StyledContentTitle>
                            <ClockIcon />
                            <span>Time:</span>
                        </StyledContentTitle>
                        <StyledContentText>
                            {moment(appointment.event?.start_time).format(
                                "hh A MMM DD, YYYY"
                            )}
                        </StyledContentText>
                    </StyledContentItem>
                    {appointment.estimate?.procedures &&
                        appointment.estimate?.procedures.length > 0 && (
                            <StyledProcedureContentItem>
                                <StyledContentTitle>
                                    <HospitalIcon />
                                    <span>Procedures:</span>
                                </StyledContentTitle>
                                <StyledProceduresCol>
                                    <>
                                        {appointment.estimate?.procedures
                                            .filter(
                                                (_, index) =>
                                                    showAll || index < 2
                                            )
                                            .map((procedure) => (
                                                <StyledProcedureItem
                                                    key={procedure.id}
                                                >
                                                    {procedure.name}
                                                </StyledProcedureItem>
                                            ))}

                                        {appointment.estimate?.procedures
                                            .length > 2 && (
                                            <StyledSeenAllText
                                                onClick={() =>
                                                    setShowAll(!showAll)
                                                }
                                            >
                                                {!showAll ? "See all" : "Hide"}{" "}
                                                (
                                                {
                                                    appointment.estimate
                                                        ?.procedures?.length
                                                }
                                                )
                                            </StyledSeenAllText>
                                        )}
                                    </>
                                </StyledProceduresCol>
                            </StyledProcedureContentItem>
                        )}
                </div>
            </CardBody>
        </StyledCard>
    );
};

export default Appointment;
