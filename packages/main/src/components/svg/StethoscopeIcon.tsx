import * as React from "react";

const StethoscopeIcon: React.FC = (props: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0.8 0.8 14.63 14.85"
            width={18}
            height={18}
            {...props}
        >
            <path
                d="M1.475.8a.675.675 0 00-.675.675v4.5a4.052 4.052 0 003.375 3.994v.956a4.725 4.725 0 009.45 0V9.93a2.476 2.476 0 10-1.35 0v.994a3.376 3.376 0 01-6.75 0v-.956A4.05 4.05 0 008.9 5.975v-4.5A.675.675 0 008.225.8h-1.35a.675.675 0 000 1.35h.675v3.825a2.7 2.7 0 01-5.4 0V2.15h.675a.675.675 0 100-1.35h-1.35zM12.95 6.425a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25z"
                fill="#0F4060"
            />
        </svg>
    );
};

export default StethoscopeIcon;
