import { FC, useEffect, useState } from "react";
import {
    Label,
    FormGroup,
    Input,
    Anchor,
    Button,
    Text,
    Spinner,
} from "@doar/components";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useParams } from "react-router-dom";
import * as moment from "moment-timezone";
import { toastError } from "src/utils/toast";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { Project } from "src/types/api/authentication";
import { registerByInvitation as registerAction } from "src/redux/slices/authentication";
import SigninForm from "../signin-form";
import { StyledWrap, StyledTitle, StyledDesc, StyledBottomText, StyledDisabled } from "./style";
import { getInvitationApi, RegisterForm } from "../../api/authentication/authentication";



interface IProps {
    getProject: (data: Project) => void
}

interface IFormValues {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
}
const schema = yup.object().shape({
    email: yup.string().required().email().trim(),
    name: yup.string().required().trim(),
    password: yup.string().required().trim().min(8),
    password_confirmation: yup
        .string()
        .required()
        .trim()
        .min(8)
        .label("Password confirmation")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const InvitationSigninForm: FC<IProps> = ({
    getProject,
}) => {
    const { token } = useParams<{ token?: string }>();
    const loading = useAppSelector((store) => store.authentication.loading);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
    } = useForm<IFormValues>({ resolver: yupResolver(schema) });
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [dataProject, setDataProject] = useState<Project | null>()
    const [emailUser, setEmailUser] = useState<string>()
    const [emailInvite, setEmailInvite] = useState<string>()
    const errorMessage = useAppSelector((store) => store.authentication.errorMessage);

    useEffect(() => {
        if (errorMessage?.message === 'The given data was invalid.') {
            setError('email', {
                type: "manual",
                message: errorMessage?.errors?.email ? errorMessage?.errors.email[0] : ''
            })
        }
    }, [setError, errorMessage])

    useEffect(() => {
        if (token) {
            getInvitationApi(token)
                .then((r) => {
                    if (JSON.parse(JSON.stringify(r)).user_id) {
                        setEmailUser(JSON.parse(JSON.stringify(r)).email)
                    } else {
                        setEmailInvite(JSON.parse(JSON.stringify(r)).email)
                        setValue('email', JSON.parse(JSON.stringify(r)).email)
                    }
                    setDataProject(JSON.parse(JSON.stringify(r)).project)
                })
                .catch((err) => {
                    toastError(err);
                });
        }
    }, [setValue, token, history]);

    const onSubmit = async (data: IFormValues) => {
        let formValues: RegisterForm = {
            ...data,
            timezone: moment.tz.guess(),
        };

        if (token) {
            formValues = { ...formValues, token };
        }

        if (dataProject) {
            formValues = { ...formValues, project_id: dataProject?.id };
        }

        await dispatch(registerAction(formValues));
    };
    useEffect(() => {
        if (dataProject) {
            getProject(dataProject)
        }
    }, [dataProject, getProject])

    return (
        <>
            {emailInvite && (<StyledWrap>
                <StyledTitle>Create New Account</StyledTitle>
                <StyledDesc>
                    It&apos;s free to signup and only takes a minute.
            </StyledDesc>
                <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="email">
                            Email address
                    </Label>
                        <StyledDisabled>
                            <Input
                                className="disabled"
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                feedbackText={errors?.email?.message}
                                state={hasKey(errors, "email") ? "error" : "success"}
                                showState={!!hasKey(errors, "email")}
                                {...register("email")}
                            />
                        </StyledDisabled>
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="password">
                            Password
                    </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            feedbackText={errors?.password?.message}
                            state={hasKey(errors, "password") ? "error" : "success"}
                            showState={!!hasKey(errors, "password")}
                            {...register("password")}
                        />
                    </FormGroup>{" "}
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="password">
                            Password confirmation
                    </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password confirmation"
                            feedbackText={errors?.password_confirmation?.message}
                            state={hasKey(errors, "password_confirmation") ? "error" : "success"}
                            showState={!!hasKey(errors, "password_confirmation")}
                            {...register("password_confirmation")}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Label display="block" mb="5px" htmlFor="name">
                            Name
                    </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            feedbackText={errors?.name?.message}
                            state={hasKey(errors, "name") ? "error" : "success"}
                            showState={!!hasKey(errors, "name")}
                            {...register("name")}
                        />
                    </FormGroup>
                    <FormGroup mb="20px">
                        <Text fontSize="12px">
                            By clicking <strong>Create an account</strong> below,
                        you agree to our terms of service and privacy statement.
                    </Text>
                    </FormGroup>
                    <Button
                        type="submit"
                        color="brand2"
                        fullwidth
                        disabled={loading}
                    >
                        {loading ? <Spinner size="xs" /> : "Sign Up"}
                    </Button>
                    {/* <StyledDivider>or</StyledDivider>
                <Button variant="outlined" color="facebook" fullwidth>
                    Sign In With Facebook
                </Button>
                <Button
                    variant="outlined"
                    color="twitter"
                    mt="0.5rem"
                    fullwidth
                >
                    Sign In With Twitter
                </Button> */}
                    <StyledBottomText>
                        Don&apos;t have an account?{" "}
                        <Anchor path="/login">Sign In</Anchor>
                    </StyledBottomText>
                </form>
            </StyledWrap>)}

            {emailUser && (
                <SigninForm emailUser={emailUser} />
            )}
        </>
    );
};

export default InvitationSigninForm;
