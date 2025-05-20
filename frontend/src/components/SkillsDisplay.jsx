import React from 'react';
import { Mail, Briefcase, GraduationCap, User, BadgeCheck } from 'lucide-react';

const SkillsDisplay = ({ data }) => {
  const { name, email, experience, skills = [], education = [] } = data || {};

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-fadeIn max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <BadgeCheck className="text-blue-600 h-6 w-6" />
        Resume Summary
      </h2>

      <div className="space-y-4"> 
        <div className="flex items-center gap-3">
          <User className="text-gray-500 h-5 w-5" />
          <p className="text-gray-800 font-medium">{name || 'N/A'}</p>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-gray-500 h-5 w-5" />
          <p className="text-gray-600">{email || 'N/A'}</p>
        </div>
 
        {/* <div className="flex items-center gap-3">
          <Briefcase className="text-gray-500 h-5 w-5" />
          <p className="text-gray-600">Experience: <span className="font-medium text-gray-800">{experience || 'N/A'}</span></p>
        </div> */}
 
        {/* <div>
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-500" />
            Education
          </h3>
          {education.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {education.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No education info available.</p>
          )}
        </div> */}
 
        <div>
          <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-green-500" />
            Skills
          </h3>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No skills listed.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsDisplay;
