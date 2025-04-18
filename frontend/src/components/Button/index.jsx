import React from "react";
import PropTypes from "prop-types";

const shapes = {
    circle: "rounded-[50%]",
    round: "rounded",
};
const variants = {
    fill: {
        black_900_02: "bg-black-900_02 text-white-0",
        gray_900_07: "bg-gray-900_07 text-white-0",
        teal_500_b2: "bg-teal-500_b2 text-white-0",
        red_900: "bg-red-900 text-white-0",
        accent_green: "bg-accent_green",
        teal_A400_01: "bg-teal-a400_01",
        red_A700: "bg-red-a700",
        cyan_50: "bg-cyan-50",
        teal_300: "bg-teal-300",
        gray_400_01: "bg-gray-400_01 text-gray-900_09",
        gray_200_03: "bg-gray-200_03 text-gray-900_06",
        white_A700_11: "bg-white-a700_11 text-font_color-light_subtitle",
        gray_900_05: "bg-gray-900_05 text-blue_gray-100_02",
        amber_700: "bg-amber-700 text-white-0",
        purple_500: "bg-purple-500 text-white-0",
        white_A700_19: "bg-white-a700_19 text-white-0",
        gray_900_08: "bg-gray-900_08 text-white-0",
        white_A700_0c: "bg-white-a700_0c text-font_color-light_subtitle",
        secondary_grey_300: "bg-secondary-grey-300 text-deep_purple-a400_02",
        gray_400_19: "bg-gray-400_19",
        font_color_light_subtitle: "bg-font_color-light_subtitle text-black-900_02",
        yellow_900: "bg-yellow-900",
        white_0: "bg-white-0 text-black-900_02",
        indigo_900_02: "bg-indigo-900_02 text-white-0",
        high_fidelity_color_primary_color: "bg-high_fidelity_color-primary_color text-white-0",
    },
    gradient: {
        white_0_blue_gray_100_b5: "bg-gradient",
        indigo_A400_indigo_A200_01: "bg-gradient4 shadow-bs text-white-0",
    },
    outline: {
        blue_gray_800_7a_blue_gray_800_7a:
            "border-[0.75px] border-solid blue_gray_800_7a_blue_gray_800_7a_border bg-gradient1",
        purple_500: "border-purple-500 border border-solid text-purple-800",
        bright: "border-bright border border-solid text-gray-400_03",
        white_A700_77_white_A700_63: "border border-solid white_A700_77_white_A700_63_border bg-gradient2 text-white-0",
        blue_gray_900_06_blue_gray_900_06:
            "border border-solid blue_gray_900_06_blue_gray_900_06_border bg-gradient3 text-blue_gray-100_02",
    },
};
const sizes = {
    "6xl": "h-[50px] px-[34px] text-[16px]",
    "9xl": "h-[60px] px-7 text-[20px]",
    "7xl": "h-[56px] px-7 text-[20px]",
    "8xl": "h-[56px] px-[34px] text-[16px]",
    "12xl": "h-[70px] px-8 text-[20px]",
    md: "h-[28px] px-3 text-[12px]",
    sm: "h-[26px] px-5 text-[16px]",
    "11xl": "h-[70px] px-5 text-[23px]",
    "10xl": "h-[60px] px-2.5",
    xs: "h-[20px] px-1 text-[10px]",
    lg: "h-[30px] px-0.5",
    "4xl": "h-[38px] px-[34px] text-[16px]",
    "3xl": "h-[36px] px-3.5 text-[13px]",
    xl: "h-[32px] px-6 text-[16px]",
    "2xl": "h-[34px] px-1",
    "5xl": "h-[44px] px-[34px] text-[14px]",
};
const Button = ({
    children,
    className = "",
    leftIcon,
    rightIcon,
    shape,
    variant = "fill",
    size = "5xl",
    color = "high_fidelity_color_primary_color",
    ...restProps
}) => {
    return (
        <button
            className={'$(className) flex flex row items-center justify center text-center cursor-pointer whitespace nowrap ${shape && shapes[shape]} ${size && sizes[size]} $(variant && variants[variant]?.[color]}'}
            {...restProps}
        >
            {!!leftIcon && leftIcon}
            {children}
            {!!rightIcon && rightIcon}
        </button >
    );
};

Button.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    shape: PropTypes.oneOf(["circle", "round"]),
    size: PropTypes.oneOf([
        "6x1",
        "9x1",
        "7xl",
        "8xl",
        "12x1",
        "md",
        "sm",
        "11xl",
        "10xl",
        "xs",
        "lg",
        "4xl",
        "3xl",
        "xl",
        "2x1",
        "5xl",
    ]),
    variant: PropTypes.oneof(["fill", "gradient", "outline"]),
    color: PropTypes.oneof([
        "black 900 02",
        "gray_900_07",
        "teal 500 b2",
        "red_900",
        "accent_green",
        "teal_A400_01",
        "red_A700",
        "cyan_50",
        "teal_300",
        "gray_400_01",
        "gray_200_03",
        "white_A700_11",
        "gray_900_05",
        "amber_700",
        "purple_500",
        "white_A700_19",
        "gray_900_08",
        "white_A700_0c",
        "secondary_grey_300",
        "gray_400_19",
        "font_color_light_subtitle",
        "yellow_900",
        "white_0",
        "indigo_900_02",
        "high_fidelity_color_primary_color",
        "white_0_blue_gray_100_b5",
        "indigo_A400_indigo_A200_01",
        "blue_gray_800_7a_blue_gray_800_7a",
        "bright",
        "white_A700_77_white_A700_63",
        "blue_gray_900_06_blue_gray_900_06",
    ]),
};
export { Button };