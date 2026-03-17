import { FiMapPin, FiMail, FiCalendar, FiBriefcase, FiMusic } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import { DiReact, DiGit, DiJava } from 'react-icons/di';
import { SiJavascript, SiMysql, SiSpringboot, SiIntellijidea, SiPostman, SiCanva } from 'react-icons/si';
import { IoLogoCss3 } from 'react-icons/io';
import { FaHtml5, FaGithub, FaBootstrap } from 'react-icons/fa';
import { BiLogoVisualStudio, BiLogoNetlify } from "react-icons/bi";
import { IoLogoVercel } from "react-icons/io5";
import heroImg from '../../assets/hero-profile.jpg';
import '../../animations/PageTransition.css';
import './About.css';
import Footer from '../../components/Footer/Footer';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';


const skills = [
    { icon: <DiJava />, name: 'Java', desc: 'Core & advanced concepts' },
    { icon: <SiSpringboot />, name: 'Spring Boot', desc: 'Backend framework' },
    { icon: <SiMysql />, name: 'MySQL', desc: 'Relational databases' },
    { icon: <DiReact />, name: 'React.js', desc: 'Component-based UIs' },
    { icon: <SiJavascript />, name: 'JavaScript', desc: 'ES6+ & modern JS' },
    { icon: <IoLogoCss3 />, name: 'CSS', desc: 'Styling' },
    { icon: <FaHtml5 />, name: 'HTML', desc: 'Structure' },
    { icon: <FaBootstrap />, name: 'Bootstrap', desc: 'Frontend framework' },
    { icon: <DiGit />, name: 'Git', desc: 'Version control' },
    { icon: <FaGithub />, name: 'GitHub', desc: 'Code hosting' },
    { icon: <BiLogoVisualStudio />, name: 'Visual Studio', desc: 'Code editor' },
    { icon: <SiIntellijidea />, name: 'IntelliJ IDEA', desc: 'Code editor' },
    { icon: <SiPostman />, name: 'Postman', desc: 'API testing' },
    { icon: <IoLogoVercel />, name: 'Vercel', desc: 'Deployment' },
    { icon: <BiLogoNetlify />, name: 'Netlify', desc: 'Deployment' },
    { icon: <SiCanva />, name: 'Canva', desc: 'Design' }
];

const education = [
    {
        degree: 'Bachelor of Technology',
        field: 'Information Technology',
        institution: 'Park College of Engineering and Technology',
        year: '2021 – 2025',
        score: '7.28 CGPA',
    },
    {
        degree: 'HSC (XII)',
        field: 'Bio Maths',
        institution: 'Vishwesvaraiyah Matric Higher Secondary School',
        year: '2019 – 2021',
        score: '83.3%',
    },
    {
        degree: 'SSLC (X)',
        field: 'State Board',
        institution: 'Vishwesvaraiyah Matric Higher Secondary School',
        year: '2018 – 2019',
        score: '81.4%',
    },
];

const About = () => {

    return (
        <div className="about page">
            {/* ─── Header ─── */}
            <div className="about__header">
                <span className="about__label">Get to know me</span>
                <h1 className="about__title">
                    About <span>Me</span>
                </h1>
            </div>

            {/* ─── Intro: Bio left + Image right ─── */}
            <section className="about__intro">
                <div className="about__bio">
                    <p className="about__bio-text">
                        Hi! I&apos;m <strong>Navayugan K</strong>, a passionate full-stack developer
                        with a strong foundation in Java and Web Technologies,
                        I focus on building efficient, user-centric software solutions that bridge the gap between complex
                        backend logic and intuitive frontend design.
                    </p>
                    <p className="about__bio-text">
                        My technical journey has led me to explore modern frameworks like <strong>React.js</strong> and
                        <strong> Spring Boot </strong>, as well as database management with <strong>MySQL</strong>.
                        I enjoy the process of turning an idea into a functional application.
                        I&apos;m always eager to learn new technologies.
                    </p>

                    <div className="about__info-list">
                        <div className="about__info-item">
                            <span className="about__info-icon"><FiMapPin /></span>
                            <span>Based in Erode</span>
                        </div>
                        <div className="about__info-item">
                            <span className="about__info-icon"><FiMail /></span>
                            <a href="mailto:navayugan777@gmail.com"><span>navayugan777@gmail.com</span></a>
                        </div>
                        <div className="about__info-item">
                            <span className="about__info-icon"><FiBriefcase /></span>
                            <span>Full Stack Developer – Java</span>
                        </div>
                        <div className="about__info-item">
                            <span className="about__info-icon"><FiCalendar /></span>
                            <span>Available for opportunities</span>
                        </div>
                    </div>
                </div>

                <div className="about__image-wrapper">
                    <div className="about__image-glow" />
                    <img src={heroImg} alt="Navayugan K" className="about__image" />
                </div>
            </section>

            {/* ─── Music Player ─── */}
            <section className="about__music">
                <h2 className="about__section-title">
                    <FiMusic className="about__section-icon" />
                    What I Listen To
                </h2>
                <MusicPlayer />
            </section>
            <hr className="about__education__hr" />

            {/* ─── Education ─── */}
            <section className="about__education">
                <h2 className="about__section-title">
                    <FaGraduationCap className="about__section-icon" />
                    Education
                </h2>
                <div className="about__edu-timeline">
                    {education.map((edu) => (
                        <div className="about__edu-card" key={edu.degree}>
                            <div className="about__edu-dot" />
                            <div className="about__edu-content">
                                <span className="about__edu-year">{edu.year}</span>
                                <div className="about__edu-header">
                                    <h3 className="about__edu-degree">{edu.degree}</h3>
                                    {edu.score && <span className="about__edu-score">{edu.score}</span>}
                                </div>
                                <p className="about__edu-field">{edu.field}</p>
                                <p className="about__edu-institution">{edu.institution}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <hr className="about__education__hr" />

            {/* ─── Skills ─── */}
            <section className="about__skills">
                <h2 className="about__section-title">Tech Stack &amp; Skills</h2>
                <div className="about__skills-grid">
                    {skills.map((skill) => (
                        <div className="about__skill-card" key={skill.name}>
                            <div className="about__skill-icon">{skill.icon}</div>
                            <div className="about__skill-name">{skill.name}</div>
                            <div className="about__skill-desc">{skill.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
