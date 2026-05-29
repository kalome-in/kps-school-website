'use client';

import { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Search, 
  Download, 
  Trash2, 
  X, 
  Loader2, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  AlertCircle,
  CheckCircle,
  GraduationCap
} from 'lucide-react';

interface Admission {
  id: number;
  parentName: string;
  studentName: string;
  email: string;
  phone: string;
  grade: string;
  message?: string;
  timestamp: string;
}

export default function AdminAdmissionsPage() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Alerts
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchAdmissions = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admissions');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        setAdmissions(json.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load admissions inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openDetailsModal = (admission: Admission) => {
    setSelectedAdmission(admission);
    setIsDetailsOpen(true);
  };

  const openDeleteModal = (admission: Admission) => {
    setSelectedAdmission(admission);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedAdmission) return;
    setActionLoading(true);

    try {
      const response = await fetch(`/api/admissions?id=${selectedAdmission.id}`, {
        method: 'DELETE'
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Admission inquiry deleted successfully');
        setIsDeleteOpen(false);
        fetchAdmissions();
      } else {
        showToast('error', resJson.message || 'Failed to delete inquiry');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  // Export CSV Helper
  const exportToCSV = () => {
    if (admissions.length === 0) {
      showToast('error', 'No admissions data available to export');
      return;
    }

    const headers = ['ID', 'Student Name', 'Parent/Guardian Name', 'Email', 'Phone', 'Grade Applying For', 'Message', 'Timestamp'];
    
    const rows = admissions.map(a => [
      a.id,
      `"${a.studentName.replace(/"/g, '""')}"`,
      `"${a.parentName.replace(/"/g, '""')}"`,
      `"${a.email.replace(/"/g, '""')}"`,
      a.phone,
      `"${a.grade}"`,
      `"${(a.message || '').replace(/"/g, '""')}"`,
      `"${new Date(a.timestamp).toLocaleString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kps_admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast('success', 'CSV downloaded successfully!');
  };

  // Filters & Search
  const filteredAdmissions = admissions.filter(a => {
    const matchesSearch = a.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.phone.includes(searchQuery) ||
                          a.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || a.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  // Unique Grades for filtering
  const grades = ['All', 'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  // Pagination Slice
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedAdmissions = filteredAdmissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAdmissions.length / itemsPerPage);

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
            placeholder="Search student or parent name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs bg-slate-50 dark:bg-zinc-850 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0">Grade:</span>
            <select
              value={gradeFilter}
              onChange={(e) => { setGradeFilter(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 rounded-xl text-xs font-bold border border-gray-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 dark:text-white focus:outline-none"
            >
              {grades.map(g => (
                <option key={g} value={g}>{g === 'All' ? 'All Grades' : g}</option>
              ))}
            </select>
          </div>

          <button
            onClick={exportToCSV}
            className="bg-school-black hover:bg-school-orange text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
            <p className="text-xs text-gray-400 font-light">Loading admissions...</p>
          </div>
        ) : paginatedAdmissions.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <FileSpreadsheet className="w-10 h-10 text-gray-300 dark:text-zinc-700 mx-auto" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">No admissions enquiries found.</p>
            <p className="text-xs text-gray-400 font-light">Form submissions from the admissions page will show up here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-zinc-800/20">
                  <th className="p-4 pl-6">Student Name</th>
                  <th className="p-4">Parent/Guardian</th>
                  <th className="p-4">Class Applying For</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50 dark:divide-zinc-800/50">
                {paginatedAdmissions.map(adm => (
                  <tr key={adm.id} className="hover:bg-slate-50/55 dark:hover:bg-zinc-800/10 text-slate-700 dark:text-slate-350 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white">
                      <button onClick={() => openDetailsModal(adm)} className="text-left font-bold text-slate-800 dark:text-white hover:text-school-orange transition-colors">
                        {adm.studentName}
                      </button>
                    </td>
                    <td className="p-4 font-semibold text-slate-655 dark:text-slate-300">{adm.parentName}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-school-orange px-2 py-0.5 bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/40 rounded-md">
                        <GraduationCap className="w-3.5 h-3.5" /> {adm.grade}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-450 space-y-0.5">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {adm.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {adm.phone}</div>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{new Date(adm.timestamp).toLocaleString()}</td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => openDetailsModal(adm)}
                          className="p-1.5 text-slate-400 hover:text-blue-650 transition-colors cursor-pointer"
                          title="View Details"
                        >
                          <FileSpreadsheet className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(adm)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete Record"
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
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAdmissions.length)} of {filteredAdmissions.length}
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
      {isDetailsOpen && selectedAdmission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDetailsOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsDetailsOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Admissions Inquiry Details</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Student Name</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedAdmission.studentName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Class Applying For</span>
                  <span className="font-bold text-school-orange">{selectedAdmission.grade}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Parent/Guardian Name</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{selectedAdmission.parentName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Submitted On</span>
                  <span className="font-medium text-slate-550 dark:text-slate-400">{new Date(selectedAdmission.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{selectedAdmission.email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone Number</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{selectedAdmission.phone}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Additional Remarks / Message</span>
                <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 p-4 rounded-2xl text-xs text-slate-655 dark:text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
                  {selectedAdmission.message || 'No additional remarks or questions submitted.'}
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
      {isDeleteOpen && selectedAdmission && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-2">Delete Inquiry Record</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete the admission inquiry for student <strong className="text-slate-750 dark:text-slate-300 font-bold">{selectedAdmission.studentName}</strong>? This will permanently remove the record.
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
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete inquiry'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
