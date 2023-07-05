import React from 'react'
import { Link } from 'react-router-dom'

export const SideBar = () => {
  return (
    <aside style={{height: '100vh' , width: 200, backgroundColor: '#f2f2f2'}}>
      <ul className='flex  flex-col items-center gap-3 mt-12'>
        <li>
          <Link to={'dashboard'}>Tablero</Link>
        </li>
        <li>
          <Link to={'users'}>Usuarios</Link>
        </li>
        <li>
          <Link to={'products'}>Productos</Link>
        </li>
      </ul>

    </aside>
  )
}
