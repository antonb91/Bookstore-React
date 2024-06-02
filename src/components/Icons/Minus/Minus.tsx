import './Minus.css'

const Minus = ({onClick}: {onClick?: () => void}) => {
    return (
        <svg 
            className = 'minus'
            width="12" 
            height="2" 
            viewBox="0 0 12 2" 
            fill="none" 
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg">
            <rect 
                width="12" 
                height="2" 
                rx="1" 
                fill="#313037"
            />
        </svg>

    )
}

export { Minus }