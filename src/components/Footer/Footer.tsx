import './Footer.css';
import { useSelector } from 'react-redux';

const Footer = ({ className }: { className?: string }) => {
    return (
        <footer className='footer'>
            <div className='footer__inner'>
                <div className='footer__inner-left'>©2022 Blogfolio</div>
                <div className='footer__inner-right'>All rights reserved</div>
            </div>
        </footer>
    );
}

export { Footer };
