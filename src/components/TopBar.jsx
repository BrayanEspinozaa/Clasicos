import React from 'react'
import { supabase } from '../main'
import { useNavigate } from 'react-router-dom'

export const TopBar = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        supabase.auth.signOut().then(res => {
            navigate('/login')
        }).catch(err => {
            new Error(err)
        })
    }
    return (
        <div className='h-14 bg-yellow-100 w-full'>
            <button onClick={handleLogout}> Cerrar Sesión</button>
        </div>
    )
}
