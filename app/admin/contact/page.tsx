'use client';

import { useState, useEffect } from 'react';
import { 
  MailOpen, 
  Mail, 
  Search, 
  Trash2, 
  X, 
  Loader2, 
  User, 
  Phone, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Eye
} from 'lucide-react';

interface ContactQuery {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function AdminContactPage() {
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Alerts
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<ContactQuery | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/contact-queries');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        setQueries(json.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load contact queries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDetailsModal = async (query: ContactQuery) => {
    setSelectedQuery(query);
    setIsDetailsOpen(true);
    
    // Automatically mark as read if it is unread
    if (!query.read) {
      try {
        const response = await fetch('/api/contact-queries', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: query.id, read: true })
        });
        if (response.ok) {
          // Update local state directly
          setQueries(prev => prev.map(q => q.id === query.id ? { ...q, read: true } : q));
        }
      } catch (err) {
        console.error('Failed to mark query as read:', err);
      }
    }
  };

  const toggleReadStatus = async (query: ContactQuery) => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/contact-queries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: query.id, read: !query.read })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', `Query marked as ${!query.read ? 'read' : 'unread'}`);
        fetchQueries();
      } else {
        showToast('error', 'Failed to update status');
      }
    } catch (err) {
      showToast('error', 'Network error occurred');
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (query: ContactQuery) => {
    setSelectedQuery(query);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedQuery) return;
    setActionLoading(true);

    try {
      const response = await fetch(`/api/contact-queries?id=${selectedQuery.id}`, {
        method: 'DELETE'
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Contact message deleted successfully');
        setIsDeleteOpen(false);
        fetchQueries();
      } else {
        showToast('error', resJson.message || 'Failed to delete query');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filters & Search
  const filteredQueries = queries.filter(q => 
    q.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.phone.includes(searchQuery)
  );

  // Pagination Slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedQueries = filteredQueries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredQueries.length / itemsPerPage);

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
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
            placeholder="Search contact queries..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs bg-slate-50 dark:bg-zinc-850 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Counter Info */}
        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          Unread messages: <span className="text-school-orange font-black">{queries.filter(q => !q.read).length}</span>
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
            <p className="text-xs text-gray-400 font-light">Loading queries...</p>
          </div>
        ) : paginatedQueries.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Mail className="w-10 h-10 text-gray-300 dark:text-zinc-700 mx-auto" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No contact messages found.</p>
            <p className="text-xs text-gray-400 font-light">Form submissions from the contact page will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-zinc-800/20">
                  <th className="p-4 pl-6">Sender Name</th>
                  <th className="p-4">Message Clip</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50 dark:divide-zinc-800/50">
                {paginatedQueries.map(query => (
                  <tr 
                    key={query.id} 
                    className={`hover:bg-slate-50/55 dark:hover:bg-zinc-800/10 text-slate-700 dark:text-slate-350 transition-colors ${
                      !query.read ? 'font-bold bg-amber-50/20 dark:bg-amber-950/5' : ''
                    }`}
                  >
                    <td className="p-4 pl-6">
                      <button onClick={() => openDetailsModal(query)} className="text-left font-bold text-slate-800 dark:text-white hover:text-school-orange transition-colors flex items-center gap-2">
                        {!query.read && <span className="w-1.5 h-1.5 bg-school-orange rounded-full shrink-0 animate-ping"></span>}
                        {query.name}
                      </button>
                    </td>
                    <td className="p-4 max-w-[280px]">
                      <p className="truncate text-slate-500 dark:text-slate-400 leading-relaxed font-light">{query.message}</p>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-450 space-y-0.5">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {query.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {query.phone}</div>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{new Date(query.timestamp).toLocaleString()}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleReadStatus(query)}
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                          query.read
                            ? 'bg-slate-50 dark:bg-zinc-800 text-slate-500 border-slate-100 dark:border-zinc-750'
                            : 'bg-amber-50 dark:bg-amber-955/20 text-amber-600 border border-amber-100 dark:border-amber-900/40'
                        }`}
                      >
                        {query.read ? 'Read' : 'Unread'}
                      </button>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => openDetailsModal(query)}
                          className="p-1.5 text-slate-400 hover:text-blue-650 transition-colors cursor-pointer"
                          title="Open Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(query)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete Query"
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
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredQueries.length)} of {filteredQueries.length}
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
      </div>

      {/* -------------------- DETAILS VIEW MODAL -------------------- */}
      {isDetailsOpen && selectedQuery && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDetailsOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsDetailsOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Website Contact Inquiry Message</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Sender Name</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedQuery.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Submitted On</span>
                  <span className="font-medium text-slate-550 dark:text-slate-400">{new Date(selectedQuery.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address</span>
                  <span className="font-medium text-slate-705 dark:text-slate-300">{selectedQuery.email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone Number</span>
                  <span className="font-medium text-slate-705 dark:text-slate-300">{selectedQuery.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Message Content</span>
                <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 p-4 rounded-2xl text-xs text-slate-655 dark:text-slate-300 leading-relaxed max-h-56 overflow-y-auto font-medium">
                  {selectedQuery.message}
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="bg-school-black hover:bg-school-orange text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- DELETE CONFIRMATION MODAL -------------------- */}
      {isDeleteOpen && selectedQuery && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-2">Delete Contact Message</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete this message from <strong className="text-slate-700 dark:text-slate-350 font-bold">{selectedQuery.name}</strong>? This action is permanent.
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
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete message'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
