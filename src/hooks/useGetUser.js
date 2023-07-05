import { useState, useEffect } from 'react'
import { supabase } from '../main'

export const useGetUser = () => {

    const [user, setUser] = useState(null)
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(null)

    useEffect(() => {
        setloading(true)
        supabase.auth.getUser().then(res => {
            console.log(res.data)
            setUser(res.data.user)
        }).catch(err => {
            seterror(err)
        }).finally(() => {
            setloading(false)
        })
    }, [])

    return {
        user,
        loading,
        error
    }

}
