import React, { useEffect, useState, type ReactElement } from "react";
import Logo from "../../components/Logo";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/formElements/Button";
import AddProject from "../../components/Projects/AddProject";
import Footer from "../../components/includes/Footer";
import CustomModal from "../../components/includes/Modal";
import Listing from "../../components/Projects/Common/Listing";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useProjects } from "../../hooks/use-projects";
import type { TabName, Project } from "../../types/projectTypes";

const emptyProject: Project = {
    project_name: "",
    project_type: "production",
    project_status: "active",
    project_description: "",
    requested_by: [],
    slug: "",
    status: {},
    is_waiting: null,
};

const Projects = (): ReactElement => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<TabName>("active");
    const loggedInUser = useSelector((state: RootState) => state.user.userInfo);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const {
        activeProjects,
        backlogProjects,
        archiveProjects,
        allUsers,
        hasLoaded,
        error,
    } = useProjects(loggedInUser._id);

    const [activeProjectsState, setActiveProjectsState] =
        useState<Project[]>(activeProjects);

    useEffect(() => {
        setActiveProjectsState(activeProjects);
    }, [activeProjects]);

    useEffect(() => {
        document.title = `Projects – HMW`;
    }, []);

    useEffect(() => {
        if (searchParams.get("uid") == null && loggedInUser._id.length > 0) {
            navigate(`/projects?uid=${loggedInUser._id}`);
        }
    }, [loggedInUser._id, navigate, searchParams]);

    const currentProjects =
        activeTab === "active"
            ? activeProjectsState
            : activeTab === "backlog"
            ? backlogProjects
            : archiveProjects;

    return (
        <div className={`sm:ml-20 py-7 sm:py-18`}>
            <div className="header block sm:hidden text-center">
                <Link to="/" className="mx-auto mb-10 inline-block">
                    <Logo />
                </Link>
            </div>

            <div className="custom-medium-container">
                <div className="relative px-4 sm:px-0">
                    <div className="flex flex-wrap items-center mb-8 sm:mb-12 justify-between ">
                        <h1 className="headingOne transition-all !text-left !mb-0">
                            Projects
                        </h1>

                        <div>
                            <Button
                                classes="custom-button custom-button-small custom-button-outline-primary"
                                attributes={{
                                    type: "button",
                                    disabled: false,
                                    value: "Add project",
                                    clickEvent: () => {
                                        setIsOpen(true);
                                    },
                                    loader: false,
                                }}
                            />
                        </div>
                    </div>

                    {error != null && (
                        <p className="text-error mb-4">{error}</p>
                    )}

                    {hasLoaded ? (
                        <div className="tabs">
                            {(
                                ["active", "backlog", "archive"] as TabName[]
                            ).map((tab) => (
                                <Button
                                    key={tab}
                                    attributes={{
                                        type: "button",
                                        disabled: false,
                                        value: tab,
                                        clickEvent: () => {
                                            setActiveTab(tab);
                                        },
                                        loader: false,
                                    }}
                                    classes={`tab ${
                                        activeTab === tab ? "active" : ""
                                    }`}
                                />
                            ))}
                        </div>
                    ) : (
                        <Skeleton
                            duration={1}
                            height={32}
                            width={141}
                            style={{
                                borderRadius: 30,
                            }}
                        />
                    )}
                </div>

                <Listing
                    projects={currentProjects}
                    projectsHasLoaded={hasLoaded}
                />
            </div>

            <Footer />
            <CustomModal
                isOpen={modalIsOpen}
                isClose={() => {
                    setIsOpen(false);
                }}
                component={
                    <AddProject
                        closeModal={() => {
                            setIsOpen(false);
                        }}
                        allUsers={allUsers}
                        project={emptyProject}
                        updateProjects={(updatedProject) => {
                            setActiveProjectsState((prev) =>
                                prev.map((p) =>
                                    p.slug === updatedProject.slug
                                        ? { ...p, ...updatedProject }
                                        : p
                                )
                            );
                        }}
                    />
                }
                title="Add a project"
                buttonContent="Save project"
                closeModal={() => {
                    setIsOpen(false);
                }}
            />
        </div>
    );
};

export default Projects;
