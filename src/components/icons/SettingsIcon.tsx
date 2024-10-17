import { IconProps } from "../../models/IconProps";

const SettingsIcon = ({
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
      <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z"></path>
    </svg>
  );
};

export default SettingsIcon;
