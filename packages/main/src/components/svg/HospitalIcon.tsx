import { FC, SVGProps } from "react";

const HospitalIcon: FC = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0.5 12 15"
            width={18}
            height={18}
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M.659 2.659A2.25 2.25 0 012.25 2h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 00-.75.75v9a.75.75 0 00.75.75h7.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-1.5a.75.75 0 010-1.5h1.5A2.25 2.25 0 0112 4.25v9a2.25 2.25 0 01-2.25 2.25h-7.5A2.25 2.25 0 010 13.25v-9c0-.597.237-1.169.659-1.591z"
                fill="#0F4060"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.25 2a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM3 2.75A2.25 2.25 0 015.25.5h1.5a2.25 2.25 0 010 4.5h-1.5A2.25 2.25 0 013 2.75zM3.75 9.5a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75z"
                fill="#0F4060"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 7.25a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0V8A.75.75 0 016 7.25z"
                fill="#0F4060"
            />
        </svg>
    );
};

export default HospitalIcon;
