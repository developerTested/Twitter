import TweetHeader from './TweetHeader'
import TweetBody from './TweetBody'
import TweetFooter from './TweetFooter'
import Avatar from '@/components/Avatar';
import { TweetType } from '@/types';

type tweetProps = {
    tweet: TweetType
}

export default function Tweet({ tweet }: tweetProps) {

    const { id, content, user, stats } = tweet;

    return (
        <div className='w-full bg-white dark:bg-widget rounded-md flex gap-2 px-4 py-2 my-2'>
            <div className="avatar flex-shrink-0">
                <Avatar src='/img/no-avatar.png' alt={user.displayName} rounded />
            </div>
            <div className="w-full flex flex-col gap-2">
                <TweetHeader user={user} id={id} />
                <TweetBody>
                    {content}
                </TweetBody>
                <TweetFooter stats={stats} />
            </div>
        </div>
    )
}