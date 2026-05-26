import React, { type ReactElement, useState } from "react";
import Tooltip from "../Tooltip";
import CustomSelect from "../formElements/CustomSelect";

import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../formElements/Button";
import projectService from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import InputField from "../formElements/InputField";
import RadioField from "../formElements/RadioField";
import TextAreaField from "../formElements/TextAreaField";
import { type AxiosResponse } from "axios";
import type { Project, UserOption } from "../../types/projectTypes";

interface Props {
    project: Project;
    closeModal: () => void;
    updateProjects: (updatedProject: Project) => void;
    allUsers: UserOption[];
    editMode?: boolean;
}

const AddProject = (props: Props): ReactElement<Props> => {
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();

    const projectAddSchema = Yup.object().shape({
        project_name: Yup.string().required("Required"),
    });

    const initialValues = {
        project_name: props.project?.project_name ?? "",
        project_type: props.project?.project_type ?? "production",
        project_status: props.project?.project_status ?? "active",
        project_description: props.project?.project_description ?? "",
        requested_by: props.project?.requested_by ?? null,
    };

    const selectedRequestedByOptions: Array<{ value: string; label: string }> =
        [];

    props.project.requested_by.forEach((r) => {
        selectedRequestedByOptions.push({
            value: r,
            label: r,
        });
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: projectAddSchema,
        onSubmit: (values) => {
            void submitHandler(values);
        },
    });

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        touched,
        resetForm,
        handleBlur,
    } = formik;

    const submitHandler = async (values: {
        project_name: string;
        project_type: string;
        project_status: string;
        project_description: string;
        requested_by: string[] | null;
    }): Promise<void> => {
        setShowLoader(true);
        const updatedValues = {
            ...values,
        };
        try {
            const res: AxiosResponse<{
                project: Project;
                slug: string;
            }> = await projectService.saveProject(
                updatedValues,
                props.project?.slug
            );
            if (res.status > 200) {
                resetForm();
                props.closeModal();
                if (props.project.slug !== "") {
                    props.updateProjects(res.data.project);
                } else {
                    navigate(`/project/${res.data.slug}`);
                }
            }
            setShowLoader(false);
        } catch (err) {
            setShowLoader(false);
        }
    };

    return (
        <>
            <div className="px-6 lg:px-8 custom-modal">
                <div className="form-control">
                    <InputField
                        label="Project name"
                        error={
                            touched?.project_name === true
                                ? errors?.project_name
                                : undefined
                        }
                        value={values.project_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="project_name"
                        labelTabIndex={2}
                        tabIndex={3}
                        placeholder="Enter a project name"
                    />
                </div>
                <div className="form-control">
                    <label className="field-label text-left" tabIndex={13}>
                        Project type
                        <Tooltip
                            tabIndex={14}
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            icon={undefined}
                            placement={undefined}
                            isLogoutLink={false}
                        />
                    </label>
                    <ul className="grid gap-3 grid-cols-2 mb-7">
                        <li>
                            <RadioField
                                id="production"
                                name="project_type"
                                value="production"
                                label="Production"
                                labelTabIndex={15}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.project_type === "production"}
                                error={undefined}
                            />
                        </li>
                        <li>
                            <RadioField
                                id="internal"
                                name="project_type"
                                value="internal"
                                label="Internal"
                                labelTabIndex={16}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.project_type === "internal"}
                                error={undefined}
                            />
                        </li>
                    </ul>
                </div>
                <div className="form-control">
                    <label className="field-label text-left" tabIndex={13}>
                        Active or backlog
                        <Tooltip
                            tabIndex={14}
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            icon={undefined}
                            placement={undefined}
                            isLogoutLink={false}
                        />
                    </label>
                    <ul className="grid gap-3 grid-cols-2 mb-7">
                        <li>
                            <RadioField
                                id="active"
                                name="project_status"
                                value="active"
                                label="Active"
                                labelTabIndex={15}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.project_status === "active"}
                                error={undefined}
                            />
                        </li>
                        <li>
                            <RadioField
                                id="backlog"
                                name="project_status"
                                value="backlog"
                                label="Backlog"
                                labelTabIndex={16}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.project_status === "backlog"}
                                error={undefined}
                            />
                        </li>
                    </ul>
                </div>
                <div className="form-control">
                    <TextAreaField
                        label="Description (Optional)"
                        placeholder="Add a description"
                        value={values.project_description}
                        name="project_description"
                        error={
                            errors?.project_description != null &&
                            touched?.project_description
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
                <div className="form-control">
                    <label className="field-label text-left" tabIndex={10}>
                        Requested by (Optional)
                        <Tooltip
                            tabIndex={11}
                            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            icon={undefined}
                            placement={undefined}
                            isLogoutLink={false}
                        />
                    </label>
                    <div className="select-wrapper" tabIndex={12}>
                        <CustomSelect
                            options={props.allUsers}
                            handleChange={handleChange}
                            value={selectedRequestedByOptions}
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            setFieldValue={formik.setFieldValue}
                            name="requested_by"
                            // eslint-disable-next-line @typescript-eslint/no-misused-promises
                            handleBlur={async (): Promise<void> => {
                                await formik.setFieldTouched("requested_by");
                            }}
                            error={
                                errors?.requested_by != null &&
                                touched?.requested_by
                            }
                            isMulti
                            isNotCreateable={undefined}
                            placeholder={undefined}
                        />
                    </div>
                </div>
            </div>
            <div className="modal-footer border-t border-t-fieldOutline p-6 flex flex-wrap items-center justify-end fixed left-0 right-0 bottom-0 bg-white z-50">
                <Button
                    classes="custom-button custom-button-large custom-button-fill-primary w-auto"
                    attributes={{
                        type: "button",
                        disabled: values.project_name.length === 0,
                        value: "Save project",
                        clickEvent: () => {
                            handleSubmit();
                        },
                        loader: showLoader,
                    }}
                />
            </div>
        </>
    );
};

export default AddProject;
