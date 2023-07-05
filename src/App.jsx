import React, { useEffect } from 'react'
import { Outlet, Link, useNavigate } from "react-router-dom";
import { SideBar } from './components/SideBar';
import { useGetUser } from './hooks/useGetUser';

export const App = () => {

  const navigate = useNavigate()
  const { user, loading, error } = useGetUser()

  useEffect(() => {

    if(loading) return

    if(!user) {
      navigate('/login')
    }
    
  }, [user, loading, error])

  return (
    <div>
      {
        loading ?
          <div>Cargando...</div>
          :
          <>
            <SideBar />
            <section>
              <Outlet />
            </section>
          </>
      }
    </div>
  )
}
