import { useEffect, useRef, useState } from 'react'
import emojiList from '@/data/Emoji';
import Input from '../forms/Input';
import { categories } from '@/utilities/menu';

type EmojiPickerProps = {
    enableSearch?: boolean,
    onEmojiClick: (emojiData: EmojiType) => void,
}

type GroupList = {
    id: string,
    name: string,
    emoji: EmojiType[],
}

export type EmojiType = {
    codes: string;
    char: string;
    name: string;
    category: string;
    group: string;
    subgroup: string;
}


export default function EmojiPicker({ enableSearch = true, onEmojiClick }: EmojiPickerProps) {

    const [tab, setTab] = useState('smile');
    const [filteredEmojiList, setFilteredEmojiList] = useState<GroupList[]>([]);

    const [searchQuery, setSearchQuery] = useState('');

    const [mostUsed, setMostUsed] = useState<EmojiType[]>(() => {
        const savedMostUsed = localStorage.getItem('mostUsedEmojis');
        return savedMostUsed ? JSON.parse(savedMostUsed) : [];
    });

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

            emojiPicker.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth',
            });
        }
    };

    const handleEmojiClick = (emoji: EmojiType) => {
        const updatedMostUsed = [...mostUsed];

        const index = updatedMostUsed.findIndex((e: EmojiType) => e.char === emoji.char);

        onEmojiClick(emoji)

        if (index !== -1) {
            updatedMostUsed.splice(index, 1); // Remove it to re-add later
        }

        updatedMostUsed.unshift(emoji);

        if (updatedMostUsed.length > 10) {
            updatedMostUsed.pop();
        }

        setMostUsed(updatedMostUsed);
        localStorage.setItem('mostUsedEmojis', JSON.stringify(updatedMostUsed));
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


    const filteredEmojiGroups = filteredEmojiList.map(group => ({
        ...group,
        emoji: group.emoji.filter(emoji => emoji.name.toLowerCase().includes(searchQuery.toLowerCase()))
    })).filter(group => group.emoji.length > 0);

    return (
        <div className='emoji-picker grid w-350 h-350 z-10 absolute top-full left-auto right-auto shadow-lg bg-white dark:bg-widget rounded-lg dark:text-white border border-black'>
            <div className="flex items-center p-2">
                {categories.map((cat) => <button onClick={() => handleTabClick(cat.id)} key={cat.name} className={`border-b-2 ${tab === cat.id ? "border-blue-500" : "border-transparent"} py-2 flex-auto flex items-center justify-center`}>
                    {cat.icon}
                </button>)}
            </div>

            <div className="block most-used p-2">
            {enableSearch ?
                <Input ref={searchRef} onChange={(e) => setSearchQuery(e.target.value)} type="search" name="search" placeholder='Connecting People...' className='bg-slate-100 dark:bg-input border-white dark:border-input dark:text-white border-none px-4 p-2.5 outline-none' />
                : ""}

                <div className="text-sm font-semibold my-2">Most Used</div>
                <div className="flex flex-wrap items-center text-2xl">
                    {mostUsed.map((emoji, emojiIndex) => (
                        <div key={emojiIndex} className="flex-auto flex items-center justify-center hover:bg-slate-200 rounded-full cursor-pointer" onClick={() => handleEmojiClick(emoji)}>
                            {emoji.char}
                        </div>
                    ))}
                </div>
            </div>

            <div ref={emojiPickerRef} onScroll={handleOnScroll} className="size-full overflow-y-auto space-y-4">
                {filteredEmojiGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="block p-2 space-y-2" ref={el => (groupRefs.current[groupIndex] = el)}>
                        <div className="text-sm font-semibold">
                            {group.name}
                        </div>

                        <div className="flex flex-wrap text-2xl">
                            {group.emoji.map((emoji, emojiIndex) => (
                                <div key={emojiIndex} onClick={() => handleEmojiClick(emoji)} className="w-8 h-8 hover:bg-slate-200 rounded-full cursor-pointer">
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
