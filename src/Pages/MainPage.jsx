import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useGetUser } from '../hooks/useGetUser'
import { SideBar } from '../components/SideBar'
import { TopBar } from '../components/TopBar'

export const MainPage = () => {


    const navigate = useNavigate()
    const { user, loading, error } = useGetUser()

    useEffect(() => {

        if (loading) return

        if (!user) {
            navigate('/login')
        }

    }, [user, loading, error])

    return (
        <div>
            {
                loading ?
                    <div>Cargando...</div>
                    :
                    <div className='flex '>
                        <SideBar />
                        <div className='flex-column w-full'>
                            <TopBar />
                            <section className='flex-1'>
                                <Outlet />
                            </section>
                        </div>
                    </div>
            }
        </div>
    )
}
