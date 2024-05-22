import './Input.css'
import { IInput, INPUT_TYPES } from "../../types";
import { useSelector } from 'react-redux';
// import { IStoreState } from '../../types';

const Input = ({ placeholder, label, value, onChange, type, disabled, errorMessage, className }: IInput) => {
    // const theme = useSelector((state: IStoreState) => state.ui.theme);
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <label className='label'>{label}</label>
            {type === INPUT_TYPES.TEXTAREA ? 
                <textarea
                    className={'textarea ' + className}
                    placeholder={placeholder}
                    onChange={(e: any) => onChange && onChange(e)}
                    value={value}
                    disabled={disabled}
                /> :
                <input
                    className={'input ' + className}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: any) => onChange && onChange(e)}
                    type={type}
                    disabled={disabled}
                />
            }
            {errorMessage && <span style={{display: 'block', color: 'red'}}>{errorMessage}</span>}
        </div>
    )
}

export { Input };















