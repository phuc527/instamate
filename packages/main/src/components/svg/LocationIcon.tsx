import * as React from "react";

const LocationIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={18}
            height={18}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 3a5.25 5.25 0 00-3.712 8.963l3.183 3.182a.75.75 0 001.059 0l3.182-3.182A5.25 5.25 0 009 3zm4.773 10.023a6.75 6.75 0 10-9.546 0l3.183 3.182a2.247 2.247 0 003.18 0l3.183-3.182z"
                fill="#0F4060"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 6.75a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-2.121-.621a3 3 0 114.242 4.242A3 3 0 016.88 6.13z"
                fill="#0F4060"
            />
        </svg>
    );
};

export default LocationIcon;
