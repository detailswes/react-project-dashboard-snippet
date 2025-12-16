import React, { useEffect, useState, type ReactElement } from "react";
import Button from "../components/formElements/Button";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import authService from "./../services/authService";
import VerificationWithEmail from "../components/auth/VerificationWithEmail";
import { toastSuccess } from "../utils/toast";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import type { RootState } from "../store";
import { type AxiosResponse } from "axios";

const SigninEmail = (): ReactElement => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showLoader, setShowLoader] = useState(false);
    const [showVWEComponent, setShowVWEComponent] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
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
        if (isLoggedIn) {
            navigate("/projects", { replace: true });
        }
    }, [isLoggedIn, navigate]);

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
                setShowVWEComponent(true);
                setShowLoader(false);
                if (resend) {
                    toastSuccess("Code resend succesfully!");
                }
            }
            setShowLoader(false);
        } catch {
            setShowLoader(false);
        }
    };

    return (
        <>
            {!showVWEComponent && (
                <div className="custom-container text-center">
                    <div className="header hidden sm:block">
                        <Link
                            to="/"
                            className="mx-auto mb-20 mt-9 inline-block"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="62"
                                height="15"
                                viewBox="0 0 62 15"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M28.2304 10.6421L23.2193 0L16.1406 14.4376H26.3695H30.0176H40.2464L33.4481 0L28.2304 10.6421Z"
                                    fill="#FE7A48"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M50.7648 0.982422H40.252V9.7431C40.252 12.6461 42.6053 14.9995 45.5084 14.9995C48.4114 14.9995 50.7648 12.6461 50.7648 9.7431V0.982422ZM61.2793 0.982422H50.7664V9.7431C50.7664 12.6461 53.1198 14.9995 56.0229 14.9995C58.9259 14.9995 61.2793 12.6461 61.2793 9.7431V0.982422Z"
                                    fill="#044FF5"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M0.72168 1.11987H6.74903V4.48188H9.13035V1.11987H15.1577V14.4361H9.13035V11.0699H6.74903V14.4361H0.72168V1.11987Z"
                                    fill="#FECD48"
                                />
                            </svg>
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
            {showVWEComponent && (
                <VerificationWithEmail
                    email={values.email}
                    hideVWEComponent={() => {
                        setShowVWEComponent(false);
                    }}
                    resendCode={async (email: string) => {
                        void submitHandler(email, true);
                    }}
                />
            )}
        </>
    );
};

export default SigninEmail;
