import useToggle from "@hooks/useToggle";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "react-toastify";
import errorImage from "../../../../public/images/nothing.jpg";

export const Img = ({ src, width, height, pw,cursor="cursor-zoom-in", ph, ...rest }) => {
  const [isErorr, ,setUnError , setinError] = useToggle();
  let onError = (e) => {
    setinError();
  };
  useEffect(() => {
    setUnError()
  }, [src])
  
  let shimmerDimensions = width === undefined ? { w: pw, h: ph } : { w: width, h: height };
  return (
    <div className={`relative ${cursor} ${pw} ${ph}`}>
      <Image
        src={isErorr ? errorImage : src}
        width={width}
        height={height}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(shimmerDimensions.w, shimmerDimensions.h))}`}
        onErrorCapture={onError}
        {...rest}
      />
    </div>
  );
};

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) => (typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str));
