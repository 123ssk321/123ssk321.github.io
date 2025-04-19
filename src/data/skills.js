import {
    SiPython, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy,
    SiJavascript, SiReact, SiNodedotjs, SiDocker, SiGit,
    SiPostgresql, SiMongodb, SiAmazonwebservices, SiLinux
} from 'react-icons/si';
import { BiBrain } from 'react-icons/bi';
import {
    FaUsers, FaLightbulb, FaClock, FaComments,
    FaChartLine, FaPuzzlePiece
} from 'react-icons/fa';

export const skillsData = {
    aiDataScience: [
        {
            name: "Python",
            monoIcon: SiPython,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
        },
        {
            name: "TensorFlow",
            monoIcon: SiTensorflow,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
        },
        {
            name: "scikit-learn",
            monoIcon: SiScikitlearn,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg"
        },
        {
            name: "Pandas",
            monoIcon: SiPandas,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg"
        },
        {
            name: "NumPy",
            monoIcon: SiNumpy,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg"
        }
    ],

    softwareEngineering: [
        {
            name: "JavaScript",
            monoIcon: SiJavascript,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
        },
        {
            name: "React",
            monoIcon: SiReact,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
        },
        {
            name: "Node.js",
            monoIcon: SiNodedotjs,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
        },
        {
            name: "Docker",
            monoIcon: SiDocker,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
        },
        {
            name: "Git",
            monoIcon: SiGit,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
        },
        {
            name: "PostgreSQL",
            monoIcon: SiPostgresql,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
        },
        {
            name: "MongoDB",
            monoIcon: SiMongodb,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
        },
        {
            name: "AWS",
            monoIcon: SiAmazonwebservices,

            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
        },
        {
            name: "Linux",
            monoIcon: SiLinux,
            colorIcon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
        }
    ],

    softSkills: [
        {
            name: "Leadership",
            icon: FaUsers,
            description: "Experience leading cross-functional teams and mentoring junior developers",
            strengths: ["Team motivation", "Strategic planning", "Conflict resolution"]
        },
        {
            name: "Problem Solving",
            icon: FaPuzzlePiece,
            description: "Strong analytical and creative problem-solving abilities",
            strengths: ["Critical thinking", "Innovation", "Decision making"]
        },
        {
            name: "Communication",
            icon: FaComments,
            description: "Excellent verbal and written communication skills",
            strengths: ["Technical writing", "Public speaking", "Active listening"]
        },
        {
            name: "Time Management",
            icon: FaClock,
            description: "Efficient prioritization and organization of tasks",
            strengths: ["Planning", "Delegation", "Meeting deadlines"]
        },
        {
            name: "Adaptability",
            icon: FaLightbulb,
            description: "Quick learner with ability to adapt to new technologies",
            strengths: ["Flexibility", "Learning agility", "Open-mindedness"]
        },
        {
            name: "Business Acumen",
            icon: FaChartLine,
            description: "Understanding of business objectives and market dynamics",
            strengths: ["Strategic thinking", "Market awareness", "ROI focus"]
        }
    ]
};
