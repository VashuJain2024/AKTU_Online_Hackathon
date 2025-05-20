import React from 'react';
import { Award, Users, Globe, Cpu } from 'lucide-react';

const AboutPage = () => {
    const stats = [
        { number: "50K+", label: "Resumes Analyzed" },
        { number: "98%", label: "Accuracy Rate" },
        { number: "24/7", label: "Support Available" },
        { number: "150+", label: "Countries Served" }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            image: "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg"
        },
        {
            name: "Michael Chen",
            role: "Chief Technology Officer",
            image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Product",
            image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
        }
    ];

    return (
        <main className="flex-grow py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        About SkillScan
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We're on a mission to help professionals showcase their skills and advance their careers
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {stat.number}
                            </div>
                            <div className="text-gray-600">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Story
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Founded in 2025, SkillScan began with a simple idea: make it easier for professionals to identify and showcase their skills in an increasingly competitive job market.
                        </p>
                        <p className="text-gray-600">
                            Today, we're proud to help thousands of job seekers optimize their resumes and advance their careers through our innovative AI-powered platform.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <div className="space-y-4">
                            {[
                                { icon: <Award className="h-6 w-6 text-blue-600" />, title: "Excellence" },
                                { icon: <Users className="h-6 w-6 text-blue-600" />, title: "User-Focused" },
                                { icon: <Globe className="h-6 w-6 text-blue-600" />, title: "Accessibility" },
                                { icon: <Cpu className="h-6 w-6 text-blue-600" />, title: "Innovation" }
                            ].map((value, index) => (
                                <div key={index} className="flex items-center">
                                    {value.icon}
                                    <span className="ml-3 text-gray-700">{value.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Our Team
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AboutPage;
