import { FC } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { parse } from "query-string";
import { toastError } from "src/utils/toast";
import {
    StyledWrap,
    StyledTitle,
    StyledDesc,
    StyledLabelWrap,
    StyledBottomText,
} from "./style";
import { resetPasswordApi } from "../../api/authentication/authentication";

interface IFormValues {
    email: string;
    password: string;
    password_confirmation: string;
}
const schema = yup.object().shape({
    email: yup.string().required().email().trim(),
    password: yup.string().required().min(8).trim(),
    password_confirmation: yup
        .string()
        .required()
        .trim()
        .min(8)
        .label("Password confirmation")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPasswordForm: FC = () => {
    const { token } = useParams<{ token: string }>();
    const location = useLocation();
    const history = useHistory();
    const { email } = parse(location.search);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: String(email),
        },
    });

    const onSubmit = async (data: IFormValues) => {
        try {
            await resetPasswordApi({
                ...data,
                token,
            });
            history.push("/");
        } catch (error) {
            toastError(error);
        }
    };

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
                        readonly
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
                <FormGroup mb="20px">
                    <StyledLabelWrap>
                        <Label display="block" mb="5px" htmlFor="password">
                            Password Confirmation
                        </Label>
                    </StyledLabelWrap>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password confirmation"
                        feedbackText={errors?.password_confirmation?.message}
                        state={
                            hasKey(errors, "password_confirmation")
                                ? "error"
                                : "success"
                        }
                        showState={!!hasKey(errors, "password_confirmation")}
                        {...register("password_confirmation")}
                    />
                </FormGroup>
                <Button
                    type="submit"
                    color="brand2"
                    fullwidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Spinner size="xs" /> : "Reset password"}
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

export default ResetPasswordForm;
