import React, { useState, useEffect, type ReactElement } from "react";
import Logo from "./Logo";
import Button from "../components/formElements/Button";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import authService from "../services/authService";
import VerificationOtp from "./auth/VerificationOtp";
import { toastSuccess } from "../utils/toast";
import { useDispatch } from "react-redux";
import { useRedirectIfLoggedIn } from "../hooks/use-redirect-if-logged-in";
import { persistAuthSession } from "../utils/authSession";

export default function SigninPhone(): ReactElement {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [phone, setPhone] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [phoneNumberInValid, setphoneNumberInValid] = useState(false);
    const [showOtpStep, setShowOtpStep] = useState(false);
    const [selectedCountryPhoneLength, setSelectedCountryPhoneLength] =
        useState(0);

    useRedirectIfLoggedIn();

    const verificationCodeHandler = async (resend = false): Promise<void> => {
        if (phone.length === selectedCountryPhoneLength) {
            setShowLoader(true);
            try {
                const finalPhoneNumber = phone.length > 0 ? `+${phone}` : "";
                await authService.requestVerificationCodeByPhone(
                    finalPhoneNumber
                );
                setShowOtpStep(true);
                if (resend) {
                    toastSuccess("Code resend succesfully!");
                }
            } catch {
                setphoneNumberInValid(true);
            } finally {
                setShowLoader(false);
            }
        } else {
            setphoneNumberInValid(true);
        }
    };

    const handleVerify = async (otp: string): Promise<void> => {
        const finalPhone = phone.length > 0 ? `+${phone}` : "";
        const res = await authService.authVerify({
            phone_number: finalPhone,
            vcode: otp,
        });
        if (res.status !== 200) {
            throw new Error(
                `Phone verification failed with status ${res.status}`
            );
        }
        persistAuthSession(dispatch, res.data);
        navigate("/projects");
    };

    useEffect(() => {
        document.title = `Sign in - Phone`;
    }, []);

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
                        <h1 className="headingOne">Sign in</h1>
                        <div className="form-control">
                            <label className="field-label text-left">
                                phone number
                            </label>
                            <PhoneInput
                                country={"us"}
                                value={phone}
                                onChange={(phone, country) => {
                                    setPhone(phone);
                                    const data = country as {
                                        format?: string;
                                    };
                                    if (data?.format != null) {
                                        const length =
                                            data.format.split(".").length - 1;
                                        setSelectedCountryPhoneLength(length);
                                    }
                                }}
                                enableSearch
                                searchPlaceholder="Search"
                                autocompleteSearch={true}
                                countryCodeEditable={false}
                                disableSearchIcon
                                inputClass={`custom-input-field ${
                                    phoneNumberInValid
                                        ? "border !border-red-500 !bg-white"
                                        : "!bg-white"
                                }`}
                                inputProps={{
                                    name: "phone",
                                    required: true,
                                    placeholder: "Phone number",
                                    autoFocus: true,
                                }}
                                onBlur={(
                                    _e,
                                    country: {
                                        format: string;
                                    }
                                ) => {
                                    const length =
                                        country.format.split(".").length - 1;
                                    setSelectedCountryPhoneLength(length);
                                    if (
                                        phone.length === 0 ||
                                        phone.length !== length
                                    ) {
                                        setphoneNumberInValid(true);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        void verificationCodeHandler();
                                    }
                                }}
                                onFocus={() => {
                                    setphoneNumberInValid(false);
                                }}
                            />
                        </div>
                        <Button
                            classes="custom-button custom-button-large custom-button-fill-primary"
                            attributes={{
                                type: "submit",
                                disabled: false,
                                value: "Request verification code",
                                clickEvent: () => {
                                    void verificationCodeHandler();
                                },
                                loader: showLoader,
                            }}
                        />
                    </div>
                    <div className="custom-small-container border-none py-0">
                        <Link to="/auth/email" className="textLink mb-11">
                            Use an email instead
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
                    mode="phone"
                    identifier={`+${phone}`}
                    onVerify={handleVerify}
                    onResend={() => {
                        void verificationCodeHandler(true);
                    }}
                    onChangeIdentifier={() => {
                        setShowOtpStep(false);
                    }}
                />
            )}
        </>
    );
}
