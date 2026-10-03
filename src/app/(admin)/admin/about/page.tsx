"use client";

import { useState, useEffect } from "react";
import { Save, Upload } from "lucide-react";

export default function AboutPage() {
  const [formData, setFormData] = useState<any>({
    heading: "DESIGNING\nWITH PURPOSE.",
    description: "I'm Dharani Dharan, a UI/UX Designer and Web Developer focused on creating intuitive, meaningful and visually refined digital experiences.\n\nI combine design thinking, visual design, and technical expertise to transform complex ideas into simple, intuitive, and usable digital products.",
    tags: [
      "UI/UX Design",
      "Product Design",
      "Web Design",
      "Interaction Design",
      "Design Systems",
      "Frontend Understanding"
    ]
  });
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.about) {
          setFormData(data.about);
        }
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadProfileImage = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await fetch('/api/upload-hero-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        alert("Profile image successfully uploaded and updated on the site!");
        setSelectedFile(null);
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ about: formData }),
      });
      alert("About settings saved successfully!");
    } catch (err) {
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">About Section</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and stats.</p>
        </div>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Profile Image</h2>
          <p className="text-sm text-gray-500 mb-4">Upload a picture of yourself for the about section. (This shares the same image as the Hero section).</p>
          
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {selectedFile ? (
                <span className="text-gray-600 text-xs text-center px-2">{selectedFile.name}</span>
              ) : (
                <span className="text-gray-400 text-xs">No Image</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200" 
              />
              <button 
                onClick={uploadProfileImage}
                disabled={!selectedFile || isUploading}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Upload size={18} />
                {isUploading ? "Uploading..." : "Upload New Image"}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Section Heading</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">About Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tags (Comma separated)</label>
            <input
              type="text"
              name="tags"
              value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''}
              onChange={(e) => {
                const tagArray = e.target.value.split(',').map(tag => tag.trimStart());
                setFormData((prev: any) => ({ ...prev, tags: tagArray }));
              }}
              placeholder="UI/UX Design, Web Design, Product Design"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
            />
          </div>

        </form>
      </div>
    </div>
  );
}