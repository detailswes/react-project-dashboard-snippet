/* eslint-disable no-extra-boolean-cast */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState, useEffect, type ReactElement } from "react";
import Select, {
    type MultiValue,
    type SingleValue,
    type GroupBase,
    type OptionsOrGroups,
    type PropsValue,
} from "react-select";
import Highlighter from "react-highlight-words";
import CreatableSelect from "react-select/creatable";

const CustomSelect = (props: {
    error: any;
    value:
        | string
        | any[]
        | PropsValue<{ label: any }>
        | undefined
        | PropsValue<any>
        | undefined;
    isNotCreateable: any;
    placeholder?: string;
    options:
        | OptionsOrGroups<{ label: any }, GroupBase<{ label: any }>>
        | undefined;
    isMulti: any;
    handleBlur: (arg0: React.FocusEvent<HTMLInputElement, Element>) => void;
    name: any;
    handleChange: (arg0: {
        target: { name: any; value: any } | { name: any; value: any };
    }) => void;
    setFieldValue: (arg0: any, arg1: any[]) => void;
}): ReactElement => {
    const [onFocusOutBg, setOnFocusOutBg] = useState(
        "rgb(var(--color-fieldBg) / 1)!important"
    );
    const [currentSelectValue, setCurrretSelectValue] = useState<
        | React.SetStateAction<string>
        | MultiValue<{ label: any }>
        | SingleValue<{ label: any }>
    >("");
    const handleBlur = (): void => {
        if (currentSelectValue !== null) {
            const length =
                typeof currentSelectValue === "object"
                    ? Object.keys(currentSelectValue).length
                    : currentSelectValue?.length;
            setOnFocusOutBg(
                length !== 0
                    ? "!#F9F9FB"
                    : "rgb(var(--color-fieldBg) / 1)!important"
            );
        }
    };

    const handleOnChange = (
        e:
            | React.SetStateAction<string>
            | MultiValue<{ label: any }>
            | SingleValue<{ label: any }>
            | any
    ): void => {
        setCurrretSelectValue(e);
    };

    interface Option {
        label: string;
    }

    interface InputValue {
        inputValue: string;
    }

    function formatOptionLabel(
        { label }: Option,
        { inputValue }: InputValue
    ): ReactElement {
        const isSearching = inputValue !== null && inputValue.length > 0;
        return (
            <Highlighter
                searchWords={[inputValue]}
                textToHighlight={label}
                highlightStyle={{
                    backgroundColor: isSearching ? "#ffffff" : "transparent",
                    color: "#737373",
                }}
            />
        );
    }

    const customStyles = {
        option: (state: any, provided: { isSelected: number }) => ({
            top: "51px",
            margin: 0,
            boxShadow: "none",
            border: "1px solid rgb(var(--color-fieldOutline) / 1)",
            borderTop: "none",
            fontSize: "16px",
            fontFamily: "InterRegular",
            textAlign: "left",
            borderRadius: 0,
            padding: "13px 16px",
            borderBottom: "1px solid rgb(var(--color-fieldOutline)/1)",
            cursor: "pointer",
            backgroundColor:
                provided.isSelected !== 0
                    ? "rgba(var(--color-primary)/1)"
                    : null,
            color:
                provided.isSelected !== 0
                    ? "rgba(var(--color-white)/1)"
                    : "rgb(var(--color-fieldNoFocus) / 1)",
            "&:hover": {
                backgroundColor:
                    provided.isSelected === 0
                        ? "rgb(var(--color-fieldBg))"
                        : null,
            },
        }),
        menu: (provided: any) => ({
            ...provided,
            margin: 0,
            boxShadow: "none",
            zIndex: 9,
            borderTop: "1px solid #000",
        }),
        menuList: (base: any, state: { selectProps: { menuIsOpen: any } }) => ({
            ...base,
            padding: 0,
            // eslint-disable-next-line no-extra-boolean-cast
            border: Boolean(state.selectProps.menuIsOpen)
                ? "1px solid rgb(var(--color-primary)/1)"
                : null,
            borderTop: state.selectProps.menuIsOpen !== null ? "none" : null,
            borderRadius: "0 0 4px 4px",
        }),
        control: (
            state: { isFocused: any },
            provided: {
                isMulti: any;
                hasValue: any;
                selectProps: { menuIsOpen: any };
            }
        ) => ({
            width: "100%",
            "> div:first-of-type": {
                marginBottom:
                    Boolean(provided.isMulti) && Boolean(provided.hasValue)
                        ? "1.75rem!important"
                        : "",
                borderRadius: "4px",
                opacity: 1,
                padding: "0.325rem 1rem  !important",
                minHeight: 50,
                paddingRight: "50px !important",
                fontSize: "1rem!important",
                lineHeight: "1.25rem!important",
                fontWeight: "400!important",
                color: "rgb(var(--color-black) / 1)!important",
                fontFamily: "InterRegular!important",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                backgroundColor: onFocusOutBg,
                border:
                    props.error.length > 0
                        ? "1px solid rgb(var(--color-error) / 1)!important"
                        : "1px solid rgb(var(--color-fieldOutline) / 1)!important",

                "&:focus": {
                    backgroundColor: "rgb(var(--color-fieldBg) / 1)!important",
                    color: "rgb(var(--color-placeholder)/1)",
                    borderColor: "rgb(var(--color-primary))!important",
                    borderRadius: Boolean(provided.selectProps.menuIsOpen)
                        ? "4px 4px 0 0!important"
                        : "4px!important",
                    borderBottomColor: provided.selectProps.menuIsOpen
                        ? "rgb(var(--color-black)/1)!important"
                        : "rgb(var(--color-fieldOutline)/1)",
                },

                "div[class*='multiValue']": {
                    display: "inline-flex",
                    backgroundColor: "transparent",
                    border: "1px solid rgb(var(--color-fieldOutline)/1)",
                    borderRadius: "50px",
                    position: "relative",
                    fontSize: "16px",
                    lineHeight: "19px",
                    zIndex: 5,
                    color: "rgb(var(--color-black)/1)",
                    margin: "2px 4px",
                    "&:first-of-type": {
                        marginLeft: "0!important",
                    },
                    ">div:first-of-type": {
                        padding: "5px 15px 7px",
                        lineHeight: "19px",
                    },
                    svg: {
                        fill: "rgb(var(--color-primary)/1)",
                        width: "20px",
                        height: "20px",
                    },
                },
                // "> div:last-of-type": {
                //   position: provided.isMulti && provided.hasValue && "absolute",
                //   left: 0,
                //   right: 0,
                //   top: 0,
                // },
                borderColor: state.isFocused ? "red" : "green",
            },
        }),
        valueContainer: () => ({
            padding: 0,
        }),
        placeholder: (_state: any, provided: { isFocused: any }) => ({
            margin: 0,
            padding: "0.325rem 1rem !important",
            position: "absolute",
            top: 0,
            left: 0,
            textIndent: "5px",
            fontSize: "1rem",
            lineHeight: "2.4rem",
            fontWeight: 400,
            fontFamily: "InterRegular",
            width: "100%",
            height: "51px",
            paddingRight: "50px !important",
            textAlign: "left",
            color: provided.isFocused
                ? "rgb(var(--color-placeholder)/1)"
                : "rgb(79, 79, 79, 1)",
            borderRadius: "4px",
        }),
        // input: (state, provided) => ({
        //   borderRadius: "4px",
        //   marginBottom: "1.75rem",
        //   opacity: 1,
        //   'input[type="text"]': {
        //     borderRadius: "4px!important",
        //     padding: "0.875rem 1rem!important",
        //     fontSize: "1rem!important",
        //     lineHeight: "1.25rem!important",
        //     fontWeight: "400!important",
        //     color: "rgb(var(--color-black) / 1)!important",
        //     fontFamily: "InterRegular!important",
        //     opacity: 1,
        //     backgroundColor: onFocusOutBg,
        //     border: props.error
        //       ? "1px solid rgb(var(--color-error) / 1)!important"
        //       : "1px solid rgb(var(--color-fieldOutline) / 1)!important",
        //     "&:focus": {
        //       backgroundColor: "rgb(var(--color-fieldBg) / 1)!important",
        //       color: "rgb(var(--color-placeholder)/1)",
        //       borderColor: "rgb(var(--color-primary))!important",
        //       borderRadius: provided.selectProps.menuIsOpen ? "4px 4px 0 0!important" : "4px!important",
        //       borderBottomColor: provided.selectProps.menuIsOpen
        //         ? "rgb(var(--color-black)/1)!important"
        //         : "rgb(var(--color-fieldOutline)/1)",
        //     },
        //   },
        // }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        dropdownIndicator: () => ({
            color: "rgb(var(--color-primary)/1)",
            transition: "all .2s ease",
        }),
        indicatorsContainer: (
            _state: any,
            provided: { selectProps: { menuIsOpen: any } }
        ) => ({
            position: "absolute",
            right: "10px",
            top: 0,
            height: "51px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            transform: provided.selectProps.menuIsOpen
                ? "rotate(180deg)"
                : null,
            // ">div:first-of-type": {
            //   display: "none",
            // },
        }),
        singleValue: (
            _state: any,
            provided: { hasValue: any; selectProps: { menuIsOpen: any } }
        ) => ({
            borderRadius:
                provided.hasValue && !provided.selectProps.menuIsOpen
                    ? "4px"
                    : "4px 4px 0 0",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: 0,
            padding: "0.875rem 1rem",
            position: "absolute",
            top: 0,
            left: 0,
            fontSize: "1rem",
            lineHeight: "1.25rem",
            fontWeight: 400,
            fontFamily: "InterRegular",
            width: "100%",
            height: "51px",
            paddingRight: "50px!important",
            color: provided.hasValue
                ? "rgb(var(--color-black)/1)"
                : "rgb(var(--color-fieldNoFocus)/1)",
            textAlign: "left",
        }),
    };
    useEffect(() => {
        if (props.value) {
            const length =
                typeof props.value === "object"
                    ? Object.keys(props.value).length
                    : props.value?.length;
            setOnFocusOutBg(
                length ? "!#F9F9FB" : "rgb(var(--color-fieldBg) / 1)!important"
            );
        }
    }, []);
    return (
        <>
            {props.isNotCreateable ? (
                <Select
                    // @ts-expect-error — custom style object shape is intentionally non-standard
                    styles={customStyles}
                    defaultValue={props.value}
                    placeholder={props.placeholder}
                    options={props.options}
                    isMulti={props.isMulti}
                    onBlur={(e) => {
                        props.handleBlur(e);
                        handleBlur();
                    }}
                    // @ts-expect-error — runtime array/object discrimination is handled inside
                    onChange={(selectedOption: {
                        value: MultiValue<Option>;
                    }) => {
                        if (!Array.isArray(selectedOption)) {
                            const event = {
                                target: {
                                    name: props.name,
                                    value: selectedOption.value,
                                },
                            };
                            props.handleChange(event);
                        } else {
                            const temp = selectedOption.map((el) => el.value);
                            props.setFieldValue(props.name, temp);
                        }
                        handleOnChange(selectedOption);
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
            ) : (
                <CreatableSelect
                    // @ts-expect-error — custom style object shape is intentionally non-standard
                    styles={customStyles}
                    defaultValue={props.value}
                    placeholder={props.placeholder}
                    options={props.options}
                    isMulti={props.isMulti}
                    onBlur={(e) => {
                        props.handleBlur(e);
                        handleBlur();
                    }}
                    // @ts-expect-error — runtime array/object discrimination is handled inside
                    onChange={(selectedOption: { value: string }): void => {
                        if (!Array.isArray(selectedOption)) {
                            const event = {
                                target: {
                                    name: props.name,
                                    value: selectedOption?.value,
                                },
                            };
                            props.handleChange(event);
                        } else {
                            const temp = selectedOption.map((el) => el.value);
                            props.setFieldValue(props.name, temp);
                        }
                        handleOnChange(selectedOption);
                    }}
                    formatOptionLabel={formatOptionLabel}
                />
            )}
        </>
    );
};

export default CustomSelect;
