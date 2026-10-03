"use client";

import { useState, useEffect } from "react";
import { Save } from "lucide-react";

export default function ContactInfoPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    location: "",
    whatsappLink: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data.contact) {
          setFormData(data.contact);
        }
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: formData }),
      });
      alert("Contact details saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Info</h1>
          <p className="text-gray-500 mt-1">Manage your contact details</p>
        </div>
        <button onClick={handleSubmit} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors">
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="text" 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                placeholder="hello@example.com" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number (Direct Call)</label>
              <input 
                type="text" 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                placeholder="+1 234 567 890" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">WhatsApp Link (e.g. wa.me/+91...)</label>
              <input 
                type="text" 
                value={formData.whatsappLink} 
                onChange={e => setFormData({...formData, whatsappLink: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                placeholder="https://wa.me/..." 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input 
                type="text" 
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                placeholder="New York, USA" 
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
