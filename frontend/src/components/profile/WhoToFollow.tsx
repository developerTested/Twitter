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
                {WhoToFollowData.items.map((x: any) => <div key={x.name} className="flex items-center justify-between gap-1">
                    <div className="w-full flex gap-2">
                        <div className="avatar">
                            <Avatar src={x.avatar} alt={x.displayName} rounded />
                        </div>
                        <div className="block">
                            <div className="tweet-user flex items-center gap-1">
                                <Link to={x.name} className="name font-semibold">{x.displayName ?? x.name}</Link>
                                {x.verified && <MdVerified className="w-6 h-6 text-blue-500" />}
                            </div>
                            <div className='text-sm'>{x.name}</div>
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
