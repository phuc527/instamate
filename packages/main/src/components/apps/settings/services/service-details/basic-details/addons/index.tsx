import { Button, Input, Table, Textarea } from "@doar/components";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { hasKey } from "@doar/shared/methods";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import classNames from "classnames";
import { doCreateProcedureAddon } from "src/redux/slices/settings/services/procedure";
import { toastError, toastSuccess } from "src/utils/toast";
import { Edit3, Trash2 } from "react-feather";
import { classic } from "@doar/shared/styled/colors";
import {
    StyledCard,
    StyledNoDescription,
    StyledTd,
    StyledTdHeader,
    StyledTitlePanel,
    StyledTitleWrap,
    StyledTr,
} from "./style";
import DeleteAddonConfirmation from "./delete-addon-confirmation";
import EditAddon from "./edit-addon";

interface FormCreateProcedureAddon {
    name: string;
    desc?: string;
}

const schema = yup.object().shape({
    name: yup.string().required().trim().label("Name"),
    desc: yup.string().trim(),
});
const DetailAddonsInformation: FC = () => {
    const dispatch = useAppDispatch();
    const { addons, procedure } = useAppSelector((store) => ({
        addons: store.setting.services.procedure.addons,
        procedure: store.setting.services.procedure.procedure,
    }));
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<FormCreateProcedureAddon>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            desc: "",
        },
    });
    const [isCreating, setCreating] = useState(false);
    const [removeAddon, setRemoveAddon] = useState({
        id: 0,
        name: "",
    });
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [showEditAddon, setShowEditAddon] = useState(false);
    const [editId, setEditId] = useState(0);

    const onCreateNewAddon = (data: FormCreateProcedureAddon) => {
        if (procedure?.id) {
            dispatch(
                doCreateProcedureAddon({
                    form: {
                        name: data.name,
                        procedure_id: procedure.id,
                        min_cost: 0,
                        ...(data.desc && { description: data.desc }),
                    },
                    onSuccess: () => {
                        toastSuccess("Procedure addon created successfully");
                        reset();
                        setCreating(false);
                    },
                    onFail: (err) => toastError(err),
                })
            );
        }
    };

    const onRemoveAddon = (id: number, name: string) => {
        setRemoveAddon({
            id,
            name,
        });
        setShowRemoveConfirm(true);
    };

    const onEditAddon = (id: number) => {
        setEditId(id);
        setShowEditAddon(true);
    };

    return (
        <div>
            <StyledTitleWrap>
                <StyledTitlePanel>Addons</StyledTitlePanel>
            </StyledTitleWrap>
            <StyledCard>
                <Table hover>
                    <thead>
                        <tr>
                            <StyledTdHeader className="addonName">
                                ADDONS NAME
                            </StyledTdHeader>
                            <StyledTdHeader className="addonDescription">
                                DESCRIPTION
                            </StyledTdHeader>
                            <StyledTdHeader className="actions" />
                        </tr>
                    </thead>
                    <tbody>
                        {addons?.map((i) => {
                            return (
                                <StyledTr key={i.id}>
                                    <StyledTd className="name">
                                        {i.name}
                                    </StyledTd>
                                    <StyledTd>
                                        {i.description ? (
                                            i.description
                                        ) : (
                                            <StyledNoDescription>
                                                No description
                                            </StyledNoDescription>
                                        )}
                                    </StyledTd>
                                    <StyledTd className="actions">
                                        <div className="actionsBtn">
                                            <Button
                                                variant="contained"
                                                color="dark"
                                                mr="5px"
                                                p={10}
                                                onClick={() =>
                                                    onEditAddon(i.id)
                                                }
                                            >
                                                <Edit3
                                                    size={18}
                                                    color={classic.white}
                                                />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="danger"
                                                p={10}
                                                onClick={() =>
                                                    onRemoveAddon(i.id, i.name)
                                                }
                                            >
                                                <Trash2
                                                    size={18}
                                                    color={classic.white}
                                                />
                                            </Button>
                                        </div>
                                    </StyledTd>
                                </StyledTr>
                            );
                        })}
                        <tr>
                            <StyledTd
                                className={classNames("createAddon", {
                                    isCreating,
                                })}
                            >
                                <Button
                                    className="createAddonBtn"
                                    variant="texted"
                                    onClick={() => setCreating(true)}
                                >
                                    Create addon
                                </Button>
                                <div className="inputWrap">
                                    <Input
                                        id="create-procedure-addon-name"
                                        placeholder="Name"
                                        state={
                                            hasKey(errors, "name")
                                                ? "error"
                                                : "success"
                                        }
                                        showState={!!hasKey(errors, "name")}
                                        feedbackText={errors.name?.message}
                                        {...register("name")}
                                    />
                                </div>
                            </StyledTd>
                            <StyledTd
                                className={classNames({
                                    isCreating,
                                })}
                            >
                                <Textarea
                                    id="create-procedure-addon-description"
                                    placeholder="Description"
                                    state={
                                        hasKey(errors, "desc")
                                            ? "error"
                                            : "success"
                                    }
                                    showState={!!hasKey(errors, "desc")}
                                    feedbackText={errors.desc?.message}
                                    {...register("desc")}
                                />
                            </StyledTd>
                            <StyledTd
                                className={classNames({
                                    isCreating,
                                })}
                            >
                                <div className="addAddonActions">
                                    <Button
                                        variant="contained"
                                        mb={10}
                                        onClick={handleSubmit(onCreateNewAddon)}
                                    >
                                        Create
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="dark"
                                        onClick={() => {
                                            setCreating(false);
                                            reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </StyledTd>
                        </tr>
                    </tbody>
                </Table>
            </StyledCard>
            <DeleteAddonConfirmation
                addonId={removeAddon.id}
                addonName={removeAddon.name}
                show={showRemoveConfirm}
                onClose={() => setShowRemoveConfirm(false)}
            />
            <EditAddon
                show={showEditAddon}
                addonId={editId}
                onClose={() => setShowEditAddon(false)}
            />
        </div>
    );
};

export default DetailAddonsInformation;
