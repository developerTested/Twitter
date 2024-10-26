import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import Button from "../forms/Button";

export default function ProfileHeader() {

  const profileMenu = [
    {
      text: 'Home',
      url: '/',
    },
    {
      text: 'About',
      url: '/about',
    },
    {
      text: 'Photos',
      url: '/photos',
    },
    {
      text: 'Friends',
      url: '/friends',
    },
    {
      text: 'Followers',
      url: '/followers',
    },
    {
      text: 'Following',
      url: '/following',
    },
  ]

  return (
    <div className="relative mb-2">
      <div className="relative h-80 overflow-hidden">
        <img src="/img/covers/Blue-Flower.jpg" className="w-full h-full object-cover" />

        <div className="user-info px-8 md:px-60 z-10 absolute bottom-2">
          <div className="name flex items-center text-center gap-2 ">
            <div className="text-white text-3xl drop-shadow-2xl shadow-black">Admin</div>
            <img src="/img/verified.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="relative h-12 bg-white dark:bg-widget dark:text-white shadow-md">
        <div className="container relative flex items-center gap-4">
          <div className="hidden lg:block avatar w-60 h-fit">
            <Avatar alt="avatar" size="2xl" rounded={false} className="absolute -bottom-4 p-1 rounded-md bg-white dark:bg-white/20" />
          </div>
          <div className="w-full flex-auto flex items-center justify-between">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
              {profileMenu.map((menu, i) => <Link key={i} to={menu.url} className="px-3 py-2.5 border-b-4 border-transparent hover:border-blue-600">
                {menu.text}
              </Link>)}
            </div>
            <div className="right-menu flex items-center justify-center">
              <Button size="md">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
