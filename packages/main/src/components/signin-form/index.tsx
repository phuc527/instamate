import { FC, useEffect } from "react";
import {
    FormGroup,
    Label,
    Input,
    Anchor,
    Button,
    Spinner,
} from "@doar/components";
import { useForm } from "react-hook-form";
import { hasKey } from "@doar/shared/methods";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { doLogin } from "src/redux/slices/authentication";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginForm } from "../../api/authentication/authentication";
import {
    StyledWrap,
    StyledTitle,
    StyledDesc,
    StyledLabelWrap,
    StyledBottomText,
} from "./style";


interface IProps {
    emailUser?: string;
}
interface IFormValues {
    email: string;
    password: string;
}
const schema = yup.object().shape({
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim(),
});

const SigninForm: FC<IProps> = ({ emailUser }) => {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<IFormValues>({ resolver: yupResolver(schema) });
    const { token } = useParams<{ token?: string }>();
    const loading = useAppSelector((store) => store.authentication.loadingLogin);
    const errorMessage = useAppSelector((store) => store.authentication.errorMessage);
    const dispatch = useAppDispatch();
    const onSubmit = (data: IFormValues) => {
        if (emailUser) {
            let formValues: LoginForm = {
                ...data
            };

            if (token) {
                formValues = { ...formValues, token }
            }

            dispatch(doLogin(formValues));
        } else {
            dispatch(doLogin(data));
        }
    };

    useEffect(() => {
        if (errorMessage?.message === 'The given data was invalid.') {
            setError('email', {
                type: "manual",
                message: errorMessage?.errors?.email ? errorMessage?.errors.email[0] : ''
            })
        }

        if (emailUser) {
            setValue('email', emailUser)
        }
    }, [setError, setValue, errorMessage, emailUser])

    return (
        <StyledWrap>
            <StyledTitle>Sign In</StyledTitle>
            <StyledDesc>Welcome back! Please signin to continue.</StyledDesc>
            <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormGroup mb="20px">
                    <Label display="block" mb="5px" htmlFor="email">
                        Email address
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="yourname@yourmail.com"
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        showState={!!hasKey(errors, "email")}
                        {...register("email")}
                    />
                </FormGroup>
                <FormGroup mb="20px">
                    <StyledLabelWrap>
                        <Label display="block" mb="5px" htmlFor="password">
                            Password
                        </Label>
                        <Anchor path="/forgot-password" fontSize="13px">
                            Forgot password?
                        </Anchor>
                    </StyledLabelWrap>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        feedbackText={errors?.password?.message}
                        state={hasKey(errors, "password") ? "error" : "success"}
                        showState={!!hasKey(errors, "password")}
                        {...register("password")}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    color="brand2"
                    fullwidth
                    disabled={loading}
                >
                    {loading ? <Spinner size="xs" /> : "Sign In"}
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
                    <Anchor path="/signup">Create an Account</Anchor>
                </StyledBottomText>
            </form>
        </StyledWrap>
    );
};

export default SigninForm;
