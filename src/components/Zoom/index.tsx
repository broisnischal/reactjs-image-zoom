import React, { CSSProperties, useState } from "react";
import { useMemo, useRef } from "react";

export interface CountProps {
    className?: string;
    height?: number;
    width?: number;
    maxwidth?: number;
    repeat?: string;
    position?: string;
    bgsize?: string;
    cursor?: string;
    bordercolor?: string;
    size?: number;
    imagesrc?: string;
    borderpixel?: number;
    style?: CSSProperties;
}

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
    bordercolor: "#ddd",
    imagesrc: "https://res.cloudinary.com/dacp0r5b7/image/upload/v1662844267/icons/github/Screenshot_63_ll09rf.png"
};

export const Zoom: React.FC<CountProps> = (props) => {
    const { className, height, borderpixel, bordercolor, maxwidth, width, repeat, position, size, bgsize, cursor, imagesrc } = useMemo(() => ({ ...DEFAULT, ...props }), [props]);

    const customstlyes = props.style ?? null;

    const divref = useRef<any>();
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [pos, setPos] = useState<string>("");

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | any) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setPos(`${x}% ${y}%`);
    };

    const handleMouseOut = (e: React.MouseEvent) => {
        divref.current.style.backgroundPosition = "center";
        handleMouseLeave();
    };

    const styles = {
        backgroundImage: `url(${imagesrc})`,
        height: `${height}px`,
        maxWidth: `${maxwidth}px`,
        width: `${width}%`,
        backgroundRepeat: `${repeat}`,
        cursor: `${cursor}`,
        backgroundPosition: isHovering ? `${pos}` : `${position}`,
        backgroundSize: isHovering ? `${size}%` : `${bgsize}`,
        border: isHovering ? `${borderpixel}px solid ${bordercolor}` : ""
    };

    return <div ref={divref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut} onMouseMove={handleMouseMove} className={className} style={{ ...styles, ...customstlyes }} />;
};
