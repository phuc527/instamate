import { FC, SVGProps } from "react";

const EmptyNoteIcon: FC = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={121}
        height={120}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M64.357 114.566c29.435 0 53.297-24.49 53.297-54.703 0-30.211-23.862-54.703-53.297-54.703S11.06 29.652 11.06 59.863c0 30.212 23.862 54.703 53.297 54.703Z"
            fill="url(#a)"
        />
        <path
            d="m32.783 13.099 83.014 22.433-19.66 74.001-7.326 3.231-7.325 3.231L10.54 96.822 32.783 13.1Z"
            fill="#A9C9FE"
        />
        <ellipse
            rx={2.965}
            ry={2.987}
            transform="matrix(.96537 .26088 -.25677 .96647 33.766 41.034)"
            fill="#C6DAFF"
        />
        <ellipse
            rx={2.965}
            ry={2.987}
            transform="matrix(.96537 .26088 -.25677 .96647 25.137 73.513)"
            fill="#C6DAFF"
        />
        <path
            opacity={0.5}
            fill="#FF7A8A"
            d="M19.846 19.644 58.784 9.112l2.303 8.66-38.938 10.533z"
        />
        <path
            d="m46.469 33.993 55.104 14.892M43.207 46.263l55.104 14.892M39.95 58.533l55.103 14.891M36.688 70.803l55.104 14.891M33.43 83.073l55.104 14.89"
            stroke="#C6DAFF"
            strokeWidth={2}
            strokeLinecap="round"
        />
        <path
            d="m83.706 101.68 12.225 7.853-14.818 6.731 2.593-14.584Z"
            fill="#92B5EF"
        />
        <defs>
            <linearGradient
                id="a"
                x1={64.357}
                y1={5.16}
                x2={64.357}
                y2={114.566}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#E3ECFA" />
                <stop offset={1} stopColor="#DAE7FF" />
            </linearGradient>
        </defs>
    </svg>
);

export default EmptyNoteIcon;
