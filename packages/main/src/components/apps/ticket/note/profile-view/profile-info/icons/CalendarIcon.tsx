import { SVGProps, FC } from "react";

const CalendarIcon: FC = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M10.292 2.167H2.708c-.598 0-1.083.485-1.083 1.083v7.583c0 .599.485 1.084 1.083 1.084h7.584c.598 0 1.083-.485 1.083-1.084V3.25c0-.598-.485-1.083-1.083-1.083ZM8.666 1.083V3.25M4.334 1.083V3.25M1.625 5.417h9.75"
            stroke="#586474"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default CalendarIcon;
