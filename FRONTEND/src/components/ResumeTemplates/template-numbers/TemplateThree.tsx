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
    "#FFFFFF",  // Background white
    "#000000",  // Text black
    "#E5E7EB",  // Light gray for separators
    "#374151",  // Dark gray for secondary text
    "#111827"   // Darker for headers
];

interface TemplateThreeInterface {
    resumeData: ResumeDataInterface;
    colorPalette?: string[];
    containerWidth: number;
}

const TemplateThree: React.FC<TemplateThreeInterface> = ({
    resumeData,
    colorPalette,
    containerWidth,
}) => {
    // const themeColors = colorPalette && colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

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
        <div className="mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-1">
                {text}
            </h2>
            <div className="w-full h-[2px] bg-black"></div>
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
            }}
            className='bg-white p-12'
        >
            {/* HEADER */}
            <div className="text-center mb-6">
                {/* Profile Image - if exists */}
                {resumeData?.profileInfo?.profilePreviewUrl && (
                    <div className="flex justify-center mb-4">
                        <img 
                            src={resumeData.profileInfo.profilePreviewUrl} 
                            alt={resumeData.profileInfo.fullName}
                            className="w-24 h-24 rounded-full object-cover border-2 border-black"
                        />
                    </div>
                )}

                <h1 className="text-4xl font-bold mb-2">
                    {resumeData?.profileInfo?.fullName || ""}
                </h1>
                <p className="text-lg italic mb-4">
                    {resumeData?.profileInfo?.designation || ""}
                </p>

                {/* Contact Info */}
                <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
                    {resumeData?.contactInfo?.location && (
                        <div className="flex items-center gap-1.5">
                            <LuMapPin className="w-4 h-4" />
                            <span>{resumeData.contactInfo.location}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.email && (
                        <div className="flex items-center gap-1.5">
                            <LuMail className="w-4 h-4" />
                            <span>{resumeData.contactInfo.email}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.phone && (
                        <div className="flex items-center gap-1.5">
                            <LuPhone className="w-4 h-4" />
                            <span>{resumeData.contactInfo.phone}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.linkedIn && (
                        <div className="flex items-center gap-1.5">
                            <LuLinkedin className="w-4 h-4" />
                            <span>{resumeData.contactInfo.linkedIn}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.github && (
                        <div className="flex items-center gap-1.5">
                            <LuGithub className="w-4 h-4" />
                            <span>{resumeData.contactInfo.github}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.website && (
                        <div className="flex items-center gap-1.5">
                            <LuGlobe className="w-4 h-4" />
                            <span>{resumeData.contactInfo.website}</span>
                        </div>
                    )}
                    {resumeData?.contactInfo?.twitter && (
                        <div className="flex items-center gap-1.5">
                            <LuTwitter className="w-4 h-4" />
                            <span>{resumeData.contactInfo.twitter}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* PROFILE SECTION */}
            {resumeData?.profileInfo?.summary && (
                <div className="mb-6">
                    <SectionTitle text="PROFILE" />
                    <p className="text-sm text-justify leading-relaxed">
                        {resumeData.profileInfo.summary}
                    </p>
                </div>
            )}

            {/* PROFESSIONAL EXPERIENCE */}
            {resumeData?.workExperience && resumeData.workExperience.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="PROFESSIONAL EXPERIENCE" />
                    {resumeData.workExperience
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((work, index) => (
                        <div key={`work_${index}`} className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="font-bold text-sm">
                                        {work.role}
                                    </h3>
                                    <p className="text-sm italic">
                                        {work.company}
                                    </p>
                                </div>
                                <div className="text-right text-sm">
                                    <p>{formatDate(work.startDate)} – {work.currentlyWorking ? 'Present' : formatDate(work.endDate)}</p>
                                    {work.location && <p>{work.location}</p>}
                                </div>
                            </div>
                            {work.highlights && work.highlights.length > 0 && (
                                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                                    {work.highlights.map((highlight, idx) => (
                                        <li key={`highlight_${idx}`} className="leading-relaxed">
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {work.description && !work.highlights?.length && (
                                <p className="text-sm mt-2 leading-relaxed">
                                    {work.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* EDUCATION */}
            {resumeData?.education && resumeData.education.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="EDUCATION" />
                    {resumeData.education
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((edu, index) => (
                        <div key={`edu_${index}`} className="mb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-sm">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-sm italic">
                                        {edu.institution}
                                    </p>
                                    {edu.grade && (
                                        <p className="text-sm mt-1">
                                            Grade: {edu.grade}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right text-sm">
                                    <p>{formatDate(edu.startDate || "")} – {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate || "")}</p>
                                    {edu.location && <p>{edu.location}</p>}
                                </div>
                            </div>
                            {edu.description && (
                                <p className="text-sm mt-2 leading-relaxed">
                                    {edu.description}
                                </p>
                            )}
                            {edu.achievements && edu.achievements.length > 0 && (
                                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
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
            )}

            {/* PROJECTS */}
            {resumeData?.projects && resumeData.projects.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="PROJECTS" />
                    {resumeData.projects
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((project, index) => (
                        <div key={`project_${index}`} className="mb-4">
                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="font-bold text-sm">
                                        {project.title}
                                    </h3>
                                    {project.subtitle && (
                                        <p className="text-sm italic">
                                            {project.subtitle}
                                        </p>
                                    )}
                                </div>
                                {(project.startDate || project.endDate) && (
                                    <div className="text-right text-sm">
                                        <p>
                                            {formatDate(project.startDate || "")}
                                            {project.endDate && ` – ${formatDate(project.endDate)}`}
                                            {project.status === 'ongoing' && ' – Present'}
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            {/* Project Links */}
                            <div className="flex gap-4 text-xs mb-2">
                                {project.github && (
                                    <a href={project.github} className="flex items-center gap-1 hover:underline">
                                        <LuGithub className="w-3 h-3" />
                                        <span>GitHub</span>
                                    </a>
                                )}
                                {project.liveDemo && (
                                    <a href={project.liveDemo} className="flex items-center gap-1 hover:underline">
                                        <LuGlobe className="w-3 h-3" />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                                {project.projectLink && !project.liveDemo && (
                                    <a href={project.projectLink} className="flex items-center gap-1 hover:underline">
                                        <LuGlobe className="w-3 h-3" />
                                        <span>Project Link</span>
                                    </a>
                                )}
                            </div>

                            {project.description && (
                                <p className="text-sm mt-2 leading-relaxed">
                                    {project.description}
                                </p>
                            )}

                            {project.technologies && project.technologies.length > 0 && (
                                <div className="mt-2">
                                    <span className="text-sm font-semibold">Technologies: </span>
                                    <span className="text-sm">{project.technologies.join(', ')}</span>
                                </div>
                            )}

                            {project.highlights && project.highlights.length > 0 && (
                                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
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
            )}

            {/* SKILLS */}
            {resumeData?.skills && resumeData.skills.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="SKILLS" />
                    {/* Group by category if categories exist */}
                    {resumeData.skills.some(skill => skill.category) ? (
                        <>
                            {Array.from(new Set(resumeData.skills.map(s => s.category || 'Other'))).map((category) => (
                                <div key={category} className="mb-3">
                                    <h3 className="font-semibold text-sm mb-1">{category}</h3>
                                    <ul className="list-disc list-inside text-sm space-y-1">
                                        {resumeData.skills
                                            .filter(skill => (skill.category || 'Other') === category)
                                            .map((skill, index) => (
                                                <li key={`skill_${category}_${index}`} className="leading-relaxed">
                                                    {skill.name}
                                                    {skill.subSkills && ` - ${skill.subSkills}`}
                                                    {skill.progress && skill.progress > 0 && (
                                                        <span className="ml-2 text-xs text-gray-600">
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
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {resumeData.skills.map((skill, index) => (
                                <li key={`skill_${index}`} className="leading-relaxed">
                                    {skill.name}
                                    {skill.subSkills && ` - ${skill.subSkills}`}
                                    {skill.progress && skill.progress > 0 && (
                                        <span className="ml-2 text-xs text-gray-600">
                                            ({skill.progress}%)
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* LANGUAGES */}
            {resumeData?.languages && resumeData.languages.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="LANGUAGES" />
                    <div className="grid grid-cols-2 gap-4">
                        {resumeData.languages
                            .sort((a, b) => (a.order || 0) - (b.order || 0))
                            .map((lang, index) => (
                            <div key={`lang_${index}`} className="flex items-center justify-between">
                                <span className="text-sm font-medium">{lang.name}</span>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((dot) => (
                                        <div
                                            key={dot}
                                            className={`w-2.5 h-2.5 rounded-full ${
                                                dot <= (lang.proficiency / 20) 
                                                    ? 'bg-black' 
                                                    : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CERTIFICATIONS/AWARDS */}
            {resumeData?.certifications && resumeData.certifications.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="AWARDS & CERTIFICATIONS" />
                    {resumeData.certifications
                        .sort((a, b) => (a.order || 0) - (b.order || 0))
                        .map((cert, index) => (
                        <div key={`cert_${index}`} className="mb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-sm">{cert.name}</h3>
                                    <p className="text-sm italic">{cert.issuer}</p>
                                    {cert.credentailId && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            ID: {cert.credentailId}
                                        </p>
                                    )}
                                </div>
                                <div className="text-right text-sm">
                                    {cert.issueDate && (
                                        <p>{formatDate(cert.issueDate)}</p>
                                    )}
                                    {cert.year && !cert.issueDate && (
                                        <p>{cert.year}</p>
                                    )}
                                    {cert.expiryDate && (
                                        <p className="text-xs text-gray-600">
                                            Expires: {formatDate(cert.expiryDate)}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {cert.credentialUrl && (
                                <a 
                                    href={cert.credentialUrl} 
                                    className="text-xs hover:underline mt-1 inline-block"
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
                <div className="mb-6">
                    <SectionTitle text="INTERESTS" />
                    <p className="text-sm">
                        {resumeData.interests.join(' • ')}
                    </p>
                </div>
            )}

            {/* HOBBIES */}
            {resumeData?.hobbies && resumeData.hobbies.length > 0 && (
                <div className="mb-6">
                    <SectionTitle text="HOBBIES" />
                    <p className="text-sm">
                        {resumeData.hobbies.join(' • ')}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TemplateThree;