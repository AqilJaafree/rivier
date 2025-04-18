import React from "react";

const sizes = {
    "12_en regular": "font-helveticaneue text-[12px] font-normal",
    subtitle_subtitle_1_reguler: "font-roboto text-[18px] font-normal sm:text-[15px]",
    body_16px: "text-[16px] font-normal sm:text-[13px]",
    textxs: "text-[10px] font-normal",
    textxl: "text-[15px] font-normal",
    text2xl: "text-[16px] font-normal sm:text-[13px]",
    text5xl: "text-[20px] font-normal sm:text-[17px]",
};

const Text = ({ children, className = "", as, size = "text2x1", ...restProps }) => {
    const Component = as || "p";
    return (
        <Component className={'text-font_color-light_subtitle font-roboto ${className} ${sizes[size]} '} {...restProps}>
            {children}
        </Component >
    );
};

export { Text };