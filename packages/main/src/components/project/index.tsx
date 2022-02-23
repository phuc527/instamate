import { FC, useEffect } from "react";
import {
    Label,
    FormGroup,
    Input,
    Button,
    Spinner,
    CardBody
} from "@doar/components";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { hasKey } from "@doar/shared/methods";
import { useParams } from "react-router-dom";
import { doUpdateProject, doCreateProject } from "src/redux/slices/business";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { StyledLabelWrap, StyledCard, StyledContentItem } from "./style";
import { ProjectForm } from "../../api/business/buiness";


interface IFormValues {
    name: string;
    phone: string;
    website?: string;
}
const schema = yup.object().shape({
    name: yup.string().required().trim(),
    website: yup.string().trim(),
    phone: yup.string().required().trim(),
});

const Project: FC = () => {
    const { token } = useParams<{ token?: string }>();
    const loading = useAppSelector((store) => store.bussiness.loading);
    const user = useAppSelector((store) => store.authentication.user);
    const dataUpdateProject = useAppSelector((store) => store.bussiness.updateProject);
    const dataCreateProject = useAppSelector((store) => store.bussiness.createProject);
    const errorMessage = useAppSelector((store) => store.bussiness.errorMessage);
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm<IFormValues>({ resolver: yupResolver(schema) });
    const dispatch = useAppDispatch();
    const onSubmit = async (data: IFormValues) => {
        let projectId = user?.project_id
        let formValues: ProjectForm = {
            ...data
        };

        if (token) {
            formValues = { ...formValues, token };
        }

        if (projectId) {
            formValues = { ...formValues, project_id: projectId };
            await dispatch(doUpdateProject(formValues));
        } else if (dataCreateProject) {
            projectId = (dataCreateProject?.id)?.toString()
            formValues = { ...formValues, project_id: projectId };
            await dispatch(doUpdateProject(formValues));
        } else {
            await dispatch(doCreateProject(formValues));
        }


    };

    useEffect(() => {
        if (errorMessage) {
            const errorPhone = errorMessage.errors?.phone ? errorMessage.errors?.phone[0] : ''

            if (errorMessage?.message) {
                setError("phone", {
                    type: "manual",
                    message: errorMessage?.message !== 'The given data was invalid.' ? errorMessage.message : errorPhone
                });
            }
            if (errorMessage.errors?.name) {
                setError("name", {
                    type: "manual",
                    message: errorMessage.errors?.name ? errorMessage.errors?.name[0] : ''
                });
            }
            if (errorMessage.errors?.website) {
                setError("website", {
                    type: "manual",
                    message: errorMessage.errors?.website ? errorMessage.errors?.website[0] : ''
                });
            }
        }
    }, [setError, errorMessage])

    useEffect(() => {
        if (dataUpdateProject) {
            reset({
                name: dataUpdateProject.name || "",
                website: dataUpdateProject.website || "",
                phone: dataUpdateProject.phone || ""
            })
        }

        if (dataCreateProject) {
            reset({
                name: dataCreateProject.name || "",
                website: dataCreateProject.website || "",
                phone: dataCreateProject.phone || ""
            })
        }

        if (user?.project) {
            reset({
                name: user.project.name || "",
                website: user.project.website || "",
                phone: user.project.phone || ""
            })
        }
    }, [dataUpdateProject, reset, dataCreateProject, user]);

    return (
        <StyledCard>
            <CardBody>
                <StyledContentItem>
                    <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FormGroup mb="20px">
                            <StyledLabelWrap>
                                <Label display="block" mb="15px" htmlFor="name">
                                    Business Name
                        </Label>
                            </StyledLabelWrap>
                            <Input
                                height="45px"
                                type="name"
                                {...register('name')}
                                id="name"
                                placeholder="Chocoholic"
                                feedbackText={errors?.name?.message}
                                state={hasKey(errors, "name") ? "error" : "success"}
                                showState={!!hasKey(errors, "name")}
                            />

                        </FormGroup>
                        <FormGroup mb="20px">
                            <StyledLabelWrap>
                                <Label display="block" mb="15px" htmlFor="website">
                                    Website (Optional)
                        </Label>
                            </StyledLabelWrap>
                            <Input
                                height="45px"
                                id="website"
                                type="url"
                                {...register('website')}
                                feedbackText={errors?.website?.message}
                                state={hasKey(errors, "website") ? "error" : "success"}
                                showState={!!hasKey(errors, "website")}
                                placeholder="www.yourwebsite.com"
                            />
                        </FormGroup>
                        <FormGroup mb="20px">
                            <StyledLabelWrap>
                                <Label display="block" mb="15px" htmlFor="phone">
                                    Business Phone Number
                        </Label>
                            </StyledLabelWrap>
                            <Input
                                height="45px"
                                id="phone"
                                type="phone"
                                {...register('phone')}
                                placeholder="+1(650) 5042 307"
                                feedbackText={errors?.phone?.message}
                                state={hasKey(errors, "phone") ? "error" : "success"}
                                showState={!!hasKey(errors, "phone")}
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            color="primary"
                            fullwidth
                            mb="15px"
                            height="45px"
                            disabled={loading}
                        >
                            {loading ? <Spinner color="white" /> : "Next step"}
                        </Button>
                    </form>
                </StyledContentItem>
            </CardBody>
        </StyledCard>

    );
};


export default Project;
