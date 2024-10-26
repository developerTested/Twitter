import { BsHeart, BsHeartFill, BsShareFill } from 'react-icons/bs'
import { AiOutlineRetweet } from "react-icons/ai"
import { GoReply } from "react-icons/go"
import { StatsType } from '@/types'
import Button from '../forms/Button'


function TweetFooter(props: { stats: StatsType }) {
    return (
        <div className="flex items-center justify-between text-center">
            <Button size="icon" variant="icon">
                <GoReply className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="icon">
                <AiOutlineRetweet className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="icon">
                <BsHeart className="w-5 h-5" />
            </Button>
            <Button size="icon" variant="icon">
                <BsShareFill className="w-4 h-4" />
            </Button>
        </div>
    )
}


export default TweetFooter
