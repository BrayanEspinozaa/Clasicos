import React from 'react'

export const Button = ({ children, design, className, ...props }) => {
    return (
        <button
            className={`
                px-5 py-2 transition-all
                ${design === 'filled' && 'bg-slate-400 rounded-lg text-white hover:bg-slate-500 '}
                ${design === 'outlined' && 'border-2 border-slate-400 rounded-lg text-slate-500 hover:border-slate-500 hover:text-slate-500'}
                ${design === 'link' && 'rounded-lg text-slate-400 hover:text-scale-500'}
                ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
