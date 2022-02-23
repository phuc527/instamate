import { FC, useEffect, useState } from "react";
import OverlayScrollBar from "src/components/overlay-scroll-bar";
import SearchLead from "../../contacts/filters/search-lead";
import CreatedAt from "./created-at";
import Source from "./lead-source";
import Locations from "./locations";
import ProcedureInterestedIn from "./procedures-interested-in";
import ServiceProvider from "./service-provider";
import Stage from "./stage";
import {
    StyledFilterLeadTitle,
    StyledHr,
    StyledSearchWrap,
    StyledTitle,
    StyledWrap,
} from "./style";

interface Props {
    pageName?: string;
}

const FilterLead: FC<Props> = ({ pageName }) => {
    const [placeholder, setPlaceholder] = useState("");
    useEffect(() => {
        if (pageName) {
            setPlaceholder(pageName);
        }
    }, [pageName]);
    return (
        <StyledWrap className="contactPage">
            <OverlayScrollBar>
                <StyledTitle>Filter {pageName}</StyledTitle>
                <StyledHr />
                <StyledSearchWrap>
                    <SearchLead pageName={placeholder} />
                </StyledSearchWrap>
                <StyledHr />
                <StyledFilterLeadTitle>
                    Filter {pageName} by
                </StyledFilterLeadTitle>
                <CreatedAt />
                <Source />
                <ProcedureInterestedIn />
                <Stage />
                <ServiceProvider />
                <Locations />
            </OverlayScrollBar>
        </StyledWrap>
    );
};

export default FilterLead;
