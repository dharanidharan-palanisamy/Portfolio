"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

export default function ProjectsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setItems(data);
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

  const saveToServer = async (newData: any) => {
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenForm = (id: any = null) => {
    if (id !== null) {
      const proj = items.find(i => i.id === id);
      setFormData({...proj});
      setEditingId(id);
    } else {
        setFormData({
        id: Date.now().toString(),
        title: "", projectType: "web", category: "", shortDescription: "", 
        technologies: [], role: "", timeline: "", year: "", slug: "", imageUrl: "", liveUrl: "", challenge: "", objective: "", process: [], gridSpan: "col-span-12 md:col-span-6 lg:col-span-4"
      });
      setEditingId(null);
    }
    setIsEditing(true);
  };

  const handleDelete = (id: any) => {
    if (confirm("Are you sure?")) {
      const newData = items.filter(i => i.id !== id);
      setItems(newData);
      saveToServer(newData);
    }
  };

  const handleSave = () => {
    let newData = [...items];
    
    // Ensure technologies is an array if edited as comma separated string
    let finalData = {...formData};
    if (typeof finalData.technologies === 'string') {
      finalData.technologies = finalData.technologies.split(',').map((s: any) => s.trim()).filter((s: any) => s.length > 0);
    }
    
    if (typeof finalData.process === 'string') {
      finalData.process = finalData.process.split(',').map((s: any) => s.trim()).filter((s: any) => s.length > 0);
    }

    if (!finalData.slug) {
      finalData.slug = finalData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (editingId !== null) {
      const index = newData.findIndex(i => i.id === editingId);
      newData[index] = finalData;
    } else {
      newData.push(finalData);
    }
    setItems(newData);
    saveToServer(newData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage your portfolio projects.</p>
        </div>
        <button
          onClick={() => handleOpenForm(null)}
          className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? 'Edit' : 'Add'} Project</h2>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <form className="flex flex-col flex-1 overflow-hidden">
              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Title</label>
                    <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Type</label>
                    <select value={formData.projectType || 'web'} onChange={e => setFormData({...formData, projectType: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none">
                      <option value="web">Web Development</option>
                      <option value="design">UI/UX Design</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <input type="text" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Timeline</label>
                    <input type="text" value={formData.timeline || ''} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" placeholder="e.g. 3 Months" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Year</label>
                    <input type="text" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Image URL</label>
                    <input type="text" value={formData.imageUrl || ''} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" placeholder="/projects/image.jpg" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Live URL</label>
                    <input type="text" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Short Description</label>
                    <textarea rows={3} value={formData.shortDescription || ''} onChange={e => setFormData({...formData, shortDescription: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none resize-none"></textarea>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Technologies (comma separated)</label>
                    <input type="text" value={Array.isArray(formData.technologies) ? formData.technologies.join(', ') : formData.technologies || ''} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">The Challenge</label>
                    <textarea rows={3} value={formData.challenge || ''} onChange={e => setFormData({...formData, challenge: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none resize-none" placeholder="Users struggled with complex navigation..."></textarea>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">The Objective</label>
                    <textarea rows={3} value={formData.objective || ''} onChange={e => setFormData({...formData, objective: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none resize-none" placeholder="To simplify the user journey..."></textarea>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Design Process (comma separated)</label>
                    <input type="text" value={Array.isArray(formData.process) ? formData.process.join(', ') : formData.process || ''} onChange={e => setFormData({...formData, process: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none" placeholder="Discover, Define, Explore, Design, Validate, Deliver" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-100 shrink-0 bg-gray-50">
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-[#111111] text-white rounded-lg hover:bg-gray-800 transition-colors">
                  <Save size={18} />
                  Save Project
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
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">Type / Year</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {item.imageUrl && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium text-gray-900">{item.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 capitalize">{item.projectType}</div>
                  <div className="text-xs text-gray-500">{item.year}</div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button onClick={() => handleOpenForm(item.id)} className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
