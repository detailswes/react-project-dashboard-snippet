import React, { type ReactElement } from "react";
import Logo from "../Logo";

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
                    <Logo width={44} />
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
                tabIndex={6}
                content="Team"
                placement="right"
                icon="team"
                to="/team"
                active={location.pathname === "/team"}
                isLogoutLink={false}
            />
            <SimpleTooltip
                tabIndex={7}
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
