import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { supabase } from '../../main';
import { useGetUser } from '../../hooks/useGetUser';
import * as yup from 'yup';
import { ErrorMessage, Formik } from 'formik';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HelperText } from '../../components/HelperText';
import logo from '../../assets/clasicos_logo.png'
import { useWindowSize } from "@uidotdev/usehooks";

export const Login = () => {

    const userSchema = yup.object().shape({
        email:
            yup.string()
                .required('Correo Electronico Requerido')
                .matches(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    "Formato de Correo Inválido "
                ),
        password: yup.string().required('Contraseña Requerida'),
    });


    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        setSubmitting(true)

        supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password
        }).then(res => {
            console.log(res)
            if (res.error) {
                setErrors({email: 'Correo o contraseña incorrectos', password: 'Correo o contraseña incorrectos' })

                return
            }

            navigate('/dashboard')
        }).catch(err => {
            new Error(err)
            setErrors({email: 'Correo o contraseña incorrectos', password: 'Correo o contraseña incorrectos' })
        }).finally(() => {
            setSubmitting(false)
        })
    }

    const { user, loading, error } = useGetUser()
    const { width } = useWindowSize()

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
                    <div className={`flex`}>
                        {
                            width > 700 &&
                            <section className='w-[50vw] bg-slate-200 grid place-content-center relative '>
                                <img src={logo} width={400} alt='Logo de clasicos burritos y cafe' />
                                <span className='absolute bottom-3 left-3 text-xs opacity-60'>&copy; Clasicos Burritos y Cafe 2023 </span>
                            </section>
                        }

                        <section className={`${width > 700 ? 'w-[50vw]' : 'w-full'} h-[100vh] flex justify-center ${width < 700 ? 'items-start' : 'items-center'} relative`}>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={userSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting,
                                }) => (
                                    <form onSubmit={handleSubmit}
                                        className={`flex flex-col gap-4 justify-center items-center ${width > 1100 ? 'w-2/3' : width > 700 ? 'w-[40vw]' : 'w-[90vw]'} px-10`}
                                    >
                                        {
                                            width < 700 &&
                                            <img src={logo} width={400} alt='Logo de clasicos burritos y cafe' />
                                        }
                                        <div className='flex flex-col gap-5 justify-start items-start w-full'>
                                            <div className='flex flex-col w-full'>
                                                <label className='mb-2 opacity-70'>
                                                    Correo Electronico
                                                </label>
                                                <Input
                                                    type='text'
                                                    name='email'
                                                    id='email'
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.email}
                                                />
                                                {
                                                    errors.email
                                                        ? <ErrorMessage className='text-xs text-rose-500 mt-1' name='email' component='div' />
                                                        : <HelperText>Ingrese su correo electronico</HelperText>
                                                }
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-5 justify-start items-start w-full'>
                                            <div className='flex flex-col w-full'>

                                                <label className='mb-2 opacity-70'>
                                                    Contraseña
                                                </label>
                                                <Input
                                                    type='password'
                                                    name='password'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={errors.password}
                                                />
                                                {
                                                    errors.password
                                                        ? <ErrorMessage className='text-xs text-rose-500 mt-1' name='password' component='div' />
                                                        : <HelperText>Ingrese su contraseña</HelperText>
                                                }
                                            </div>

                                        </div>

                                        <Button className='w-full mt-5' design='filled' type='submit'>Ingresar</Button>
                                    </form>

                                )}

                            </Formik>
                            {
                                width < 700 &&
                                <span className='absolute bottom-3 left-3 text-xs opacity-60'>&copy; Clasicos Burritos y Cafe 2023 </span>
                            }

                        </section>

                    </div>
                )
            }
        </div>
    )
}

