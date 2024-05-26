import './SignIn.css'
import { Input } from '../Input'
import { INPUT_TYPES } from '../../types'
import { Button } from '../Button'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { signInUser } from '../../redux/actionCreators'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const SignIn = () => {
    const dispatch = useDispatch();
    const [formState, setFormState] = useState({
        email: '',
        password: ''
    })
    const handler = (key: string, value: string) => {
        setFormState(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const handleSignIn = () => {
        const { email, password } = formState;
        dispatch(signInUser({email, password}))
    }

    return (
        <div className='signin__page'>

            <div className='signin-wrapper'>
                <div className='signin__input_container'>
                    <Input 
                        className="input"
                        type={INPUT_TYPES.TEXT}
                        placeholder='Your email'
                        label='Email'
                        onChange={(e: any) => handler('email', e.target.value)}
                    />

                    <Input 
                        className="input"
                        type={INPUT_TYPES.PASSWORD}
                        placeholder='Your password'
                        label='Password' 
                        onChange={(e: any) => handler('password', e.target.value)}
                    />
                    <Link to="/sign-up" className='forgot-btn'>Forgot password?</Link>
                    
                    <Button className='signin-btn'
                        onClick={handleSignIn}           
                        children='SIGN IN'
                    />

                    <footer className='reg__form-footer'>
                        <div className='signin__footer-inner'>
                            <div className='reg__form-footer-text'>Don't have an account?</div>
                            <Link to="/sign-up" className='reg__form-footer-btn'>Sign up</Link>
                        </div>
                    </footer>
                    </div>
                </div>
        </div>
    )
}

export { SignIn }