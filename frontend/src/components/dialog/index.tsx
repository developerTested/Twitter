import { useAppDispatch, useAppSelector } from '@/hooks';
import { setShowDialog } from '@/redux/slices/appSlice';
import { ComponentProps, useEffect, useRef } from 'react'

type DialogProps = ComponentProps<"dialog">

export default function Dialog({ children }: DialogProps) {

    const ref = useRef<HTMLDivElement>(null);
    
    const { showDialog } = useAppSelector(state => state.app);

    const dispatch = useAppDispatch();

    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (ref.current && !ref.current.contains(target)) {
            dispatch(setShowDialog(false))
        }

        return ref.current;
    }

    useEffect(() => {

        window.addEventListener("click", handleClickOutside, true)

        return () => {
            window.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <div className={`${showDialog ? 'flex' : 'hidden'} shadow-lg fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center h-full w-full overflow-hidden outline-none`}>
            <div className="fixed inset-0 bg-black bg-opacity-60 h-full w-full" />
            <div ref={ref} className="w-full m-auto px-2">
                {children}
            </div>
        </div>
    )
}