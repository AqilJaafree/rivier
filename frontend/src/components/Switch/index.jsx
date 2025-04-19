import React from "react";

import SwitchProvider from "@dhiwise/react-switch";
import PropTypes from "prop-types";

const variants = {
    swtFillGray30001: {
        offcolor: "#e3e4e8",
        oncolor: "#ffffff",
        offHandleColor: "#000000",
        onHandleColor: "#000000",
    },
};
const sizes = {
    xs: {
        width:
            52,
        height: 26,
    },
};

const Switch = ({
    value = false,
    className,
    checkedIcon = <></>,
    uncheckedIcon = <></>,
    onChange,
    variant = "swtFillGray30001",
    size = "xs",
}) => {
    const [selected, setSelected] = React.useState(value);
    const handleChange = (val) => {
        setSelected(val);
        onChange?.(val);
    };
    return (
        <div className={className}>
            <SwitchProvider
                checked={selected}
                onChange={handleChange}
                {...variants[variant]}
                {...sizes[size]}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
            />
        </div>
    );
};

Switch.propTypes = {
    value: PropTypes.bool,
    className: PropTypes.string,
    checkedIcon: PropTypes.node,
    uncheckedIcon: PropTypes.node,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(["xs"]),
    variant: PropTypes.oneOf(["swtFillGray30001"]),
};

export { Switch };