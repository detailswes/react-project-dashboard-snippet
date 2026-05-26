import React, { useEffect, useState, type ReactElement } from "react";
import Logo from "./Logo";
import Button from "../components/formElements/Button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "./../services/authService";
import VerificationOtp from "./auth/VerificationOtp";
import { toastSuccess } from "../utils/toast";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import { type AxiosResponse } from "axios";
import { useRedirectIfLoggedIn } from "../hooks/use-redirect-if-logged-in";
import { persistAuthSession } from "../utils/authSession";

const SigninEmail = (): ReactElement => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [showLoader, setShowLoader] = useState(false);
    const [showOtpStep, setShowOtpStep] = useState(false);

    useRedirectIfLoggedIn();

    const initialValues = {
        email: "",
    };

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        validateOnChange: false,
        onSubmit: async (values) => {
            await submitHandler(values.email);
        },
    });

    const { errors, handleChange, handleSubmit, handleBlur, values } = formik;

    useEffect(() => {
        document.title = `Sign in – Email`;
    }, []);

    const submitHandler = async (
        email: string,
        resend = false
    ): Promise<void> => {
        setShowLoader(true);
        try {
            const res: AxiosResponse =
                await authService.requestVerificationCodeByEmail(email);
            if (res.status === 202) {
                setShowOtpStep(true);
                if (resend) {
                    toastSuccess("Code resend succesfully!");
                }
            }
        } finally {
            setShowLoader(false);
        }
    };

    const handleVerify = async (otp: string): Promise<void> => {
        const res = await authService.authVerifyEmail({
            email: values.email,
            otp,
        });
        if (res.status !== 201) {
            throw new Error(
                `Email verification failed with status ${res.status}`
            );
        }
        persistAuthSession(dispatch, res.data);
        navigate("/projects");
    };

    return (
        <>
            {!showOtpStep && (
                <div className="custom-container text-center">
                    <div className="header hidden sm:block">
                        <Link
                            to="/"
                            className="mx-auto mb-20 mt-9 inline-block"
                        >
                            <Logo />
                        </Link>
                    </div>
                    <div className="custom-small-container">
                        <h1 className="headingOne">{t("signin")}</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="field-label text-left">
                                    email
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    className={`custom-input-field ${
                                        "email" in errors
                                            ? "border !border-red-500 focus:!border-red-500 !bg-white"
                                            : "!bg-white"
                                    }`}
                                    placeholder={t("email").toString()}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            </div>
                            <Button
                                classes="custom-button custom-button-large custom-button-fill-primary"
                                attributes={{
                                    type: "submit",
                                    disabled: false,
                                    value: "requestVerificationCode",
                                    loader: showLoader,
                                    clickEvent: () => {},
                                }}
                            />
                        </form>
                    </div>
                    <div className="custom-small-container border-none py-0">
                        <Link to="/" className="textLink mb-11">
                            {t("usePhoneNumber")}
                        </Link>
                        <p className="content">
                            By selecting ‘Request verification code’ you agree
                            to our{" "}
                            <Link to="/terms" className="normalLink">
                                Terms of Service
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            )}
            {showOtpStep && (
                <VerificationOtp
                    mode="email"
                    identifier={values.email}
                    onVerify={handleVerify}
                    onResend={() => {
                        void submitHandler(values.email, true);
                    }}
                    onChangeIdentifier={() => {
                        setShowOtpStep(false);
                    }}
                />
            )}
        </>
    );
};

export default SigninEmail;
