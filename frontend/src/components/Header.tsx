import * as React from 'react'
import { Link } from 'react-router-dom'
import { IoExit, IoMenuOutline } from "react-icons/io5";
import { FaTwitter } from 'react-icons/fa'
import { MdExplore, MdHome, MdNotifications } from "react-icons/md";
import SearchForm from './forms/SearchForm'
import ThemeToggle from './ThemeToggle'
import Button from './forms/Button'
import useActiveMenu from '@/hooks/useActiveMenu'
import NewTweet from './tweet/NewTweet'
import Avatar from './Avatar'
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setMobileMenu, setShowDialog } from '@/redux/slices/appSlice';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const menuItems = [
    {
        text: 'Home',
        url: '/',
        icon: <MdHome className='w-6 h-6' />,
    },
    {
        text: 'Explore',
        url: '/explore',
        icon: <MdExplore className='w-6 h-6' />,
    },
    {
        text: 'Notifications',
        url: '/notifications',
        icon: <MdNotifications className='w-6 h-6' />,
    },
]

export default function Header() {
    const { mobileMenu } = useAppSelector(state => state.app);
    const { loggedIn } = useAppSelector(state => state.auth)

    const activeMenu = useActiveMenu();
    const dispatch = useAppDispatch();

    const handleResize = () => {
        if (window.innerWidth > 640) {
            dispatch(setMobileMenu(false));
        }
    }

    React.useLayoutEffect(() => {

        window.addEventListener('resize', handleResize, true)

        return () => {
            window.removeEventListener('resize', handleResize, true)
        }

    }, [window.innerWidth]);


    return (
        <div className='sticky top-0 z-100 block mb-4 w-full border-b dark:border-widget bg-white dark:bg-widget dark:text-white'>
            <div className="px-4 flex items-center justify-between w-full h-full">
                {loggedIn ?
                    <div className="flex items-center gap-4 shrink-0">
                        <div className="flex items-center">
                            {menuItems.map((menu, i) => <Link key={i} to={menu.url} className={`px-4 py-3 flex items-center gap-2 border-b-4 ${activeMenu === menu.url ? "border-b-blue-500" : "border-transparent hover:border-b-blue-500 "}`}>
                                <div className="block">
                                    {menu.icon}
                                </div>
                                <div className="name hidden lg:block">
                                    {menu.text}
                                </div>
                            </Link>)}
                        </div>
                    </div> : ""}

                <Link to="/" className={`logo ${loggedIn ? "mx-auto" : "mr-auto"} text-main text-center text-blue-500`}>
                    <FaTwitter className='w-6 h-6' />
                </Link>

                <div className="flex items-center gap-4">
                    <ThemeToggle />

                    <SearchForm />

                    {loggedIn ?
                        <React.Fragment>

                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Team</DropdownMenuItem>
                                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to="/logout" className="flex items-center gap-4">
                                        <IoExit />
                                        <span>Log out</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <button onClick={() => dispatch(setShowDialog(true))}>
                                Tweet
                            </button>
                            <NewTweet />
                        </React.Fragment>
                        : <div className="block">
                            <Link to="/auth/login" className="px-4 py-1.5 text-center rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                                Login
                            </Link>
                        </div>}
                </div>

            </div>
        </div>
    )
}
