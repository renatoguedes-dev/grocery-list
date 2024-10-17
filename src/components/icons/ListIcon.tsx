import { IconProps } from "../../models/IconProps";

const ListIcon = ({ color = "#000000", size = "24", className }: IconProps) => {
  // Create conditional attributes based on className
  const svgProps = className
    ? { className } // If className is provided, use only className
    : { width: size, height: size, fill: color }; // Otherwise, use size and color

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...svgProps} viewBox="0 0 256 256">
      <path d="M32,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H40A8,8,0,0,1,32,64Zm8,72h72a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Zm88,48H40a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16Zm109.66,13.66a8,8,0,0,1-11.32,0L206,177.36A40,40,0,1,1,217.36,166l20.3,20.3A8,8,0,0,1,237.66,197.66ZM184,168a24,24,0,1,0-24-24A24,24,0,0,0,184,168Z"></path>
    </svg>
  );
};

export default ListIcon;
