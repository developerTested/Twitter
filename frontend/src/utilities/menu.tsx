import { FaBowlFood, FaCar, FaCat, FaFaceSmile, FaFlag, FaLightbulb, FaMusic, FaTree } from 'react-icons/fa6';

export const categories = [
    {
        id: 'smile',
        name: "Smileys & Emotion",
        icon: <FaFaceSmile className='w-6 h-6' />
    },
    {
        id: 'activities',
        name: "Activities",
        icon: <FaTree className='w-6 h-6' />
    },
    {
        id: 'nature',
        name: "Animals & Nature",
        icon: <FaCat className='w-6 h-6' />
    },
    {
        id: 'food',
        name: "Food & Drink",
        icon: <FaBowlFood className='w-6 h-6' />
    },
    {
        id: 'travel',
        name: "Travel & Places",
        icon: <FaCar className='w-6 h-6' />
    },
    {
        id: 'objects',
        name: "Objects",
        icon: <FaLightbulb className='w-6 h-6' />,
    },
    {
        id: 'symbols',
        name: "Symbols",
        icon: <FaMusic className='w-6 h-6' />
    },
    {
        id: 'flags',
        name: "Flags",
        icon: <FaFlag className='w-6 h-6' />
    },
]
