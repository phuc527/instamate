import { FC } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Pagination as IPagination } from "src/types/api/invoice";
import { StyledPageNumber, StyledPaginateButton, StyledPagination, StyledPaginationWrap } from "./style";

interface IProps {
    pagination: IPagination;
    onNext: () => void;
    onPrev: () => void;
}
const Pagination: FC<IProps> = ({
    pagination,
    onNext,
    onPrev,
}) => {
    return (
        <div>
            {
                pagination.total ? 
                <StyledPaginationWrap>
                    <StyledPagination>{pagination.from}-{pagination.to} of {pagination.total}</StyledPagination>
                    <StyledPageNumber>{pagination.currentPage}</StyledPageNumber>
                    <StyledPaginateButton
                        variant="outlined"
                        color="light"
                        onClick={onPrev}
                        disabled={pagination.from === 1}
                    >
                        <ChevronLeft size="18"/>
                    </StyledPaginateButton>
                    <StyledPaginateButton
                        variant="outlined"
                        color="light"
                        onClick={onNext}
                        disabled={pagination.to === pagination.total}
                    >
                        <ChevronRight size="18"/>
                    </StyledPaginateButton>
                </StyledPaginationWrap>
                : <></>
            }
        </div>
    )
}

export default Pagination;
