import WhoToFollow from '@/components/profile/WhoToFollow'
import ProfileCard from '@/components/profile/ProfileCard'
import tweetList from '@/data/tweets'
import { Tweet, TweetList } from '@/components/tweet'
import TweetForm from '@/components/tweet/TweetForm'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { logout } from '@/redux/slices/authSlice'

export default function Home() {

  const dispatch = useAppDispatch()
  const auth  = useAppSelector(state => state.auth);

  if(!auth.loggedIn){
    dispatch(logout());
  }

  return (
    <div className='container'>
      <div className="flex gap-2">
        <div className="w-350 shrink-0">
          <ProfileCard />
        </div>
        <div className="flex flex-col flex-auto">
          <TweetForm open={false} />
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
