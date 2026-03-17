import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import { FiMail, FiGithub, FiExternalLink, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaTwitter, FaCloud, FaInstagram } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { FaCode } from "react-icons/fa";
import { IoIosRocket } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { AiOutlinePython } from "react-icons/ai";
import Footer from '../../components/Footer/Footer';
import '../../animations/PageTransition.css';
import './Home.css';


const TYPING_SPEED = 80;
const PAUSE_BETWEEN = 700;

const nameText = 'Navayugan K';
const roleText = 'Full Stack Developer JAVA';

const projectsPreview = [
    {
        title: 'Online Voting System',
        desc: 'Web based Online Voting System for small Institutions/ Companies.',
        tags: ['React', 'Node.js', 'CSV'],
        icon: <DiReact />,
        github: 'https://github.com/Navayugan/Online-Voting-System',
    },
    {
        title: 'Garage Management System',
        desc: 'GSM empowers garages ensures seamless experiance for both customers and staff.',
        tags: ['Salceforce'],
        icon: <FaCloud />,
        github: 'https://github.com/Navayugan/Garage-Management-System-Park',
    },
    {
        title: 'Not Sharing Web Application',
        desc: 'This application facilitates user to create, share and manage their notes efficiently.',
        tags: ['HTML', 'CSS', 'JavaScript', 'Python'],
        icon: <AiOutlinePython />,
        github: 'https://github.com/Navayugan/Notes_Sharing_Web_Application_Using_Django_Framework-Navayugan-k-5020-PCET-main',
    }
];

const Home = () => {

    const [displayed, setDisplayed] = useState('');
    const [phase, setPhase] = useState('typing-name');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus('sending');
        setErrors({});

        try {
            const res = await fetch('https://formsubmit.co/ajax/navayugan777@gmail.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    _subject: formData.subject,
                    message: formData.message,
                }),
            });
            if (!res.ok) throw new Error('Request failed');
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    useEffect(() => {
        let timeout;

        if (phase === 'typing-name') {
            if (displayed.length < nameText.length) {
                timeout = setTimeout(() => {
                    setDisplayed(nameText.slice(0, displayed.length + 1));
                }, TYPING_SPEED);
            } else {
                timeout = setTimeout(() => setPhase('erasing-name'), PAUSE_BETWEEN);
            }
        } else if (phase === 'erasing-name') {
            if (displayed.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayed(displayed.slice(0, -1));
                }, 40);
            } else {
                setPhase('typing-role');
            }
        } else if (phase === 'typing-role') {
            if (displayed.length < roleText.length) {
                timeout = setTimeout(() => {
                    setDisplayed(roleText.slice(0, displayed.length + 1));
                }, TYPING_SPEED);
            } else {
                setPhase('done');
            }
        }

        return () => clearTimeout(timeout);
    }, [displayed, phase]);

    const isDone = phase === 'done';
    const isRole = phase === 'typing-role' || phase === 'done';

    return (
        <div className="home-page page">
            {/* ═══════ HERO SECTION ═══════ */}
            <section className="home">
                <div className="home__content">
                    <h1 className="home__hero-line">
                        <span className="home__im">I&apos;m&nbsp;</span>
                        <span className={`home__typed ${isRole ? 'home__typed--role' : 'home__typed--name'}`}>
                            {displayed}
                        </span>
                        <span className={`home__cursor ${isDone ? 'home__cursor--hidden' : ''}`}>|</span>
                    </h1>

                    <div className={`home__below ${isDone ? 'home__below--visible' : ''}`}>
                        <blockquote className="home__quote">
                            <p>&ldquo;The only way to do great work is to love what you do. Stay hungry, stay foolish.&rdquo;</p>
                        </blockquote>

                        <div className="home__cta-group">
                            <Link to="/about" className="home__cta home__cta--primary" onClick={() => window.scrollTo(0, 0)}>
                                Know More
                                <HiArrowRight />
                            </Link>
                            <Link to="/contact" className="home__cta home__cta--secondary" onClick={() => window.scrollTo(0, 0)}>
                                <FiMail />
                                Get In Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ ABOUT ME SECTION ═══════ */}
            <section className="home-about">
                <div className="home-about__container">
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">
                        About <span>Me</span>
                    </h2>
                    <div className="home-about__grid">
                        <div className="home-about__text">
                            <p>
                                Hi! I&apos;m <strong>Navayugan K</strong>, a passionate full-stack developer
                                who loves crafting functional web experiences. I enjoy
                                turning complex problems into simple, elegant solutions in effective way.
                            </p>
                            <p>
                                With a strong foundation in Java and modern web technologies, I focus on
                                building applications that are not only visually appealing but also
                                performant and accessible. I&apos;m always eager to learn new technologies
                                and push the boundaries of what&apos;s possible.
                            </p>
                            <Link to="/about" className="home-about__link" onClick={() => window.scrollTo(0, 0)}>
                                Read more about me <HiArrowRight />
                            </Link>
                        </div>
                        <div className="home-about__traits">
                            <div className="home-about__trait-card">
                                <span className="home-about__trait-icon"><IoIosRocket /></span>
                                <h4>Problem Solver</h4>
                            </div>
                            <div className="home-about__trait-card">
                                <span className="home-about__trait-icon"><FaCode /></span>
                                <h4>Clean Code</h4>
                            </div>
                            <div className="home-about__trait-card">
                                <span className="home-about__trait-icon"><FaLightbulb /></span>
                                <h4>Innovative Thinker</h4>
                            </div>
                            <div className="home-about__trait-card">
                                <span className="home-about__trait-icon"><FaChartBar /></span>
                                <h4>User-Focused</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════ PROJECTS PREVIEW SECTION ═══════ */}
            <section className="home-projects">
                <div className="home-projects__container">
                    <span className="section-label">My Work</span>
                    <h2 className="section-title">
                        Featured <span>Projects</span>
                    </h2>
                    <p className="section-desc">
                        Here are some of my recent projects that showcase my skills in
                        full-stack development and problem-solving.
                    </p>

                    <div className="home-projects__grid">
                        {projectsPreview.map((project) => (
                            <div className="hp-card" key={project.title}>
                                <div className="hp-card__image">
                                    {project.icon}
                                </div>
                                <div className="hp-card__body">
                                    <h3 className="hp-card__title">{project.title}</h3>
                                    <p className="hp-card__desc">{project.desc}</p>
                                    <div className="hp-card__tags">
                                        {project.tags.map((tag) => (
                                            <span className="hp-card__tag" key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                    <div className="hp-card__links">
                                        <a href={project.github} className="hp-card__link" target="_blank" rel="noopener noreferrer">
                                            <FiGithub /> Code
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="home-projects__more">
                        <Link to="/projects" className="home-projects__more-btn" onClick={() => window.scrollTo(0, 0)}>
                            View More Projects
                            <HiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ═══════ CONTACT SECTION ═══════ */}
            <section className="home-contact">
                <div className="home-contact__container">
                    <span className="section-label">Let&apos;s Connect</span>
                    <h2 className="section-title">
                        Get In <span>Touch</span>
                    </h2>
                    <p className="section-desc">
                        I&apos;m always open to new opportunities, collaborations, or just a
                        friendly chat. Feel free to reach out!
                    </p>

                    <form className="home-contact__form" onSubmit={handleSubmit} noValidate>
                        <div className="home-contact__row">
                            <div className="home-contact__field">
                                <input
                                    className={`home-contact__input ${errors.name ? 'home-contact__input--invalid' : ''}`}
                                    type="text"
                                    id="name"
                                    placeholder="Your Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {errors.name && <span className="home-contact__error">{errors.name}</span>}
                            </div>
                            <div className="home-contact__field">
                                <input
                                    className={`home-contact__input ${errors.email ? 'home-contact__input--invalid' : ''}`}
                                    type="email"
                                    id="email"
                                    placeholder="Your Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <span className="home-contact__error">{errors.email}</span>}
                            </div>
                        </div>
                        <div className="home-contact__field">
                            <input
                                className={`home-contact__input ${errors.subject ? 'home-contact__input--invalid' : ''}`}
                                type="text"
                                id="subject"
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                            {errors.subject && <span className="home-contact__error">{errors.subject}</span>}
                        </div>
                        <div className="home-contact__field">
                            <textarea
                                className={`home-contact__textarea ${errors.message ? 'home-contact__textarea--invalid' : ''}`}
                                id="message"
                                placeholder="Your Message..."
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            {errors.message && <span className="home-contact__error">{errors.message}</span>}
                        </div>
                        <button className="home-contact__submit" type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Message'} <FiSend />
                        </button>
                    </form>

                    {status === 'success' && (
                        <div className="home-contact__status home-contact__status--success">
                            <FiCheck /> Message sent successfully!
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="home-contact__status home-contact__status--error">
                            <FiAlertCircle /> Something went wrong. Please try again.
                        </div>
                    )}

                    <div className="home-contact__socials">
                        <a href="https://github.com/Navayugan" target='_blank' className="home-contact__social" aria-label="GitHub"><FaGithub /></a>
                        <a href="https://www.linkedin.com/in/navayugan-k-81173329a" target='_blank' className="home-contact__social" aria-label="LinkedIn"><FaLinkedinIn /></a>
                        <a href="https://x.com/Navayugan777" target='_blank' className="home-contact__social" aria-label="Twitter"><FaTwitter /></a>
                        <a href="https://www.instagram.com/the_great_fan_of_ravanan" target='_blank' className="home-contact__social" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <Footer />
        </div>
    );
};

export default Home;
