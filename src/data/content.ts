export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  metrics: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const siteConfig = {
  name: "Darshil Patel",
  role: "CS × Economics",
  headline: "I make systems think.",
  subtext:
    "CS × Economics — shipping ML, agentic planning, and systems that hold up under pressure.",
  email: "pateldarshil02@gmail.com",
  phone: "(224) 410-8786",
  github: "https://github.com/kittu54",
  linkedin: "https://linkedin.com/in/darshil-patel-587bba21b",
  resumeUrl: "/resume.pdf",
  location: "Lawrence, KS — open to SF & US roles",
  education: {
    school: "University of Kansas",
    location: "Lawrence, KS",
    degree: "B.S. Computer Science & B.S. Economics (Minor: Mathematics)",
    graduation: "Dec 2025",
    gpa: "3.72 / 4.0",
    coursework: [
      "Machine Learning",
      "Distributed Systems",
      "Algorithms",
      "Database Systems",
      "Econometrics",
      "Statistical Inference",
      "Advanced Linear Algebra",
      "Time-Series Analysis",
    ],
  },
};

// ─── Featured Projects ──────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "agentic-ads",
    title: "Agentic Ads Optimizer",
    tagline: "Sequential decision-making meets advertising — LLM-style tool use without the LLM.",
    description:
      "Modeled campaign optimization as a stochastic sequential decision problem with agentic planning patterns. Three policy classes competing across 200 seeded episodes with full evaluation infrastructure.",
    problem:
      "Ad campaign optimization is a sequential decision problem under uncertainty — bids, targeting, and keyword quality interact with stochastic CTR/CVR/CPC dynamics and budget constraints. Most solutions are heuristic or require expensive LLM calls.",
    approach:
      "Built a stochastic environment modeling real ad dynamics. Implemented random baseline, interpretable heuristic, and Monte Carlo lookahead planner with tool abstractions (summary, forecast, recommend, simulate) mirroring agentic planning. Reproducible evaluation harness across 200 seeded episodes.",
    result:
      "Lookahead outperformed heuristic and random: reward 849.99 vs 683.76 vs −27.48; ROAS 1.83 vs 1.68 vs 0.97 while spending less budget. Full CSV metrics export and histogram plots for analysis.",
    stack: ["Python", "NumPy", "Monte Carlo", "Tool Abstractions", "Evaluation Harness"],
    metrics: ["Reward: 849.99", "ROAS: 1.83", "200 seeded episodes"],
    github: "https://github.com/kittu54",
  },
  {
    id: "ballot-scanner",
    title: "Ballot Drop Box Scanner",
    tagline: "End-to-end hardware + web system for ballot envelope tracking.",
    description:
      "Capstone project: full-stack system spanning a Django admin portal, Raspberry Pi scanning software, industrial USB barcode integration, and cloud deployment with operational automation.",
    problem:
      "Election offices needed a reliable, secure system to scan and track ballot envelope metadata from drop boxes — existing solutions lacked hardware integration, operational documentation, and reproducible deployment.",
    approach:
      "Built a Django web portal with token-based device authorization and YAML config layer. Integrated industrial USB barcode scanners on Raspberry Pi using pyusb/libusb with udev rules for vendor/product ID matching. Deployed to Debian EC2 behind Nginx with systemd-managed ASGI/Daphne services.",
    result:
      "Production-deployed system with complete setup/deployment docs for local, EC2, and Raspberry Pi environments. Auto-run on boot, Redis-backed components, security group configs, and migration scripts.",
    stack: ["Python", "Django", "Redis", "Nginx", "AWS EC2", "Raspberry Pi", "pyusb"],
    metrics: ["End-to-end system", "3 deployment targets", "Production deployed"],
    github: "https://github.com/kittu54",
  },
  {
    id: "monte-carlo",
    title: "Monte Carlo Planning System",
    tagline: "10,000+ rollouts per decision in noisy reward environments.",
    description:
      "Stochastic simulation engine for sequential decision-making under uncertainty. Rapid prototyping framework comparing random baseline, heuristic policies, and MCTS with profiling-driven optimization.",
    problem:
      "Evaluating decision policies under uncertainty requires environments that model noisy rewards, delayed feedback, and constraints — plus infrastructure for fast iteration, reproducibility, and statistical validation.",
    approach:
      "Engineered a configurable simulation engine using OOP design. Implemented MCTS evaluating 10,000+ rollouts per decision. Built evaluation harness with seeded reproducibility across randomized runs and statistical validation.",
    result:
      "60% runtime improvement via profiling-driven optimization (NumPy vectorization, caching). Achieved statistically significant policy comparisons across 200+ episodes. 40%+ ROAS improvement over baselines.",
    stack: ["Python", "NumPy", "MCTS", "Statistical Validation"],
    metrics: ["60% faster runtime", "10K+ rollouts/decision", "200+ episodes"],
    github: "https://github.com/kittu54",
  },
  {
    id: "housing-svr",
    title: "Housing Price Forecaster",
    tagline: "SVR pipeline with regime-shift detection through 2008 and COVID.",
    description:
      "Time-series econometric model combining support vector regression with temporal feature engineering, structural break analysis, and rigorous cross-validation for housing price prediction.",
    problem:
      "Housing markets exhibit nonlinear dynamics, regime shifts, and temporal dependencies that simple regression misses. Standard ML approaches ignore economic structure and overfit to noise.",
    approach:
      "Built an SVR pipeline with temporal features: lagged variables, rolling statistics, momentum indicators. Strict time-series train/validation separation. Cross-validation across 60+ hyperparameter configurations. Residual diagnostics, VIF multicollinearity checks, and outlier sensitivity tests.",
    result:
      "Identified structural breaks around 2008 financial crisis and COVID-era using regime change diagnostics. Model diagnostics validated robustness across market conditions with proper out-of-sample evaluation.",
    stack: ["Python", "scikit-learn", "NumPy", "SVR", "Econometrics"],
    metrics: ["60+ hyperparam configs", "Regime shift detection", "Full diagnostics"],
    github: "https://github.com/kittu54",
  },
  {
    id: "cv-robotics",
    title: "Vision & Robotics Pipelines",
    tagline: "Real-time perception to control — from hand landmarks to autonomous navigation.",
    description:
      "Computer vision projects spanning self-driving robot control, hand gesture detection, and landmark extraction pipelines. Deep learning models trained and evaluated with iterative prototyping.",
    problem:
      "Real-time computer vision systems require tight integration between perception and control — latency-sensitive pipelines that must be robust to lighting, occlusion, and noise while running on constrained hardware.",
    approach:
      "Built CV data pipelines using OpenCV and MediaPipe extracting structured signals (pose/hand/face landmarks) from video frames. Prototyped baselines (feature-based and neural) with repeatable training/eval workflows. Integrated perception into robot control logic.",
    result:
      "Multiple working systems: MentorPi self-driving robot with navigation cues, hand gesture detection with classification models, and general-purpose landmark pipelines. Iterated based on confusion matrices and failure case analysis.",
    stack: ["Python", "PyTorch", "TensorFlow", "OpenCV", "MediaPipe"],
    metrics: ["Real-time inference", "Multiple model archs", "Hardware integrated"],
    github: "https://github.com/kittu54",
  },
  {
    id: "llvm-compiler",
    title: "Compiler Analysis: LLVM",
    tagline: "Dataflow passes and lexer generation from first principles.",
    description:
      "Compiler infrastructure work: reaching definitions and liveness analysis via iterative fixed-point algorithms over control-flow graphs in LLVM IR, plus a lexer/scanner generator built on deterministic finite automata.",
    problem:
      "Understanding compiler internals requires implementing core dataflow analyses and frontend tools from specification — not just using frameworks, but building the analysis passes themselves.",
    approach:
      "Implemented reaching definitions and liveness analysis using iterative fixed-point algorithms over CFGs in LLVM IR. Separately built a lexer/scanner generator based on DFA construction for compiler frontend work.",
    result:
      "Working dataflow analysis passes processing LLVM IR control-flow graphs. Functional lexer generator converting regular expression specifications to DFA-based scanners.",
    stack: ["C++", "LLVM IR", "DFA", "Dataflow Analysis"],
    metrics: ["Fixed-point convergence", "DFA-based lexer", "LLVM IR passes"],
    github: "https://github.com/kittu54",
  },
];

// ─── Timeline ───────────────────────────────────────────────────────────────

export const timeline: TimelineEvent[] = [
  {
    year: "2025",
    title: "Graduated — Dual B.S.",
    description:
      "Completed CS & Economics at KU. Built capstone ballot scanning system. Shipped agentic AI and Monte Carlo planning projects.",
  },
  {
    year: "2024",
    title: "ML Engineering & Agentic AI",
    description:
      "Deep dive into agentic planning, computer vision pipelines, and reinforcement learning. Econometrics tutoring.",
  },
  {
    year: "2023",
    title: "Research & Econometrics",
    description:
      "Panel data econometrics, time-series forecasting, RL algorithms from spec. Statistical inference and model evaluation.",
  },
  {
    year: "2022",
    title: "Tutoring & Systems",
    description:
      "Started tutoring economics. LLVM compiler analysis, database systems, deeper into distributed systems coursework.",
  },
  {
    year: "2021",
    title: "Production Engineering at KU IT",
    description:
      "Web developer building production apps, REST APIs, PostgreSQL tuning, CI/CD workflows, and operational visibility.",
  },
];

// ─── Skills ─────────────────────────────────────────────────────────────────

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "C++", "JavaScript/TypeScript", "SQL", "R", "Swift"],
  },
  {
    name: "ML / AI",
    skills: [
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "OpenCV",
      "MediaPipe",
      "Reinforcement Learning",
      "Monte Carlo Methods",
      "Feature Engineering",
    ],
  },
  {
    name: "Systems",
    skills: [
      "Linux/Unix",
      "AWS (EC2)",
      "Nginx",
      "systemd",
      "Git",
      "CI/CD",
      "LLVM",
      "Raspberry Pi",
    ],
  },
  {
    name: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Django",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    name: "Data / Econ",
    skills: [
      "Econometrics",
      "Statistical Inference",
      "Time-Series Analysis",
      "Panel Data",
      "Regression (OLS/FE/RE)",
      "Hypothesis Testing",
      "Cross-Validation",
    ],
  },
  {
    name: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
];

// ─── Blog / Writing ─────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: "agentic-planning-without-llms",
    title: "Agentic Planning Without LLMs",
    date: "2025-09-18",
    readTime: "6 min",
    excerpt:
      "Tool use, lookahead planning, and evaluation harnesses — the agentic pattern works without billion-parameter models.",
    content: `The "agentic AI" discourse assumes you need an LLM to do agentic work. But the pattern — observe, plan, act, evaluate — is older than transformers and works beautifully with classical methods.

## The Pattern

An agent is anything that takes observations, selects actions through some planning process, and evaluates outcomes. The Agentic Ads Optimizer I built uses exactly this loop: the environment produces state (CTR, budget, conversions), the planner evaluates candidate actions via Monte Carlo simulation, and the evaluation harness measures everything.

No GPT-4 calls. No prompt engineering. Just clean abstractions.

## Tool Abstractions

The key insight is that "tools" are just function interfaces with contracts. Whether an LLM calls a function or a Monte Carlo planner calls a simulation, the abstraction is identical: input validation, execution, failure handling, trace logging.

Building this way forced me to think clearly about what each tool *guarantees* — which turns out to be more important than what model calls it.

## Evaluation Is the Product

The lookahead planner outperformed heuristic and random policies across 200 episodes. But the real deliverable wasn't the planner — it was the evaluation harness. Seeded episodes, CSV metric exports, statistical comparisons. Without rigorous evaluation, you can't know if your agent is actually better.

## Takeaway

Start with the evaluation harness. Build the simplest agent that passes. Then iterate. The infrastructure matters more than the intelligence.`,
  },
  {
    slug: "econometrics-meets-ml",
    title: "What ML Engineers Can Learn from Econometrics",
    date: "2025-06-12",
    readTime: "7 min",
    excerpt:
      "Econometrics has been doing causal inference, diagnostics, and robustness checks for decades. ML is catching up.",
    content: `After studying both machine learning and econometrics deeply, the biggest gap I see is this: ML optimizes prediction. Econometrics demands *understanding*.

## The Diagnostics Gap

When I built the housing price SVR model, I ran VIF checks for multicollinearity, residual diagnostics, outlier sensitivity tests, and structural break analysis. These aren't optional in econometrics — they're baseline rigor.

Most ML projects skip all of this. The model achieves a good RMSE and ships. But without diagnostics, you don't know *why* it works or *when* it'll break.

## Regime Shifts

The housing model revealed structural breaks around 2008 and COVID. A model trained on pre-2008 data would fail catastrophically on post-2008 data — not because the features changed, but because the *data-generating process* changed.

Econometrics has frameworks for this: structural break tests, Chow tests, regime-switching models. ML typically handles it with "retrain on recent data" — which works until it doesn't.

## Panel Data Thinking

Working with fixed and random effects on a 65-country panel taught me something fundamental: unobserved heterogeneity is everywhere. The Hausman test isn't just a statistical procedure — it's a way of asking "are my results driven by what I can see, or what I can't?"

ML's version of this is "hidden confounders," but the econometric toolbox for addressing it is far more mature.

## The Synthesis

The best work combines both: ML's flexible function approximation with econometrics' insistence on understanding the data-generating process, testing assumptions, and quantifying uncertainty honestly.`,
  },
  {
    slug: "building-hardware-software-systems",
    title: "Shipping Hardware + Software as a Solo Engineer",
    date: "2025-03-20",
    readTime: "5 min",
    excerpt:
      "Lessons from building the ballot scanner — from udev rules to Django, Raspberry Pi to EC2.",
    content: `The ballot drop box scanner was my capstone project, and it taught me something no pure-software project ever did: hardware makes everything harder in ways you can't anticipate.

## The USB Problem

Integrating industrial barcode scanners on Raspberry Pi sounds straightforward until you're writing udev rules to match vendor/product IDs and debugging pyusb/libusb initialization sequences. The scanner works perfectly on your dev machine, then fails silently on a fresh Pi because a kernel module isn't loaded.

The fix isn't technical — it's operational. Documentation, setup scripts, auto-run on boot, systemd services that restart on failure.

## Config-Driven Everything

The YAML config layer was the best architectural decision. Token-based device auth, server endpoints, scanner parameters — all configurable without touching code. When deploying to a new Pi, you edit one file. Not three services and a database migration.

## Deployment Reality

Getting a Django app behind Nginx on Debian EC2 with ASGI/Daphne, Redis, systemd services, security groups, static file collection, and database migrations — every single step has a failure mode. The deployment docs ended up being longer than the application code.

## The Lesson

Systems that span hardware and software need *operational engineering*, not just software engineering. The code is maybe 40% of the work. The rest is: how does this survive contact with the real world?`,
  },
];

// ─── Principles ─────────────────────────────────────────────────────────────

export const principles = [
  {
    title: "Ownership",
    description: "Ship it, own it, debug it at 2am if needed.",
  },
  {
    title: "Rigor",
    description: "Diagnostics, reproducibility, and honest evaluation over vanity metrics.",
  },
  {
    title: "Speed",
    description: "Bias toward action. Prototype fast, validate faster, iterate.",
  },
  {
    title: "Depth",
    description: "Surface knowledge breaks under pressure. Go to the metal.",
  },
];

// ─── Experience ─────────────────────────────────────────────────────────────

export interface Experience {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    title: "Web Developer",
    company: "University of Kansas Information Technology",
    location: "Lawrence, KS",
    dates: "Jan 2020 – Dec 2022",
    bullets: [
      "Developed and maintained production web applications for campus services with reliability and maintainability focus.",
      "Implemented REST APIs with database-backed workflows; reduced latency via caching and SQL query optimization.",
      "Tuned PostgreSQL (indexes, query rewrites, connection pooling) and profiled bottlenecks to improve responsiveness.",
      "Built operational visibility: structured logs, dashboards, alerts — sped up issue triage across the stack.",
      "Debugged cross-stack production issues (frontend ↔ backend ↔ DB) using systematic reproduction and log analysis.",
      "Supported CI/CD workflows, PR reviews, and maintained runbooks/documentation for reliable deployment.",
    ],
  },
  {
    title: "Economics Tutor",
    company: "University of Kansas Academic Learning Center",
    location: "Lawrence, KS",
    dates: "Aug 2022 – May 2024",
    bullets: [
      "Tutored 20+ students in Microeconomics, Macroeconomics, and Econometrics with quantitative methods focus.",
      "Taught statistical reasoning, optimization, regression inference, and hypothesis testing clearly to diverse audiences.",
    ],
  },
];
