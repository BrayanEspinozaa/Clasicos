import React from 'react'

export const Input = ({ error, className, ...props }) => {
    return (
        <input
            className={`${className} transition-all outline-none p-2 h-9 rounded-lg bg-slate-50 ${error ? 'border-rose-500' : 'border-inherit'} ${error ? ' focus:border-rose-500' : ' focus:border-slate-400'} border-2`}
            {...props}
        />
    )
}
