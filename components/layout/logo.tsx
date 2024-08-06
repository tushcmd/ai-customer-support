
import Link from "next/link";
import React, { FC, SVGProps } from "react";


function PowerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2v10" />
            <path d="M18.4 6.6a9 9 0 1 1-12.77.04" />
        </svg>
    )
}
const Logo: FC = () => {
    return (
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <PowerIcon className="w-5 h-5 text-primary" />
            <span className="text-lg font-semibold">AI Chat</span>
        </Link>
    );
};

export default Logo;