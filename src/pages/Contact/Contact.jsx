import { useState } from 'react';
import { FiMail, FiMapPin, FiPhone, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import '../../animations/PageTransition.css';
import './Contact.css';

const Contact = () => {
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

    return (
        <section className="contact page">
            <div className="contact__header">
                <span className="contact__label">Let&apos;s Talk</span>
                <h1 className="contact__title">
                    Get In <span>Touch</span>
                </h1>
                <p className="contact__description">
                    I&apos;m always open to new opportunities, collaborations, or just a
                    friendly chat. Feel free to reach out!
                </p>
            </div>

            <div className="contact__grid">
                <div className="contact__form-wrapper">
                    <form className="contact__form" onSubmit={handleSubmit} noValidate>
                        <div className="contact__field">
                            <label className="contact__label-text" htmlFor="name">Your Name</label>
                            <input
                                className={`contact__input ${errors.name ? 'contact__input--invalid' : ''}`}
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="contact__error">{errors.name}</span>}
                        </div>
                        <div className="contact__field">
                            <label className="contact__label-text" htmlFor="email">Your Email</label>
                            <input
                                className={`contact__input ${errors.email ? 'contact__input--invalid' : ''}`}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="contact__error">{errors.email}</span>}
                        </div>
                        <div className="contact__field">
                            <label className="contact__label-text" htmlFor="subject">Subject</label>
                            <input
                                className={`contact__input ${errors.subject ? 'contact__input--invalid' : ''}`}
                                type="text"
                                id="subject"
                                placeholder="What's this about?"
                                value={formData.subject}
                                onChange={handleChange}
                            />
                            {errors.subject && <span className="contact__error">{errors.subject}</span>}
                        </div>
                        <div className="contact__field">
                            <label className="contact__label-text" htmlFor="message">Message</label>
                            <textarea
                                className={`contact__textarea ${errors.message ? 'contact__input--invalid' : ''}`}
                                id="message"
                                placeholder="Tell me about your project or idea..."
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                            />
                            {errors.message && <span className="contact__error">{errors.message}</span>}
                        </div>
                        <button
                            className="contact__submit"
                            type="submit"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                            <FiSend />
                        </button>
                    </form>

                    {status === 'success' && (
                        <div className="contact__status contact__status--success">
                            <FiCheck /> Message sent successfully!
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="contact__status contact__status--error">
                            <FiAlertCircle /> Something went wrong. Please try again.
                        </div>
                    )}
                </div>

                <div className="contact__info">
                    <h2 className="contact__info-title">Contact Information</h2>
                    <div className="contact__info-list">
                        <div className="contact__info-item">
                            <span className="contact__info-icon"><FiMail /></span>
                            <div className="contact__info-details">
                                <h4>Email</h4>
                                <a href="mailto:navayugan77@gmail.com"><p>navayugan77@gmail.com</p></a>
                            </div>
                        </div>
                        <div className="contact__info-item">
                            <span className="contact__info-icon"><FiPhone /></span>
                            <div className="contact__info-details">
                                <h4>Phone</h4>
                                <p>+91 9361448010</p>
                            </div>
                        </div>
                        <div className="contact__info-item">
                            <span className="contact__info-icon"><FiMapPin /></span>
                            <div className="contact__info-details">
                                <h4>Location</h4>
                                <p>Erode</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="contact__socials-title">Follow Me</h3>
                    <div className="contact__socials">
                        <a href="https://github.com/Navayugan" target='_blank' className="contact__social-link" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/navayugan-k" target='_blank' className="contact__social-link" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://x.com/Navayugan777" target='_blank' className="contact__social-link" aria-label="Twitter">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.instagram.com/the_great_fan_of_ravanan" target='_blank' className="contact__social-link" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
