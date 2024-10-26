import React from 'react'
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from 'tailwind-merge';
import classNames from 'classnames';

const buttonStyles = cva(["flex", "items-center", "justify-center", "disabled:cursor-not-allowed", "disabled:cursor-not-allowed", "disabled:select-none"],
  {
    variants: {
      variant: {
        default: ["uppercase bg-blue-500 hover:bg-blue-600 disabled:bg-blue-600 text-white"],
        secondary: ["bg-black dark:bg-white disabled:black/70 text-white dark:text-black"],
        primary: ["uppercase bg-white hover:bg-slate-200 dark:bg-white/20 text-white"],
        info: ["uppercase bg-blue-600 hover:bg-slate-200 dark:bg-white/20 text-white"],
        icon: ["bg-gray-50 hover:bg-gray-100 dark:bg-white/20 text-center py-2.5 px-4"]
      },
      size: {
        default: ["rounded-full", "px-4 py-2", "text-center", "block", "border", "dark:border-transparent"],
        sm: ["px-2", "py-1", "text-xs", "rounded-full"],
        md: ["px-3 py-1.5 text-sm", "rounded-full"],
        base: ["px-4 py-2 text-sm", "rounded-full"],
        lg: ["px-5 py-3 text-base", "rounded-full"],
        xl: ["px-6 py-4 text-lg", "rounded-full"],
        icon: ["p-2", "text-center", "rounded-full"]
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type buttonType = VariantProps<typeof buttonStyles> & React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode,
  startIcon?: React.ReactElement,
  endIcon?: React.ReactElement,
  rounded?: boolean,
  fullWidth?: boolean,
}

const Button = ({ variant, size, className, startIcon, endIcon, fullWidth = false, children, ...props }: buttonType) => {

  const subClasses = classNames(className, {
    "w-full": fullWidth,
  });

  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }),  subClasses)}
    >
      {startIcon ? <div className=""> {startIcon} </div> : ''}
      {endIcon ? <div className=""> {endIcon} </div> : ''}
      {children}
    </button>
  );
};

export default Button;