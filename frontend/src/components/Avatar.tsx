import { getInitials } from "@/utilities/helper";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function Avatar({
  src = '/img/no-avatar.png',
  alt,
  size,
  rounded = true,
  className,
  imageClassName,
}: {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'normal' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl',
  rounded?: boolean,
  className?: string,
  imageClassName?: string,
}) {


  let sizeClass;

  switch (size) {
    case 'xs':
      sizeClass = 'w-8 h-8';
      break;
    case 'sm':
      sizeClass = 'w-10 h-10';
      break;
    case 'normal':
      sizeClass = 'w-12 h-12';
      break;
    case 'md':
      sizeClass = 'w-16 h-16';
      break;
    case 'lg':
      sizeClass = 'w-24 h-24';
      break;
    case 'xl':
      sizeClass = 'w-32 h-32';
      break;
    case '2xl':
      sizeClass = 'w-48 h-48';
      break;
    case '3xl':
      sizeClass = 'w-60 h-60';
      break;
    case '4xl':
      sizeClass = 'w-96 h-96';
      break;
    default:
      sizeClass = 'w-12 h-12';
      break;
  }

  const avatarClass = twMerge(classNames('flex items-center justify-center bg-slate-200 shrink-0',
    sizeClass, {
    'rounded-full': rounded,
  }), className)

  return (
    <div className={avatarClass}>
      {src ?
        <img src={src} alt={getInitials(alt ?? '')} className={twMerge(`w-full h-full object-cover ${rounded ? 'rounded-full' : ''}`, imageClassName)} /> : <div className="font-semibold">{getInitials(alt ?? '')}</div>}
    </div>
  )
}