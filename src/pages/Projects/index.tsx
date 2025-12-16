import React, { useEffect, useState, type ReactElement } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import Button from "../../components/formElements/Button";
import AddProject from "../../components/Projects/AddProject";
import Footer from "../../components/includes/Footer";
import CustomModal from "../../components/includes/Modal";
import Active from "../../components/Projects/Active";
import Backlog from "../../components/Projects/Backlog";
import Archive from "../../components/Projects/Archive";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import projectService from "../../services/projectService";
import type { RootState } from "../../store";
const Projects = (): ReactElement => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState({
        active: true,
        backlog: false,
        archive: false,
    });

    const [allUsers, setAllUsers] = useState([]);
    const [projectsHasLoaded, setProjectsHasLoaded] = useState(false);
    const loggedInUser = useSelector((state: RootState) => state.user.userInfo);
    const [activeProjects, setActiveProjects] = useState<
        Array<{ value: string; label: string }>
    >([]);
    const [backlogProjects, setBacklogProjects] = useState([]);
    const [archiveProjects, setArchiveProjects] = useState([]);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    function openModal(): void {
        setIsOpen(true);
    }
    function closeModal(): void {
        setIsOpen(false);
    }

    const initialFunctions = async (): Promise<void> => {
        void getActiveProjectsByUserId();
        void getBackLogProjectsByUserId();
        void getArchiveProjectsByUserId();
        void getAllUsers();
    };

    useEffect(() => {
        document.title = `Projects – HMW`;
        void initialFunctions();
    }, []);

    useEffect(() => {
        if (searchParams.get("uid") == null) {
            navigate(`/projects?uid=${loggedInUser._id}`);
        }
    }, [searchParams, navigate, loggedInUser._id]);
    const changeTab = (tab: string): void => {
        if (tab === "active") {
            setActiveTab({ active: true, backlog: false, archive: false });
        } else if (tab === "backlog") {
            setActiveTab({ active: false, backlog: true, archive: false });
        } else {
            setActiveTab({ active: false, backlog: false, archive: true });
        }
    };

    const getAllUsers = async (): Promise<void> => {
        try {
            const res = await userService.getAllUsers();
            const { user } = res.data;
            const options: Array<{ value: string; label: string }> = [];
            user.forEach((u: { full_name: string }) => {
                if (u.full_name.length > 0) {
                    options.push({ value: u.full_name, label: u.full_name });
                }
            });
            setAllUsers(options as never);
        } catch (err) {
            console.log(err);
        }
    };
    const getActiveProjectsByUserId = async (): Promise<void> => {
        setProjectsHasLoaded(false);
        const { _id } = loggedInUser;
        try {
            const res = await projectService.getProjectsByUserId(_id, "active");
            if (res.data.length > 0) {
                setActiveProjects(res.data);
            }
            setProjectsHasLoaded(true);
        } catch (error) {
            console.log(error);
        }
    };

    const getBackLogProjectsByUserId = async (): Promise<void> => {
        const { _id } = loggedInUser;
        try {
            const res = await projectService.getProjectsByUserId(
                _id,
                "backlog"
            );
            if (res.data.length > 0) {
                setBacklogProjects(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getArchiveProjectsByUserId = async (): Promise<void> => {
        const { _id } = loggedInUser;
        try {
            const res = await projectService.getProjectsByUserId(
                _id,
                "archive"
            );
            if (res.data.length > 0) {
                setArchiveProjects(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`sm:ml-20 py-7 sm:py-18`}>
            {/* {hideHeader === "show" && ( */}
            <div className="header block sm:hidden text-center">
                <Link to="/" className="mx-auto mb-10 inline-block">
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
            {/* )} */}

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
                                    clickEvent: openModal,
                                    loader: false,
                                }}
                            />
                        </div>
                    </div>

                    {projectsHasLoaded ? (
                        <div className="tabs">
                            <Button
                                attributes={{
                                    type: "button",
                                    disabled: false,
                                    value: "active",
                                    clickEvent: () => {
                                        changeTab("active");
                                    },
                                    loader: false,
                                }}
                                classes={`tab ${
                                    activeTab.active ? "active" : ""
                                }`}
                            />
                            <Button
                                attributes={{
                                    type: "button",
                                    disabled: false,
                                    value: "backlog",
                                    clickEvent: () => {
                                        changeTab("backlog");
                                    },
                                    loader: false,
                                }}
                                classes={`tab ${
                                    activeTab.backlog ? "active" : ""
                                }`}
                            />
                            <Button
                                attributes={{
                                    type: "button",
                                    disabled: false,
                                    value: "archive",
                                    clickEvent: () => {
                                        changeTab("archive");
                                    },
                                    loader: false,
                                }}
                                classes={`tab ${
                                    activeTab.archive ? "active" : ""
                                }`}
                            />
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
                {activeTab.active ? (
                    <Active
                        projects={activeProjects}
                        projectsHasLoaded={projectsHasLoaded}
                    />
                ) : activeTab.backlog ? (
                    <Backlog
                        projects={backlogProjects}
                        projectsHasLoaded={projectsHasLoaded}
                    />
                ) : (
                    activeTab.archive && (
                        <Archive
                            projects={archiveProjects}
                            projectsHasLoaded={projectsHasLoaded}
                        />
                    )
                )}
            </div>

            <Footer />
            <CustomModal
                isOpen={modalIsOpen}
                isClose={closeModal}
                component={
                    <AddProject
                        closeModal={closeModal}
                        allUsers={allUsers}
                        project={{
                            project_name: "",
                            project_type: "",
                            project_status: "",
                            project_description: "",
                            requested_by: [],
                            slug: "",
                        }}
                        updateProjects={function (): void {
                            throw new Error("Function not implemented.");
                        }}
                    />
                }
                title="Add a project"
                buttonContent="Save project"
                closeModal={closeModal}
            />
        </div>
    );
};

export default Projects;
