'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Briefcase, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Link as LinkIcon, 
  Loader2, 
  X, 
  AlertCircle, 
  CheckCircle,
  FileText,
  User,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  qualification: string;
  experience: string;
  salary?: string;
  lastDate: string;
  applyLink: string;
  status: 'Open' | 'Closed';
}

interface Application {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeLink: string;
  message?: string;
  timestamp: string;
}

function CareersManagerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Alerts
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAppDeleteOpen, setIsAppDeleteOpen] = useState(false);
  const [isAppDetailsOpen, setIsAppDetailsOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Job Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDept, setFormDept] = useState('');
  const [formQual, setFormQual] = useState('');
  const [formExp, setFormExp] = useState('');
  const [formSalary, setFormSalary] = useState('Negotiable');
  const [formLastDate, setFormLastDate] = useState('');
  const [formApplyLink, setFormApplyLink] = useState('/careers');
  const [formStatus, setFormStatus] = useState<'Open' | 'Closed'>('Open');

  // Trigger add modal if URL query param ?add=true is present
  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      router.replace('/admin/careers');
      setActiveTab('jobs');
      openAddModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        setJobs(json.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load jobs listings');
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/careers/applications');
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        setApplications(json.data);
      }
    } catch (err) {
      showToast('error', 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'jobs') {
      fetchJobs();
    } else {
      fetchApplications();
    }
    setCurrentPage(1);
    setSearchQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const openAddModal = () => {
    setFormTitle('');
    setFormDept('');
    setFormQual('');
    setFormExp('');
    setFormSalary('Negotiable');
    setFormLastDate('');
    setFormApplyLink('/careers');
    setFormStatus('Open');
    setIsAddOpen(true);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formTitle,
          department: formDept,
          qualification: formQual,
          experience: formExp,
          salary: formSalary,
          lastDate: formLastDate,
          applyLink: formApplyLink,
          status: formStatus
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Job vacancy posted successfully');
        setIsAddOpen(false);
        fetchJobs();
      } else {
        showToast('error', resJson.message || 'Failed to post vacancy');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (job: Job) => {
    setSelectedJob(job);
    setFormTitle(job.title);
    setFormDept(job.department);
    setFormQual(job.qualification);
    setFormExp(job.experience);
    setFormSalary(job.salary || 'Negotiable');
    setFormLastDate(job.lastDate);
    setFormApplyLink(job.applyLink);
    setFormStatus(job.status);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;
    setActionLoading(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedJob.id,
          title: formTitle,
          department: formDept,
          qualification: formQual,
          experience: formExp,
          salary: formSalary,
          lastDate: formLastDate,
          applyLink: formApplyLink,
          status: formStatus
        })
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Job posting updated successfully');
        setIsEditOpen(false);
        fetchJobs();
      } else {
        showToast('error', resJson.message || 'Failed to update job');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (job: Job) => {
    setSelectedJob(job);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedJob) return;
    setActionLoading(true);

    try {
      const response = await fetch(`/api/jobs?id=${selectedJob.id}`, {
        method: 'DELETE'
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Job posting deleted successfully');
        setIsDeleteOpen(false);
        fetchJobs();
      } else {
        showToast('error', resJson.message || 'Failed to delete job');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openAppDeleteModal = (app: Application) => {
    setSelectedApp(app);
    setIsAppDeleteOpen(true);
  };

  const handleAppDeleteConfirm = async () => {
    if (!selectedApp) return;
    setActionLoading(true);

    try {
      const response = await fetch(`/api/careers/applications?id=${selectedApp.id}`, {
        method: 'DELETE'
      });

      const resJson = await response.json();
      if (response.ok && resJson.status === 'success') {
        showToast('success', 'Application record deleted');
        setIsAppDeleteOpen(false);
        fetchApplications();
      } else {
        showToast('error', resJson.message || 'Failed to delete application');
      }
    } catch (err) {
      showToast('error', 'A network error occurred.');
    } finally {
      setActionLoading(false);
    }
  };

  const openAppDetailsModal = (app: Application) => {
    setSelectedApp(app);
    setIsAppDetailsOpen(true);
  };

  // Filters & Search
  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    j.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApps = applications.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Slice
  const currentList = activeTab === 'jobs' ? filteredJobs : filteredApps;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedList = currentList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentList.length / itemsPerPage);

  return (
    <div className="space-y-6">
      
      {/* Toast */}
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

      {/* Navigation Tabs and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-slate-150 dark:border-zinc-800 shadow-sm">
        
        {/* Tabs */}
        <div className="flex gap-2 w-full sm:w-auto bg-slate-50 dark:bg-zinc-800 p-1 rounded-2xl border border-slate-100 dark:border-zinc-750">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'jobs'
                ? 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Job Postings
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
            }`}
          >
            Applications Review ({applications.length})
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder={activeTab === 'jobs' ? "Search positions..." : "Search candidates..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 text-xs bg-slate-50 dark:bg-zinc-800 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {activeTab === 'jobs' && (
            <button
              onClick={openAddModal}
              className="bg-school-black hover:bg-school-orange text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add Posting
            </button>
          )}
        </div>

      </div>

      {/* Main Table Content */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
            <p className="text-xs text-gray-400 font-light">Loading portal records...</p>
          </div>
        ) : paginatedList.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-gray-300 dark:text-zinc-700 mx-auto" />
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              No {activeTab === 'jobs' ? 'job postings' : 'candidate applications'} found.
            </p>
            <p className="text-xs text-gray-400 font-light">
              {activeTab === 'jobs' ? 'Create a job vacancy to get started.' : 'Awaiting candidate submissions from the careers page.'}
            </p>
          </div>
        ) : activeTab === 'jobs' ? (
          /* JOB POSTINGS VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-zinc-800/20">
                  <th className="p-4 pl-6">Job Title</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Qualification</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Salary</th>
                  <th className="p-4">Last Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50 dark:divide-zinc-800/50">
                {(paginatedList as Job[]).map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/55 dark:hover:bg-zinc-800/10 text-slate-700 dark:text-slate-350 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white">{job.title}</td>
                    <td className="p-4">{job.department}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{job.qualification}</td>
                    <td className="p-4 font-medium">{job.experience}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{job.salary || 'Negotiable'}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{job.lastDate}</td>
                    <td className="p-4">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${
                        job.status === 'Open'
                          ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 border border-emerald-100 dark:border-emerald-900/40'
                          : 'bg-red-50 dark:bg-red-955/20 text-red-655 border border-red-100 dark:border-red-900/40'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => openEditModal(job)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(job)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
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
        ) : (
          /* CANDIDATE APPLICATIONS VIEW */
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-zinc-800/80 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-zinc-800/20">
                  <th className="p-4 pl-6">Candidate Name</th>
                  <th className="p-4">Contact info</th>
                  <th className="p-4">Position Applied</th>
                  <th className="p-4">Experience</th>
                  <th className="p-4">Resume</th>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-slate-50 dark:divide-zinc-800/50">
                {(paginatedList as Application[]).map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/55 dark:hover:bg-zinc-800/10 text-slate-700 dark:text-slate-350 transition-colors">
                    <td className="p-4 pl-6 font-bold text-slate-800 dark:text-white">
                      <button onClick={() => openAppDetailsModal(app)} className="text-left font-bold text-slate-800 dark:text-white hover:text-school-orange transition-colors">
                        {app.name}
                      </button>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-450 space-y-0.5">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {app.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {app.phone}</div>
                    </td>
                    <td className="p-4 font-medium text-slate-800 dark:text-white">{app.position}</td>
                    <td className="p-4 font-semibold text-slate-600 dark:text-slate-400">{app.experience} Years</td>
                    <td className="p-4">
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 px-2 py-1 rounded text-[10px] font-bold text-school-orange hover:bg-school-orange hover:text-white transition-colors"
                      >
                        <FileText className="w-3 h-3" /> Resume
                      </a>
                    </td>
                    <td className="p-4 text-slate-500 dark:text-slate-400">{new Date(app.timestamp).toLocaleString()}</td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2.5">
                        <button
                          onClick={() => openAppDetailsModal(app)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer animate-pulse"
                          title="View Details"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => openAppDeleteModal(app)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete Application Record"
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
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, currentList.length)} of {currentList.length}
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

      {/* -------------------- ADD JOB MODAL -------------------- */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsAddOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsAddOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Post New Job Vacancy</h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Job Title *</label>
                  <input
                    required
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Primary English Teacher"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Department *</label>
                  <input
                    required
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    placeholder="e.g. English / Science"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Required Qualification *</label>
                <input
                  required
                  type="text"
                  value={formQual}
                  onChange={(e) => setFormQual(e.target.value)}
                  placeholder="e.g. B.Ed & B.A/M.A English"
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-255 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Experience Required *</label>
                  <input
                    required
                    type="text"
                    value={formExp}
                    onChange={(e) => setFormExp(e.target.value)}
                    placeholder="e.g. 2+ Years"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Salary Range (Optional)</label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    placeholder="e.g. Negotiable / ₹25,000"
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Last Date to Apply *</label>
                  <input
                    required
                    type="date"
                    value={formLastDate}
                    onChange={(e) => setFormLastDate(e.target.value)}
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
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
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
                  {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------- EDIT JOB MODAL -------------------- */}
      {isEditOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsEditOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-xl rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsEditOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Edit Job Posting</h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Job Title *</label>
                  <input
                    required
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Department *</label>
                  <input
                    required
                    type="text"
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Required Qualification *</label>
                <input
                  required
                  type="text"
                  value={formQual}
                  onChange={(e) => setFormQual(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-xl border border-gray-255 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Experience Required *</label>
                  <input
                    required
                    type="text"
                    value={formExp}
                    onChange={(e) => setFormExp(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Salary Range</label>
                  <input
                    type="text"
                    value={formSalary}
                    onChange={(e) => setFormSalary(e.target.value)}
                    className="w-full px-4 py-3 text-xs rounded-xl border border-gray-250 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-school-orange/20 focus:border-school-orange dark:text-white font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">Last Date to Apply *</label>
                  <input
                    required
                    type="date"
                    value={formLastDate}
                    onChange={(e) => setFormLastDate(e.target.value)}
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
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
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
      {isDeleteOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsDeleteOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-2">Delete Job Opening</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete job posting <strong className="text-slate-700 dark:text-slate-350 font-bold">&ldquo;{selectedJob.title}&rdquo;</strong>? This action is permanent.
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
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete vacancy'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- DELETE APPLICATION MODAL -------------------- */}
      {isAppDeleteOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsAppDeleteOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-md rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-bold font-heading text-slate-800 dark:text-white mb-2">Delete Application Record</h3>
            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
              Are you sure you want to delete the job application from candidate <strong className="text-slate-700 dark:text-slate-350 font-bold">{selectedApp.name}</strong> for position <strong className="font-semibold text-slate-705">{selectedApp.position}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAppDeleteOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-750 text-slate-500 hover:bg-slate-50 dark:hover:bg-zinc-800 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAppDeleteConfirm}
                disabled={actionLoading}
                className="bg-red-500 hover:bg-red-650 text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer"
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete record'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- CANDIDATE DETAILS MODAL -------------------- */}
      {isAppDetailsOpen && selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setIsAppDetailsOpen(false)}>
          <div className="bg-white dark:bg-zinc-900 border border-slate-150 dark:border-zinc-800 w-full max-w-lg rounded-3xl p-6 shadow-2xl relative animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsAppDetailsOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white bg-slate-50 dark:bg-zinc-850 rounded-full cursor-pointer">
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-800 dark:text-white mb-6">Employment Application Details</h3>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Candidate Name</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedApp.name}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Position Applied</span>
                  <span className="font-bold text-school-orange">{selectedApp.position}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Email Address</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Phone Number</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{selectedApp.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Years of Experience</span>
                  <span className="font-bold text-slate-800 dark:text-white">{selectedApp.experience} Years</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Submitted On</span>
                  <span className="font-medium text-slate-500 dark:text-slate-400">{new Date(selectedApp.timestamp).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Resume / CV Document</span>
                <a
                  href={selectedApp.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 px-3 py-2 rounded-xl text-xs font-bold text-school-orange hover:bg-school-orange hover:text-white transition-colors"
                >
                  <FileText className="w-4 h-4" /> Open Resume Link
                </a>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Cover Letter / Message</span>
                <div className="bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-750 p-4 rounded-2xl text-xs text-slate-655 dark:text-slate-300 leading-relaxed max-h-40 overflow-y-auto">
                  {selectedApp.message || 'No additional message was submitted by the candidate.'}
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button
                onClick={() => setIsAppDetailsOpen(false)}
                className="bg-school-black hover:bg-school-orange text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function AdminCareersPage() {
  return (
    <Suspense fallback={
      <div className="py-24 flex items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-school-orange animate-spin" />
        <p className="text-xs text-gray-400 font-light">Initializing careers module...</p>
      </div>
    }>
      <CareersManagerContent />
    </Suspense>
  );
}
