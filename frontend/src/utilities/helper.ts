import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import TwitterAPI from "./api";
import { getRefreshToken, setAccessToken, setRefreshToken } from "@/redux/slices/authSlice";
import { store } from "@/redux/store";
export function getInitials(inputName: string) {
    const names = inputName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
}

/**
 * Convert unicode to native emoji
 *
 * @param unicode - emoji unicode
 */
export const unicodeToEmoji = (unicode: string) => {
    return unicode
        .split("-")
        .map((hex) => parseInt(hex, 16))
        .map((hex) => String.fromCodePoint(hex))
        .join("");
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export async function refreshToken() {
    try {
        const response = await TwitterAPI.post('/auth/refreshToken', {
            refreshToken: getRefreshToken(store.getState()),
        })

        store.dispatch(setAccessToken(response.data.accessToken));
        store.dispatch(setRefreshToken(response.data.refreshToken));

    } catch (error) {
        console.log(error);
    }
}