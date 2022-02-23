import * as React from "react";

const ClockIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
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
                d="M9 3a6 6 0 100 12A6 6 0 009 3zm-5.303.697a7.5 7.5 0 1110.606 10.606A7.5 7.5 0 013.697 3.697zM9 5.25a.75.75 0 01.75.75v2.69l2.03 2.03a.75.75 0 11-1.06 1.06L8.47 9.53A.75.75 0 018.25 9V6A.75.75 0 019 5.25z"
                fill="#0F4060"
            />
        </svg>
    );
};

export default ClockIcon;
