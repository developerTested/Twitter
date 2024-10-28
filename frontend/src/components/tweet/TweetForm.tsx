import { useState, useEffect } from 'react'
import { BsFillEmojiSmileFill, BsFillImageFill } from 'react-icons/bs'
import { BiPoll } from "react-icons/bi"
import { TbGif } from "react-icons/tb"
import CircularProgressBar from '../CircularProgressBar'
import ClickAwayListener from 'react-click-away-listener'
import Avatar from '@/components/Avatar'
import Poll from '@/components/forms/Poll'
import { ImCross } from 'react-icons/im'
import Button from '../forms/Button'
import EmojiPicker, { EmojiType } from '../Emoji'
import { useAppSelector } from '@/hooks'

type TweetProps = {
    open: boolean,
}

export default function TweetForm({ open, ...props }: TweetProps) {
    const maxChars = import.meta.env.VITE_MAX_CHARS || 100;

    const { theme } = useAppSelector(state => state.theme);
    const [addPoll, setAddPoll] = useState(false);
    const [showGIFPicker, setShowGIFPicker] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(true);
    const [charsLeft, setCharsLeft] = useState(maxChars);
    const [percent, setPercent] = useState(0);
    const [inputText, setInputText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = event.target.value;
        setCharsLeft(maxChars - input.length);
        setPercent(input.length);

        setInputText(input);
    };

    const onEmojiClick = (emojiData: EmojiType) => {
        let text = inputText;
        setInputText((text += emojiData.char));

        setCharsLeft(maxChars - text.length);
        setPercent(text.length);
    };

    const menuItems = [
        {
            label: 'image',
            text: 'Images',
            icon: <BsFillImageFill className="w-6 h-6" />,
            handleClick: () => false,
        },
        {
            label: 'poll',
            text: 'poll',
            icon: <BiPoll className="w-6 h-6" />,
            handleClick: () => setAddPoll(!addPoll),
        },
        {
            label: 'gif',
            text: 'GIF',
            icon: <TbGif className="w-6 h-6" />,
            handleClick: () => setShowGIFPicker(!showGIFPicker),
        },
        {
            label: 'emoji',
            text: 'Emoji',
            icon: <BsFillEmojiSmileFill className="w-6 h-6" />,
            handleClick: () => setShowEmojiPicker(!showEmojiPicker),
        },
    ];

    const handleSubmit = () => {

    }

    const handleOnClose = () => {
        setInputText('');
        setPercent(0);
        setCharsLeft(maxChars);
        setShowEmojiPicker(false);
        setShowGIFPicker(false);
    }

    useEffect(() => {
        return () => {
            handleOnClose();
        }
    }, [open]);

    const calcPercent = Math.floor(percent * 100 / maxChars);

    return (
        <div className='w-full bg-white dark:bg-black/20 dark:text-white rounded-md p-2 relative'>
            <div className="flex gap-2">

                <div className="avatar flex-shrink-0">
                    <Avatar rounded />
                </div>

                <form onSubmit={handleSubmit} method="get" className='w-full flex flex-col gap-2 relative'>
                    <div className="relative flex flex-col gap-4 mb-4">
                        <textarea
                            value={inputText}
                            onChange={handleChange}
                            maxLength={maxChars}
                            cols={30}
                            rows={4}
                            placeholder='What is in your mind?'
                            className='dark:bg-input px-2 py-1 w-full outline-none rounded-lg'
                        />

                        {addPoll ? <div className="block">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className='text-lg px-4 py-2'>
                                    Poll
                                </h3>

                                <Button size='md' onClick={() => setAddPoll(false)}>
                                    <ImCross className='w-4 h-4' />
                                </Button>
                            </div>
                            <Poll />
                        </div> : ''}
                    </div>

                    <div className="flex items-center justify-between relative">
                        <div className="flex items-center gap-2">
                            {menuItems.map((x, i) => <div key={i} className='cursor-pointer flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20'>
                                <button type='button' onClick={x.handleClick}>
                                    {x.icon}
                                </button>
                            </div>
                            )}

                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative w-10 h-10 rounded-full">
                                <CircularProgressBar theme={theme} text={charsLeft} value={calcPercent} remain={charsLeft} color="text-blue-400" />
                            </div>

                            <Button disabled={!inputText}>
                                Tweet
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {showEmojiPicker ? (
                <ClickAwayListener
                    onClickAway={() => setShowEmojiPicker(false)}
                >
                    <div className="block w-full h-full ">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                </ClickAwayListener>
            ) : ''}
        </div>
    )
}
