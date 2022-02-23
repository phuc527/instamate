import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Input, Label, Spinner } from "@doar/components";
import classNames from "classnames";
import useOnclickOutside from "react-cool-onclickoutside";
import { Edit3 } from "react-feather";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toastError, toastSuccess } from "src/utils/toast";
import { classic } from "@doar/shared/styled/colors";
/* Redux */
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { IFormUpdateBusinessInfo } from "src/types/api/location";
import { doUpdateProject } from "src/redux/slices/project";
/* Images */
import DefaultAvatar from "@doar/shared/images/default-avatar.png";
/* Components */
import Title from "../../title";
/* Styles */
import { StyledCardBody, StyledInfoWrap, StyledLabel } from "../style";
import {
    StyledCard,
    StyledActionWrap,
    StyledInputFile,
    StyledInfo,
    StyledUploadWrap,
    StyledAvatar,
    StyledCardLoading,
    StyledEditRegion,
} from "./style";

const schema = yup.object().shape({
    logo: yup.mixed(),
    name: yup.string().trim(),
    website: yup.string().trim(),
});

const PracticeInfo: FC = () => {
    const { register, handleSubmit, reset, getValues, setValue } =
        useForm<IFormUpdateBusinessInfo>({
            resolver: yupResolver(schema),
            defaultValues: {
                logo: "",
                name: "",
                website: "",
            },
        });
    const dispatch = useAppDispatch();
    const { project, error } = useAppSelector((store) => store.project);
    const [isEdit, setIsEdit] = useState({
        logo: false,
        name: false,
        website: false,
    });
    const [previewLogo, setPreviewLogo] = useState(DefaultAvatar);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (project) {
            reset({
                name: project.name,
                website: project.website,
            });
            setPreviewLogo(project.photo);
            setLoading(false);
        }
    }, [project, reset]);

    useEffect(() => {
        if (error.name) {
            toastError(error.name);
        }
        if (error.website) {
            toastError(error.website);
        }
    }, [error]);

    const onChangeLogo = (e: ChangeEvent<HTMLInputElement>) => {
        setIsEdit({ ...isEdit, logo: true });
        if (e.target.files?.length) {
            setValue("logo", e.target.files);
            setPreviewLogo(URL.createObjectURL(e.target.files[0]));
        }
    };

    const toggleEditing = (field: string, status: boolean) => {
        /* In case user change input but not save then we reset all values */
        if (!status && project) {
            const { name, website } = project;
            switch (field) {
                case "name":
                    setValue("name", name);
                    break;
                case "website":
                    setValue("website", website);
                    break;
                default:
                    break;
            }
        }
        setIsEdit({
            ...isEdit,
            [field]: status,
        });
    };

    const onSave = (data: IFormUpdateBusinessInfo) => {
        const formFile = new FormData();
        if (data.logo.length) {
            formFile.append("photo", data.logo[0]);
        }

        if (project?.id) {
            dispatch(
                doUpdateProject({
                    id: project.id,
                    form: {
                        name: data.name,
                        website: data.website,
                        phone: project.phone,
                    },
                    ...(data.logo.length && { formFile }),
                    onSuccess: () => {
                        toastSuccess("Updated successfully!");
                        setIsEdit({
                            logo: false,
                            name: false,
                            website: false,
                        });
                    },
                })
            );
        }
    };

    const nameRef = useOnclickOutside(() => toggleEditing("name", false));
    const websiteRef = useOnclickOutside(() => toggleEditing("website", false));

    return (
        <>
            <Title>Practice</Title>
            {loading ? (
                <StyledCardLoading>
                    <Spinner color="primary" />
                </StyledCardLoading>
            ) : (
                <StyledCard>
                    <StyledCardBody $practiceInfo>
                        <StyledLabel>Business Logo</StyledLabel>
                        <StyledUploadWrap>
                            <StyledAvatar src={previewLogo} alt="logo" />
                            <StyledInputFile
                                id="business-logo"
                                type="file"
                                accept="image/*"
                                {...register("logo")}
                                onChange={onChangeLogo}
                            />
                            <StyledUploadWrap>
                                <Button variant="outlined" color="primary">
                                    <Label htmlFor="business-logo">
                                        Upload new
                                    </Label>
                                </Button>
                                {isEdit.logo ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        ml="20px"
                                        onClick={handleSubmit((data) =>
                                            onSave(data)
                                        )}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </StyledUploadWrap>
                        </StyledUploadWrap>
                        <br />
                        <StyledLabel>Business Name</StyledLabel>
                        <StyledInfoWrap
                            ref={nameRef}
                            className="practiceInfo"
                            onClick={() => toggleEditing("name", true)}
                        >
                            <Input
                                id="business-name"
                                type="text"
                                placeholder="eg. My Health Practice"
                                className={classNames({
                                    "d-none": !isEdit.name,
                                })}
                                mr="20px"
                                {...register("name")}
                            />
                            {isEdit.name ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    ml="auto"
                                    onClick={handleSubmit((data) =>
                                        onSave(data)
                                    )}
                                >
                                    Save
                                </Button>
                            ) : (
                                <StyledEditRegion>
                                    {getValues("name") ? (
                                        <StyledInfo>
                                            {getValues("name")}
                                        </StyledInfo>
                                    ) : (
                                        <Button
                                            variant="texted"
                                            color="primary"
                                        >
                                            + add name
                                        </Button>
                                    )}
                                    <StyledActionWrap className="actionWrap">
                                        <Edit3
                                            size="18"
                                            color={classic.gray500}
                                        />
                                    </StyledActionWrap>
                                </StyledEditRegion>
                            )}
                        </StyledInfoWrap>
                        <StyledLabel style={{ marginTop: "10px" }}>
                            Business Website
                        </StyledLabel>
                        <StyledInfoWrap
                            ref={websiteRef}
                            className="practiceInfo"
                            onClick={() => toggleEditing("website", true)}
                        >
                            <Input
                                id="business-website"
                                type="text"
                                placeholder="eg. https://myhealthpractice.com"
                                className={classNames({
                                    "d-none": !isEdit.website,
                                })}
                                mr="20px"
                                {...register("website")}
                            />
                            {isEdit.website ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    ml="auto"
                                    onClick={handleSubmit((data) =>
                                        onSave(data)
                                    )}
                                >
                                    Save
                                </Button>
                            ) : (
                                <StyledEditRegion>
                                    {getValues("website") ? (
                                        <StyledInfo>
                                            {getValues("website")}
                                        </StyledInfo>
                                    ) : (
                                        <Button
                                            variant="texted"
                                            color="primary"
                                        >
                                            + add website
                                        </Button>
                                    )}
                                    <StyledActionWrap className="actionWrap">
                                        <Edit3
                                            size="18"
                                            color={classic.gray500}
                                        />
                                    </StyledActionWrap>
                                </StyledEditRegion>
                            )}
                        </StyledInfoWrap>
                    </StyledCardBody>
                </StyledCard>
            )}
        </>
    );
};

export default PracticeInfo;
