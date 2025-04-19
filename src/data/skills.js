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
            icon: SiPython,
            level: 90,
            description: "Advanced Python programming with focus on data science and ML",
        },
        {
            name: "TensorFlow",
            icon: SiTensorflow,
            level: 85,
            description: "Deep learning model development and deployment",
        },
        {
            name: "scikit-learn",
            icon: SiScikitlearn,
            level: 88,
            description: "Machine learning modeling and analysis",
        },
        {
            name: "Pandas",
            icon: SiPandas,
            level: 92,
            description: "Data manipulation and analysis",
        },
        {
            name: "NumPy",
            icon: SiNumpy,
            level: 90,
            description: "Numerical computing and array operations",
        }
    ],

    softwareEngineering: [
        {
            name: "JavaScript",
            icon: SiJavascript,
            level: 88,
            description: "Modern JavaScript development (ES6+)",
        },
        {
            name: "React",
            icon: SiReact,
            level: 85,
            description: "Frontend development with React ecosystem",
        },
        {
            name: "Node.js",
            icon: SiNodedotjs,
            level: 82,
            description: "Backend development and API design",
        },
        {
            name: "Docker",
            icon: SiDocker,
            level: 80,
            description: "Containerization and deployment",
        },
        {
            name: "Git",
            icon: SiGit,
            level: 88,
            description: "Version control and collaboration",
        },
        {
            name: "PostgreSQL",
            icon: SiPostgresql,
            level: 85,
            description: "Relational database design and optimization",
        },
        {
            name: "MongoDB",
            icon: SiMongodb,
            level: 83,
            description: "NoSQL database development",
        },
        {
            name: "AWS",
            icon: SiAmazonwebservices,
            level: 78,
            description: "Cloud infrastructure and services",
        },
        {
            name: "Linux",
            icon: SiLinux,
            level: 85,
            description: "System administration and shell scripting",
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
