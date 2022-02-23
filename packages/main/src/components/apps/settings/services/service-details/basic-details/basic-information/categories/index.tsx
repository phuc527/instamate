import { Spinner } from "@doar/components";
import { classic } from "@doar/shared/styled/colors";
import { FC, useEffect, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Edit3 } from "react-feather";
import { ServiceCategory } from "src/types/api/authentication";
import { doUpdateProcedure } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import ServiceDropdown from "../../../service-dropdown";
import { StyledInfoWrap, StyledLabel, StyledSaveButton } from "../style";

interface IProps {
    categoryName: string;
    id: number;
}
const Categories: FC<IProps> = ({ id, categoryName }) => {
    const dispatch = useAppDispatch();
    const { serviceCategories, loading } = useAppSelector(
        (store) => store.setting.services.procedure
    );
    const [value, setValue] = useState("");
    const [isEdit, setEdit] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
    const [filteredCategories, setFilteredCategories] = useState<
        ServiceCategory[] | null
    >(null);

    useEffect(() => {
        setValue(categoryName);
    }, [categoryName]);

    useEffect(() => {
        if (serviceCategories) {
            setFilteredCategories(serviceCategories);
        }
    }, [serviceCategories]);

    const ref = useOnclickOutside(() => {
        setValue(categoryName);
        setEdit(false);
    });

    const onSave = () => {
        dispatch(
            doUpdateProcedure({
                id,
                form: {
                    service_category_id: selectedId,
                },
                onSuccess: () => {
                    toastSuccess("Updated successfully!");
                    setEdit(false);
                },
                onFail: (error) => toastError(error),
            })
        );
        setEdit(false);
    };

    const onSearch = (string: string) => {
        if (serviceCategories) {
            setFilteredCategories(
                serviceCategories.filter((i) =>
                    i.name.toLowerCase().includes(string.toLowerCase())
                )
            );
        }
    };

    return (
        <div>
            <StyledLabel>Categories</StyledLabel>
            {isEdit ? (
                <StyledInfoWrap ref={ref}>
                    <ServiceDropdown
                        value={categoryName}
                        items={filteredCategories || []}
                        isSearchable
                        searchId="service-details-search-category"
                        onChangeSearchValue={onSearch}
                        onChange={(data) => setSelectedId(data.id)}
                    />
                    <StyledSaveButton
                        variant="contained"
                        ml="5px"
                        disabled={loading}
                        onClick={onSave}
                    >
                        {loading ? <Spinner color="white" size="xs" /> : "Save"}
                    </StyledSaveButton>
                </StyledInfoWrap>
            ) : (
                <StyledInfoWrap onClick={() => setEdit(true)}>
                    {value}
                    <div className="actionWrap">
                        <Edit3 size="18" color={classic.gray500} />
                    </div>
                </StyledInfoWrap>
            )}
        </div>
    );
};

export default Categories;
