"use client"

import { ResumeDataInterface } from '@/types/resume.types';
import React, { useEffect, useRef, useState } from 'react';
import { 
    LuMapPin, 
    LuMail, 
    LuPhone, 
    LuLinkedin,
    LuGithub,
    LuGlobe,
    LuTwitter
} from 'react-icons/lu';

const DEFAULT_THEME = [
    "#F5F5F5",  // Light gray background for sections
    "#2C3E50",  // Dark text color
    "#FFFFFF",  // White background
    "#4A5568",  // Medium gray for secondary text
    "#000000"   // Black for main text
];

interface TemplateFourInterface {
    resumeData: ResumeDataInterface;
    colorPalette?: string[];
    containerWidth: number;
}

const TemplateFour: React.FC<TemplateFourInterface> = ({
    resumeData,
    colorPalette,
    containerWidth,
}) => {
    const themeColors = colorPalette && colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

    const resumeRef = useRef<HTMLDivElement | null>(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const actualBaseWidth = resumeRef.current?.offsetWidth || 800;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / baseWidth);
    }, [containerWidth, baseWidth]);

    // Section Title Component
    const SectionTitle = ({ text }: { text: string }) => (
        <div 
            className="py-3 mb-6 text-center"
            style={{ backgroundColor: themeColors[0] }}
        >
            <h2 
                className="text-base font-bold"
                style={{ color: themeColors[1] }}
            >
                {text}
            </h2>
        </div>
    );

    // Format date helper
    const formatDate = (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
    };

    return (
        <div
            ref={resumeRef}
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : 'none',
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto", 
                height: 'auto',
                backgroundColor: themeColors[2]
            }}
        >
            {/* HEADER SECTION */}
            <div 
                className="px-12 pt-12 pb-8"
                style={{ backgroundColor: themeColors[0] }}
            >
                <div className="flex items-start gap-8">
                    {/* Profile Image */}
                    {resumeData?.profileInfo?.profilePreviewUrl && (
                        <div className="flex-shrink-0">
                            <img 
                                src={resumeData.profileInfo.profilePreviewUrl} 
                                alt={resumeData.profileInfo.fullName}
                                className="w-40 h-40 rounded-full object-cover"
                                style={{ border: `4px solid ${themeColors[2]}` }}
                            />
                        </div>
                    )}

                    {/* Name, Title and Contact Info */}
                    <div className="flex-1 pt-2">
                        <h1 
                            className="text-4xl font-bold mb-2"
                            style={{ color: themeColors[1] }}
                        >
                            {resumeData?.profileInfo?.fullName || ""}
                        </h1>
                        <p 
                            className="text-lg mb-4"
                            style={{ color: themeColors[3] }}
                        >
                            {resumeData?.profileInfo?.designation || ""}
                        </p>

                        {/* Contact Info Grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                            {resumeData?.contactInfo?.email && (
                                <div className="flex items-center gap-2">
                                    <LuMail className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.email}</span>
                                </div>
                            )}
                            {resumeData?.contactInfo?.phone && (
                                <div className="flex items-center gap-2">
                                    <LuPhone className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.phone}</span>
                                </div>
                            )}
                            {resumeData?.contactInfo?.location && (
                                <div className="flex items-center gap-2 col-span-2">
                                    <LuMapPin className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.location}</span>
                                </div>
                            )}
                            {resumeData?.contactInfo?.linkedIn && (
                                <div className="flex items-center gap-2">
                                    <LuLinkedin className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.linkedIn}</span>
                                </div>
                            )}
                            {resumeData?.contactInfo?.website && (
                                <div className="flex items-center gap-2">
                                    <LuGlobe className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.website}</span>
                                </div>
                            )}
                            {resumeData?.contactInfo?.github && (
                                <div className="flex items-center gap-2">
                                    <LuGithub className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.github}</span>
                                </div>
                            )}
                            {resumeData?.contactInfo?.twitter && (
                                <div className="flex items-center gap-2">
                                    <LuTwitter className="w-4 h-4 flex-shrink-0" style={{ color: themeColors[1] }} />
                                    <span style={{ color: themeColors[3] }}>{resumeData.contactInfo.twitter}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* PROFILE SECTION */}
            {resumeData?.profileInfo?.summary && (
                <div className="px-12">
                    <SectionTitle text="Profile" />
                    <p 
                        className="text-sm leading-relaxed text-justify mb-8"
                        style={{ color: themeColors[3] }}
                    >
                        {resumeData.profileInfo.summary}
                    </p>
                </div>
            )}

            {/* WORK EXPERIENCE */}
            {resumeData?.workExperience && resumeData.workExperience.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Work Experience" />
                    <div className="mb-8">
                        {resumeData.workExperience
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((work, index) => (
                            <div key={`work_${index}`} className="mb-6 grid grid-cols-[180px_1fr] gap-6">
                                <div className="text-sm">
                                    <p 
                                        className="font-semibold mb-1"
                                        style={{ color: themeColors[1] }}
                                    >
                                        {formatDate(work.startDate)} – {work.currentlyWorking ? 'present' : formatDate(work.endDate)}
                                    </p>
                                    {work.location && (
                                        <p style={{ color: themeColors[3] }}>{work.location}</p>
                                    )}
                                </div>
                                <div>
                                    <h3 
                                        className="font-bold text-base mb-1"
                                        style={{ color: themeColors[1] }}
                                    >
                                        {work.company}
                                    </h3>
                                    <p 
                                        className="text-sm mb-2"
                                        style={{ color: themeColors[3] }}
                                    >
                                        {work.role}
                                    </p>
                                    {work.highlights && work.highlights.length > 0 && (
                                        <ul className="list-disc list-inside text-sm space-y-1" style={{ color: themeColors[3] }}>
                                            {work.highlights.map((highlight, idx) => (
                                                <li key={`highlight_${idx}`} className="leading-relaxed">
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {work.description && !work.highlights?.length && (
                                        <p className="text-sm leading-relaxed" style={{ color: themeColors[3] }}>
                                            {work.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* EDUCATION */}
            {resumeData?.education && resumeData.education.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Education" />
                    <div className="mb-8">
                        {resumeData.education
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((edu, index) => (
                            <div key={`edu_${index}`} className="mb-5 grid grid-cols-[180px_1fr] gap-6">
                                <div className="text-sm">
                                    <p 
                                        className="font-semibold mb-1"
                                        style={{ color: themeColors[1] }}
                                    >
                                        {formatDate(edu.startDate || "")} – {edu.currentlyStudying ? 'present' : formatDate(edu.endDate || "")}
                                    </p>
                                    {edu.location && (
                                        <p style={{ color: themeColors[3] }}>{edu.location}</p>
                                    )}
                                </div>
                                <div>
                                    <h3 
                                        className="font-bold text-base mb-1"
                                        style={{ color: themeColors[1] }}
                                    >
                                        {edu.degree}
                                    </h3>
                                    <p 
                                        className="text-sm mb-2"
                                        style={{ color: themeColors[3] }}
                                    >
                                        {edu.institution}
                                    </p>
                                    {edu.grade && (
                                        <p className="text-sm mb-2" style={{ color: themeColors[3] }}>
                                            Grade: {edu.grade}
                                        </p>
                                    )}
                                    {edu.description && (
                                        <p className="text-sm leading-relaxed mb-2" style={{ color: themeColors[3] }}>
                                            {edu.description}
                                        </p>
                                    )}
                                    {edu.achievements && edu.achievements.length > 0 && (
                                        <ul className="list-disc list-inside text-sm space-y-1" style={{ color: themeColors[3] }}>
                                            {edu.achievements.map((achievement, idx) => (
                                                <li key={`achievement_${idx}`} className="leading-relaxed">
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PROJECTS */}
            {resumeData?.projects && resumeData.projects.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Projects" />
                    <div className="mb-8">
                        {resumeData.projects
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((project, index) => (
                            <div key={`project_${index}`} className="mb-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 
                                            className="font-bold text-base mb-1"
                                            style={{ color: themeColors[1] }}
                                        >
                                            {project.title}
                                        </h3>
                                        {project.subtitle && (
                                            <p className="text-sm" style={{ color: themeColors[3] }}>
                                                {project.subtitle}
                                            </p>
                                        )}
                                    </div>
                                    {(project.startDate || project.endDate || project.status) && (
                                        <p className="text-sm" style={{ color: themeColors[3] }}>
                                            {formatDate(project.startDate || "")}
                                            {project.endDate && ` – ${formatDate(project.endDate)}`}
                                            {project.status === 'ongoing' && ' – Present'}
                                        </p>
                                    )}
                                </div>

                                {/* Project Links */}
                                {(project.github || project.liveDemo || project.projectLink) && (
                                    <div className="flex gap-4 text-xs mb-2">
                                        {project.github && (
                                            <a href={project.github} className="flex items-center gap-1 hover:underline" style={{ color: themeColors[3] }}>
                                                <LuGithub className="w-3 h-3" />
                                                <span>GitHub</span>
                                            </a>
                                        )}
                                        {project.liveDemo && (
                                            <a href={project.liveDemo} className="flex items-center gap-1 hover:underline" style={{ color: themeColors[3] }}>
                                                <LuGlobe className="w-3 h-3" />
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                        {project.projectLink && !project.liveDemo && (
                                            <a href={project.projectLink} className="flex items-center gap-1 hover:underline" style={{ color: themeColors[3] }}>
                                                <LuGlobe className="w-3 h-3" />
                                                <span>Project Link</span>
                                            </a>
                                        )}
                                    </div>
                                )}

                                {project.description && (
                                    <p className="text-sm leading-relaxed mb-2" style={{ color: themeColors[3] }}>
                                        {project.description}
                                    </p>
                                )}

                                {project.technologies && project.technologies.length > 0 && (
                                    <div className="mb-2">
                                        <span className="text-sm font-semibold" style={{ color: themeColors[1] }}>Technologies: </span>
                                        <span className="text-sm" style={{ color: themeColors[3] }}>{project.technologies.join(', ')}</span>
                                    </div>
                                )}

                                {project.highlights && project.highlights.length > 0 && (
                                    <ul className="list-disc list-inside text-sm space-y-1" style={{ color: themeColors[3] }}>
                                        {project.highlights.map((highlight, idx) => (
                                            <li key={`project_highlight_${idx}`} className="leading-relaxed">
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SKILLS */}
            {resumeData?.skills && resumeData.skills.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Skills" />
                    <div className="mb-8">
                        {/* Group by category if categories exist */}
                        {resumeData.skills.some(skill => skill.category) ? (
                            <div className="space-y-4">
                                {Array.from(new Set(resumeData.skills.map(s => s.category || 'Other'))).map((category) => (
                                    <div key={category}>
                                        <h3 className="font-semibold text-sm mb-2" style={{ color: themeColors[1] }}>{category}</h3>
                                        <ul className="grid grid-cols-3 gap-2 text-sm" style={{ color: themeColors[3] }}>
                                            {resumeData.skills
                                                .filter(skill => (skill.category || 'Other') === category)
                                                .map((skill, index) => (
                                                    <li key={`skill_${category}_${index}`} className="flex items-start gap-1">
                                                        <span>•</span>
                                                        <span>
                                                            {skill.name}
                                                            {skill.subSkills && ` - ${skill.subSkills}`}
                                                            {skill.progress && skill.progress > 0 && (
                                                                <span className="text-xs opacity-75">
                                                                    {' '}({skill.progress}%)
                                                                </span>
                                                            )}
                                                        </span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ul className="grid grid-cols-3 gap-2 text-sm" style={{ color: themeColors[3] }}>
                                {resumeData.skills.map((skill, index) => (
                                    <li key={`skill_${index}`} className="flex items-start gap-1">
                                        <span>•</span>
                                        <span>
                                            {skill.name}
                                            {skill.subSkills && ` - ${skill.subSkills}`}
                                            {skill.progress && skill.progress > 0 && (
                                                <span className="text-xs opacity-75">
                                                    {' '}({skill.progress}%)
                                                </span>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            {/* LANGUAGES */}
            {resumeData?.languages && resumeData.languages.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Languages" />
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {resumeData.languages
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((lang, index) => (
                            <div key={`lang_${index}`} className="flex items-center justify-between">
                                <span className="text-sm font-medium" style={{ color: themeColors[1] }}>
                                    {lang.name}
                                </span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div
                                            key={dot}
                                            className={`w-3 h-3 rounded-full`}
                                            style={{
                                                backgroundColor: dot <= (lang.proficiency / 20) 
                                                    ? themeColors[1] 
                                                    : '#D1D5DB'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* AWARDS & CERTIFICATIONS */}
            {resumeData?.certifications && resumeData.certifications.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Awards" />
                    <div className="mb-8">
                        {resumeData.certifications
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((cert, index) => (
                            <div key={`cert_${index}`} className="mb-4">
                                <h3 
                                    className="font-bold text-base mb-1"
                                    style={{ color: themeColors[1] }}
                                >
                                    {cert.name}
                                </h3>
                                <p className="text-sm" style={{ color: themeColors[3] }}>
                                    {cert.issuer}
                                    {cert.year && `, ${cert.year}`}
                                    {cert.issueDate && !cert.year && `, ${formatDate(cert.issueDate)}`}
                                </p>
                                {cert.credentailId && (
                                    <p className="text-xs mt-1" style={{ color: themeColors[3] }}>
                                        ID: {cert.credentailId}
                                    </p>
                                )}
                                {cert.expiryDate && (
                                    <p className="text-xs" style={{ color: themeColors[3] }}>
                                        Expires: {formatDate(cert.expiryDate)}
                                    </p>
                                )}
                                {cert.credentialUrl && (
                                    <a 
                                        href={cert.credentialUrl} 
                                        className="text-xs hover:underline mt-1 inline-block"
                                        style={{ color: themeColors[1] }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Credential →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* INTERESTS */}
            {resumeData?.interests && resumeData.interests.length > 0 && (
                <div className="px-12">
                    <SectionTitle text="Interests" />
                    <div className="flex flex-wrap gap-3 mb-8">
                        {resumeData.interests.map((interest, index) => (
                            <span 
                                key={`interest_${index}`} 
                                className="text-sm px-3 py-1 rounded"
                                style={{ 
                                    backgroundColor: themeColors[0],
                                    color: themeColors[3]
                                }}
                            >
                                {interest}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* HOBBIES */}
            {resumeData?.hobbies && resumeData.hobbies.length > 0 && (
                <div className="px-12 pb-12">
                    <SectionTitle text="Hobbies" />
                    <div className="flex flex-wrap gap-3">
                        {resumeData.hobbies.map((hobby, index) => (
                            <span 
                                key={`hobby_${index}`} 
                                className="text-sm px-3 py-1 rounded"
                                style={{ 
                                    backgroundColor: themeColors[0],
                                    color: themeColors[3]
                                }}
                            >
                                {hobby}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TemplateFour;