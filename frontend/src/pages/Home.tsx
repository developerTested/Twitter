import WhoToFollow from '@/components/profile/WhoToFollow'
import ProfileCard from '@/components/profile/ProfileCard'
import tweetList from '@/data/tweets'
import { Tweet, TweetList } from '@/components/tweet'
import TweetForm from '@/components/tweet/TweetForm'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { resetUser } from '@/redux/slices/authSlice'

export default function Home() {

  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth);

  if (!auth.loggedIn) {
    dispatch(resetUser());
  }

  return (
      <div className="flex gap-2 px-4">
        <div className="hidden xl:block w-350 shrink-0">
          <ProfileCard />
        </div>
        <div className="flex flex-col flex-auto">
          <TweetForm open={false} />
          <TweetList>
            {tweetList.map((tweet, i) => <Tweet key={i} tweet={tweet} />)}
          </TweetList>
        </div>

        <div className="hidden lg:block w-350 shrink-0">
          <WhoToFollow />
        </div>
    </div>
  )
}
