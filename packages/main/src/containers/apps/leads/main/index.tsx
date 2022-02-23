import { FC } from "react";
import FilterLead from "src/components/apps/leads/filter-leads";
import LeadStatistics from "src/components/apps/leads/lead-statistics";
import Notes from "src/components/apps/leads/notes";
import PersonalInfo from "src/components/apps/leads/personal-info";
import { StyledWrap } from "./style";

const Main: FC = () => {
    return (
        <StyledWrap>
            <FilterLead pageName="leads" />
            <LeadStatistics />
            <PersonalInfo />
            <Notes />
        </StyledWrap>
    );
};

export default Main;
