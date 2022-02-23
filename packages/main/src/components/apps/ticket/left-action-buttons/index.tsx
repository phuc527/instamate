import { Button } from "@doar/components";
import { FC } from "react";
import { StyledActionButtons } from "./style";

const LeftActionButtons: FC = () => {
    return (
        <StyledActionButtons>
            <Button mr={[null, "5px"]}>Call</Button>
            <Button mr={[null, "5px"]}>Schedule</Button>
            <Button>Video</Button>
        </StyledActionButtons>
    );
};

export default LeftActionButtons;
