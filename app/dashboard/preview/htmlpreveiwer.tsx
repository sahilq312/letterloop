"use client"
import React, { useState, ChangeEvent } from 'react';

const HtmlPreviewer: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value);
  };

  return (
    <div className="w-full h-[100vh] flex gap-6 p-4 bg-gray-100">
  {/* HTML Input Section */}
  <div className="flex-1 border border-gray-300 shadow-lg rounded-lg bg-white">
    <h3 className="text-lg font-semibold bg-gray-800 text-white p-4 rounded-t-lg">HTML Input</h3>
    <textarea
      className="w-full h-full p-4 border-none outline-none resize-none rounded-b-lg"
      rows={20}
      value={htmlContent}
      onChange={handleInputChange}
      style={{ minHeight: '400px' }}
    />
  </div>

  {/* Live Preview Section */}
  <div className="flex-1 border border-gray-300 shadow-lg rounded-lg bg-white">
    <h3 className="text-lg font-semibold bg-gray-800 text-white p-4 rounded-t-lg">Live Preview</h3>
    <div className="flex justify-center items-center p-4">
      <iframe
        className="w-full h-full border-none rounded-lg"
        style={{ minHeight: '800px' }}
        srcDoc={htmlContent}
      />
    </div>
  </div>
</div>

  );
};

export default HtmlPreviewer;

