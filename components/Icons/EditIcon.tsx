import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M4.5 17.207V19a.5.5 0 0 0 .5.5h1.793a.5.5 0 0 0 .353-.146l8.5-8.5-2.5-2.5-8.5 8.5a.5.5 0 0 0-.146.353ZM15.09 6.41l2.5 2.5 1.203-1.203a1 1 0 0 0 0-1.414l-1.086-1.086a1 1 0 0 0-1.414 0L15.09 6.41Z"
      stroke="#000"
    />
  </svg>
);

export default SvgComponent;
