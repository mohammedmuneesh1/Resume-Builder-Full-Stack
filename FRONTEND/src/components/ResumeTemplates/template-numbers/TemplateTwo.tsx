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
    LuTwitter,
    LuBriefcase,
    LuGraduationCap,
    LuAward,
    LuMessageSquare
} from 'react-icons/lu';

const DEFAULT_THEME = [
    "#2C3E50",  // Dark blue-gray for sidebar
    "#FFFFFF",  // White for main content
    "#ECF0F1",  // Light gray for section backgrounds
    "#34495E",  // Slightly lighter blue-gray
    "#000000"   // Black for text
];

interface TemplateTwoInterface {
    resumeData: ResumeDataInterface;
    colorPalette?: string[];
    containerWidth: number;
}

const TemplateTwo: React.FC<TemplateTwoInterface> = ({
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

    // Format date helper
    const formatDate = (date: string) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' });
    };

    // Sidebar Section Title Component
    //eslint-disable-next-line
    const SidebarSectionTitle = ({ text, icon: Icon }: { text: string; icon: any }) => (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
                <Icon className="w-5 h-5" style={{ color: themeColors[1] }} />
                <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: themeColors[1] }}>
                    {text}
                </h2>
            </div>
            <div className="w-full h-[1px]" style={{ backgroundColor: themeColors[3] }}></div>
        </div>
    );

    // Main Content Section Title Component
    //eslint-disable-next-line
    const MainSectionTitle = ({ text, icon: Icon }: { text: string; icon: any }) => (
        <div className="mb-4" style={{ backgroundColor: themeColors[2] }}>
            <div className="flex items-center gap-2 p-3">
                <Icon className="w-5 h-5" style={{ color: themeColors[0] }} />
                <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: themeColors[4] }}>
                    {text}
                </h2>
            </div>
        </div>
    );

    return (
        <div
            ref={resumeRef}
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : 'none',
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${baseWidth}px` : "auto", 
                height: 'auto',
            }}
            className='bg-white flex'
        >
            {/* LEFT SIDEBAR */}
            <div 
                className="w-[35%] p-8 text-white flex flex-col"
                style={{ backgroundColor: themeColors[0] }}
            >
                {/* NAME & TITLE */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-3 leading-tight">
                        {resumeData?.profileInfo?.fullName || ""}
                    </h1>
                    <p className="text-base leading-relaxed" style={{ color: themeColors[2] }}>
                        {resumeData?.profileInfo?.designation || ""}
                    </p>
                </div>

                {/* PROFILE IMAGE */}
                {resumeData?.profileInfo?.profilePreviewUrl && (
                    <div className="mb-8">
                        <img 
                            src={resumeData.profileInfo.profilePreviewUrl} 
                            alt={resumeData.profileInfo.fullName}
                            className="w-40 h-40 rounded-full object-cover border-4 mx-auto"
                            style={{ borderColor: themeColors[3] }}
                        />
                    </div>
                )}

                {/* CONTACT INFO */}
                <div className="mb-8 space-y-3 text-sm">
                    {resumeData?.contactInfo?.email && (
                        <div className="flex items-start gap-3">
                            <LuMail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-all">{resumeData.contactInfo.email}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.phone && (
                        <div className="flex items-start gap-3">
                            <LuPhone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{resumeData.contactInfo.phone}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.location && (
                        <div className="flex items-start gap-3">
                            <LuMapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{resumeData.contactInfo.location}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.linkedIn && (
                        <div className="flex items-start gap-3">
                            <LuLinkedin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-all">{resumeData.contactInfo.linkedIn}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.website && (
                        <div className="flex items-start gap-3">
                            <LuGlobe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-all">{resumeData.contactInfo.website}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.github && (
                        <div className="flex items-start gap-3">
                            <LuGithub className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-all">{resumeData.contactInfo.github}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.twitter && (
                        <div className="flex items-start gap-3">
                            <LuTwitter className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="break-all">{resumeData.contactInfo.twitter}</span>
                        </div>
                    )}
                </div>

                {/* PROFILE SUMMARY */}
                {resumeData?.profileInfo?.summary && (
                    <div className="mb-8">
                        <SidebarSectionTitle text="PROFILE" icon={LuMessageSquare} />
                        <p className="text-sm leading-relaxed text-justify">
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>
                )}

                {/* LANGUAGES */}
                {resumeData?.languages && resumeData.languages.length > 0 && (
                    <div className="mb-8">
                        <SidebarSectionTitle text="LANGUAGES" icon={LuGlobe} />
                        <div className="space-y-3">
                            {resumeData.languages
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((lang, index) => (
                                <div key={`lang_${index}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{lang.name}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((dot) => (
                                            <div
                                                key={dot}
                                                className={`w-3 h-3 rounded-full`}
                                                style={{
                                                    backgroundColor: dot <= (lang.proficiency / 20) 
                                                        ? themeColors[1] 
                                                        : themeColors[3]
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AWARDS */}
                {resumeData?.certifications && resumeData.certifications.length > 0 && (
                    <div className="mb-8">
                        <SidebarSectionTitle text="AWARDS" icon={LuAward} />
                        {resumeData.certifications
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((cert, index) => (
                            <div key={`cert_${index}`} className="mb-4">
                                <h3 className="font-bold text-sm mb-1">{cert.name}</h3>
                                <p className="text-sm" style={{ color: themeColors[2] }}>
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
                                        style={{ color: themeColors[2] }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Credential →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* INTERESTS */}
                {resumeData?.interests && resumeData.interests.length > 0 && (
                    <div className="mb-8">
                        <SidebarSectionTitle text="INTERESTS" icon={LuMessageSquare} />
                        <div className="flex flex-wrap gap-2">
                            {resumeData.interests.map((interest, index) => (
                                <span 
                                    key={`interest_${index}`} 
                                    className="text-sm px-2 py-1 rounded"
                                    style={{ backgroundColor: themeColors[3] }}
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* HOBBIES */}
                {resumeData?.hobbies && resumeData.hobbies.length > 0 && (
                    <div>
                        <SidebarSectionTitle text="HOBBIES" icon={LuMessageSquare} />
                        <div className="flex flex-wrap gap-2">
                            {resumeData.hobbies.map((hobby, index) => (
                                <span 
                                    key={`hobby_${index}`} 
                                    className="text-sm px-2 py-1 rounded"
                                    style={{ backgroundColor: themeColors[3] }}
                                >
                                    {hobby}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RIGHT MAIN CONTENT */}
            <div className="w-[65%] p-8">
                {/* PROFESSIONAL EXPERIENCE */}
                {resumeData?.workExperience && resumeData.workExperience.length > 0 && (
                    <div className="mb-8">
                        <MainSectionTitle text="PROFESSIONAL EXPERIENCE" icon={LuBriefcase} />
                        <div className="px-3">
                            {resumeData.workExperience
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((work, index) => (
                                <div key={`work_${index}`} className="mb-6">
                                    <div className="mb-2">
                                        <h3 className="font-bold text-base mb-1">
                                            {work.company}
                                        </h3>
                                        <p className="text-sm font-medium">
                                            {work.role}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {formatDate(work.startDate)} – {work.currentlyWorking ? 'present' : formatDate(work.endDate)}
                                            {work.location && ` | ${work.location}`}
                                        </p>
                                    </div>
                                    {work.highlights && work.highlights.length > 0 && (
                                        <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700">
                                            {work.highlights.map((highlight, idx) => (
                                                <li key={`highlight_${idx}`} className="leading-relaxed">
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {work.description && !work.highlights?.length && (
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            {work.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* EDUCATION */}
                {resumeData?.education && resumeData.education.length > 0 && (
                    <div className="mb-8">
                        <MainSectionTitle text="EDUCATION" icon={LuGraduationCap} />
                        <div className="px-3">
                            {resumeData.education
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((edu, index) => (
                                <div key={`edu_${index}`} className="mb-5">
                                    <h3 className="font-bold text-base mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-sm font-medium">
                                        {edu.institution}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {formatDate(edu.startDate || "")} – {edu.currentlyStudying ? 'present' : formatDate(edu.endDate || "")}
                                        {edu.location && ` | ${edu.location}`}
                                    </p>
                                    {edu.grade && (
                                        <p className="text-sm text-gray-700 mt-1">
                                            Grade: {edu.grade}
                                        </p>
                                    )}
                                    {edu.description && (
                                        <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                                            {edu.description}
                                        </p>
                                    )}
                                    {edu.achievements && edu.achievements.length > 0 && (
                                        <ul className="list-disc list-inside text-sm space-y-1 mt-2 text-gray-700">
                                            {edu.achievements.map((achievement, idx) => (
                                                <li key={`achievement_${idx}`} className="leading-relaxed">
                                                    {achievement}
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
                    <div className="mb-8">
                        <MainSectionTitle text="SKILLS" icon={LuMessageSquare} />
                        <div className="px-3">
                            {/* Group by category if categories exist */}
                            {resumeData.skills.some(skill => skill.category) ? (
                                <>
                                    {Array.from(new Set(resumeData.skills.map(s => s.category || 'Other'))).map((category) => (
                                        <div key={category} className="mb-4">
                                            <h3 className="font-semibold text-sm mb-2">{category}</h3>
                                            <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700">
                                                {resumeData.skills
                                                    .filter(skill => (skill.category || 'Other') === category)
                                                    .map((skill, index) => (
                                                        <li key={`skill_${category}_${index}`} className="leading-relaxed">
                                                            {skill.name}
                                                            {skill.subSkills && ` - ${skill.subSkills}`}
                                                            {skill.progress && skill.progress > 0 && (
                                                                <span className="ml-2 text-xs text-gray-500">
                                                                    ({skill.progress}%)
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700">
                                    {resumeData.skills.map((skill, index) => (
                                        <li key={`skill_${index}`} className="leading-relaxed">
                                            {skill.name}
                                            {skill.subSkills && ` - ${skill.subSkills}`}
                                            {skill.progress && skill.progress > 0 && (
                                                <span className="ml-2 text-xs text-gray-500">
                                                    ({skill.progress}%)
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {/* PROJECTS */}
                {resumeData?.projects && resumeData.projects.length > 0 && (
                    <div className="mb-8">
                        <MainSectionTitle text="PROJECTS" icon={LuBriefcase} />
                        <div className="px-3">
                            {resumeData.projects
                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                .map((project, index) => (
                                <div key={`project_${index}`} className="mb-6">
                                    <div className="mb-2">
                                        <h3 className="font-bold text-base mb-1">
                                            {project.title}
                                        </h3>
                                        {project.subtitle && (
                                            <p className="text-sm font-medium">
                                                {project.subtitle}
                                            </p>
                                        )}
                                        {(project.startDate || project.endDate || project.status) && (
                                            <p className="text-sm text-gray-600">
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
                                                <a href={project.github} className="flex items-center gap-1 hover:underline text-gray-600">
                                                    <LuGithub className="w-3 h-3" />
                                                    <span>GitHub</span>
                                                </a>
                                            )}
                                            {project.liveDemo && (
                                                <a href={project.liveDemo} className="flex items-center gap-1 hover:underline text-gray-600">
                                                    <LuGlobe className="w-3 h-3" />
                                                    <span>Live Demo</span>
                                                </a>
                                            )}
                                            {project.projectLink && !project.liveDemo && (
                                                <a href={project.projectLink} className="flex items-center gap-1 hover:underline text-gray-600">
                                                    <LuGlobe className="w-3 h-3" />
                                                    <span>Project Link</span>
                                                </a>
                                            )}
                                        </div>
                                    )}

                                    {project.description && (
                                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                                            {project.description}
                                        </p>
                                    )}

                                    {project.technologies && project.technologies.length > 0 && (
                                        <div className="mb-2">
                                            <span className="text-sm font-semibold">Technologies: </span>
                                            <span className="text-sm text-gray-700">{project.technologies.join(', ')}</span>
                                        </div>
                                    )}

                                    {project.highlights && project.highlights.length > 0 && (
                                        <ul className="list-disc list-inside text-sm space-y-1.5 text-gray-700">
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
            </div>
        </div>
    );
};

export default TemplateTwo;