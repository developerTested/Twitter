import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from './Avatar'
import { MdHome } from 'react-icons/md'
import { FaBell, FaEnvelope } from 'react-icons/fa'
import { ImExit } from 'react-icons/im'
import Button from './forms/Button'
import { toast } from 'react-toastify'
import Tooltip from './Tooltip'

export default function Navbar() {

    const navigate = useNavigate();

    const logout = async () => {

        navigate('/');

        toast.success("You've been logged out successfully!");
    }

    const menuItems = [
        {

            name: 'Home',
            url: '/home',
            icon: <MdHome className='w-6 h-6' />,
        },
        {

            name: 'Messages',
            url: '/home',
            icon: <FaEnvelope className='w-6 h-6' />,
        },
        {

            name: 'Notifications',
            url: '/home',
            icon: <FaBell className='w-6 h-6' />,
        },
    ]

    return (
        <div className='flex items-center gap-2'>
            <div className="hidden md:flex items-center gap-2">
                {menuItems.map((menu, i) => <Tooltip key={i} title={menu.name}>
                    <Link key={i} to={menu.url} className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-slate-200 dark:bg-black dark:text-white">
                        {menu.icon}
                    </Link>
                </Tooltip>
                )}
            </div>

            <div className="block">
                <Avatar alt='Tom' size='sm' />
            </div>

            <Button size='md' icon onClick={logout}>
                <ImExit className='w-6 h-6' />
            </Button>
        </div>
    )
}