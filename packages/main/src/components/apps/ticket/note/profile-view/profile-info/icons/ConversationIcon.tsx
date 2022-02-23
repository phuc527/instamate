import { SVGProps, FC } from "react";

const ConversationIcon: FC = (props: SVGProps<SVGSVGElement>) => (
    <svg
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M11.375 8.125a1.083 1.083 0 0 1-1.083 1.083h-6.5l-2.167 2.167V2.708a1.083 1.083 0 0 1 1.083-1.083h7.584a1.083 1.083 0 0 1 1.083 1.083v5.417Z"
            stroke="#586474"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default ConversationIcon;
