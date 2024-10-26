import { setShowDialog } from '@/redux/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import Dialog from '../dialog'
import DialogContent from '../dialog/DialogContent'
import TweetForm from './TweetForm'

export default function NewTweet() {

    const { showDialog } = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    return (
        <Dialog open={showDialog}>
            <DialogContent handleOnClose={() => dispatch(setShowDialog(false))} title="Compose a new Tweet">
                <TweetForm open={showDialog} />
            </DialogContent>
        </Dialog>
    )
}
