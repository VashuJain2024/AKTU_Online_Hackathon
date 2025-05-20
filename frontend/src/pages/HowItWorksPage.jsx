import React from 'react';
import { Upload, Search, List, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorksPage = () => {
    const steps = [
        {
            icon: <Upload className="h-8 w-8 text-blue-600" />,
            title: "Upload Your Resume",
            description: "Simply drag and drop your resume in PDF or text format. We support files up to 5MB."
        },
        {
            icon: <Search className="h-8 w-8 text-blue-600" />,
            title: "AI Analysis",
            description: "Our advanced AI technology scans your resume and identifies key skills and competencies."
        },
        {
            icon: <List className="h-8 w-8 text-blue-600" />,
            title: "Review Results",
            description: "Get a comprehensive list of your skills, categorized by type and industry relevance."
        },
        {
            icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
            title: "Export and Use",
            description: "Download your results or copy them directly to use in your job applications."
        }
    ];

    const nav = useNavigate();

    return (
        <main className="flex-grow py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        How SkillScan Works
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Our simple four-step process helps you identify and showcase your professional skills
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Start Optimizing Your Resume Today
                        </h2>
                        <p className="text-lg opacity-90 mb-8">
                            Join thousands of professionals who use SkillScan to improve their job applications
                        </p>
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors duration-200" onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            nav('/')
                        }}>
                            Try It Free
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default HowItWorksPage;
