import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";

const interviewData = {
    matchScore: 88,
    technicalQuestions: [
        {
            question: "Explain the Node.js event loop and how it handles asynchronous I/O operations.",
            intention: "To assess the candidate's deep understanding of Node.js internal architecture and non-blocking I/O.",
            answer: "The candidate should explain the different phases of the event loop (timers, pending callbacks, idle/prepare, poll, check, close). They should mention how Libuv handles the thread pool and how the callback queue works with the call stack to ensure performance without blocking the main thread."
        },
        {
            question: "How do you optimize a MongoDB aggregation pipeline for high-volume data?",
            intention: "To test practical experience with database performance and the candidate's claim of reducing response times by 35%.",
            answer: "Focus on using $match as early as possible to reduce the dataset, ensuring fields used in $match and $sort are indexed, and avoiding $unwind if possible as it inflates the document count. Mention the use of explain('executionStats') to analyze query plans."
        }
    ],
    behavioralQuestions: [
        {
            question: "Describe a time when you led a cross-functional team through a complex release.",
            intention: "To measure communication, ownership, and stakeholder alignment under pressure.",
            answer: "I coordinated weekly syncs, documented the deployment plan, and flagged risks early so the team could address issues before launch. We delivered on schedule with no critical incidents."
        },
        {
            question: "How do you handle conflicting priorities from multiple stakeholders?",
            intention: "To understand prioritization and decision-making in a fast-paced environment.",
            answer: "I gather impact, urgency, and dependencies, then align stakeholders around the highest-value outcome. I keep communication transparent and document tradeoffs."
        }
    ],
    roadmap: [
        {
            title: "Node.js Internals & Streams",
            description: "Deep dive into the Event Loop phases and process.nextTick vs setImmediate.",
            note: "Practice implementing Node.js Streams for handling large data sets."
        },
        {
            title: "Advanced MongoDB & Indexing",
            description: "Study Compound Indexes, TTL Indexes, and Text Indexes.",
            note: "Practice writing complex aggregation pipelines and analyze execution stats."
        },
        {
            title: "Caching & Redis Strategies",
            description: "Read about Redis data types beyond strings (Sets, Hashes, Sorted Sets).",
            note: "Implement a Redis-based rate limiter or caching layer for a sample API."
        },
        {
            title: "System Design & Microservices",
            description: "Study microservices communication patterns and API gateway design.",
            note: "Learn about circuit breakers and fault tolerance."
        }
    ],
    preparationPlan: [
        {
            day: 1,
            focus: "Node.js Internals & Streams",
            tasks: [
                "Review event loop phases",
                "Compare process.nextTick and setImmediate",
                "Build a small stream-based file processor"
            ]
        },
        {
            day: 2,
            focus: "Advanced MongoDB & Indexing",
            tasks: [
                "Learn compound and text indexes",
                "Write aggregation queries",
                "Use explain() to evaluate performance"
            ]
        },
        {
            day: 3,
            focus: "Caching & Redis Strategies",
            tasks: [
                "Explore Redis data types",
                "Implement a cache invalidation strategy",
                "Build a rate limiter using Redis"
            ]
        },
        {
            day: 4,
            focus: "System Design & Microservices",
            tasks: [
                "Study service boundaries and APIs",
                "Review circuit breaker patterns",
                "Sketch a basic microservice flow"
            ]
        },
        {
            day: 5,
            focus: "Testing & Debugging",
            tasks: [
                "Write unit tests for service endpoints",
                "Debug performance bottlenecks",
                "Review error handling best practices"
            ]
        },
        {
            day: 6,
            focus: "Interview Practice",
            tasks: [
                "Mock technical questions",
                "Practice behavioral story structure",
                "Validate explanations out loud"
            ]
        },
        {
            day: 7,
            focus: "Final Review",
            tasks: [
                "Review notes from days 1-6",
                "Polish your resume and examples",
                "Prepare questions for the interviewer"
            ]
        }
    ],
    skillGaps: ["Message Queues (Kafka/RabbitMQ)", "Advanced Docker & CI/CD Pipelines", "Distributed Systems Design", "Production-level Redis management"]
};

const sections = [
    { id: "technical", label: "Technical Questions" },
    { id: "behavioral", label: "Behavioral Questions" },
    { id: "roadmap", label: "Road Map" }
];

const Interview = () => {
    const [activeSection, setActiveSection] = useState("technical");
    const { report, getReportById ,getResumePdf, loading } = useInterview();
    const { interviewId } = useParams();

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    const displayData = report && Object.keys(report).length ? report : interviewData;

    const roadmapPlan = useMemo(() => {
        const basePlan = displayData.preparationPlan || interviewData.preparationPlan || [];
        if (basePlan.length >= 7) return basePlan;

        const paddedPlan = [...basePlan];
        for (let i = basePlan.length; i < 7; i += 1) {
            paddedPlan.push({
                day: i + 1,
                focus: `Continue preparing with a focused activity for day ${i + 1}`,
                tasks: [
                    "Review the core concepts from prior days",
                    "Practice one mock question in the same domain",
                    "Refine your summary and interview examples"
                ]
            });
        }
        return paddedPlan;
    }, [displayData]);

    const activeContent = useMemo(() => {
        if (activeSection === "behavioral") return displayData.behavioralQuestions || [];
        if (activeSection === "roadmap") return roadmapPlan;
        return displayData.technicalQuestions || [];
    }, [activeSection, displayData, roadmapPlan]);

    return (
        <main className="interview-page">
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                        <p>Downloading your resume...</p>
                    </div>
                </div>
            )}
            <div className="interview-shell">
                <aside className="interview-sidepanel">
                    <div className="sidepanel-header">Sections</div>
                    <nav className="sidepanel-nav">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className={activeSection === section.id ? "nav-item active" : "nav-item"}
                                onClick={() => setActiveSection(section.id)}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                    <button 
                    onClick={()=>{getResumePdf({interviewReportId:interviewId})}}
                    className='button primary-button'>
                        <svg height={"1.0rem"}  xmlns="https://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="button-icon">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14h-2v-4H7v-2h4V8h2v4h4v2h-4v4z" />
                        </svg>
                        Download Resume
                    </button>
                </aside>

                <section className="interview-main">
                    <div className="main-header">
                        <div>
                            <h2>{sections.find((item) => item.id === activeSection).label}</h2>
                            <span className="header-meta">
                                {activeSection === "roadmap"
                                    ? `${activeContent.length}-day plan`
                                    : `${activeContent.length} questions`}
                            </span>
                        </div>
                    </div>

                    {activeSection !== "roadmap" && (
                        <div className="question-list">
                            {activeContent.map((item, index) => (
                                <article key={index} className="question-card">
                                    <div className="question-card-title">
                                        <span className="question-tag">Q{index + 1}</span>
                                        <h3>{item.question}</h3>
                                    </div>
                                    <div className="question-card-body">
                                        <div className="field-block">
                                            <div className="field-label intention-label">INTENTION</div>
                                            <p className="question-intent">{item.intention}</p>
                                        </div>
                                        <div className="field-block">
                                            <div className="field-label answer-label">MODEL ANSWER</div>
                                            <p className="question-answer">{item.answer}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                   {activeSection === "roadmap" && (
    <div className="roadmap-list">
        {activeContent.map((item, index) => (
            <article key={index} className="roadmap-item">
                <div className="roadmap-step">Day {item.day}</div>
                <div className="roadmap-body">
                    <h3>{item.focus}</h3>       
                    <ul>
                        {item.tasks?.map((task, i) => (
                            <li key={i}>{task}</li>   
                        ))}
                    </ul>
                </div>
            </article>
        ))}
    </div>
)}
                </section>

                <aside className="interview-rightpanel">
                    <div className="score-card">
                        <div className="score-label">Match Score</div>
                        <div className="score-value">{displayData.matchScore ?? interviewData.matchScore}%</div>
                        <div className="score-status">Strong match for this role</div>
                    </div>

                    <div className="skills-card">
                        <div className="skills-header">Skill Gaps</div>
                        <div className="skill-tags">
                            {(displayData.skillGaps || interviewData.skillGaps).map((g, idx) => {
                                const isString = typeof g === "string";
                                const key = isString ? g : (g.skill ?? idx);
                                const label = isString ? g : `${g.skill}${g.severity ? ` — ${g.severity}` : ""}`;
                                return (
                                    <span key={key} className="skill-tag">{label}</span>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
};

export default Interview;
