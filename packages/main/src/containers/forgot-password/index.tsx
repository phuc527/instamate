import { FC } from "react";
import { Button, Input, Spinner } from "@doar/components";
import image from "@doar/shared/images/img18.png";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { hasKey } from "@doar/shared/methods";
import Feedback from "@doar/components/src/forms/form-elements/feedback";
import { toastError, toastSuccess } from "src/utils/toast";
import { get } from "lodash-es";
import {
    StyledWrap,
    StyledImg,
    StyledTitle,
    StyledDesc,
    StyledResetForm,
    StyledNote,
    StyledFeedback,
} from "./style";
import { forgotPasswordApi } from "../../api/authentication/authentication";

interface IFormValues {
    email: string;
}
const schema = yup.object().shape({
    email: yup.string().required().email().trim(),
});
const PasswordContainer: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IFormValues>({ resolver: yupResolver(schema) });

    const onSubmit: SubmitHandler<IFormValues> = async (values) => {
        try {
            await forgotPasswordApi(values.email);
            toastSuccess("Please check your email address");
        } catch (error) {
            toastError(get(error, "data.message"));
        }
    };

    return (
        <StyledWrap>
            <StyledImg>
                <img src={image} alt="forgot password" />
            </StyledImg>
            <StyledTitle>Reset your password</StyledTitle>
            <StyledDesc>
                Enter your username or email address and we will send you a link
                to reset your password.
            </StyledDesc>
            <form action="#" onSubmit={handleSubmit(onSubmit)} noValidate>
                <StyledResetForm hasError={hasKey(errors, "email")}>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Enter username or email address"
                        width={[null, "250px"]}
                        feedbackText={errors?.email?.message}
                        state={hasKey(errors, "email") ? "error" : "success"}
                        {...register("email")}
                    />

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        color="brand2"
                        mt={["10px", 0]}
                        ml={[0, "10px"]}
                    >
                        {isSubmitting ? (
                            <Spinner size="xs" />
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </StyledResetForm>
                {hasKey(errors, "email") && (
                    <StyledFeedback>
                        <Feedback state="error" showErrorOnly showState>
                            {errors?.email?.message}
                        </Feedback>
                    </StyledFeedback>
                )}
            </form>
            <StyledNote>
                Key business concept vector is created by{" "}
                <a
                    href="https://www.freepik.com/free-photos-vectors/background"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    freepik (freepik.com)
                </a>
            </StyledNote>
        </StyledWrap>
    );
};

export default PasswordContainer;
