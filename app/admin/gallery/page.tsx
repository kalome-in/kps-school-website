'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string; // Event Name
  tags: string[]; // Category
  image: string; // Google Drive image link or direct URL
  date: string;
  type: 'photo' | 'video';
  videoUrl?: string;
  desc?: string;
}

function parseGoogleDriveLink(url: string): string {
  if (!url) return '';
  const fileDMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileDMatch && fileDMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileDMatch[1]}`;
  }
  const idMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (idMatch && idMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
  }
  return url;
}

function GalleryManagerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Toast
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Activities');
  const [formImage, setFormImage] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formDesc, setFormDesc] = useState('');

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      router.replace('/admin/gallery');
      openAddModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery?local=true');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        setItems(json.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddModal = () => {
    setFormTitle('');
    setFormCategory('Activities');
    setFormImage('');
    setFormDesc('');
    
    const today = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
    setFormDate(today);
    setIsAddOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          category: formCategory,
          image: formImage,
          date: formDate,
          desc: formDesc,
          type: 'photo'
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Gallery entry created successfully');
        setIsAddOpen(false);
        fetchItems();
      } else {
        showToast('error', resJson.message || 'Failed to create gallery item');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setFormTitle(item.title);
    setFormCategory(item.tags[0] || 'Activities');
    setFormImage(item.image);
    setFormDate(item.date);
    setFormDesc(item.desc || '');
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    setActionLoading(true);

    try {
      const response = await fetch('/api/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedItem.id,
          title: formTitle,
          category: formCategory,
          image: formImage,
          date: formDate,
          desc: formDesc
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Gallery item updated successfully');
        setIsEditOpen(false);
        fetchItems();
      } else {
        showToast('error', resJson.message || 'Failed to update item');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    setActionLoading(true);

    try {
      const response = await fetch(`/api/gallery?id=${selectedItem.id}`, {
        method: 'DELETE'
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Gallery entry deleted successfully');
        setIsDeleteOpen(false);
        fetchItems();
      } else {
        showToast('error', resJson.message || 'Failed to delete entry');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filters
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || item.tags.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Annual Day', 'Festivals', 'Achievements', 'Activities', 'Campus Life', 'Sports'];

  // Pagination Slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const previewImageLink = parseGoogleDriveLink(formImage);

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-250' 
            : 'bg-red-50 dark:bg-red-955 text-red-800 dark:text-red-300 border-red-250'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-150 dark:border-zinc-800 shadow-sm">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search album event names..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs bg-slate-50 dark:bg-zinc-850 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border cursor-pointer transition-all ${
                  activeCategory === cat
                    ? 'bg-school-orange border-school-orange text-white shadow-xs'
                    : 'bg-[#F9FAFB] dark:bg-zinc-800 text-slate-500 dark:text-slate-400 border-gray-100 dark:border-zinc-750 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={openAddModal}
            className="bg-school-black hover:bg-school-orange text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" /> Upload Entry
          </button>
        </div>

      </div>

      {/* Grid Display */}
      {loading ? (
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl py-24 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
          <p className="text-xs text-gray-400 font-light">Loading gallery manager...</p>
        </div>
      ) : paginatedItems.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl py-20 text-center space-y-3 shadow-sm">
          <ImageIcon className="w-10 h-10 text-gray-300 dark:text-zinc-700 mx-auto" />
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No custom uploads found.</p>
          <p className="text-xs text-gray-400 font-light">Newly uploaded photos will show up here. Presets are shown on the main website.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
              
              {/* Photo Frame */}
              <div className="relative h-44 bg-slate-50 dark:bg-zinc-800 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero_banner.jpg';
                    }}
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-300" />
                )}
                
                {/* Floating Category tag */}
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white border border-white/10 text-[8px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {item.tags[0] || 'Gallery'}
                </span>
              </div>

              {/* Card Body details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm line-clamp-1 leading-snug">{item.title}</h4>
                  <p className="text-[10px] text-slate-450 dark:text-slate-400 line-clamp-2 leading-relaxed">{item.desc || 'Uploaded to KPS School Memories.'}</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-50 dark:border-zinc-800/85">
                  <span className="text-[9px] font-extrabold text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-350" /> {item.date}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-850 hover:text-blue-650 cursor-pointer"
                      title="Edit Entry"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(item)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-zinc-850 hover:text-red-500 cursor-pointer"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Pagination Footer */}
      {!loading && totalPages > 1 && (
        <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl p-4 flex items-center justify-between shadow-sm">
          <span className="text-[10px] text-gray-400 font-medium">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-3 py-1 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 border border-slate-100 dark:border-zinc-750 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer disabled:opacity-50"
            >
              Prev
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-3 py-1 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 border border-slate-100 dark:border-zinc-750 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* -------------------- ADD IMAGE ENTRY MODAL -------------------- */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsAddOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsAddOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Upload Image to website Gallery</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Event Name *</label>
                  <input
                    required
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Science Fair Exhibition"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-255 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Google Drive Image Link *</label>
                <div className="relative">
                  <input
                    required
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://drive.google.com/file/d/FILE_ID/view"
                    className="w-full pl-9 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* LIVE CONVERTED PREVIEW PANEL */}
              {formImage && (
                <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 p-4 rounded-2xl space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-school-orange animate-pulse" /> Automatically Resolved URL (Real-time Preview):
                  </span>
                  <div className="relative h-32 w-full bg-white dark:bg-zinc-900 border border-gray-150 rounded-xl overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewImageLink}
                      alt="Drive Live Preview"
                      className="h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eee"/><text x="50" y="55" font-size="10" font-family="sans-serif" text-anchor="middle" fill="%23aaa">Invalid Drive Link / No Image</text></svg>';
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-light truncate">{previewImageLink}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Event Date *</label>
                  <input
                    required
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g. Oct 28, 2026"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Short Description</label>
                  <input
                    type="text"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Brief memories description..."
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-750 text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-school-orange hover:bg-school-yellow hover:text-school-black text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish to site'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- EDIT IMAGE ENTRY MODAL -------------------- */}
      {isEditOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsEditOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Edit Gallery Entry</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Event Name *</label>
                  <input
                    required
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-255 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Google Drive Image Link *</label>
                <div className="relative">
                  <input
                    required
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                  <LinkIcon className="w-3.5 h-3.5 text-slate-450 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* LIVE CONVERTED PREVIEW PANEL */}
              {formImage && (
                <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 p-4 rounded-2xl space-y-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Automatically Converted Link Preview:</span>
                  <div className="relative h-32 w-full bg-white dark:bg-zinc-900 border border-gray-150 rounded-xl overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewImageLink}
                      alt="Drive Live Preview"
                      className="h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23eee"/><text x="50" y="55" font-size="10" font-family="sans-serif" text-anchor="middle" fill="%23aaa">Invalid Image Link</text></svg>';
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-light truncate">{previewImageLink}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Event Date *</label>
                  <input
                    required
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Short Description</label>
                  <input
                    type="text"
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-750 text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-school-orange hover:bg-school-yellow hover:text-school-black text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
                >
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- DELETE CONFIRMATION MODAL -------------------- */}
      {isDeleteOpen && selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-2">Delete Gallery Entry</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete gallery photo entry <strong className="text-slate-700 dark:text-slate-350 font-bold">&ldquo;{selectedItem.title}&rdquo;</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-750 text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={actionLoading}
                className="bg-red-500 hover:bg-red-650 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete photo'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminGalleryPage() {
  return (
    <Suspense fallback={
      <div className="py-24 flex items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
        <p className="text-xs text-gray-400 font-light">Initializing gallery module...</p>
      </div>
    }>
      <GalleryManagerContent />
    </Suspense>
  );
}
