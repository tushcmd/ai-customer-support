// components/Header.jsx
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { JSX, SVGProps } from "react"

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

export function Header() {
    return (
        <header className="bg-background border-b px-4 md:px-6 flex items-center h-16 shrink-0">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <PowerIcon className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">AI Chat</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
                <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="Agent" />
                    <AvatarFallback>AG</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}