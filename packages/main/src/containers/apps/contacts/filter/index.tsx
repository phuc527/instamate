import classNames from "classnames";
import { FC, useState } from "react";
import { Filter } from "react-feather";
import { StyledContent, StyledShowBtn } from "./style";

const SidebarFilter: FC = ({ children }) => {
    const [showFilter, setShowFilter] = useState(false)
    return (
        <StyledContent
            $showSidebar={showFilter}
        >
            <StyledShowBtn onClick={() => setShowFilter(!showFilter)} className={classNames({
                'showFilter': showFilter
            })}>
                <div style={{ display: 'flex' }}>
                    <Filter size={20} />
                </div>
            </StyledShowBtn>
            {children}
        </StyledContent>
    )
}

export default SidebarFilter;
