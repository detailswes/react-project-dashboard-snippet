import React, { type ReactElement } from "react";

import { Link, useLocation } from "react-router-dom";
import useViewport from "../../hooks/use-viewport";
import SimpleTooltip from "../SimpleTooltip";
import { useSelector } from "react-redux";
import { type RootState } from "../../store";
const Footer = (): ReactElement => {
    const width = useViewport();
    const location = useLocation();
    const loggedInUser = useSelector((state: RootState) => state.user.userInfo);

    return (
        <div className="footer sidebar">
            {width > 640 && (
                <Link
                    to="/"
                    className="mb-10 sm:mb-14 sm:mt-7 mx-auto inline-block"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="44"
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
            )}
            <SimpleTooltip
                tabIndex={5}
                content="Projects"
                placement="right"
                icon="projects"
                active={!!location.pathname.includes("/project")}
                to={`/projects?uid=${loggedInUser._id}`}
                isLogoutLink={false}
            />
            <SimpleTooltip
                tabIndex={5}
                content="Team"
                placement="right"
                icon="team"
                to="/team"
                active={location.pathname === "/team"}
                isLogoutLink={false}
            />
            <SimpleTooltip
                tabIndex={5}
                content="Account"
                placement="right"
                icon="account"
                to="/account"
                active={location.pathname === "/account"}
                isLogoutLink={false}
            />
        </div>
    );
};

export default Footer;
