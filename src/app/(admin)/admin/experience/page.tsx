"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

type Experience = {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    duration: "",
    responsibilities: ""
  });

  useEffect(() => {
    fetch('/api/experience')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setExperiences(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEditing) {
        setIsEditing(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing]);

  const saveToServer = async (newData: Experience[]) => {
    try {
      await fetch('/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
    } catch (error) {
      console.error("Failed to save", error);
    }
  };

  const handleOpenForm = (id: string | null = null) => {
    if (id !== null) {
      const exp = experiences.find(e => e.id === id);
      if (exp) {
        setFormData({ 
          company: exp.company, 
          position: exp.position, 
          duration: exp.duration, 
          responsibilities: exp.responsibilities.join("\\n") 
        });
        setEditingId(id);
      }
    } else {
      setFormData({ company: "", position: "", duration: "", responsibilities: "" });
      setEditingId(null);
    }
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      const newData = experiences.filter(exp => exp.id !== id);
      setExperiences(newData);
      saveToServer(newData);
    }
  };

  const handleSave = () => {
    if (!formData.company || !formData.position) {
      alert("Company and Job Title are required.");
      return;
    }

    const responsibilitiesArray = formData.responsibilities
      .split("\\n")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    let newData;
    if (editingId !== null) {
      // Update existing
      newData = experiences.map(exp => 
        exp.id === editingId 
          ? { ...exp, company: formData.company, position: formData.position, duration: formData.duration, responsibilities: responsibilitiesArray } 
          : exp
      );
    } else {
      // Add new
      const newId = Date.now().toString();
      newData = [...experiences, { id: newId, company: formData.company, position: formData.position, duration: formData.duration, responsibilities: responsibilitiesArray }];
    }
    
    setExperiences(newData);
    saveToServer(newData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experience</h1>
          <p className="text-gray-500 mt-1">Manage your work history and professional experience.</p>
        </div>
        <button
          onClick={() => handleOpenForm(null)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Experience" : "Add New Experience"}</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto space-y-6 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                      placeholder="e.g. Google" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Job Title</label>
                    <input 
                      type="text" 
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                      placeholder="e.g. Senior Frontend Engineer" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Duration</label>
                    <input 
                      type="text" 
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                      placeholder="e.g. Jan 2020 - Present" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description / Responsibilities (One per line)</label>
                  <textarea 
                    rows={4} 
                    value={formData.responsibilities}
                    onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111] resize-none" 
                    placeholder="Designed intuitive experiences...&#10;Collaborated with stakeholders..."
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 shrink-0 bg-gray-50">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Save size={18} />
                  {editingId ? "Update Experience" : "Save Experience"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Role & Company</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{exp.position}</div>
                  <div className="text-sm text-gray-500">{exp.company}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {exp.duration}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button 
                    onClick={() => handleOpenForm(exp.id)}
                    className="text-blue-600 hover:text-blue-800 transition-colors" 
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-600 hover:text-red-800 transition-colors" 
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No experience entries found. Click "Add Experience" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}