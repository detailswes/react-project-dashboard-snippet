import { toast } from "react-toastify";

export const toastSuccess = (message: string): void => {
    toast.success(message, {
        position: "top-right",
        theme: "colored",
    });
};
export const toastError = (message: string): void => {
    toast.error(message, {
        position: "top-right",
        theme: "colored",
    });
};
