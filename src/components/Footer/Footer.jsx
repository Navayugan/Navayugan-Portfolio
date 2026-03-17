import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <span className="footer__logo">navayugan</span>
                        <p className="footer__tagline">Building digital experiences with passion &amp; precision.</p>
                    </div>

                    <div className="footer__links">
                        <h4 className="footer__links-title">Quick Links</h4>
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/projects">Projects</a>
                        <a href="/contact">Contact</a>
                    </div>

                    <div className="footer__social">
                        <h4 className="footer__links-title">Connect</h4>
                        <div className="footer__social-icons">
                            <a href="https://github.com/Navayugan" target='_blank' aria-label="GitHub"><FaGithub /></a>
                            <a href="https://www.linkedin.com/in/navayugan-k" target='_blank' aria-label="LinkedIn"><FaLinkedinIn /></a>
                            <a href="https://x.com/Navayugan777" target='_blank' aria-label="Twitter"><FaTwitter /></a>
                            <a href="https://www.instagram.com/the_great_fan_of_ravanan" target='_blank' aria-label="Instagram"><FaInstagram /></a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>
                        &copy; {year} Navayugan K. Made with <FiHeart className="footer__heart" /> All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
