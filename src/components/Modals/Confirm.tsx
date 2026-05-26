import React, { type ReactElement } from "react";
import Button from "../formElements/Button";

const ConfirmModal = ({
    heading,
    attributes,
}: {
    heading: string;
    attributes: any;
    closeModal: () => void;
}): ReactElement => {
    return (
        <>
            <div className="px-6 lg:px-8 custom-modal">
                <div className="form-control md:mb-8 mb-0">
                    <h4
                        className="font-inter-regular fs-16 text-center"
                        tabIndex={2}
                    >
                        {heading}
                    </h4>
                </div>
            </div>
            <div className="modal-footer md:border-t border-t-fieldOutline p-6 pt-0 md:pt-6 flex flex-wrap items-center justify-end fixed left-0 right-0 bottom-0 bg-white z-50">
                <Button
                    classes="custom-button custom-button-large custom-button-fill-primary md:w-auto"
                    attributes={{
                        type: "submit",
                        disabled: false,
                        value: attributes?.buttonText ?? "Delete",
                        clickEvent: () => {
                            attributes?.clickEvent();
                        },
                        loader: attributes.loader,
                    }}
                />
            </div>
        </>
    );
};

export default ConfirmModal;
