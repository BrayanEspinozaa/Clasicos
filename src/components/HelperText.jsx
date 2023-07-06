import React from 'react'

export const HelperText = ({ children, ...props }) => {
    return (
        <span
        component='div'
            className={`
                text-xs mt-1 opacity-50
            }
            `}
            {...props}
        >{children}
        </span>
    )
}
