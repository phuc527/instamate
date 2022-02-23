import {
    Button,
    Container,
    Row,
    Spinner,
    Tab,
    TabContent,
    TabList,
    TabPanel,
    Col,
} from "@doar/components";
import classNames from "classnames";
import { useEffect, FC, useState, useRef } from "react";
import { Share, Trash } from "react-feather";
import { useAppSelector } from "src/redux/hooks";
import Title from "../title";
import AddCategory from "./add-category";
import AddService from "./add-new-service";
import ProcedureTable from "./procedures-table";
import DeleteConfirmation from "./procedures-table/delete-confirmation";
import {
    StyledCategoriesWrap,
    StyledLoading,
    StyledScrollWrap,
    StyledTabWrap,
    StyledWrap,
} from "./style";

const Services: FC = () => {
    const categoryRef = useRef<HTMLDivElement | null>(null);
    const { serviceCategories } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [selectedProcedures, setSelectedProcedures] = useState<number[]>([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddService, setShowAddService] = useState(false);
    const [scrollStart, setScrollStart] = useState(false);
    const [scrollEnd, setScrollEnd] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const onSelectProcedures = (array: number[]) => {
        setSelectedProcedures(array);
    };

    useEffect(() => {
        if (serviceCategories && categoryRef?.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                categoryRef.current;

            if (scrollLeft === 0) {
                setScrollStart(false);
            } else setScrollStart(true);

            if (clientWidth < scrollWidth) {
                setScrollEnd(true);
            }
        }
    }, [serviceCategories]);

    const onScroll = () => {
        if (categoryRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                categoryRef.current;
            if (scrollLeft + clientWidth === scrollWidth) {
                setScrollEnd(false);
            } else setScrollEnd(true);

            if (scrollLeft !== 0) {
                setScrollStart(true);
            } else setScrollStart(false);
        }
    };

    return (
        <StyledWrap>
            <Container>
                <Row>
                    <Col col>
                        <Title>Services</Title>
                        {serviceCategories && serviceCategories?.length > 0 ? (
                            <StyledTabWrap variation="line">
                                <TabList>
                                    <StyledCategoriesWrap
                                        $blurOnStart={scrollStart}
                                        $blurOnEnd={scrollEnd}
                                    >
                                        <StyledScrollWrap
                                            ref={categoryRef}
                                            onScroll={onScroll}
                                        >
                                            <Tab>All</Tab>
                                            {serviceCategories?.map((i) => (
                                                <Tab key={i.id}>{i.name}</Tab>
                                            ))}
                                        </StyledScrollWrap>
                                    </StyledCategoriesWrap>
                                    <Button
                                        variant="texted"
                                        color="primary"
                                        className="addNewCategory"
                                        onClick={() => setShowAddCategory(true)}
                                    >
                                        + Add category
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="danger"
                                        className={classNames("removeBtn", {
                                            show: selectedProcedures.length > 0,
                                        })}
                                        onClick={() =>
                                            setShowDeleteConfirm(true)
                                        }
                                    >
                                        <span className="trashIcon">
                                            <Trash size={18} />
                                        </span>
                                        Remove services
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="light"
                                        className="exportBtn"
                                    >
                                        <span className="shareIcon">
                                            <Share size={18} />
                                        </span>
                                        Export
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className="addNewServiceBtn"
                                        onClick={() => setShowAddService(true)}
                                    >
                                        + Add new service
                                    </Button>
                                </TabList>
                                <TabContent>
                                    <TabPanel>
                                        <ProcedureTable
                                            onSelectProcedures={
                                                onSelectProcedures
                                            }
                                        />
                                    </TabPanel>
                                    {serviceCategories?.map((i) => (
                                        <TabPanel key={i.id}>
                                            <ProcedureTable
                                                categoryId={i.id}
                                                onSelectProcedures={
                                                    onSelectProcedures
                                                }
                                            />
                                        </TabPanel>
                                    ))}
                                </TabContent>
                            </StyledTabWrap>
                        ) : (
                            <StyledLoading>
                                <Spinner />
                            </StyledLoading>
                        )}
                        <DeleteConfirmation
                            show={showDeleteConfirm}
                            onClose={() => setShowDeleteConfirm(false)}
                            procedures={selectedProcedures}
                            onRemove={() => setSelectedProcedures([])}
                        />
                        <AddService
                            show={showAddService}
                            onClose={() => setShowAddService(false)}
                        />
                        <AddCategory
                            show={showAddCategory}
                            onClose={() => setShowAddCategory(false)}
                        />
                    </Col>
                </Row>
            </Container>
        </StyledWrap>
    );
};

export default Services;
