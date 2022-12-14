import { SVGProps } from "react";

export default function CameraIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
      <path d="M24.375 4c-1.797 0-3.676 1.422-4.438 3.375L19.313 9H14V8c0-.555-.445-1-1-1H6c-.555 0-1 .445-1 1v1.281A6.99 6.99 0 0 0 0 16v21c0 3.86 3.14 7 7 7h36c3.86 0 7-3.14 7-7V16c0-3.86-3.14-7-7-7h-2.313l-.624-1.625C39.3 5.422 37.422 4 35.624 4ZM30 13c7.168 0 13 5.832 13 13s-5.832 13-13 13-13-5.832-13-13 5.832-13 13-13ZM7 14a1.999 1.999 0 1 1 0 4 1.999 1.999 0 1 1 0-4Zm23 1c-6.066 0-11 4.934-11 11s4.934 11 11 11 11-4.934 11-11-4.934-11-11-11Z" />
    </svg>
  );
}
