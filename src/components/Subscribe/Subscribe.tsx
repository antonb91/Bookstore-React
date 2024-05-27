import './Subscribe.css'
import { Button } from '../Button'
import { useState } from 'react'
import { INPUT_TYPES } from '../../types'

const Subscribe = ({className}: {className?: string}) => {
    const [formState, setFormState] = useState({
        email: '',
    })

    const handler = (key: string, value: string) => {
        setFormState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    return (
        <p className={`subscribe__wrapper ${className}`}>
            <div className='subscribe-inner'>
                <h1 className='subscribe-title'>
                    Subscribe to Newsletter
                </h1>
                <div className='subscribe-text'>
                    Be the first to know about new IT books, upcoming releases, exclusive offers and more.
                </div>

                <div className='subscribe-input-button'>
                    <input 
                        className='subscribe-input'
                        type={INPUT_TYPES.TEXT}
                        placeholder={'Your email'}
                        value={formState.email}
                        onChange={(e: any) => handler('email', e.target.value)}
                    />

                    <Button 
                        className='subscribe-btn'
                        onClick={(event: any) => (event)}
                        children='Subscribe'
                    />
                </div>
            </div>
     
        </p>

    )
}

export { Subscribe }