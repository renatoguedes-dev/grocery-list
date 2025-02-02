import { IconProps } from "../../models/IconProps";

const BackArrowIcon = ({
  color = "#000000",
  size = "24",
  className,
}: IconProps) => {
  // Create conditional attributes based on className
  const svgProps = className
    ? { className } // If className is provided, use only className
    : { width: size, height: size, fill: color }; // Otherwise, use size and color

  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...svgProps} viewBox="0 0 256 256">
      <path d="M128,26A102,102,0,1,0,230,128,102.12,102.12,0,0,0,128,26Zm0,192a90,90,0,1,1,90-90A90.1,90.1,0,0,1,128,218Zm46-90a6,6,0,0,1-6,6H102.49l21.75,21.76a6,6,0,1,1-8.48,8.48l-32-32a6,6,0,0,1,0-8.48l32-32a6,6,0,0,1,8.48,8.48L102.49,122H168A6,6,0,0,1,174,128Z"></path>
    </svg>
  );
};

export default BackArrowIcon;
