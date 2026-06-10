import type { Project, SkillGroup, TimelineItem } from "./types";

export const resumePath = "/Shri_Harish_Saravanan_Resume.pdf";

export const rotatingPhrases = [
  "backend systems",
  "distributed services",
  "ML infrastructure",
  "data pipelines",
  "systems design",
  "creative engineering experiments",
];

export const timelineItems: TimelineItem[] = [
  {
    kind: "education",
    title: "Texas A&M University",
    subtitle: "Master of Computer Science",
    dates: "Aug 2025 to May 2027",
    place: "College Station, TX",
    meta: "GPA: 3.7/4.0",
    details: [
      "Coursework: Machine Learning, Data Mining and Analysis, Parallel Computing, Advanced Networking, Distributed Systems.",
    ],
  },
  {
    kind: "work",
    title: "Accolite Digital",
    subtitle: "Software Engineer",
    dates: "July 2024 to July 2025",
    place: "Bangalore, India",
    details: [
      "Built backend integrations across 12 Java microservices for high-volume transactional workflows.",
      "Improved system throughput by 25% using asynchronous workflows and better service decoupling.",
      "Built an internal feature flag and configuration service that reduced hotfix turnaround time by 40%.",
      "Built Python ETL pipelines processing 52,000 financial records daily.",
      "Deployed Dockerized FastAPI model-serving endpoints with 184 ms average prediction latency.",
    ],
  },
  {
    kind: "work",
    title: "Accolite Digital",
    subtitle: "Software Engineering Intern / Data Engineering Intern",
    dates: "Jan 2024 to June 2024",
    place: "Bangalore, India",
    details: [
      "Shipped 6 Spring Boot REST API endpoints with authentication, pagination, validation, and error handling.",
      "Wrote JUnit unit and integration tests covering 85% of new service logic.",
      "Containerized 4 backend services using Docker and Jenkins CI/CD.",
      "Built preprocessing pipelines for 118,000 transaction records.",
      "Built a semantic search prototype indexing 1,240 financial documents using LangChain, FAISS, and embeddings.",
    ],
  },
  {
    kind: "education",
    title: "Madras Institute of Technology, Anna University",
    subtitle: "Bachelor of Engineering in Electronics and Communication",
    dates: "Oct 2020 to May 2024",
    place: "Chennai, India",
    meta: "GPA: 3.5/4.0",
    details: [
      "Coursework: Operating Systems, Cloud Computing, Software Engineering, Machine Learning using Python.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Distributed Order Processing Platform",
    description:
      "A backend system that simulates how orders move through inventory, payment, and notification services without everything blocking each other.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "Docker", "AWS"],
    metrics: ["6 Spring Boot services", "18,000 test orders", "4 event-driven workflows", "1,200 failed payments handled"],
    problem: "Order workflows get fragile when every service waits on every other service.",
    built: [
      "Built an event-driven order processing backend using Kafka.",
      "Decoupled inventory reservation, payment simulation, and notification delivery.",
      "Added retry logic, idempotency checks, structured errors, and recovery workflows.",
    ],
    architecture: ["Client", "API Gateway", "Order Service", "Kafka", "Inventory / Payment / Notification", "PostgreSQL / Redis"],
    learned: "How small backend decisions affect reliability when services fail.",
    fun: "this one is basically kafka chaos but polite",
  },
  {
    title: "Distributed File Storage and Metadata Service",
    description: "A backend storage service for uploading, sharing, versioning, and retrieving files securely.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Docker", "AWS S3"],
    metrics: ["5,000 uploaded files", "12 REST endpoints", "41% faster metadata lookup"],
    problem: "Secure file storage is really about permissions, metadata, versions, and retrieval flows.",
    built: [
      "Built secure upload/download workflows using AWS S3.",
      "Designed metadata, versioning, folder, permission, and expiring-link APIs.",
      "Added Redis caching and audit logging.",
    ],
    architecture: ["Client", "File API", "Metadata Service", "PostgreSQL", "Redis", "AWS S3"],
    learned: "File systems are mostly metadata problems wearing a storage costume.",
    fun: "redis saved the latency here",
  },
  {
    title: "Phishing URL Detection",
    description: "A real-time ML service that scores URLs and predicts whether they are phishing attempts.",
    tech: ["Python", "FastAPI", "scikit-learn", "PostgreSQL"],
    metrics: ["64,000 labeled URLs", "94% accuracy", "0.92 F1-score", "under 50 ms inference"],
    problem: "URL classification needs useful features and an API that can answer quickly.",
    built: [
      "Built lexical and infrastructure-based URL features.",
      "Trained gradient boosting and logistic regression models.",
      "Deployed the model behind a FastAPI prediction service.",
    ],
    architecture: ["URL", "Feature extraction", "Model", "FastAPI", "Prediction + confidence"],
    learned: "ML gets much more interesting when you have to ship it as an actual API.",
    fun: "tiny feature decisions did a lot of work",
  },
  {
    title: "Financial Transaction Feature Store and Risk Scoring Pipeline",
    description: "A feature pipeline and inference API for fraud/risk scoring workflows.",
    tech: ["Python", "PyTorch", "PostgreSQL", "FastAPI", "AWS S3", "Redis"],
    metrics: ["250,000 synthetic records", "43% less repeated compute", "137 ms local latency"],
    problem: "Risk models need repeatable features, clean data movement, and observable predictions.",
    built: [
      "Built reusable behavioral transaction features.",
      "Designed batch and real-time feature pipelines.",
      "Deployed FastAPI inference endpoints with prediction logging.",
    ],
    architecture: ["Transactions", "Feature pipeline", "Feature store", "Model API", "Risk score"],
    learned: "Good ML infrastructure is mostly about clean data movement and repeatable features.",
    fun: "less glamorous than models, more useful than most models",
  },
  {
    title: "KV Cache Compression for Long-Context LLM Inference",
    description: "A memory optimization experiment for long-context LLM generation.",
    tech: ["Python", "PyTorch", "Hugging Face Transformers"],
    metrics: ["36% cache memory reduction", "92% similarity retained", "540 prompts evaluated"],
    problem: "Long-context inference gets expensive fast when cache memory grows without restraint.",
    built: [
      "Implemented token importance scoring using attention weights, recency bias, and semantic relevance.",
      "Pruned low-importance tokens during generation.",
      "Measured latency, memory, quality, and retrieval tradeoffs.",
    ],
    architecture: ["Prompt", "Attention", "Importance score", "KV pruning", "Decoding"],
    learned: "LLM performance problems are often systems problems in disguise.",
    fun: "the model remembered enough, which felt suspiciously human",
  },
  {
    title: "Agent Tool-Use Trace Evaluator",
    description: "An observability system for debugging why AI agents fail during multi-step tool use.",
    tech: ["Python", "FastAPI", "PostgreSQL", "LangChain"],
    metrics: ["2,180 tool calls logged", "320 simulated tasks", "6 failure categories"],
    problem: "Agents produce a lot of intermediate weirdness, and logs need to explain it.",
    built: [
      "Logged tool calls, retrieved contexts, intermediate outputs, and final responses.",
      "Tracked tool-call accuracy, retrieval relevance, completion success, latency, and failure type.",
      "Built SQL-backed reporting APIs for agent failure analysis.",
    ],
    architecture: ["Agent run", "Tool calls", "Trace logger", "PostgreSQL", "Failure dashboard"],
    learned: "The hardest part of agents is not making them act. It is understanding why they acted weird.",
    fun: "observability is just debugging with better manners",
  },
  {
    title: "Multithreaded HTTP Server",
    description: "A low-level HTTP server built to understand concurrency and networking from the ground up.",
    tech: ["C++", "Linux", "Sockets", "Thread Pool", "Docker"],
    metrics: ["12,000 concurrent requests", "3.4x throughput improvement"],
    problem: "Frameworks hide the cost of sockets, queues, threads, and blocking work.",
    built: [
      "Built a socket-based HTTP server in C++.",
      "Added a thread pool, connection queue, synchronized task dispatch, and optimized read/write logic.",
    ],
    architecture: ["Socket listener", "Connection queue", "Thread pool", "Static response"],
    learned: "Frameworks feel more magical after you build a tiny piece of one yourself.",
    fun: "humbling, but in a useful way",
  },
  {
    title: "Distributed Key-Value Store",
    description: "A distributed key-value store with partitioning, replication, and failure handling.",
    tech: ["C++", "Python", "TCP Sockets", "Consistent Hashing", "Docker"],
    metrics: ["5 Dockerized nodes", "38% better placement balance", "1,500 failed requests handled"],
    problem: "Data placement, replication, and failures get messy once one machine becomes many.",
    built: [
      "Implemented put, get, delete, replication, and partitioned storage.",
      "Added consistent hashing, retry logic, replica reads, and recovery workflows.",
    ],
    architecture: ["Client", "Router", "Hash ring", "Node replicas", "Recovery"],
    learned: "Distributed systems are humbling because the network is always lying.",
    fun: "i learned that distributed systems enjoy ruining your assumptions",
  },
];

export const skillGroups: SkillGroup[] = [
  { name: "Backend", skills: ["Java", "Spring Boot", "FastAPI", "Node.js", "Express", "Django", "REST APIs", "GraphQL", "Microservices"] },
  { name: "ML and AI Infrastructure", skills: ["Python", "PyTorch", "scikit-learn", "Hugging Face Transformers", "LangChain", "LlamaIndex", "FAISS", "Embeddings", "Model Serving"] },
  { name: "Data", skills: ["SQL", "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Feature Stores"] },
  { name: "Distributed Systems", skills: ["Kafka", "gRPC", "Event-Driven Architecture", "Consistent Hashing", "Fault Tolerance", "Idempotency", "Caching"] },
  { name: "Systems", skills: ["C++", "Linux", "TCP/IP", "Sockets", "Multithreading", "Thread Pools", "Bash"] },
  { name: "Cloud and DevOps", skills: ["AWS EC2", "AWS S3", "AWS Lambda", "Docker", "Kubernetes", "Git", "GitHub Actions", "Jenkins", "CI/CD", "Prometheus", "Grafana"] },
  { name: "ML / AI Systems", skills: ["PyTorch", "scikit-learn", "Hugging Face Transformers", "LangChain"] },
];

export const learningItems = [
  ["long-context llm inference", "reading"],
  ["kv cache compression", "building"],
  ["distributed storage systems", "learning"],
  ["kafka event-driven workflows", "experimenting"],
  ["agent evaluation and tracing", "debugging forever"],
  ["systems programming in c++", "learning"],
  ["creative coding with particles", "building"],
  ["interactive web details", "experimenting"],
  ["local-first apps and crdts", "reading"],
  ["better product/design taste", "learning"],
];
