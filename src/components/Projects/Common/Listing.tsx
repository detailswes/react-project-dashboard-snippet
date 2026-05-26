/* eslint-disable no-extra-boolean-cast */
import React, { type ReactElement } from "react";
import { Link } from "react-router-dom";
import ListsSkeleton from "../../Skeleton/Projects/ListsSkeleton";
import CustomChip from "../../includes/CustomChip";
import moment from "moment";
import startCase from "lodash/startCase";

import { type projectListingConfig } from "../../../types/ListingTypes";

const Listing = (props: projectListingConfig): ReactElement => {
    return props.projectsHasLoaded ? (
        <div className="custom-medium-container">
            <div className="px-4 sm:px-0 pb-18">
                <div className="tab-panel mt-9">
                    <>
                        {props.projects?.map((project, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div
                                        className={`project-listing relative ${
                                            project.is_waiting?.status === true
                                                ? "after:content-[''] after:bg-primary after:w-[1.5px] after:absolute after:left-[7px] after:top-0 after:bottom-0 after:rounded after:my-3"
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            to={`/project/${
                                                project.slug
                                            }/${project.project_name
                                                .toLowerCase()
                                                .replace(/[^a-zA-Z0-9 ]/g, "")
                                                .replace(/\s/g, "-")}`}
                                            className="project-wrap"
                                        >
                                            <span className="project-content-wrap flex flex-col items-start max-w-[95%]">
                                                <span className="font-inter-regular text-16 text-black  leading-20 mb-2">
                                                    {project.project_name}
                                                </span>

                                                <div className="flex flex-wrap items-end">
                                                    {Object.keys(project.status)
                                                        .length > 0 && (
                                                        <>
                                                            <div className="mr-2 mt-2">
                                                                <CustomChip
                                                                    overrideClasses="!mx-0"
                                                                    icon="progress"
                                                                    content={
                                                                        project
                                                                            .status
                                                                            ?.stage
                                                                    }
                                                                    progressComplete={
                                                                        project
                                                                            .status
                                                                            ?.progress_complete
                                                                    }
                                                                />
                                                            </div>
                                                            {!Boolean(
                                                                project.status
                                                                    .expire
                                                            ) &&
                                                                !Boolean(
                                                                    project
                                                                        .status
                                                                        .blocked
                                                                ) && (
                                                                    <div className="mr-2 mt-2">
                                                                        <CustomChip
                                                                            overrideClasses="!mx-0"
                                                                            icon="status"
                                                                            content={
                                                                                project
                                                                                    .status
                                                                                    .design_delivery_date_method ===
                                                                                "quarter"
                                                                                    ? project
                                                                                          .status
                                                                                          .design_delivery_date
                                                                                    : moment(
                                                                                          project
                                                                                              .status
                                                                                              .design_delivery_date
                                                                                      ).format(
                                                                                          "MMM DD"
                                                                                      )
                                                                            }
                                                                            progressComplete={
                                                                                undefined
                                                                            }
                                                                        />
                                                                    </div>
                                                                )}
                                                            {Boolean(
                                                                project.status
                                                                    .blocked
                                                            ) && (
                                                                <div className="mr-2 mt-2">
                                                                    <CustomChip
                                                                        overrideClasses="!mx-0"
                                                                        icon="blocked"
                                                                        content="Blocked"
                                                                        progressComplete={
                                                                            undefined
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                    {Object.keys(project.status)
                                                        .length === 0 && (
                                                        <div className="mr-2 mt-2">
                                                            <CustomChip
                                                                overrideClasses="!mx-0"
                                                                icon="missing"
                                                                content="Status missing"
                                                                progressComplete={
                                                                    undefined
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    {Boolean(
                                                        project.status?.expire
                                                    ) && (
                                                        <div className="mr-2 mt-2">
                                                            <CustomChip
                                                                overrideClasses="!mx-0"
                                                                icon="missing"
                                                                content="Status expired"
                                                                progressComplete={
                                                                    undefined
                                                                }
                                                            />
                                                        </div>
                                                    )}

                                                    {project?.project_type ===
                                                        "internal" && (
                                                        <div className="mr-2 mt-2">
                                                            <CustomChip
                                                                overrideClasses="!mx-0"
                                                                icon="internal"
                                                                content={startCase(
                                                                    project?.project_type
                                                                )}
                                                                progressComplete={
                                                                    undefined
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </span>
                                            <span className="project-icon-wrap absolute right-4 top-0 bottom-0 flex flex-wrap items-center">
                                                <svg
                                                    width="10"
                                                    height="14"
                                                    viewBox="0 0 10 14"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.37593 7.00247C9.37593 7.41081 9.20093 7.76081 8.90926 7.99414L2.43426 13.7691C1.9676 14.1191 1.2676 14.0608 0.917597 13.5941C0.567597 13.1275 0.567597 12.4858 1.03426 12.1358L6.75093 7.11914C6.80926 7.06081 6.80926 7.00247 6.75093 6.88581L1.03426 1.86914C0.567596 1.46081 0.509263 0.819143 0.917596 0.352476C1.32593 -0.11419 1.9676 -0.172525 2.43426 0.235809C2.43426 0.235809 2.43426 0.235809 2.4926 0.294143L8.96759 6.01081C9.20093 6.24414 9.37593 6.65247 9.37593 7.00247Z"
                                                        fill="#CADAE2"
                                                    />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </>
                </div>
            </div>
        </div>
    ) : (
        <ListsSkeleton />
    );
};

export default Listing;
