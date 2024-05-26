import './ArrowPagination.css';

const ArrowPagination = ({ isLeft, className, stroke = "black", onClick, disabled }: { isLeft: boolean, className?: string, stroke?: string, onClick?: Function, disabled?: boolean }) => {
    return (
        <svg 
            width="19" 
            height="12" 
            viewBox="0 0 19 12" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className={`${className} ${isLeft ? 'left' : 'right'}`}
            onClick={onClick ? () => onClick() : undefined}
        >
            <path 
                stroke={stroke}
                d={isLeft 
                    ? "M6.09375 11L1.09375 6M1.09375 6L6.09375 1M1.09375 6H17.5938" 
                    : "M12.9063 1L17.9063 6M17.9063 6L12.9063 11M17.9063 6H1.40625"}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
            />
        </svg>
    );
}

export { ArrowPagination };
