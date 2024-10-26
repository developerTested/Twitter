import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";

export const Social_API = axios.create({
    timeout: 60 * 1000,
    withCredentials: true,
})

Social_API.interceptors.response.use(function (response) {
    return response;
}, function (error) {

    let errorMessage = error;

    if (error.response) {
        const errorData = error.response;

        errorMessage = {
            status: errorData.status,
            statusText: errorData.statusText,
            data: errorData.data,
        }
    }

    return Promise.reject(errorMessage);
});


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