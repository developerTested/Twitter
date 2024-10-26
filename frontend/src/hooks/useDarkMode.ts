import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { toggleTheme } from "@/redux/slices/themeSlice";

export default function useDarkMode() {
    const { theme } = useAppSelector(state => state.theme);
    const dispatch = useAppDispatch();
    const [isDark, setIsDark] = useState(theme === 'dark');

    const handleToggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        window.localStorage.setItem('theme', newTheme);
        dispatch(toggleTheme(newTheme));
        setIsDark(!isDark);
        console.log("Current theme:", newTheme);
    };

    useEffect(() => {
        document.body.classList.toggle('dark', isDark);
    }, [isDark]);

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        if (localTheme) {
            dispatch(toggleTheme(localTheme));
            setIsDark(localTheme === 'dark');
            console.log("Local theme:", localTheme);
        }
    }, [dispatch]);

    return { theme, toggleTheme: handleToggleTheme };
}