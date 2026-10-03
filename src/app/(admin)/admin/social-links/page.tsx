"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function SocialLinksPage() {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.socialLinks) {
          setFormData(data.socialLinks);
        }
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ socialLinks: formData }),
      });
      alert("Social Links saved successfully!");
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
          <h1 className="text-3xl font-bold text-gray-900">Social Links</h1>
          <p className="text-gray-500 mt-1">Manage your social media profiles</p>
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
              <label className="text-sm font-medium text-gray-700">LinkedIn URL</label>
              <input type="text" value={formData.linkedin || ''} onChange={e => setFormData({...formData, linkedin: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="https://linkedin.com/in/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">GitHub URL</label>
              <input type="text" value={formData.github || ''} onChange={e => setFormData({...formData, github: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="https://github.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Twitter URL</label>
              <input type="text" value={formData.twitter || ''} onChange={e => setFormData({...formData, twitter: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="https://twitter.com/..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Behance URL</label>
              <input type="text" value={formData.behance || ''} onChange={e => setFormData({...formData, behance: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="https://behance.net/..." />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}