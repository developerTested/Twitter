import { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string,
    rules?: RegisterOptions;
    register?: UseFormRegister<any>;
    isFocused?: boolean,
}

export default forwardRef(function TextInput({ name, register, rules, type = 'text', className = '', isFocused = false, ...props }: InputProps, ref) {

    const localRef = useRef<HTMLInputElement>(null);   

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <input
            autoComplete="off"
            type={type}
            className={
                twMerge("w-full px-4 py-2 disabled:cursor-not-allowed bg-white dark:bg-white/20 border border-slate-200 dark:border-none outline-none rounded", className)
            }
            ref={localRef}
            {...props}
            {...(register && register(name, rules))}
        />
    );
});
