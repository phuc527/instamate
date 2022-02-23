import { Avatar, CardBody } from "@doar/components";
import { mean } from "lodash-es";
import { FC, useState } from "react";
import DollarSign from "src/components/svg/DollarSign";
import StethoscopeIcon from "src/components/svg/StethoscopeIcon";
import { useAppSelector } from "src/redux/hooks";
import { Estimate as EstimateType } from "src/types/api/ticket";
import HospitalIcon from "../../../../../svg/HospitalIcon";
import {
    StyledCard,
    StyledContentItem,
    StyledContentText,
    StyledContentTitle,
    StyledMoneyText,
    StyledProcedureContentItem,
    StyledProcedureItem,
    StyledProceduresCol,
    StyledSeenAllText,
} from "./style";

type Props = {
    estimate: EstimateType;
};

const Estimate: FC<Props> = ({ estimate }) => {
    const [showAll, setShowAll] = useState(false);
    const ticket = useAppSelector((store) => store.ticket.detail);
    return (
        <StyledCard>
            <CardBody>
                <StyledContentItem>
                    <StyledContentTitle>
                        <DollarSign /> <span>Total Estimate:</span>
                    </StyledContentTitle>

                    <StyledMoneyText>
                        ${mean([estimate.max_total, estimate.min_total])}
                    </StyledMoneyText>
                </StyledContentItem>
                <StyledContentItem>
                    <StyledContentTitle>
                        <StethoscopeIcon /> <span>Provider:</span>
                    </StyledContentTitle>

                    <StyledContentText>
                        <Avatar size="xs" status="online">
                            <img
                                src={`https://ui-avatars.com/api/?name=${String(
                                    ticket.data?.staff?.first_name
                                )}+${String(ticket.data?.staff?.first_name)}`}
                                alt="Avatar"
                            />
                        </Avatar>
                        <span>
                            {[
                                ticket.data?.staff?.first_name,
                                ticket.data?.staff?.last_name,
                            ].join(" ")}
                        </span>
                    </StyledContentText>
                </StyledContentItem>
                <>
                    {estimate?.procedures && estimate?.procedures.length > 0 && (
                        <StyledProcedureContentItem>
                            <StyledContentTitle>
                                <HospitalIcon />
                                <span>Procedures:</span>
                            </StyledContentTitle>
                            {estimate?.procedures &&
                                estimate?.procedures.length > 0 && (
                                    <StyledProceduresCol>
                                        <>
                                            {estimate?.procedures
                                                ?.filter(
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

                                            {estimate?.procedures.length >
                                                2 && (
                                                    <StyledSeenAllText
                                                        onClick={() =>
                                                            setShowAll(!showAll)
                                                        }
                                                    >
                                                        {showAll
                                                            ? "Hide"
                                                            : "See all"}{" "}
                                                    (
                                                        {estimate.procedures.length}
                                                    )
                                                    </StyledSeenAllText>
                                                )}
                                            <p>Test</p>
                                        </>
                                    </StyledProceduresCol>
                                )}
                        </StyledProcedureContentItem>
                    )}
                </>
            </CardBody>
        </StyledCard>
    );
};

export default Estimate;
