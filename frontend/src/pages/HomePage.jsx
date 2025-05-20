import React from 'react';
import { UploadCloud, Zap, Shield, Users } from 'lucide-react';
import ResumeUploader from '../components/ResumeUploader';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Instant Analysis",
      description: "Get your skills analyzed in seconds with our advanced AI technology"
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Secure Processing",
      description: "Your documents are processed securely and never stored on our servers"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "ATS Optimization",
      description: "Ensure your resume is optimized for Applicant Tracking Systems"
    }
  ];

  const nav = useNavigate();

  return (
    <>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Extract Skills from Your Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your resume and let our AI instantly analyze and categorize your professional skills
            </p>
          </div>

          <ResumeUploader />

          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose SkillScan?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Optimize Your Resume?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of professionals who use SkillScan to improve their job applications
              </p>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-200" onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                nav('/')
              }}>
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
