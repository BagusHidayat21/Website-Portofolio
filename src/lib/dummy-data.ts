import { ProjectWithRepo } from '@/types';

export const dummyProjects: ProjectWithRepo[] = [
    {
        id: "1",
        title: "Fintech Dashboard Pro",
        description: "A high-performance financial analytics platform handling millions of data points in real-time. Features complex D3.js visualizations and Web Worker offloading.",
        techStack: ["Next.js", "TypeScript", "D3.js", "Supabase"],
        tags: ["Web", "Finance", "Enterprise"],
        images: [
            "https://picsum.photos/seed/fintech1/1600/900",
            "https://picsum.photos/seed/fintech2/1600/900",
            "https://picsum.photos/seed/fintech3/1600/900"
        ],
        stars: 128,
        language: "TypeScript",
        url: "https://github.com",
        liveUrl: "https://example.com",
        role: "Lead Frontend Engineer",
        timeline: "3 Months",
        year: "2024",
        challenge: "The client needed to visualize millions of data points in real-time without compromising performance. The existing solution was sluggish and difficult to navigate.",
        solution: "We rebuilt the core engine using Web Workers for data processing and D3.js for efficient rendering. The UI was completely reimagined with a focus on data density and clarity."
    },
    {
        id: "2",
        title: "Customer Insight Engine",
        description: "ML-powered analytics platform for e-commerce. Uses predictive modeling to identify customer churn risks and purchasing patterns.",
        techStack: ["Python", "Scikit-Learn", "FastAPI", "React"],
        tags: ["Machine Learning", "Data Science", "Analytics"],
        images: [
            "https://picsum.photos/seed/ml1/1600/900",
            "https://picsum.photos/seed/ml2/1600/900",
            "https://picsum.photos/seed/ml3/1600/900"
        ],
        stars: 845,
        language: "Python",
        url: "https://github.com",
        liveUrl: "https://example.com",
        role: "Full Stack Developer",
        timeline: "6 Months",
        year: "2023",
        challenge: "Processing large datasets in real-time to provide actionable insights for store owners.",
        solution: "Implemented a distributed processing pipeline using Celery and Redis to handle data ingestion and model inference asynchronously."
    },
    {
        id: "3",
        title: "E-Commerce Monolith",
        description: "A headless e-commerce solution built for scale. Handles 10k+ concurrent users with Redis caching and extensive microservices architecture.",
        techStack: ["Node.js", "GraphQL", "Redis", "Docker"],
        tags: ["Backend", "E-Commerce", "Infrastructure"],
        images: [
            "https://picsum.photos/seed/ecom1/1600/900",
            "https://picsum.photos/seed/ecom2/1600/900"
        ],
        stars: 320,
        language: "TypeScript",
        url: "https://github.com",
        liveUrl: "https://example.com",
        role: "Backend Architect",
        timeline: "1 Year",
        year: "2022",
        challenge: "Migrating from a legacy monolithic architecture to high-performance microservices without downtime.",
        solution: "Adopted a strangler pattern for migration, gradually replacing services. Implemented GraphQL federation to unify the data layer."
    },
    {
        id: "4",
        title: "HealthTrack Mobile",
        description: "Cross-platform mobile app for patient monitoring. Connects to IoT wearables via Bluetooth Low Energy (BLE) to track vitals in real-time.",
        techStack: ["Flutter", "Dart", "Firebase", "Bluetooth"],
        tags: ["Mobile", "Health", "IoT"],
        images: [
            "https://picsum.photos/seed/health1/1600/900",
            "https://picsum.photos/seed/health2/1600/900"
        ],
        stars: 156,
        language: "Dart",
        url: "https://github.com",
        liveUrl: "https://example.com",
        role: "Mobile Developer",
        timeline: "4 Months",
        year: "2023",
        challenge: "Ensuring reliable BLE connectivity across a wide range of Android and iOS devices.",
        solution: "Built a custom connection manager with automatic retry logic and optimized data packet size for stability."
    },
    {
        id: "5",
        title: "DevOps Pipeline Tool",
        description: "Automated CI/CD visualizer and manager. Orchestrate Kubernetes clusters and Docker containers from a beautiful web interface.",
        techStack: ["Go", "Vue.js", "Kubernetes", "AWS"],
        tags: ["DevOps", "Tooling", "Cloud"],
        images: [
            "https://picsum.photos/seed/devops1/1600/900"
        ],
        stars: 2100,
        language: "Go",
        url: "https://github.com",
        liveUrl: "https://example.com",
        role: "DevOps Engineer",
        timeline: "8 Months",
        year: "2023",
        challenge: "Simplifying complex Kubernetes configurations for non-expert developers.",
        solution: "Created an abstraction layer that generates valid K8s manifests from a simple UI form, reducing configuration errors by 90%."
    },
    {
        id: "6",
        title: "Social Graph Engine",
        description: "A highly optimized graph database engine for social networks. Capable of traversing billion-node relationships in milliseconds.",
        techStack: ["Rust", "WASM", "Neo4j"],
        tags: ["Backend", "Performance", "Database"],
        images: [
            "https://picsum.photos/seed/graph1/1600/900"
        ],
        stars: 4300,
        language: "Rust",
        url: "https://github.com",
        liveUrl: "https://example.com",
        role: "Systems Engineer",
        timeline: "1.5 Years",
        year: "2022",
        challenge: " achieving sub-millisecond query times for friend-of-friend recommendations on massive datasets.",
        solution: "Wrote a custom graph traversal algorithm in Rust and compiled it to WebAssembly for edge deployment."
    }
];
