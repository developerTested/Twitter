import { UserType } from '@/types';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BsChevronDown, BsCodeSlash, BsFillEmojiFrownFill, BsFillFlagFill, BsVolumeMuteFill } from 'react-icons/bs'
import { ImUserPlus } from "react-icons/im"
import { MdBlockFlipped, MdPlaylistAddCheck, MdVerified } from 'react-icons/md';


type headerProps = {
    id: number,
    user: UserType,
}

interface AccordionItem {
    href: string;
    text: string;
    icon?: React.ReactNode;
}


export default function TweetHeader({ user, ...props }: headerProps) {

    const [show, setShow] = useState(false);

    const items: AccordionItem[] = [
        {
            href: '/',
            text: "This Tweet's not helpful",
            icon: <BsFillEmojiFrownFill className="w-5 h-5" />,
        },
        {
            href: '/',
            text: `Follow @${user.name}`,
            icon: <ImUserPlus className="w-5 h-5" />,
        },
        {
            href: '/',
            text: `Add/remove @${user.name} from Lists`,
            icon: <MdPlaylistAddCheck className="w-5 h-5" />,
        },
        {
            href: '/',
            text: `Mute @${user.name}`,
            icon: <BsVolumeMuteFill className="w-5 h-5" />,
        },
        {
            href: '/',
            text: `Block @${user.name}`,
            icon: <MdBlockFlipped className="w-5 h-5" />,
        },
        {
            href: '/',
            text: 'Embed Tweet',
            icon: <BsCodeSlash className="w-5 h-5" />,
        },
        {
            href: '/',
            text: 'Report Tweet',
            icon: <BsFillFlagFill className="w-5 h-5" />,
        },
    ];



    return (
        <div className="tweet-header flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm">
                <div className="tweet-user flex items-center gap-1">
                    <span className="name font-semibold">{user.displayName}</span>
                    {user.verified && <MdVerified className="w-6 h-6 text-blue-500" /> }
                    <span className='ml-1 text-sm'>@{user.name}</span>
                </div>
                <span className="block">•</span>
                <span className="time">
                    <a href="" className='flex items-center gap-2'>
                        <time>1 hour ago</time>
                    </a>
                </span>
            </div>

            <div className="group relative">
                <button>
                    <BsChevronDown className="w-5 h-5" />
                </button>
                <div className={`${show ? 'animate-fade-in' : 'animate-fade-out hidden'} flex flex-col transition-opacity duration-700 ease-in absolute top-full right-0 z-10 bg-white divide-y divide-gray-100 dark:divide-white/10 rounded-lg shadow-md w-80 dark:bg-gray-900`}>
                    {items.map((x, i) => <div key={i} className='w-full px-4 py-2 text-sm font-medium dark:hover:bg-black flex items-center gap-2'>
                        <div className="icon">
                            {x.icon}
                        </div>
                        <div className="block">{x.text}</div>
                    </div>)}
                </div>
            </div>
        </div>
    )
}