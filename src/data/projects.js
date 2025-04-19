const projects = [
    {
        id: 1,
        title: "AI Stock Predictor",
        description: "A machine learning model that predicts stock market trends using historical data and sentiment analysis. Built with Python, TensorFlow, and React.",
        image: "/images/projects/stock-predictor.jpg",
        category: "AI/ML",
        technologies: ["Python", "TensorFlow", "React", "Firebase"],
        liveUrl: "https://example.com/stock-predictor",
        githubUrl: "https://github.com/example/stock-predictor",
        featured: true
    },
    {
        id: 2,
        title: "Portfolio Tracker",
        description: "A comprehensive portfolio management tool with real-time market data, performance analytics, and risk assessment features.",
        image: "/images/projects/portfolio-tracker.jpg",
        category: "Finance",
        technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
        liveUrl: "https://example.com/portfolio-tracker",
        githubUrl: "https://github.com/example/portfolio-tracker",
        featured: true
    },
    {
        id: 3,
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets with real-time updates and custom chart configurations.",
        image: "/images/projects/data-dashboard.jpg",
        category: "Data Science",
        technologies: ["D3.js", "React", "Python", "FastAPI"],
        liveUrl: "https://example.com/data-dashboard",
        githubUrl: "https://github.com/example/data-dashboard"
    },
    {
        id: 4,
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with payment processing, inventory management, and analytics.",
        image: "/images/projects/ecommerce.jpg",
        category: "Software Engineering",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
        liveUrl: "https://example.com/ecommerce",
        githubUrl: "https://github.com/example/ecommerce"
    },
    {
        id: 5,
        title: "Natural Language Processing API",
        description: "A RESTful API for text analysis and sentiment detection using advanced NLP techniques.",
        image: "/images/projects/nlp-api.jpg",
        category: "AI/ML",
        technologies: ["Python", "FastAPI", "spaCy", "Docker"],
        liveUrl: "https://example.com/nlp-api",
        githubUrl: "https://github.com/example/nlp-api"
    },
    {
        id: 6,
        title: "Financial Analytics Tool",
        description: "A tool for analyzing financial statements and generating insights using machine learning.",
        image: "/images/projects/financial-analytics.jpg",
        category: "Finance",
        technologies: ["Python", "Pandas", "React", "Plotly"],
        liveUrl: "https://example.com/financial-analytics",
        githubUrl: "https://github.com/example/financial-analytics"
    },
    {
        id: 7,
        title: "Data Pipeline Automation",
        description: "An automated data pipeline for processing and analyzing large datasets with real-time monitoring.",
        image: "/images/projects/data-pipeline.jpg",
        category: "Data Science",
        technologies: ["Python", "Airflow", "AWS", "Docker"],
        liveUrl: "https://example.com/data-pipeline",
        githubUrl: "https://github.com/example/data-pipeline"
    },
    {
        id: 8,
        title: "Cloud Infrastructure Manager",
        description: "A management tool for cloud resources with automated scaling and cost optimization.",
        image: "/images/projects/cloud-manager.jpg",
        category: "Software Engineering",
        technologies: ["React", "Node.js", "AWS", "Terraform"],
        liveUrl: "https://example.com/cloud-manager",
        githubUrl: "https://github.com/example/cloud-manager"
    }
];

export default projects; 