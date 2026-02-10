"use client"
import Image from "next/image";
import React from "react";
import { useState } from "react";
import { LoginContent } from "./auth/signin/LoginClientPage";
import { SignUpContent } from "./auth/signup/SignupClientPage";
import { useUserContexxt } from "@/context/UserContext";

const resumeTemplates = ["01.webp", "02.webp", "03.webp", "04.webp"];

const HomeLandingPage = () => {
    const companies = ["Google", "Microsoft", "Amazon", "Meta", "Apple"];

    const handleCTA = () => {
        alert('cta need updation');
    }

    return (
        <section className="w-full max-w-full min-h-full">
            {/* HERO SECTION */}
            <div className="screenPadding screenWidth">
                {/* HERO CONTENT */}
                <div className="flex flex-col md:flex-row items-center gap-12 py-12 md:py-20">
                    {/* LEFT SIDE - TEXT CONTENT */}
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-block">
                            <span className="text-sm font-semibold px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 rounded-full border border-blue-200">
                                ✨ AI-Powered Resume Builder
                            </span>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Build Your{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-green-500 animate-gradient">
                                Dream Resume
                            </span>
                            {" "}in Minutes
                        </h1>
                        
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            Create professional, ATS-friendly resumes with our intelligent builder. 
                            Choose from stunning templates and land your dream job faster.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
                                onClick={handleCTA}
                            >
                                Get Started Free →
                            </button>
                            <button
                                className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 cursor-pointer"
                            >
                                View Templates
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="flex gap-8 pt-8">
                            <div>
                                <div className="text-3xl font-bold text-gray-900">50K+</div>
                                <div className="text-sm text-gray-600">Resumes Created</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                                <div className="text-sm text-gray-600">User Rating</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gray-900">95%</div>
                                <div className="text-sm text-gray-600">Success Rate</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - HERO IMAGE */}
                    <div className="w-full md:w-1/2 relative">
                        <div className="relative">
                            {/* Background decoration */}
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                            <div className="absolute -top-8 -right-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                            
                            <div className="relative">
                                <Image
                                    src="/home/landing-page/hero.png"
                                    alt="Resume Builder Hero"
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TRUSTED BY SECTION */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-12">
                <div className="screenPadding screenWidth">
                    <p className="text-center text-sm text-gray-500 mb-8 font-medium">
                        TRUSTED BY PROFESSIONALS FROM
                    </p>
                    <div className="overflow-hidden">
                        <div className="flex opacity-60 grayscale animate-logo-marquee">
                            {[0, 1].map((groupIndex) => (
                                <div
                                    key={groupIndex}
                                    className="flex items-center gap-12 marquee-group"
                                    aria-hidden={groupIndex === 1}
                                >
                                    {companies.map((company, index) => (
                                        <div
                                            key={`${company}-${groupIndex}-${index}`}
                                            className="text-2xl font-bold text-gray-700 whitespace-nowrap"
                                        >
                                            {company}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <section className="screenPadding screenWidth py-20">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        FEATURES
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to help you create the perfect resume
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">✏️</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Easy Editing</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Intuitive drag-and-drop editor with live preview. Update your resume sections instantly with real-time formatting.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Beautiful Templates</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Choose from 20+ professionally designed templates. Fully customizable colors, fonts, and layouts.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🤖</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">AI-Powered Content</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Get smart suggestions for your resume content. AI helps you write better job descriptions and achievements.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">📄</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">One-Click Export</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Download your resume as a high-quality PDF instantly. Print-ready and ATS-optimized format.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-pink-300 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">ATS-Friendly</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Pass applicant tracking systems with confidence. Our templates are optimized for ATS scanning.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="text-2xl">☁️</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3">Cloud Storage</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Save your resumes securely in the cloud. Access and edit from any device, anytime, anywhere.
                        </p>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="screenPadding screenWidth">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold px-4 py-2 bg-purple-50 text-purple-700 rounded-full border border-purple-200">
                            HOW IT WORKS
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
                            Create Your Resume in 3 Simple Steps
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting lines for desktop */}
                        <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>

                        {/* Step 1 */}
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-3xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Choose Template</h3>
                            <p className="text-gray-600">
                                Select from our collection of professional, modern templates designed by experts.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-3xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Fill Your Info</h3>
                            <p className="text-gray-600">
                                Add your details with our easy-to-use form. AI assists you with content suggestions.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <span className="text-3xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Download & Apply</h3>
                            <p className="text-gray-600">
                                Export your polished resume as PDF and start applying to your dream jobs immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TEMPLATES SHOWCASE */}
            <section className="screenPadding screenWidth py-20">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
                        TEMPLATES
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
                        Professional Templates for Every Career
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Stand out with our carefully crafted resume designs
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {resumeTemplates.map((fileName, index) => {
                        const label = `Template ${String(index + 1).padStart(2, "0")}`;
                        const src = `/resumeTemplates/${fileName}`;

                        return (
                            <div key={fileName} className="group cursor-pointer">
                                <div className="bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-blue-500 transition-all duration-300 group-hover:shadow-xl">
                                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
                                        <Image
                                            src={src}
                                            alt={label}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <p className="text-center mt-4 font-semibold text-gray-700">{label}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <button className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                        View All Templates →
                    </button>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="screenPadding screenWidth">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold px-4 py-2 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
                            TESTIMONIALS
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
                            Loved by Job Seekers Worldwide
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Software Engineer",
                                company: "Google",
                                text: "This resume builder helped me land my dream job at Google. The templates are professional and the AI suggestions were incredibly helpful!"
                            },
                            {
                                name: "Michael Chen",
                                role: "Product Manager",
                                company: "Amazon",
                                text: "I've tried many resume builders, but this one is by far the best. The interface is intuitive and the results are stunning."
                            },
                            {
                                name: "Emily Rodriguez",
                                role: "Marketing Director",
                                company: "Meta",
                                text: "Created my resume in less than 15 minutes! The templates are modern and ATS-friendly. Highly recommend!"
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                        {testimonial.name[0]}
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                                        <div className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</div>
                                    </div>
                                </div>
                                <div className="text-yellow-400 mb-3">★★★★★</div>
                                <p className="text-gray-600 leading-relaxed">{testimonial.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section className="screenPadding screenWidth py-20">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold px-4 py-2 bg-pink-50 text-pink-700 rounded-full border border-pink-200">
                        PRICING
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Start for free, upgrade when you&apos;re ready
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                        <h3 className="text-2xl font-bold mb-2">Free</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-gray-600">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                1 Resume
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                3 Templates
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                Basic Support
                            </li>
                        </ul>
                        <button className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-2xl text-white transform scale-105 shadow-2xl relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                            POPULAR
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Pro</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$9</span>
                            <span className="text-blue-100">/month</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center">
                                <span className="mr-2">✓</span>
                                Unlimited Resumes
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span>
                                All Templates
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span>
                                AI-Powered Content
                            </li>
                            <li className="flex items-center">
                                <span className="mr-2">✓</span>
                                Priority Support
                            </li>
                        </ul>
                        <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all">
                            Start Free Trial
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all">
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                Everything in Pro
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                Team Collaboration
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                Custom Branding
                            </li>
                            <li className="flex items-center text-gray-600">
                                <span className="text-green-500 mr-2">✓</span>
                                Dedicated Support
                            </li>
                        </ul>
                        <button className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-all">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20">
                <div className="screenPadding screenWidth max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sm font-semibold px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                            FAQ
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Is the resume builder really free?",
                                a: "Yes! Our basic plan is completely free forever. You can create one resume and choose from 3 professional templates at no cost."
                            },
                            {
                                q: "Are the resumes ATS-friendly?",
                                a: "Absolutely! All our templates are optimized to pass Applicant Tracking Systems used by most companies."
                            },
                            {
                                q: "Can I edit my resume after downloading?",
                                a: "Yes! Your resume is saved in your account and you can edit it anytime. Just re-download the updated version."
                            },
                            {
                                q: "What formats can I download in?",
                                a: "Currently, we support high-quality PDF downloads that are print-ready and perfect for job applications."
                            },
                            {
                                q: "Do you offer refunds?",
                                a: "Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked!"
                            }
                        ].map((faq, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all">
                                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                                <p className="text-gray-600">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="screenPadding screenWidth py-20">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                        Ready to Build Your Perfect Resume?
                    </h2>
                    <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                        Join thousands of job seekers who have successfully landed their dream jobs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                            onClick={handleCTA}
                        >
                            Start Building Now →
                        </button>
                        <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300">
                            View Pricing
                        </button>
                    </div>
                </div>
            </section>

            {/* Add these animations to your global CSS */}
            <style jsx global>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 30s ease infinite;
                }
                
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }

                @keyframes logo-marquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-logo-marquee {
                    animation: logo-marquee 25s linear infinite;
                    will-change: transform;
                }

                .marquee-group {
                    flex: 0 0 100%;
                }
            `}</style>
        </section>
    )
}

export default HomeLandingPage;
































// "use client"
// import Modal from "@/components/modals/Modal";
// import Image from "next/image";
// import React from "react";
// import { useState } from "react";
// import { LoginContent } from "./auth/signin/LoginClientPage";
// import { SignUpContent } from "./auth/signup/SignupClientPage";
// import { useUserContexxt } from "@/context/UserContext";



// const HomeLandingPage = () => {



    

//     const handleCTA = ()=>{
//         alert('cta need updation');
//     }
//     return(
//         <section className="screenPadding w-full max-w-full  min-h-full pb-96">
//             <div
//             className="screenWidth w-full "
//             >
//                 {/*HEADER START */}
               
//                 {/*HEADER END */}

//                 {/*HERO CONTENT START */}
//                 <div
//                 className="flex flex-col md:flex-row items-center "
//                 >

//                     {/*TITLE + DESC + BUTTON START */}
//                     <div
//                     className="w-full md:w-1/2 mb-8 md:mb-0"
//                     >
//                         <h1
//                         className="text-5xl font-bold mb-6 leading-tight "
//                         >
//                         Build Your {" "}
//                             <span className="
//                             text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,_#3cff52_100%)] 
//                             bg-[length:200%_200%] animate-text-shine">
//                                 Resume Effortlessly
//                             </span>
//                         </h1>
//                         <p
//                         className="text-lg text-gray-700 mb-8"
//                         >
//                             Craft a standout resume in minutes with our smart and intuitive resume builder.
//                         </p>

//                         <button
//                         className="bg-black text-sm font-semibold text-white
//                          px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
//                         onClick={handleCTA}
//                         >
//                         Get Started 
//                         </button>
//                     </div>
//                     {/*TITLE + DESC + BUTTON END */}

//                     {/*HERO IMAGE START */}

//                     <div className="w-full   md:w-1/2 max-w-full relative overflow-hidden">
//                         <Image
//                         src="/home/landing-page/hero.png"
//                         alt="hero landing page "
//                         // fill
//                         // objectFit="cover"
//                           width={500}
//                         height={500} 

//                         className="w-full h-full !object-contain pointer-events-none"
//                         />
//                     </div>
//                     {/*HERO IMAGE END */}




//                 </div>
//                 {/*HERO CONTENT END */}



//                 {/* <button
//                 type="button"
//                 onClick={()=>{
//                     setShowModal((prev)=>({
//                         ...prev,
//                         show:true,
//                         success:true,
//                         title:"Modal Title",
//                         desc:"Modal Description",
//                     }));
//                 }}
//                 >
//                     enable the modal box 
//                 </button> */}


//                 {/*Feature section start here */}

//                 <section
//                 className="mt-5 "
//                 >
//                     <h2 className="text-2xl lg:text-3xl 3xl:text-4xl font-bold text-center mb-12">
//                         Features That Make You Shine 
//                     </h2>
// {
//    /*GRID START HERE */ 
// }
//                     <div  className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        
//                         <div 
//                          className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
//                         >
//                             <h3
//                              className="text-lg font-semibold mb-3"
//                              >
//                                 Easy Editing
//                             </h3>
//                             <p
//                              className="text-gray-600"
//                             >
//                                 Update your resume sections with live preview and instant formatting

//                             </p>
//                         </div>

//                     <div 
//                      className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
                    
//                     >
                        
//                             <h3
//                             className="text-lg font-semibold mb-3"
//                             >
//                                 Beautiful Templates
//                             </h3>
//                             <p
//                              className="text-gray-600"
//                             >
//                   Choose from modern, professional templates that are easy to customize.
//                             </p>
                        
//                     </div>


//                     <div
//                     className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
//                     >
//                         <h3
//                         className="text-lg font-semibold mb-3"
//                         >
//                             Beautiful Templates
//                         </h3>
//                         <p
//                               className="text-gray-600"
//                         >
// choose from modern, professional templates that are easy to customize.
//                         </p>
//                     </div>

                    
//                     <div
//                     className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
//                     >
//                         <h3
//                         className="text-lg font-semibold mb-3"
//                         >
//                             One-Click Export
//                         </h3>
//                         <p 
//                         className="text-gray-600"
//                         >
// Download your resume instantly as a high-quality PDF with one click.
//                         </p>
//                     </div>
//                     </div>
//                 </section>

//                 {/*Feature section end here */}




  










//             </div>
//         </section>
//     )
// }

// export default HomeLandingPage;