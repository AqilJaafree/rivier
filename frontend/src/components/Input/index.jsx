import React from "react";
import PropTypes from "prop-types";

const shapes = {
    round: "rounded",
};

const variants = {
    fill: {
        gray_900_07: "bg-gray-900_07 text-gray-400",
        gray_900_01: "bg-gray-900_01",
        gray_900: "bg-gray-900",
        secondary_grey_300: "bg-secondary-grey-300",
        blue_gray_800_02: "bg-blue_gray-800_02 shadow-sm",
    },
};
const sizes = {
    xs: "h-[40px] px-3 text-[14px]",
    md: "h-[48px] px-3.5",
    sm: "h-[46px] px-3 text-[14px]",
};

const Input = React.forwardRef(
    (
        {
            className = "",
            name = "",
            placeholder = "",
            type = "text",
            label =
            prefix,
            suffix,
            onChange,
            shape,
            variant = "fill",
            size = "sm",
            color = "blue_gray_800_02",
            ...restProps
        },
        ref,
    ) => {
        return (
            <label
                className={'${className} flex items-center justify-center cursor-text ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}'}
            >
                {!!label && label}
                {!!prefix && prefix}
                <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
                {!!suffix && suffix}
            </label >
        );
    },
);
Input.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    shape: PropTypes.oneOf(["round"]),
    size: PropTypes.oneOf(["xs", "md", "sm"]),
    variant: PropTypes.oneOf(["fill"]),
    color: PropTypes.oneOf(["gray_900_07", "gray_900_01", "gray_900", "secondary_grey_300", "blue_gray_800_02"]),
};

export { Input };