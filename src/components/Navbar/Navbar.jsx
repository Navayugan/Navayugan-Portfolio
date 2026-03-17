import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    const closeMenu = () => setMenuOpen(false);

    const handleHomeClick = (e) => {
        closeMenu();
        if (window.location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <NavLink to="/" className="navbar__logo" onClick={handleHomeClick}>
                navayugan
            </NavLink>

            <button
                className="navbar__hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                {menuOpen ? <HiX /> : <HiMenuAlt3 />}
            </button>

            <div
                className={`navbar__overlay ${menuOpen ? 'visible' : ''}`}
                onClick={closeMenu}
            />

            <div className={`navbar__links ${menuOpen ? 'open' : ''}`}>
                <button
                    className="navbar__theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <FiSun /> : <FiMoon />}
                </button>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                    onClick={handleHomeClick}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    About Me
                </NavLink>
                <NavLink
                    to="/projects"
                    className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    Projects
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => `navbar__link ${isActive ? 'active' : ''}`}
                    onClick={closeMenu}
                >
                    Contact Me
                </NavLink>
                <a
                    href="/src/assets/Navayugan.pdf" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__resume"
                    onClick={closeMenu}
                >
                    Resume
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
