import React, { useState } from "react";
import { useMemo, useRef } from "react";
const DEFAULT = {
    height: 400,
    width: 100,
    maxwidth: 400,
    repeat: "no-repeat",
    position: "center",
    size: 100,
    bgsize: "cover",
    cursor: "zoom-in",
    borderpixel: 1,
    color: "#ddd",
    bordercolor: "#ddd",
    url: "https://res.cloudinary.com/dacp0r5b7/image/upload/v1661524006/icons/merowallpaper_dg3kzr.png"
};
export const Zoom = (props) => {
    var _a;
    const { className, height, borderpixel, color, bordercolor, maxwidth, width, repeat, position, size, bgsize, cursor, url } = useMemo(() => (Object.assign(Object.assign({}, DEFAULT), props)), [props]);
    const customstlyes = (_a = props.style) !== null && _a !== void 0 ? _a : null;
    const divref = useRef();
    const [isHovering, setIsHovering] = useState(false);
    const [pos, setPos] = useState("");
    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPos(`${x}% ${y}%`);
    };
    const handleMouseOut = (e) => {
        divref.current.style.backgroundPosition = "center";
        handleMouseLeave();
    };
    const styles = {
        backgroundImage: `url(${url})`,
        height: `${height}px`,
        maxWidth: `${maxwidth}px`,
        width: `${width}%`,
        backgroundRepeat: `${repeat}`,
        backgroundColor: `${color}`,
        cursor: `${cursor}`,
        backgroundPosition: isHovering ? `${pos}` : `${position}`,
        backgroundSize: isHovering ? `${size}%` : `${bgsize}`,
        border: `${borderpixel}px solid ${bordercolor}`
    };
    return React.createElement("div", { ref: divref, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseOut, onMouseMove: handleMouseMove, className: className, style: Object.assign(Object.assign({}, styles), customstlyes) });
};
//# sourceMappingURL=index.js.map