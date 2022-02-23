import { FC } from "react";
import {
    CardBody,
    Button,
    Image
} from "@doar/components";
import GmailIcon from "src/assets/svg/gmail.svg";
import { useAppDispatch } from "src/redux/hooks";
import { doConnectGmailGoogle } from "src/redux/slices/business";
import { StyledCard, StyledContentItem, StyledLabelWrap } from "./style";

const ConnectGmail: FC = () => {
    const dispatch = useAppDispatch();

    const handleConnect = () => {
        dispatch(doConnectGmailGoogle())
    }
    return (
        <StyledCard>
            <CardBody>
                <Image src={GmailIcon} alt="Gmail" mr="auto" ml="auto" display="flex" mb="15px" height="60px" />
                <StyledLabelWrap >
                    Gmail
                    </StyledLabelWrap>
                <StyledContentItem>
                    Bring Pilotpractice to your inbox with the Pilot practie inegration for Gmail
                    </StyledContentItem>
                <Button
                    type="button"
                    color="primary"
                    fullwidth
                    height="45px"
                    onClick={() => handleConnect()}
                >
                    Connect Now
                </Button>
            </CardBody>
        </StyledCard>
    );
};


export default ConnectGmail;
