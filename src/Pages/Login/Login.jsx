import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { supabase } from '../../main';
import { useGetUser } from '../../hooks/useGetUser';

export const Login = () => {

    const navigate = useNavigate();
    const [state, setstate] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        setstate(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = () => {
        console.log(state)
        supabase.auth.signInWithPassword({
            email: state.email,
            password: state.password
        }).then(res => {
            console.log(res)
            navigate('/dashboard')
        }).catch(err => {
            new Error(err)
        })
    }

    const { user, loading, error } = useGetUser()

    useEffect(() => {

        if (loading) return

        if (user) {
            navigate('/dashboard')
        }

    }, [user, loading, error])


    return (
        <div>
            {
                loading ? (
                    <div>Cargando...</div>
                ) : (
                    <>
                        <div>
                            <label>
                                Email
                            </label>
                            <input type='text' name='email' onChange={handleChange} value={state.email} />
                        </div>
                        <div>
                            <label>
                                Contraseña
                            </label>
                            <input type='password' name='password' onChange={handleChange} value={state.password} />
                        </div>

                        <button onClick={handleSubmit}>Login</button>

                    </>
                )
            }
        </div>
    )
}

