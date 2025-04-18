import React from "react";

const sizes = {
    label_label_1__semibold: "font-raleway text-[16px] font-semibold sm:text-[13px]",
    heading_heading_3: "font-raleway text-[36px] font-bold lg:text-[36px] md:text-[34px] sm:text-[30px]",
    heading_heading_5: "font-raleway text-[24px] font-semibold lg:text-[24px] md:text-[22px] sm:text-[20px]",
    subtitle_subtitle_1__medium: "font-roboto text-[18px] font-medium sm:text-[15px]",
    display_text_small_display_small_bold_:
        "tracking-[-0.68px] font-dmsans text-[34px] font-bold lg:text-[34px] md:text-[32px] sm:text-[28px]",
    display_text_extra_small_bold:
        "tracking-[-0.48px] font-dmsans text-[24px] font-bold 1g:text-[24px] md:text-[22px] sm:text-[20px]",
    texts: "text-[12px] font-medium",
    textmd: "text-[13px] font-medium",
    textlg: "text-[14px] font-medium",
    text3xl: "text-[17px] font-medium sm:text-[14px]",
    text4x1: "text-[18px] font-medium sm:text-[15px]",
    text6xl: "text-[24px] font-medium 1g:text-[24px] md:text-[22px] sm:text-[20px]",
    text7xl: "text-[34px] font-medium 1g:text-[34px] md:text-[32px] sm:text-[28px]",
    text8xl: "text-[80px] font-medium 1g:text-[80px] md:text-[48px]",
    headingxs: "text-[10px] font-bold",
    headings: "text-[12px] font-semibold",
    headingmd: "text-[13px] font-semibold",
    headinglg: "text-[14px] font-bold",
    headingxl: "text-[16px] font-semibold sm:text-[13px]",
    heading2xl: "text-[18px] font-bold sm:text-[15px]",
    heading3x1: "text-[20px] font-semibold sm:text-[17px]",
    heading4xl: "text-[24px] font-bold 1g:text-[24px] md:text-[22px] sm:text-[20px]",
    heading5x1: "text-[26px] font-bold 1g:text-[26px] md:text-[24px] sm:text-[22px]",
    heading6xl: "text-[32px] font-semibold lg:text-[32px] md:text-[30px] sm:text-[27px]",
    heading7xl: "text-[36px] font-semibold lg:text-[36px] md:text-[34px] sm:text-[30px]",
    heading8xl: "text-[40px] font-semibold lg:text-[40px] md:text-[38px] sm:text-[34px]",
    heading9x1: "text-[56px] font-semibold lg:text-[56px] md:text-[48px] sm:text-[47px]",
};

const Heading = ({ children, className = "", size = "textlg", as, ...restProps }) => {
    const Component = as || "h6";
    return (
        <Component className={'text-white-0 font-inter ${className} ${sizes[size]}'} {...restProps}>
            {children}
        </Component >
    );
};

export { Heading };
