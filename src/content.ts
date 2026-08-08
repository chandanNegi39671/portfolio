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
    "I'm a final-year B.Tech CSE student (2027, CGPA 8.3/10) who treats machine learning as an engineering discipline, not a research toy. Across six shipped projects I've fine-tuned detection and segmentation models on tens of thousands of images, built retrieval-augmented and agentic LLM pipelines, and wired in the Docker/JWT/Postgres plumbing that makes a model usable by an actual factory worker, clinician, or HR team — not just a Jupyter cell.",
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
  frameworks: ["TensorFlow", "PyTorch", "scikit-learn", "segmentation-models-pytorch", "SHAP"],
  backend: ["FastAPI", "Flask", "Docker", "Git", "HuggingFace Hub", "ROCm", "Alembic"],
  fullstack: ["React", "Vite", "PostgreSQL", "SQLAlchemy", "JWT Auth", "Twilio API"],
  concepts: [
    "Computer Vision",
    "NLP",
    "Semantic Segmentation",
    "Model Uncertainty",
    "RBAC Systems",
    "Retrieval-Augmented Generation",
    "Agentic Pipelines",
  ],
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
  {
    id: "hr-rag-assistant",
    name: "HR-RAG-Assistant",
    tag: "Retrieval-Augmented HR Policy Q&A",
    problem:
      "HR policy is scattered across long, dense documents — employees either bother a human every time they have a question or give up and guess, and both cost the company time.",
    solution:
      "A retrieval-augmented chat assistant that answers natural-language HR questions by pulling grounded passages from the actual policy documents, wrapped as a LangChain agent tool behind a Streamlit chat UI so answers stay traceable to a source instead of hallucinated.",
    stack: ["LangChain", "FAISS", "Jina Embeddings", "Groq LLM", "Streamlit"],
    architecture: [
      "HR policy docs → loader → chunker → Jina embeddings → persisted FAISS vector index",
      "User query → LangChain agent tool → top-k retrieval over FAISS index",
      "Retrieved chunks + query → Groq-hosted LLM → grounded natural-language answer",
      "Streamlit chat UI with tunable chunk size and top-k for retrieval quality",
    ],
    metrics: [
      { label: "Pipeline", value: "5-stage modular" },
      { label: "Vector store", value: "Persisted FAISS" },
      { label: "Reload", value: "Instant (cached index)" },
    ],
    github: "https://github.com/chandanNegi39671/HR-RAG-Assistant",
    accent: "plasma",
  },
  {
    id: "medvoice-ai",
    name: "MedVoice-AI",
    tag: "Agentic Clinical Documentation Backend",
    problem:
      "Outpatient clinicians lose time to manual note-taking after every visit, and rushed documentation means EMRs end up thin, inconsistent, or missing consent records entirely.",
    solution:
      "An agentic FastAPI backend that turns a recorded visit into a structured EMR — transcribing the audio, running it through a bounded decision layer that checks transcription quality and self-checks the generated EMR, then handling consent logging and PDF export end to end.",
    stack: ["FastAPI", "OpenAI/Sarvam Transcription", "HuggingFace", "Groq API", "PDF Export"],
    architecture: [
      "Visit audio → hosted OpenAI/Sarvam transcription",
      "Transcript → transcription-quality gate agent (Groq) → HuggingFace EMR generation",
      "Generated EMR → self-check agent → triage agent, with fail-safe defaults on judgment calls",
      "Consent logging + visit record → PDF export via FastAPI backend",
    ],
    metrics: [
      { label: "Agent layers", value: "3 (quality, self-check, triage)" },
      { label: "Output", value: "Structured EMR + PDF" },
      { label: "Failure handling", value: "Fail-safe defaults" },
    ],
    github: "https://github.com/chandanNegi39671/MedVoice-AI",
    accent: "ember",
  },
  {
    id: "falcon-offroad-segmentation",
    name: "Falcon Offroad Segmentation",
    tag: "Semantic Segmentation on Desert Digital-Twin Data",
    problem:
      "Offroad autonomy models trained on urban driving datasets fall apart on desert terrain — no lane lines, no clean road edges, just sand, scrub, and rock that blend into each other.",
    solution:
      "A DeepLabV3+ segmentation model (mit_b2 backbone) fine-tuned on Duality AI's synthetic desert digital-twin dataset to separate drivable terrain from obstacles, built and tuned during HackWithMumbai 2.0.",
    stack: ["DeepLabV3+", "mit_b2 (SegFormer backbone)", "segmentation-models-pytorch", "PyTorch"],
    architecture: [
      "Duality AI desert digital-twin imagery → preprocessing & class remapping",
      "mit_b2 encoder → DeepLabV3+ decoder → per-pixel terrain class segmentation",
      "Validation loop tracking mIoU across terrain / obstacle / sky classes",
    ],
    metrics: [
      { label: "mIoU", value: "72%" },
      { label: "Backbone", value: "mit_b2" },
      { label: "Event", value: "HackWithMumbai 2.0" },
    ],
    github: "https://github.com/chandanNegi39671",
    accent: "signal",
  },
  {
    id: "habs",
    name: "HABS",
    tag: "Healthcare Appointment Booking System",
    problem:
      "Clinics lose money and time slots to no-shows, but most booking systems treat every appointment as equally likely to happen — so no one intervenes on the ones that won't.",
    solution:
      "A full-stack appointment booking system that predicts no-show risk per booking with a Random Forest model and surfaces SHAP explanations, so staff know not just who's likely to skip but why.",
    stack: ["FastAPI", "React", "Random Forest", "SHAP"],
    architecture: [
      "Booking form (React) → FastAPI backend → appointment record created",
      "Patient/booking features → Random Forest no-show classifier",
      "Prediction → SHAP explainability layer → risk + reasons surfaced to staff dashboard",
    ],
    metrics: [
      { label: "Model", value: "Random Forest" },
      { label: "Explainability", value: "SHAP" },
      { label: "Stack", value: "FastAPI + React" },
    ],
    github: "https://github.com/chandanNegi39671",
    accent: "plasma",
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

export type Certification = {
  name: string;
  issuer: string;
  year: string;
  url?: string;
};

export const certifications: Certification[] = [
  {
    name: "Machine Learning with Python — Level 1",
    issuer: "IBM (via Credly)",
    year: "Dec 2025",
    url: "https://www.credly.com/badges/e1159402-62d1-463b-9d66-9c544e79d38e/linked_in_profile",
  },
  {
    name: "Machine Learning with Python (ML0101EN)",
    issuer: "IBM · Cognitive Class",
    year: "Dec 2025",
    url: "https://courses.cognitiveclass.ai/certificates/9183537c0e634952bff2200a2015665b",
  },
  {
    name: "FREE OpenCV Bootcamp",
    issuer: "OpenCV University",
    year: "Jun 2025",
    url: "https://courses.opencv.org/certificates/fdda972b10b348c681ea09ee4bcf4cd2",
  },
  {
    name: "Learn Python Libraries: NumPy, Matplotlib & Pandas",
    issuer: "upGrad",
    year: "Dec 2025",
  },
  {
    name: "Basic Python Programming",
    issuer: "upGrad",
    year: "Nov 2025",
  },
];

export const learningLog = {
  title: "Google Machine Learning Crash Course",
  url: "https://developers.google.com/machine-learning/crash-course",
  modules: [
    "Linear Regression",
    "Logistic Regression",
    "Classification",
    "Numerical Data",
    "Categorical Data",
    "Datasets & Generalization",
    "Neural Networks",
    "Embeddings",
    "Large Language Models",
    "Production ML Systems",
  ],
};

export const quote = {
  text: "A model that can't explain why it's wrong isn't finished — it's just undeployed.",
  signature: "Chandan",
};

export type ResearchPost = {
  title: string;
  excerpt: string;
  readTime: string;
  body: string[];
};

export const research: ResearchPost[] = [
  {
    title: "Why uncertainty quantification belongs in every production CV model",
    excerpt:
      "Notes from adding MC Dropout to NikaAI — what changed when the model started saying 'I'm not sure' instead of guessing with false confidence.",
    readTime: "4 min read",
    body: [
      "NikaAI's first working version did exactly what a defect-detection model is supposed to do: it drew a box around a scratch or a crack and moved on. The problem showed up a week later, when it drew a box with just as much confidence around a shadow, a reflection, and a smudge on the camera lens. A supervisor pulling up the app had no way to tell which detections were worth trusting and which weren't — the UI presented all of them with the same visual certainty.",
      "The fix wasn't a better model. It was admitting the model didn't always know. I added Monte Carlo Dropout — keeping dropout layers active at inference time and running each image through the network multiple times instead of once. The spread across those runs becomes a proxy for confidence: tight agreement means the model is sure, wide disagreement means it's guessing.",
      "In practice this meant every detection now carries two numbers instead of one: the class probability, and a variance score from the MC Dropout passes. Below a variance threshold, NikaAI flags the detection for human review instead of auto-logging it as a confirmed defect. That single change moved the system from 'trust everything the model says' to 'trust the model, verify the edge cases' — which is the actual bar for something a factory floor will rely on.",
      "The engineering cost was small — a few extra forward passes per image, batched to stay within latency budgets — but the trust it bought was disproportionate. A model that can say 'I don't know' is a model a supervisor will actually keep turned on.",
    ],
  },
  {
    title: "Fine-tuning YOLOv8 on messy industrial datasets",
    excerpt:
      "The unglamorous part of Factory Defect Guard: writing a VOC-to-YOLO converter and cleaning 29K images before training even starts.",
    readTime: "5 min read",
    body: [
      "Nobody talks about the annotation format problem until they hit it. Factory Defect Guard combines steel surface, PCB, and MVTec-style industrial imagery — three public sources, three different annotation conventions, and only one of them (loosely) in YOLO's expected format. The other two were in Pascal VOC XML: absolute pixel coordinates, per-image XML files, class names that didn't match across datasets, and a nontrivial number of bounding boxes that were simply wrong — flipped, off by a few pixels in ways that mattered at defect scale, or annotated against an image that had since been resized.",
      "The unglamorous fix was writing a proper VOC-to-YOLO converter rather than trusting an off-the-shelf script: parsing each XML file, normalizing coordinates against the actual image dimensions (not the ones recorded in the XML, which had drifted for a subset of files), remapping class labels into one consistent taxonomy across all three sources, and rejecting boxes with degenerate width or height before they could quietly poison training.",
      "Once the ~29,354 images were in a consistent YOLO label format, training YOLOv8s was the easy part. The harder ongoing decision was where to draw the confidence threshold for deployment — the model reaches 78.8% precision and 72.2% recall at the operating point I settled on, and moving that threshold trades false positives (defects flagged that aren't real) against false negatives (real defects missed). For a factory context, the honest answer is that recall matters more than precision — a missed defect costs more than a false alarm a human can dismiss in two seconds.",
      "The model and inference interface are published on HuggingFace for anyone who wants to try it against their own industrial images — partly because open industrial CV tooling is still thinner than it should be, and partly because the annotation-cleaning code is, unglamorously, the part most worth reusing.",
    ],
  },
];
