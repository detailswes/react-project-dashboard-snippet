import React, { useState, useEffect, type ReactElement } from "react";
import Logo from "../Logo";
import Button from "../formElements/Button";
import { Link } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { getApiErrorMessage } from "../../utils/authSession";

const VERIFICATION_CODE_LENGTH = 6;

export interface VerificationOtpProps {
    mode: "email" | "phone";
    identifier: string;
    onVerify: (otp: string) => Promise<void>;
    onResend: () => void;
    onChangeIdentifier: () => void;
}

const VerificationOtp = ({
    identifier,
    onVerify,
    onResend,
    onChangeIdentifier,
}: VerificationOtpProps): ReactElement => {
    const [otp, setOtp] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
    const [showLoader, setShowLoader] = useState(false);
    const [validationError, setValidationError] = useState("");

    const handleChange = (value: string): void => {
        setOtp(value);
        setSubmitButtonDisabled(value.length !== VERIFICATION_CODE_LENGTH);
        if (value.length === VERIFICATION_CODE_LENGTH) {
            void submitOtp(value);
        }
    };

    const submitOtp = async (code: string = otp): Promise<void> => {
        try {
            setShowLoader(true);
            setValidationError("");
            await onVerify(code);
        } catch (error: unknown) {
            setValidationError(getApiErrorMessage(error));
        } finally {
            setShowLoader(false);
        }
    };

    useEffect(() => {
        document.title = `Verify – HMW`;
    }, []);

    return (
        <div className="custom-container text-center">
            <div className="header hidden sm:block">
                <Link
                    to="/"
                    className="mx-auto mb-20 mt-9 hidden sm:inline-block"
                >
                    <Logo />
                </Link>
            </div>
            <div className="custom-small-container border-b-none">
                <h1 className="headingOne">Enter your code</h1>
                <div className="form-control">
                    <label className="field-label text-left">
                        Verification code
                    </label>
                    <OtpInput
                        value={otp}
                        onChange={handleChange}
                        numInputs={VERIFICATION_CODE_LENGTH}
                        className="otp-field-wrap"
                        inputStyle={`custom-input-field otp-field !w-full ${
                            validationError.length > 0
                                ? "!border-error border"
                                : ""
                        }`}
                        containerStyle="otp-field-wrapper"
                        isInputNum
                        autoComplete="one-time-code"
                        hasErrored={validationError.length > 0}
                    />
                    {validationError.length > 0 && (
                        <span className="field-label-error field-error field-label">
                            {validationError}
                        </span>
                    )}
                </div>
                <Button
                    classes="custom-button custom-button-large custom-button-fill-primary"
                    attributes={{
                        type: "submit",
                        disabled: submitButtonDisabled,
                        value: "Submit",
                        clickEvent: () => {
                            void submitOtp();
                        },
                        loader: showLoader,
                    }}
                />
                <Link
                    to=""
                    onClick={() => {
                        onResend();
                        setOtp("");
                        setValidationError("");
                        setSubmitButtonDisabled(true);
                    }}
                    className="textLink mt-4"
                >
                    Resend code
                </Link>

                <div className="border-t border-fieldOutline font-inter-regular pt-4 mt-10">
                    <div className="text-base text-left mb-1">
                        Code was sent to:
                    </div>
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="text-16 font-semibold tracking-tighter">
                            {identifier}
                        </div>
                        <div>
                            <Link
                                to=""
                                onClick={onChangeIdentifier}
                                className="textLink mt-0"
                            >
                                Change
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationOtp;
