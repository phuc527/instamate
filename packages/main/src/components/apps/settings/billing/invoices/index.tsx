import { FC, useEffect } from "react";
import { Button, Spinner, Table } from "@doar/components";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doGetInvoices } from "src/redux/slices/settings/billing/invoice";
import { formatUnixTime } from "src/helpers/settings/invoice";
import { formatMetric } from "src/helpers/stringHelpers";
import {
    StyledBadge,
    StyledCardBody,
    StyledLabel,
    StyledLoadingWrap,
    StyledNoInvoiceText,
    StyledTd,
    StyledTdHeader,
} from "./style";
import { StyledCard } from "../style";
import Pagination from "../../pagination";

const Invoices: FC = () => {
    const dispatch = useAppDispatch();
    const { invoices, loading } = useAppSelector(
        (store) => store.setting.billing.invoice
    );
    const { pagination } = useAppSelector(
        (store) => store.setting.billing.invoice
    );

    useEffect(() => {
        dispatch(
            doGetInvoices({
                page: 1,
                limit: 5,
            })
        );
    }, [dispatch]);

    const onNextPage = () => {
        dispatch(
            doGetInvoices({
                limit: pagination.limit,
                page: Number(pagination.currentPage) + 1,
            })
        );
    };

    const onPrevPage = () => {
        dispatch(
            doGetInvoices({
                limit: pagination.limit,
                page: Number(pagination.currentPage) - 1,
            })
        );
    };

    return (
        <div>
            <StyledCard>
                <StyledCardBody>
                    <StyledLabel>Invoices</StyledLabel>
                    {loading ? (
                        <StyledLoadingWrap>
                            <Spinner color="primary" />
                        </StyledLoadingWrap>
                    ) : (
                        <div>
                            {invoices?.length ? (
                                <Table hover>
                                    <tbody>
                                        <tr>
                                            <StyledTdHeader>
                                                DATE
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                PERIOD
                                            </StyledTdHeader>
                                            <StyledTdHeader>
                                                AMOUNT
                                            </StyledTdHeader>
                                            <StyledTdHeader />
                                        </tr>
                                        {invoices?.map((invoice) => {
                                            return (
                                                <tr key={invoice.id}>
                                                    <StyledTd>
                                                        {formatUnixTime(
                                                            invoice.created,
                                                            "MM/DD/YYYY"
                                                        )}
                                                    </StyledTd>
                                                    <StyledTd>
                                                        {formatUnixTime(
                                                            invoice.period_start,
                                                            "MMM D, YYYY"
                                                        )}{" "}
                                                        -{" "}
                                                        {formatUnixTime(
                                                            invoice.period_end,
                                                            "MMM D, YYYY"
                                                        )}
                                                    </StyledTd>
                                                    <StyledTd>
                                                        $
                                                        {formatMetric(
                                                            invoice.total / 100
                                                        )}
                                                        {invoice.paid ? (
                                                            <StyledBadge>
                                                                Paid
                                                            </StyledBadge>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </StyledTd>
                                                    <StyledTd>
                                                        <Button
                                                            variant="texted"
                                                            color="primary"
                                                            onClick={() =>
                                                                window
                                                                    ?.open(
                                                                        invoice.invoice_pdf,
                                                                        "_blank"
                                                                    )
                                                                    ?.focus()
                                                            }
                                                        >
                                                            Download
                                                        </Button>
                                                    </StyledTd>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            ) : (
                                <StyledNoInvoiceText>
                                    No invoices
                                </StyledNoInvoiceText>
                            )}
                        </div>
                    )}
                    <Pagination
                        pagination={pagination}
                        onNext={onNextPage}
                        onPrev={onPrevPage}
                    />
                </StyledCardBody>
            </StyledCard>
        </div>
    );
};

export default Invoices;
