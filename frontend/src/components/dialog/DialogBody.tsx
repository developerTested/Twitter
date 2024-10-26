import React from 'react'
import classNames from 'classnames'

type props = {
    children: React.ReactNode,
    className?: string,
}

export default function DialogBody({ children, ...props }: props) {
    const classes = classNames('m-auto', props.className);
    return (
        <div {...props} className={classes}>
            {children}
        </div>
    )
}