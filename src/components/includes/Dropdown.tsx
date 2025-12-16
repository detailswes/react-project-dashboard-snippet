import React, { useState, useRef, useEffect, type ReactElement } from "react";
import EditIcon from "../assets/images/edit-icon.svg";
import DeleteIcon from "../assets/images/delete-icon.svg";
import ArchiveIcon from "../assets/images/archive-icon.svg";
import type { dropDownConfig } from "../../types/includesTypes";

export default function Dropdown({
    clickEvent,
    addArchiveButton = false,
    archiveButtonText = "Archive",
}: dropDownConfig): ReactElement {
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        {
            name: "Edit",
            icon: EditIcon,
        },
        {
            name: "Delete",
            icon: DeleteIcon,
        },
    ];

    if (addArchiveButton) {
        options.push({
            name: archiveButtonText,
            icon: ArchiveIcon,
        });
    }
    const optionsName = options.map((o) => o.name);

    const toggling = (selectedOption: any): void => {
        if (optionsName.includes(selectedOption)) {
            clickEvent(selectedOption);
        }
        setIsOpen(!isOpen);
    };

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: any): void {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }
        const handleEscape = (event: any): void => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscape);
        };
    }, [wrapperRef]);

    return (
        <>
            <div className="DropDownContainer relative inline-block text-left">
                <div
                    className="DropDownHeader cursor-pointer"
                    onClick={toggling}
                >
                    <svg
                        width="22"
                        height="6"
                        viewBox="0 0 22 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.70833 5.71354C4.2041 5.71354 5.41667 4.50098 5.41667 3.00521C5.41667 1.50944 4.2041 0.296875 2.70833 0.296875C1.21256 0.296875 0 1.50944 0 3.00521C0 4.50098 1.21256 5.71354 2.70833 5.71354Z"
                            fill="#BABFC9"
                        />
                        <path
                            d="M11.0013 5.71354C12.4971 5.71354 13.7096 4.50098 13.7096 3.00521C13.7096 1.50944 12.4971 0.296875 11.0013 0.296875C9.50553 0.296875 8.29297 1.50944 8.29297 3.00521C8.29297 4.50098 9.50553 5.71354 11.0013 5.71354Z"
                            fill="#BABFC9"
                        />
                        <path
                            d="M19.2916 5.71354C20.7874 5.71354 22 4.50098 22 3.00521C22 1.50944 20.7874 0.296875 19.2916 0.296875C17.7959 0.296875 16.5833 1.50944 16.5833 3.00521C16.5833 4.50098 17.7959 5.71354 19.2916 5.71354Z"
                            fill="#BABFC9"
                        />
                    </svg>
                </div>
                {isOpen && (
                    <div className="DropDownListContainer" ref={wrapperRef}>
                        <ul className="absolute right-0 z-10 py-3 origin-top-right min-w-[106px] rounded-md bg-black text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {options.map((option) => (
                                <li
                                    key={option.name}
                                    onClick={() => {
                                        toggling(option.name);
                                    }}
                                    className="flex items-center px-5 py-2 text-gray-700 text-13 font-inter-medium hover:bg-[#FECD48] hover:text-black cursor-pointer"
                                >
                                    <option.icon
                                        class-name="flex-shrink-0 text-gray-400 mr-3"
                                        aria-hidden="true"
                                    />
                                    {option.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
