import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { DiReact, DiNodejsSmall } from 'react-icons/di';
import { SiMongodb, SiJavascript, SiTypescript, SiFirebase } from 'react-icons/si';
import { FaCloud} from 'react-icons/fa';
import { AiOutlinePython } from "react-icons/ai";
import '../../animations/PageTransition.css';
import './Projects.css';

const projects = [
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
        tags: ['HTML','CSS','JavaScript','Python'],
        icon: <AiOutlinePython />,
        github: 'https://github.com/Navayugan/Notes_Sharing_Web_Application_Using_Django_Framework-Navayugan-k-5020-PCET-main',
    },
    {
        title: 'Air Quality Monitoring System',
        desc: 'It is a real-time tracking system which analyzes the air quality using IoT devices.',
        tags: ['Arduino','Embedded C'],
        icon: <AiOutlinePython />,
        github: 'https://github.com/Navayugan/Air-Quality-Monitoring-System',
    },
];

const Projects = () => {
   
    return (
        <section className="projects page">
            <div className="projects__header">
                <span className="projects__label">My Work</span>
                <h1 className="projects__title">
                    Featured <span>Projects</span>
                </h1>
                <p className="projects__description">
                    Here are some of my recent projects that showcase my skills in
                    full-stack development, UI design, and problem-solving.
                </p>
            </div>

            <div className="projects__grid">
                {projects.map((project) => (
                    <div className="project-card" key={project.title}>
                        <div className="project-card__image">
                            {project.icon}
                        </div>
                        <div className="project-card__body">
                            <h3 className="project-card__title">{project.title}</h3>
                            <p className="project-card__desc">{project.desc}</p>
                            <div className="project-card__tags">
                                {project.tags.map((tag) => (
                                    <span className="project-card__tag" key={tag}>{tag}</span>
                                ))}
                            </div>
                            <div className="project-card__links">
                                <a href={project.github} className="project-card__link" target="_blank" rel="noopener noreferrer">
                                    <FiGithub /> Code
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
