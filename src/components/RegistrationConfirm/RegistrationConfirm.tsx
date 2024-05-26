import './RegistrationConfirm.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import { activationSignUp } from '../../redux/actionCreators';
import { Link } from 'react-router-dom';


const RegistrationConfirm = () => {
  const { uid = '', token = '' } = useParams(); 
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(activationSignUp({ uid, token }))
  }, [])

    return (
      <div className='confirmation__page'>
        <div className='confirm__form-wrapper'>
          <div className='confirm__form-innertext'>
            Registration successful! Welcome aboard!<br/>
            Please check your email.
          </div>
          <div className='button_confirm-container'>
            <Link to='/sign-in' className='button_confirm'>    
                  Go to sign in
                </Link>
          </div>
        </div>
      </div>
    )
}

export { RegistrationConfirm }