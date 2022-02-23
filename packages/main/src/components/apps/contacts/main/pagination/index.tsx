import { FC } from "react";
import {
    ChevronLeft,
    ChevronsLeft,
    ChevronRight,
    ChevronsRight,
} from "react-feather";
import { Pagination as IPagination } from "src/types/api/invoice";
import {
    StyledPageNumber,
    StyledPaginateButton,
    StyledPagination,
    StyledPaginationWrap,
} from "./style";

interface IProps {
    pagination: IPagination;
    onNext: () => void;
    onPrev: () => void;
    onFirst: () => void;
    onLast: () => void;
}
const Pagination: FC<IProps> = ({
    pagination,
    onNext,
    onPrev,
    onFirst,
    onLast,
}) => {
    return (
        <div>
            {pagination.total ? (
                <StyledPaginationWrap>
                    <StyledPagination>
                        {pagination.from}-{pagination.to} of {pagination.total}
                    </StyledPagination>
                    <StyledPageNumber>
                        {pagination.currentPage}
                    </StyledPageNumber>
                    <StyledPaginateButton
                        variant="outlined"
                        color="light"
                        onClick={onFirst}
                        disabled={pagination.currentPage === 1}
                    >
                        <ChevronsLeft size="18" />
                    </StyledPaginateButton>
                    <StyledPaginateButton
                        variant="outlined"
                        color="light"
                        onClick={onPrev}
                        disabled={pagination.currentPage === 1}
                    >
                        <ChevronLeft size="18" />
                    </StyledPaginateButton>
                    <StyledPaginateButton
                        variant="outlined"
                        color="light"
                        onClick={onNext}
                        disabled={pagination.to === pagination.total}
                    >
                        <ChevronRight size="18" />
                    </StyledPaginateButton>
                    <StyledPaginateButton
                        variant="outlined"
                        color="light"
                        onClick={onLast}
                        disabled={pagination.to === pagination.total}
                    >
                        <ChevronsRight size="18" />
                    </StyledPaginateButton>
                </StyledPaginationWrap>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Pagination;
