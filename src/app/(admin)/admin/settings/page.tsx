"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings settings saved (UI only)!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Global site settings</p>
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
              <label className="text-sm font-medium text-gray-700">Site Title</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="Dharani Dharan - Portfolio" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Site Description</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="Meta description for SEO" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Google Analytics ID</label>
              <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}