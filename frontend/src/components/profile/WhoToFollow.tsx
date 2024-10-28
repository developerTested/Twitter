import Avatar from "../Avatar";
import WhoToFollowData from '@/data/WhotoFollow'
import Button from "../forms/Button";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

export default function WhoToFollow() {

    return (
        <div className="block bg-white dark:bg-widget dark:text-white rounded-md p-2">
            <h1 className="text-lg mb-2">Who to follow</h1>

            <div className="flex flex-col gap-2">
                {WhoToFollowData.items.map((x) => <div key={x.user_name} className="flex items-center justify-between gap-1">
                    <div className="w-full flex gap-2">
                        <div className="avatar">
                            <Avatar src={x.avatar} alt={x.displayName} rounded />
                        </div>
                        <div className="block">
                            <div className="tweet-user flex items-center gap-1">
                                <Link to={`/${x.user_name}`} className="name font-semibold">{x.displayName ?? x.user_name}</Link>
                                {x.verified && <MdVerified className="w-6 h-6 text-blue-500" />}
                            </div>
                            <div className='text-sm'>{x.user_name}</div>
                        </div>
                    </div>

                    <Button size="md">
                        Follow
                    </Button>
                </div>)}
            </div>
        </div>
    )
}
