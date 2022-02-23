import { FC, SVGProps } from "react";

const ActivityIcon: FC = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11.917 6.5H9.751l-1.625 4.875-3.25-9.75L3.25 6.5H1.084"
            stroke="#586474"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ActivityIcon;
