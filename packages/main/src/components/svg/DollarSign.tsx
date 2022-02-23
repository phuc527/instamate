import { SVGProps, FC } from "react";

const DollarSign: FC = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width={18}
            height={18}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8.25 11.25v-1.5a2.25 2.25 0 110-4.5V4.5a.75.75 0 011.5 0v.75h.017A2.233 2.233 0 0112 7.484a.75.75 0 11-1.5 0 .734.734 0 00-.733-.734H9.75v1.5a2.25 2.25 0 010 4.5v.75a.75.75 0 11-1.5 0v-.75h-.038A2.212 2.212 0 016 10.538a.75.75 0 011.5 0 .712.712 0 00.712.712h.038zm1.5 0a.75.75 0 100-1.5v1.5zm-1.5-4.5a.75.75 0 000 1.5v-1.5zM9 16.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15zM9 15A6 6 0 109 3a6 6 0 000 12z"
                fill="#0F4060"
            />
        </svg>
    );
};

export default DollarSign;
