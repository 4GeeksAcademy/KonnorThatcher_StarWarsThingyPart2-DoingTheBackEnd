import React, {useState, useContext} from 'react'
import { Context } from '../store/appContext';
import LoginForm from './loginForm.jsx';

const SignupAndLogin = () => {
    const {state, actions} = useContext(Context)

    return (
        <>
            <div className='dropdown-center me-2'>
                <button
                className='btn btn-secondary dropdown-toggle'
                type='button'
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    Sign Up
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 me-0">
                   {/*<Form formFunc={actions.signup} buttonText={"Signup"} />*/}
                </div>
            </div>
            <div className='dropdown-center'>
                <button
                className='btn btn-primary dropdown-toggle'
                type='button'
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    Log In
                </button>
                <div className="dropdown-menu dropdown-menu-end p-2 me-0">
                    <LoginForm />
                </div>
            </div>
        </>
    )
}

export default SignupAndLogin