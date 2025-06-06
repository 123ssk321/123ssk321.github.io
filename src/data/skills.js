import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiReact,
  SiC,
  SiDocker,
  SiGit,
  SiMongodb,
  SiLinux,
  SiPytorch,
  SiTableau,
  SiApachespark,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiTailwindcss,
  SiSpring,
  SiOpenapiinitiative,
  SiKubernetes,
  SiCplusplus,
  SiKotlin,
  SiNvidia,
} from 'react-icons/si';
import { GrMysql } from 'react-icons/gr';
import { DiRedis } from 'react-icons/di';
import { FaJava } from 'react-icons/fa';
import { VscAzure } from 'react-icons/vsc';
import { DiC } from 'react-icons/di';
import {
  FaUsers,
  FaLightbulb,
  FaClock,
  FaComments,
  FaSyncAlt,
  FaPuzzlePiece,
} from 'react-icons/fa';

export const skillsData = {
  aiDataScience: [
    {
      name: 'Python',
      monoIcon: SiPython,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      url: 'https://www.python.org/',
    },
    {
      name: 'C',
      monoIcon: SiC,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
      url: 'https://en.wikipedia.org/wiki/C_(programming_language)',
    },
    {
      name: 'C++',
      monoIcon: SiCplusplus,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
      url: 'https://en.wikipedia.org/wiki/C%2B%2B',
    },
    {
      name: 'PyTorch',
      monoIcon: SiPytorch,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      url: 'https://pytorch.org/',
    },
    {
      name: 'TensorFlow',
      monoIcon: SiTensorflow,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
      url: 'https://www.tensorflow.org/',
    },
    {
      name: 'scikit-learn',
      monoIcon: SiScikitlearn,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg',
      url: 'https://scikit-learn.org/',
    },
    {
      name: 'Pandas',
      monoIcon: SiPandas,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
      url: 'https://pandas.pydata.org/',
    },
    {
      name: 'NumPy',
      monoIcon: SiNumpy,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg',
      url: 'https://numpy.org/',
    },
    {
      name: 'Tableau',
      monoIcon: SiTableau,
      colorIcon: 'https://img.icons8.com/color/48/tableau-software.png',
      url: 'https://www.tableau.com/',
    },
    {
      name: 'Spark',
      monoIcon: SiApachespark,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg',
      url: 'https://spark.apache.org/',
    },
    {
      name: 'MySQL',
      monoIcon: GrMysql,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      url: 'https://www.mysql.com/',
    },
    {
      name: 'MongoDB',
      monoIcon: SiMongodb,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      url: 'https://www.mongodb.com/',
    },
    {
      name: 'Redis',
      monoIcon: DiRedis,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      url: 'https://redis.io/',
    },
    {
      name: 'NVIDIA CUDA',
      monoIcon: SiNvidia,
      colorIcon:
        'https://img.icons8.com/?size=100&id=yqf95864UzeQ&format=png&color=000000',
      url: 'https://developer.nvidia.com/cuda-zone',
    },
  ],

  softwareEngineering: [
    {
      name: 'Java',
      monoIcon: FaJava,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
      url: 'https://www.java.com/',
    },
    {
      name: 'Kotlin',
      monoIcon: SiKotlin,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
      url: 'https://kotlinlang.org/',
    },
    {
      name: 'JavaScript',
      monoIcon: SiJavascript,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      url: 'https://www.javascript.com/',
    },
    {
      name: 'TypeScript',
      monoIcon: SiTypescript,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      url: 'https://www.typescriptlang.org/',
    },
    {
      name: 'HTML5',
      monoIcon: SiHtml5,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      url: 'https://www.w3.org/html/',
    },
    {
      name: 'CSS3',
      monoIcon: SiCss3,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      url: 'https://www.w3.org/Style/CSS/',
    },
    {
      name: 'Bootstrap',
      monoIcon: SiBootstrap,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
      url: 'https://getbootstrap.com/',
    },
    {
      name: 'Tailwind CSS',
      monoIcon: SiTailwindcss,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
      url: 'https://tailwindcss.com/',
    },
    {
      name: 'React',
      monoIcon: SiReact,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      url: 'https://reactjs.org/',
    },
    {
      name: 'OpenAPI',
      monoIcon: SiOpenapiinitiative,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/openapi/openapi-original.svg',
      url: 'https://www.openapis.org/',
    },
    {
      name: 'Spring Boot',
      monoIcon: SiSpring,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
      url: 'https://spring.io/projects/spring-boot',
    },
    {
      name: 'MySQL',
      monoIcon: GrMysql,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      url: 'https://www.mysql.com/',
    },
    {
      name: 'MongoDB',
      monoIcon: SiMongodb,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      url: 'https://www.mongodb.com/',
    },
    {
      name: 'Redis',
      monoIcon: DiRedis,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      url: 'https://redis.io/',
    },
    {
      name: 'Azure',
      monoIcon: VscAzure,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      url: 'https://azure.microsoft.com/',
    },
    {
      name: 'Docker',
      monoIcon: SiDocker,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      url: 'https://www.docker.com/',
    },
    {
      name: 'Kubernetes',
      monoIcon: SiKubernetes,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg',
      url: 'https://kubernetes.io/',
    },
    {
      name: 'Git',
      monoIcon: SiGit,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      url: 'https://git-scm.com/',
    },
    {
      name: 'Linux',
      monoIcon: SiLinux,
      colorIcon:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
      url: 'https://www.linux.org/',
    },
  ],

  softSkills: [
    {
      name: 'Curiosity',
      icon: FaLightbulb,
      description: 'Passionate about learning and exploring new technologies',
      strengths: ['Continuous learning', 'Research', 'Innovation'],
    },
    {
      name: 'Problem Solving',
      icon: FaPuzzlePiece,
      description: 'Strong analytical and creative problem-solving abilities',
      strengths: ['Critical thinking', 'Innovation', 'Decision making'],
    },
    {
      name: 'Communication',
      icon: FaComments,
      description: 'Excellent verbal and written communication skills',
      strengths: ['Technical writing', 'Public speaking', 'Active listening'],
    },
    {
      name: 'Time Management',
      icon: FaClock,
      description: 'Efficient prioritization and organization of tasks',
      strengths: ['Planning', 'Delegation', 'Meeting deadlines'],
    },
    {
      name: 'Adaptability',
      icon: FaSyncAlt,
      description: 'Quick learner with ability to adapt to new technologies',
      strengths: ['Flexibility', 'Learning agility', 'Open-mindedness'],
    },
    {
      name: 'Teamwork',
      icon: FaUsers,
      description: 'Collaborative team player with strong interpersonal skills',
      strengths: ['Collaboration', 'Conflict resolution', 'Empathy'],
    },
  ],
};
