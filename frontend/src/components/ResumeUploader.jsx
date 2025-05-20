import React, { useState, useRef } from 'react';
import { UploadCloud, File, X, Check, AlertCircle, Loader } from 'lucide-react';
import SkillsDisplay from './SkillsDisplay';
import { extractSkills } from '../services/apiService';
import { ProcessingStatus } from '../types';

const ResumeUploader = () => {
  const [fileState, setFileState] = useState({
    file: null,
    status: ProcessingStatus.IDLE,
    error: null
  });
  const [resumeData, setResumeData] = useState(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileState.status !== ProcessingStatus.PROCESSING) {
      dropZoneRef.current?.classList.add('border-blue-500', 'bg-blue-50');
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.remove('border-blue-500', 'bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.remove('border-blue-500', 'bg-blue-50');

    if (fileState.status === ProcessingStatus.PROCESSING) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelection(file);
    }
  };

  const handleFileSelection = async (file) => {
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      setFileState({
        file: null,
        status: ProcessingStatus.ERROR,
        error: 'Please upload a PDF or text file'
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileState({
        file: null,
        status: ProcessingStatus.ERROR,
        error: 'File size must be less than 5MB'
      });
      return;
    }

    setFileState({
      file,
      status: ProcessingStatus.PROCESSING,
      error: null
    });
    setResumeData(null);

    try {
      const extractedData = await extractSkills(file);
      setFileState({
        file,
        status: ProcessingStatus.COMPLETED,
        error: null
      });
      setResumeData(extractedData);
    } catch (error) {
      setFileState({
        file,
        status: ProcessingStatus.ERROR,
        error: 'Failed to extract skills. Please try again.'
      });
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setFileState({
      file: null,
      status: ProcessingStatus.IDLE,
      error: null
    });
    setResumeData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderUploadState = () => {
    switch (fileState.status) {
      case ProcessingStatus.IDLE:
        return (
          <div className="text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
              >
                <span onClick={handleBrowseClick}>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  ref={fileInputRef}
                  onChange={handleFileInputChange}
                  accept=".pdf,.txt"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">PDF or TXT up to 5MB</p>
          </div>
        );

      case ProcessingStatus.PROCESSING:
        return (
          <div className="text-center">
            <Loader className="mx-auto h-12 w-12 text-blue-500 animate-spin" />
            <p className="mt-4 text-sm text-gray-600">Processing your resume...</p>
            <p className="text-xs text-gray-500 mt-1">This may take a few moments</p>
          </div>
        );

      case ProcessingStatus.COMPLETED:
        return (
          <div className="text-center">
            <div className="flex items-center justify-center">
              <File className="h-10 w-10 text-gray-400" />
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-gray-900">{fileState.file?.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(fileState.file?.size)}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Change
                </button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center text-sm">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-600">Successfully processed</span>
            </div>
          </div>
        );

      case ProcessingStatus.ERROR:
        return (
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <p className="mt-4 text-sm text-red-600">{fileState.error}</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const formatFileSize = (size) => {
    if (!size) return '';
    const kb = size / 1024;
    return kb < 1024
      ? `${Math.round(kb * 10) / 10} KB`
      : `${Math.round((kb / 1024) * 10) / 10} MB`;
  };

  return (
    <div className="space-y-8">
      <div
        ref={dropZoneRef}
        className={`border-2 border-dashed rounded-lg p-8 transition-colors duration-200 ${fileState.status === ProcessingStatus.ERROR
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {renderUploadState()}
      </div>

      {fileState.status === ProcessingStatus.COMPLETED && resumeData && (
        <SkillsDisplay data={resumeData} />
      )}
    </div>
  );
};

export default ResumeUploader;
