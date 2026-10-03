"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

export default function CertificationPage() {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        if (data && data.certifications && Array.isArray(data.certifications)) {
          setItems(data.certifications);
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

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: any) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    setIsUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('file', e.target.files[0]);

    try {
      const res = await fetch('/api/upload-certificate', {
        method: 'POST',
        body: formDataObj,
      });
      const data = await res.json();
      if (res.ok) {
        setFormData((prev: any) => ({...prev, link: data.url}));
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
    }
  };

  const saveToServer = async (newData) => {
    try {
      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ certifications: newData }),
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
          <h1 className="text-3xl font-bold text-gray-900">Certification</h1>
          <p className="text-gray-500 mt-1">Manage your certificates.</p>
        </div>
        <button
          onClick={() => handleOpenForm(null)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Certification
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingIndex !== null ? 'Edit' : 'Add'} Certification</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Title</label>
                  <input 
                    type="text" 
                    value={formData.title || ''} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                    placeholder="e.g. AWS Certified Developer" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Provider</label>
                  <input 
                    type="text" 
                    value={formData.provider || ''} 
                    onChange={e => setFormData({...formData, provider: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                    placeholder="e.g. Amazon Web Services" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Year</label>
                  <input 
                    type="text" 
                    value={formData.year || ''} 
                    onChange={e => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#111111]/20 focus:border-[#111111]" 
                    placeholder="e.g. 2023" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Certificate File</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="file" 
                      onChange={handleFileUpload}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" 
                    />
                  </div>
                  {isUploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                  {formData.link && !isUploading && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      ✓ File uploaded: <a href={formData.link} target="_blank" rel="noopener noreferrer" className="underline truncate max-w-[200px]">{formData.link.split('/').pop()}</a>
                    </p>
                  )}
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
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.provider} {item.year ? `(${item.year})` : ''}</div>
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