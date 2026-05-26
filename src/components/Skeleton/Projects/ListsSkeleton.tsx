import React, { type ReactElement } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListsSkeleton = (): ReactElement => {
    return (
        <>
            <div className="custom-medium-container">
                <div className="px-4 sm:px-0">
                    <div className="mb-4 mt-8 ">
                        <ul className="list">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div className="project-listing" key={index}>
                                    <Link to="#" className="project-wrap">
                                        <span className="project-content-wrap flex flex-col items-start max-w-[95%]">
                                            <span className="font-inter-regular text-16 text-black  leading-20 mb-2">
                                                <Skeleton
                                                    width={285}
                                                    height={20}
                                                    style={{
                                                        borderRadius: 30,
                                                    }}
                                                />
                                            </span>

                                            <Skeleton
                                                width={103}
                                                height={20}
                                                style={{
                                                    borderRadius: 30,
                                                }}
                                            />
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListsSkeleton;
