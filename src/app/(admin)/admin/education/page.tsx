"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

export default function EducationPage() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data && data.education && Array.isArray(data.education)) {
          setItems(data.education);
        }
      });
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

  const saveToServer = async (newData) => {
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ education: newData }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenForm = (index = null) => {
    if (index !== null) {
      setFormData(items[index]);
      setEditingIndex(index);
    } else {
      setFormData({});
      setEditingIndex(null);
    }
    setIsEditing(true);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure?")) {
      const newData = [...items];
      newData.splice(index, 1);
      setItems(newData);
      saveToServer(newData);
    }
  };

  const handleSave = () => {
    let newData = [...items];
    if (editingIndex !== null) {
      newData[editingIndex] = formData;
    } else {
      newData.push(formData);
    }
    setItems(newData);
    saveToServer(newData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Education</h1>
          <p className="text-gray-500 mt-1">Manage your educational background.</p>
        </div>
        <button
          onClick={() => handleOpenForm(null)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingIndex !== null ? 'Edit' : 'Add'} Education</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Degree</label>
                  <input 
                    type="text" 
                    value={formData.degree || ''} 
                    onChange={e => setFormData({...formData, degree: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                    placeholder="e.g. BSc Computer Science" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Institution</label>
                  <input 
                    type="text" 
                    value={formData.institution || ''} 
                    onChange={e => setFormData({...formData, institution: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                    placeholder="e.g. University of Design" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Duration / Year</label>
                  <input 
                    type="text" 
                    value={formData.year || ''} 
                    onChange={e => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                    placeholder="e.g. 2018 - 2022" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Save size={18} />
                  Save
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
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{item.degree}</div>
                  <div className="text-sm text-gray-500">{item.institution} {item.year ? `(${item.year})` : ''}</div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleOpenForm(idx)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(idx)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                  No entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}