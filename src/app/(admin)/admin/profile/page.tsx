"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function AdminProfilePage() {
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Admin Profile settings saved (UI only)!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadResume = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const res = await fetch('/api/upload-resume', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Resume successfully uploaded and updated on the site!");
        setSelectedFile(null);
      } else {
        alert(data.error || "Failed to upload resume");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-500 mt-1">Manage your admin account credentials</p>
        </div>
        <button onClick={handleSubmit} className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="Admin Name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="admin@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="Leave blank to keep current" />
            </div>
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resume Document</h3>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Upload PDF Resume (replaces /resume.pdf)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="file" 
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#111111] file:text-white hover:file:bg-gray-800" 
                  />
                  <button 
                    type="button"
                    onClick={uploadResume}
                    disabled={!selectedFile || isUploading}
                    className="shrink-0 px-6 py-2 bg-[#D8FF3E] text-black font-medium rounded-lg hover:bg-[#c4f02b] disabled:opacity-50 transition-colors"
                  >
                    {isUploading ? "Uploading..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}