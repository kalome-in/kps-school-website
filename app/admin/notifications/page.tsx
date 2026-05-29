'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Bell, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  Loader2, 
  X, 
  AlertCircle, 
  CheckCircle,
  Eye
} from 'lucide-react';

interface Notice {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  fileUrl?: string;
  date: string;
  status: 'Published' | 'Draft';
}

function NoticeManagerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Toast / Alerts
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState('Circular');
  const [formPriority, setFormPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formStatus, setFormStatus] = useState<'Published' | 'Draft'>('Published');

  // Trigger add modal if URL query param ?add=true is present
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      // Clear URL params
      router.replace('/admin/notifications');
      openAddModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/notices?local=true');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        setNotices(json.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAddModal = () => {
    setFormTitle('');
    setFormDesc('');
    setFormCategory('Circular');
    setFormPriority('Medium');
    setFormFileUrl('');
    setFormStatus('Published');
    
    // Set default publish date to today's date formatted
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
      const response = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          description: formDesc,
          category: formCategory,
          priority: formPriority,
          fileUrl: formFileUrl,
          date: formDate,
          status: formStatus
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Notice created successfully');
        setIsAddOpen(false);
        fetchNotices();
      } else {
        showToast('error', resJson.message || 'Failed to create notice');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setFormTitle(notice.title);
    setFormDesc(notice.description);
    setFormCategory(notice.category);
    setFormPriority(notice.priority);
    setFormFileUrl(notice.fileUrl || '');
    setFormDate(notice.date);
    setFormStatus(notice.status);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNotice) return;
    setActionLoading(true);

    try {
      const response = await fetch('/api/notices', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedNotice.id,
          title: formTitle,
          description: formDesc,
          category: formCategory,
          priority: formPriority,
          fileUrl: formFileUrl,
          date: formDate,
          status: formStatus
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Notice updated successfully');
        setIsEditOpen(false);
        fetchNotices();
      } else {
        showToast('error', resJson.message || 'Failed to update notice');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedNotice) return;
    setActionLoading(true);

    try {
      const response = await fetch(`/api/notices?id=${selectedNotice.id}`, {
        method: 'DELETE'
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Notice deleted successfully');
        setIsDeleteOpen(false);
        fetchNotices();
      } else {
        showToast('error', resJson.message || 'Failed to delete notice');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filters
  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeFilter === 'All' || n.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination Slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border animate-bounce ${
          toast.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-250' 
            : 'bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-300 border-red-250'
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
            placeholder="Search announcements..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs bg-slate-50 dark:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex gap-1.5 overflow-x-auto hide-scrollbar">
            {['All', 'Exam', 'Holiday', 'Circular', 'Admin', 'Academic'].map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveFilter(cat); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border cursor-pointer transition-all ${
                  activeFilter === cat
                    ? 'bg-school-orange border-school-orange text-white'
                    : 'bg-[#F9FAFB] dark:bg-zinc-800 text-slate-500 dark:text-slate-400 border-gray-100 dark:border-zinc-750 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={openAddModal}
            className="bg-school-black hover:bg-school-orange text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4" /> Create Notice
          </button>
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
            <p className="text-xs text-gray-400 font-light">Loading notices...</p>
          </div>
        ) : currentNotices.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Bell className="w-10 h-10 text-gray-300 dark:text-zinc-700 mx-auto" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No notices found.</p>
            <p className="text-xs text-gray-400 font-light">Try expanding your search query or create a new notice.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-zinc-800/20">
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Publish Date</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50 dark:divide-zinc-800/50">
                {currentNotices.map(notice => (
                  <tr key={notice.id} className="hover:bg-slate-50/55 dark:hover:bg-zinc-800/10 text-slate-700 dark:text-slate-350 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="space-y-1 max-w-[280px] sm:max-w-[400px]">
                        <span className="font-bold text-slate-800 dark:text-white block truncate">{notice.title}</span>
                        <p className="text-[10px] text-slate-450 dark:text-slate-400 truncate leading-relaxed">{notice.description}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-md border border-slate-100 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 text-slate-500">
                        {notice.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                        notice.priority === 'High' 
                          ? 'bg-red-50 dark:bg-red-950/20 text-red-655 border border-red-100 dark:border-red-900/40' 
                          : notice.priority === 'Medium'
                          ? 'bg-amber-50 dark:bg-amber-955/20 text-amber-600 border border-amber-100 dark:border-amber-900/40'
                          : 'bg-slate-50 dark:bg-zinc-800 text-slate-500 border border-slate-100 dark:border-zinc-750'
                      }`}>
                        {notice.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                        notice.status === 'Published'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 border border-emerald-100 dark:border-emerald-900/40'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-500 border border-slate-200 dark:border-zinc-750'
                      }`}>
                        {notice.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{notice.date}</td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        {notice.fileUrl && (
                          <a
                            href={notice.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-school-orange transition-colors"
                            title="View Attachment"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => openEditModal(notice)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(notice)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {!loading && totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-medium">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredNotices.length)} of {filteredNotices.length}
            </span>
            <div className="flex gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 border border-slate-100 dark:border-zinc-750 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-3 py-1 bg-slate-50 dark:bg-zinc-800 hover:bg-slate-100 border border-slate-100 dark:border-zinc-750 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* -------------------- ADD NOTICE MODAL -------------------- */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsAddOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={() => setIsAddOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Create Notice board announcement</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Notification Title *</label>
                <input
                  required
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Diwali Festival Holiday Notice"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Description / details *</label>
                <textarea
                  required
                  rows={4}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Provide circular detailed guidelines or notes..."
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white resize-none font-medium"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Circular">Circular</option>
                    <option value="Admin">Admin</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Priority *</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Attachment Link (Optional)</label>
                <input
                  type="url"
                  value={formFileUrl}
                  onChange={(e) => setFormFileUrl(e.target.value)}
                  placeholder="https://drive.google.com/... (Drive PDF, doc, or sheet URL)"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-255 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Publish Date *</label>
                  <input
                    required
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    placeholder="e.g. Oct 24, 2026"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Status *</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
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
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create and Sync'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- EDIT NOTICE MODAL -------------------- */}
      {isEditOpen && selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsEditOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Edit announcement</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Notification Title *</label>
                <input
                  required
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Description / details *</label>
                <textarea
                  required
                  rows={4}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white resize-none font-medium"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Circular">Circular</option>
                    <option value="Admin">Admin</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Priority *</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Attachment Link (Optional)</label>
                <input
                  type="url"
                  value={formFileUrl}
                  onChange={(e) => setFormFileUrl(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-255 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Publish Date *</label>
                  <input
                    required
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Status *</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
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
      {isDeleteOpen && selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-2">Delete notice</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete notice <strong className="text-slate-700 dark:text-slate-300 font-bold">&ldquo;{selectedNotice.title}&rdquo;</strong>? This action will permanently remove it from the database and Notice Board.
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
                className="bg-red-500 hover:bg-red-650 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete notice'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminNotificationsPage() {
  return (
    <Suspense fallback={
      <div className="py-24 flex items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
        <p className="text-xs text-gray-400 font-light">Initializing notices panel...</p>
      </div>
    }>
      <NoticeManagerContent />
    </Suspense>
  );
}
