import { Tweet, TweetList } from '@/components/tweet'
import tweetList from '@/data/tweets'
import ProfileHeader from '@/components/profile/ProfileHeader'
import WhoToFollow from '@/components/profile/WhoToFollow'

export default function Profile() {
    return (
        <div className='flex flex-col gap-4'>
            <ProfileHeader />
            <div className='flex float-start gap-4'>
                <div className="w-350 shrink-0">
                    <h1 className='text-xl'>
                        Admin
                    </h1>
                </div>
                <div className="flex-auto">
                    <TweetList>
                        {tweetList.map((tweet, i) => <Tweet key={i} tweet={tweet} />)}
                    </TweetList>
                </div>
                <div className="w-350 shrink-0">
                    <WhoToFollow />
                </div>
            </div>
        </div>
    )
}
