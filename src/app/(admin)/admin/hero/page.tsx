"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function HeroPage() {
  const [formData, setFormData] = useState<any>({
    greeting: "HELLO, I'M",
    name: "DHARANI DHARAN",
    title: "UI/UX Designer, Full Stack Developer",
    subtitle: "I design intuitive digital experiences and build modern web products that turn complex ideas into simple, engaging solutions.",
    primaryButtonText: "View Selected Work",
    secondaryButtonText: "Let's Work Together",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.hero) {
          setFormData(data.hero);
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

  const uploadHeroImage = async () => {
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
        alert("Hero image successfully uploaded and updated on the site!");
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
        body: JSON.stringify({ hero: formData }),
      });
      alert("Hero settings saved successfully!");
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
          <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
          <p className="text-gray-500 mt-1">Manage the content of your landing page hero section.</p>
        </div>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="pb-6 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Hero Image</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Upload new image (replaces existing hero image)</label>
              <div className="flex items-center gap-4">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#111111] file:text-white hover:file:bg-gray-800" 
                />
                <button 
                  type="button"
                  onClick={uploadHeroImage}
                  disabled={!selectedFile || isUploading}
                  className="shrink-0 px-6 py-2 bg-[#D8FF3E] text-black font-medium rounded-lg hover:bg-[#c4f02b] disabled:opacity-50 transition-colors"
                >
                  {isUploading ? "Uploading..." : "Upload Image"}
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Greeting</label>
              <input
                type="text"
                name="greeting"
                value={formData.greeting}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Professional Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Subtitle / Bio</label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111] resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Primary Button Text</label>
              <input
                type="text"
                name="primaryButtonText"
                value={formData.primaryButtonText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Secondary Button Text</label>
              <input
                type="text"
                name="secondaryButtonText"
                value={formData.secondaryButtonText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}