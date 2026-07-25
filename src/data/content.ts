export const profile = {
  name: "Chandan Singh",
  role: "AI/ML Engineer",
  tagline: "I build computer vision, NLP, and full-stack systems that ship — not just notebooks that demo.",
  location: "Noida, Uttar Pradesh, India",
  email: "chandanramola3967@gmail.com",
  phone: "+91 9311818988",
  linkedin: "https://www.linkedin.com/in/chandan-singh-3967ramola",
  github: "https://github.com/chandanNegi39671",
  huggingface: "https://huggingface.co/negi3961",
  resumeFile: "/Chandan_Singh_Resume_AI_ML.pdf",
};

export const about = {
  summary:
    "I'm a final-year B.Tech CSE student (2027) who treats machine learning as an engineering discipline, not a research toy. My work spans fine-tuning detection models on tens of thousands of industrial images, wiring LLMs into root-cause reasoning pipelines, and shipping the Docker/JWT/Postgres plumbing that makes a model usable by an actual factory worker or supervisor — not just a Jupyter cell.",
  points: [
    {
      label: "Production over prototypes",
      detail:
        "Every project here is containerized, has an API, and handles real edge cases — auth, rate limiting, input sanitization — not just a training script.",
    },
    {
      label: "Vision-first, LLM-augmented",
      detail:
        "I fine-tune YOLOv8 for the perception layer, then hand structured detections to an LLM for reasoning — root cause, severity, next action.",
    },
    {
      label: "Uncertainty aware",
      detail:
        "MC Dropout and confidence thresholds show up across my projects because a model that doesn't know when it's wrong isn't ready for a production floor.",
    },
  ],
};

export const skills = {
  languages: ["Python", "JavaScript", "SQL"],
  frameworks: ["TensorFlow", "PyTorch"],
  backend: ["FastAPI", "Flask", "Docker", "Git", "HuggingFace Hub", "ROCm"],
  fullstack: ["React", "Vite", "PostgreSQL", "SQLAlchemy", "JWT Auth", "Twilio API"],
  concepts: ["Computer Vision", "NLP", "Model Uncertainty", "RBAC Systems"],
};

export type Project = {
  id: string;
  name: string;
  tag: string;
  problem: string;
  solution: string;
  stack: string[];
  architecture: string[];
  metrics: { label: string; value: string }[];
  github: string;
  demo?: string;
  accent: "signal" | "plasma" | "ember";
};

export const projects: Project[] = [
  {
    id: "nikaai",
    name: "NikaAI",
    tag: "AI Quality Copilot for MSME Manufacturing",
    problem:
      "Small manufacturers can't afford dedicated QA teams, so defective steel and PCB units slip through, and when they don't, no one can say why the defect happened or what to do next.",
    solution:
      "An end-to-end defect inspection copilot: YOLOv8s spots the defect, and Gemma 4 reasons over the detection to explain root cause, severity, and a corrective action — wrapped in a role-based app a factory can actually roll out.",
    stack: ["YOLOv8s", "Gemma 4 LLM", "Docker Compose", "AMD ROCm", "JWT", "RBAC"],
    architecture: [
      "Camera feed / uploaded image → YOLOv8s inference (17 defect classes, 83% mAP)",
      "Detections → MC Dropout pass for uncertainty score",
      "Detection + confidence → Gemma 4 for root-cause analysis & corrective action",
      "Admin / Supervisor / Worker roles gated via JWT-based RBAC",
      "Entire stack containerized with Docker Compose, deployed on AMD Developer Cloud (ROCm GPU)",
    ],
    metrics: [
      { label: "mAP", value: "83%" },
      { label: "Defect classes", value: "17" },
      { label: "Deployment", value: "AMD ROCm Cloud" },
    ],
    github: "https://github.com/chandanNegi39671/NikaAI",
    accent: "signal",
  },
  {
    id: "trinetra",
    name: "TRINETRA",
    tag: "AI Scam Intelligence Engine",
    problem:
      "Scam links and messages move fast across SMS and WhatsApp, and by the time a takedown happens, the damage is done — victims need a verdict in seconds, not a report next week.",
    solution:
      "A real-time fraud detection platform that scores URLs, SMS text, and WhatsApp screenshots against an ensemble of XGBoost and rule-based signals, then pushes an instant threat verdict straight to WhatsApp via a Twilio bot.",
    stack: ["XGBoost", "Google Safe Browsing API", "Twilio API", "Rule Engine", "Rate Limiting"],
    architecture: [
      "Input (URL / SMS text / screenshot) → feature extraction (domain entropy, IP geolocation, safe-browsing lookup)",
      "Features → XGBoost + rule-based ensemble → unified 0–100 threat score",
      "High-risk verdicts → Twilio WhatsApp bot sends instant alert",
      "API layer hardened with rate limiting + input sanitization middleware",
    ],
    metrics: [
      { label: "Detection accuracy", value: "95%+" },
      { label: "Threat scoring", value: "0–100 scale" },
      { label: "Alert channel", value: "WhatsApp (Twilio)" },
    ],
    github: "https://github.com/chandanNegi39671/TRINETRA",
    accent: "ember",
  },
  {
    id: "factory-defect-guard",
    name: "Factory Defect Guard",
    tag: "Open Industrial Defect Detection",
    problem:
      "Most public defect-detection demos are trained on toy datasets — they fall apart on real steel surfaces, PCB boards, and MVTec-style industrial imagery with genuinely messy annotations.",
    solution:
      "A YOLOv8s model fine-tuned on nearly 30,000 real industrial images across steel, PCB, and MVTec components, with a custom-built VOC-to-YOLO converter to make the messy source annotations usable — then hosted openly for anyone to try.",
    stack: ["YOLOv8s", "HuggingFace Hub", "Custom Annotation Pipeline"],
    architecture: [
      "Raw VOC-format annotations → custom VOC-to-YOLO converter",
      "Multi-stage training pipeline across Steel / PCB / MVTec image sets (29,354 images, 17 classes)",
      "Fine-tuned YOLOv8s weights + inference interface published to HuggingFace Hub",
    ],
    metrics: [
      { label: "Training images", value: "29,354" },
      { label: "Precision", value: "78.8%" },
      { label: "Recall", value: "72.2%" },
    ],
    github: "https://huggingface.co/negi3961/factory-defect-guard",
    demo: "https://huggingface.co/negi3961/factory-defect-guard",
    accent: "plasma",
  },
  {
    id: "signspeak",
    name: "SIGNSPEAK",
    tag: "Real-Time Sign Language Recognition",
    problem:
      "Real-time ASL recognition tools are often either too slow for live conversation or too unreliable — flashing incorrect captions that erode trust in the system.",
    solution:
      "A word-level ASL recognizer that tracks hand and body landmarks with MediaPipe, feeds 30-frame sequences into a stacked LSTM, and only surfaces a caption once it clears a 70% confidence threshold — trading a little latency for captions people can trust.",
    stack: ["LSTM", "MediaPipe", "React", "Vite", "Flask API"],
    architecture: [
      "Webcam feed → MediaPipe landmark extraction (hands, pose)",
      "30-frame landmark sequences → stacked LSTM classifier",
      "Predictions above 70% confidence → live caption pushed to React/Vite frontend via Flask API",
      "Vocabulary extension pipeline for adding new signs over time",
    ],
    metrics: [
      { label: "Sequence window", value: "30 frames" },
      { label: "Confidence gate", value: "70%" },
      { label: "Stack", value: "React + Flask" },
    ],
    github: "https://github.com/chandanNegi39671/SIGNSPEAK",
    accent: "signal",
  },
];

export const experience = [
  {
    title: "AMD AI Hackathon — Participant",
    period: "2026",
    detail:
      "Built NikaAI, an end-to-end defect inspection copilot, targeting a $20,000+ prize pool. Deployed the full stack on AMD Developer Cloud with ROCm GPU acceleration inside a hackathon timebox.",
  },
  {
    title: "National Hackathon Circuit",
    period: "2025 – 2026",
    detail:
      "Competed across national hackathons building production-grade AI systems under time pressure — from fraud-detection ensembles to real-time sign-language recognition.",
  },
  {
    title: "Independent Research & Open-Source",
    period: "Ongoing",
    detail:
      "Fine-tunes and publishes computer vision models on HuggingFace Hub for open industrial use, including a 29K-image industrial defect detector.",
  },
];

export const certifications = [
  { name: "Deep Learning Specialization", issuer: "In progress / self-directed", year: "2026" },
  { name: "TensorFlow & PyTorch Applied Projects", issuer: "Self-directed coursework", year: "2025–26" },
  { name: "AMD ROCm GPU Development", issuer: "AMD AI Hackathon track", year: "2026" },
];

export const quote = {
  text: "A model that can't explain why it's wrong isn't finished — it's just undeployed.",
  signature: "Chandan",
};

export const research = [
  {
    title: "Why uncertainty quantification belongs in every production CV model",
    excerpt:
      "Notes from adding MC Dropout to NikaAI — what changed when the model started saying 'I'm not sure' instead of guessing with false confidence.",
  },
  {
    title: "Fine-tuning YOLOv8 on messy industrial datasets",
    excerpt:
      "The unglamorous part of Factory Defect Guard: writing a VOC-to-YOLO converter and cleaning 29K images before training even starts.",
  },
];
