import React from "react";
import PropTypes from "prop-types";

const shapes = {
    round: "rounded-[10px]",
};

const variants = {
    ftxtOutlinewhiteA70019: {
        white_A700_0c: "border-white-a700_19 border border-solid bg-white-a700_0c",
    },
};

const sizes = {
    sm: "h-[70px] px-[26px] text-[22px]",
    xs: "h-[66px] pl-4 pr-[26px] text-[25px]",
};
const FloatingLabelInput = React.forwardRef(
    (
        {
            className = "",
            name = "",
            placeholder = "",
            type = "text",
            children,
            label = "",
            prefix,
            suffix,
            onChange,
            floating = "normal",
            shape,
            variant = "ftxtoutlinewhiteA70019",
            size = "sm",
            color = "white_A700_0c",
            ...restProps
        },
        ref,
    ) => {
        const inputRef = React.useRef(null);
        const labelRef = React.useRef(null);
        React.useImperativeHandle(ref, () => inputRef.current);
        React.useLayoutEffect(() => {
            const input = inputRef.current;
            const label = labelRef.current;
            let timer;
            let requestId;
            function fixOffset() {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    if (requestId) cancelAnimationFrame(requestId);
                    requestId = requestAnimationFrame(() => {
                        if (!input || !label) return;
                        const computedStyle = getComputedStyle(input);
                        label.style.left = '${input.offsetLeft + parseFloat(computedStyle.paddingInlineStart)}px';
                    });
                }, 60);
            }
            fixOffset();
            input.addEventListener("focus", fixOffset);
            window.addEventListener("resize", fixOffset);
            return () => {
                input.removeEventListener("focus", fixOffset);
                window.removeEventListener("resize", fixOffset);
            };
        }, []);
        return (
            <label
                floating-label={floating}
                className={'${className} flex items-center justify-center gap-2 cursor-text ${(shape && shapes[shape]) || "" } ${variants[variant]?.[color] || variants[variant] || ""} ${sizes[size] || "" }'}
            >
                {!!prefix && prefix}
                <input
                    floating-input=""
                    ref={inputRef}
                    type={type}
                    name={name}
                    placeholder={placeholder || label}
                    onChange={onChange}
                    {...restProps}
                />
                {
                    !!(label || placeholder) && (
                        <div floating-text="" ref={labelRef}>
                            {label || placeholder}
                        </div >
                    )
                }
                {!!suffix && suffix}
            </label >
        );
    },
);

FloatingLabelInput.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    shape: PropTypes.oneOf(["round"]),
    size: PropTypes.oneOf(["sm", "xs"]),
    variant: PropTypes.oneOf(["ftxtOutlineWhiteA70019"]),
    color: PropTypes.oneOf(["white_A700_0c"]),
};

export { FloatingLabelInput };