import { useEffect, useRef, useState } from 'react'
import emojiList from '@/data/Emoji';
import Input from '../forms/Input';
import { categories } from '@/utilities/menu';

type EmojiPickerProps = {
    enableSearch?: boolean,
}

type GroupList = {
    id: string,
    name: string,
    emoji: emoji[],
}

type emoji = {
    codes: string;
    char: string;
    name: string;
    category: string;
    group: string;
    subgroup: string;
}


export default function EmojiPicker({ enableSearch = true }: EmojiPickerProps) {

    const [tab, setTab] = useState('smile');
    const [filteredEmojiList, setFilteredEmojiList] = useState<GroupList[]>([]);
    const [mostUsed, setMostUsed] = useState([]);

    const searchRef = useRef(null);
    const emojiPickerRef = useRef<HTMLDivElement | null>(null);

    const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleOnScroll = () => {

        groupRefs.current.forEach((groupRef, index) => {
            if (groupRef) {
                const { top, bottom } = groupRef.getBoundingClientRect();
                // Check if the group is in the viewport
                if (top < window.innerHeight && bottom > 0) {
                    setTab(filteredEmojiList[index].id);
                }
            }
        });
    };

    const handleTabClick = (tabName: string) => {
        setTab(tabName);
        const groupIndex = filteredEmojiList.findIndex(group => group.id === tabName);
        const groupRef = groupRefs.current[groupIndex];

        if (groupRef && emojiPickerRef.current) {
            const emojiPicker = emojiPickerRef.current;
            const scrollToPosition = groupRef.offsetTop - emojiPicker.offsetTop;

            // Ensure the scroll operation is only performed if emojiPicker is available
            emojiPicker.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleEmojiClick = (emoji: emoji) => {
       
    };

    const loadEmojis = () => {

        const groups: GroupList[] = categories.map((x) => {
            return {
                id: x.id,
                name: x.name,
                emoji: []
            }
        });

        emojiList.forEach((value) => {
            const group = groups.find((x) => x.name.includes(value.group))
            if (group) {
                group.emoji.push(value);
            }
        });

        setFilteredEmojiList(groups);
    }

    useEffect(() => {
        loadEmojis();
    }, []);

    return (
        <div className='emoji-picker w-350 h-350 z-10 absolute top-full left-auto right-auto shadow-lg bg-white dark:bg-widget rounded-lg dark:text-white p-2 border border-black flex flex-col gap-4'>
            <div className="flex items-center">
                {categories.map((cat) => <button onClick={() => handleTabClick(cat.id)} key={cat.name} className={`border-b-2 ${tab === cat.id ? "border-blue-500" : "border-transparent"} py-2 flex-auto flex items-center justify-center`}>
                    {cat.icon}
                </button>)}
            </div>

            {enableSearch ?
                <Input ref={searchRef} type="search" name="search" placeholder='Connecting People...' className='bg-slate-100 dark:bg-input border-white dark:border-input dark:text-white border-none px-4 p-2.5 outline-none' />
                : ""}

            <div ref={emojiPickerRef} onScroll={handleOnScroll} className="size-full overflow-y-auto flex flex-col gap-4">
                {filteredEmojiList.map((group, groupIndex) => (
                    <div key={groupIndex} className="block" ref={el => (groupRefs.current[groupIndex] = el)}>
                        <div className="text-sm my-2">
                            {group.name}
                        </div>

                        <div className="flex flex-wrap items-center text-2xl">
                            {group.emoji.map((emoji, emojiIndex) => (
                                <div key={emojiIndex} className="flex-auto flex items-center justify-center hover:bg-slate-200 rounded-full cursor-pointer">
                                    {emoji.char}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
