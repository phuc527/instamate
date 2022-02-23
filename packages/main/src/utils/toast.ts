import { toast, ToastOptions } from "react-toastify";
import { get as _get, has } from "lodash-es";
import { ReactText } from "react";

const optionsError: ToastOptions = {
    type: toast.TYPE.ERROR,
    autoClose: 3000,
    className: "custom-toast",
};

const optionsSuccess: ToastOptions = {
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
    className: "custom-toast",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onToastError(error: any, duration?: number): ReactText {
    const options = duration
        ? { ...optionsError, autoClose: duration }
        : optionsError;
    if (typeof error === "string") {
        return toast(error, options);
    }
    if (has(error, "data.message")) {
        return toast(error.data.message, options);
    }
    if (error.response) {
        if (!(error.response.status === 401)) {
            return toast(
                _get(error.response, "data.message") || error.message,
                options
            );
        }
    } else if (error.request) {
        return toast("Network error", options);
    }

    return toast(error.message, options);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onToastSuccess(success: any, duration?: number) {
    const options = duration
        ? { ...optionsSuccess, autoClose: duration }
        : optionsSuccess;
    if (typeof success === "string") {
        return toast(success, options);
    }
    if (success.response) {
        return toast(
            _get(success.response, "data.message") || success.message,
            options
        );
    }
    if (success.request) {
        return toast("Network error", options);
    }
    return toast(success.message, options);
}

class ToastInstance {
    toast: ReactText | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toastSuccess = (message: any, duration = 3000) => {
        if (!this.toast || !toast.isActive(this.toast)) {
            this.toast = onToastSuccess(message, duration);
        } else {
            toast.update(this.toast, {
                render: message,
                closeButton: null,
                autoClose: duration,
            });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    toastError = (message: any, duration = 3000) => {
        if (!this.toast || !toast.isActive(this.toast)) {
            this.toast = onToastError(message, duration);
        } else {
            toast.update(this.toast, {
                render: message,
                closeButton: null,
                autoClose: duration,
            });
        }
    };
}

const toastSuccessInstance = new ToastInstance();
const toastErrorInstance = new ToastInstance();

const { toastSuccess } = toastSuccessInstance;
const { toastError } = toastErrorInstance;

export { toastSuccess, toastError };
