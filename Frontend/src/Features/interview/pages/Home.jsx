import React, { useEffect, useState, useRef } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {
    const { loading, generateReport, reports, getReports } = useInterview();
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");
    const resumeInputRef = useRef(null);

    const navigate = useNavigate();

    const handleFileClick = () => {
        resumeInputRef.current?.click();
    };

    const handleResumeUpload = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName("");
        }
    };

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files?.[0] || null;
        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        if (data?._id) {
            navigate(`/interview/${data._id}`);
        }
    };

    useEffect(() => {
        getReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(loading){ 
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
                </main>
        )
    }

    return (
        <main className='home'>
            <div className="interview-container">
                {/* Header Section */}
                <div className="header-section">
                    <h1 className="main-title">
                        Create Your Custom <span className="highlight">Interview</span> <span className="highlight-secondary">Plan</span>
                    </h1>
                    <p className="subtitle">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </div>

                {/* Main Content Section */}
                <div className="interview-input-group">
                    {/* Left Column - Job Description */}
                    <div className="left">
                        <div className="section-header">
                            <div className="section-title">
                                <span className="section-icon">●</span>
                                Target Job Description
                            </div>
                            <span className="required-badge">Required</span>
                        </div>
                        <textarea
                        onChange={(e)=>setJobDescription(e.target.value)}
                            name="jobDescription"
                            id="jobDescription"
                            placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                            className="job-description-textarea"
                        ></textarea>
                        <div className="char-count">0 / 5000 chars</div>
                    </div>

                    {/* Right Column - Profile Section */}
                    <div className="right">
                        <div className="section-header">
                            <div className="section-title">
                                <span className="section-icon">●</span>
                                Your Profile
                            </div>
                        </div>

                        {/* Resume Upload Section */}
                        <div className="input-group resume-group">
                            <label className="group-label" htmlFor="resume">
                                Upload Resume <span className="required-label">Most Impactful</span>
                            </label>
                            <div
                                className="file-upload-area"
                                role="button"
                                tabIndex={0}
                                onClick={handleFileClick}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter" || event.key === " ") {
                                        handleFileClick();
                                    }
                                }}
                            >
                                <div className="upload-icon">●</div>
                                <p className="upload-text">Click to upload or drag & drop</p>
                                <p className="upload-subtext">PDF or DOCX (Max 5MB)</p>
                                {selectedFileName && (
                                    <p className="selected-file">{selectedFileName}</p>
                                )}
                                <input
                                    ref={resumeInputRef}
                                    hidden
                                    type="file"
                                    id="resume"
                                    name="resume"
                                    accept=".pdf"
                                    onChange={handleResumeUpload}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="divider">OR</div>

                        {/* Self Description Section */}
                        <div className="input-group">
                            <label className="group-label" htmlFor="selfDescription">
                                Quick Self-Description
                            </label>
                            <textarea
                                onChange={(e)=>setSelfDescription(e.target.value)}
                                name="selfDescription"
                                id="selfDescription"
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                className="self-description-textarea"
                            ></textarea>
                        </div>

                        {/* Info Box */}
                        <div className="info-box">
                            <span className="info-icon">ℹ</span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className="previous-reports-section">
                    <div className="reports-header">
                        <h2 className="previous-reports-title">My Recent Interview Reports</h2>
                        {reports.length > 0 && (
                            <span className="report-count">Showing {Math.min(reports.length, 3)} of {reports.length}</span>
                        )}
                    </div>

                    {reports.length > 0 ? (
                        <div className="reports-list">
                            {reports.slice(0, 3).map((report) => (
                                <button
                                    key={report._id}
                                    type="button"
                                    className="report-card"
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                >
                                    <div className="report-card-title">{report.title || "Untitled Report"}</div>
                                    <p className="report-meta">{new Date(report.createdAt).toLocaleDateString()}</p>
                                    <span className="report-score">Match Score {report.matchScore ?? "—"}%</span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="no-reports-block">
                            <p>You don't have any generated reports yet. Create your first report to see it listed here.</p>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="footer-section">
                    <p className="footer-note">AI-Powered Strategy Generation • Approx 30s</p>
                    <button 
                    onClick={handleGenerateReport}
                    className="button primary-button">
                        <span className="button-icon"></span> Generate My Interview Report
                    </button>
                </div>
            </div>
        </main>
    )
}

export default Home
