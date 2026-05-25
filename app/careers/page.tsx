'use client';

import { useState } from 'react';
import { Briefcase, Send, CheckCircle2 } from 'lucide-react';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    resumeLink: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call to Google Sheets / Backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', position: '', experience: '', resumeLink: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openings = [
    { title: 'TGT Science Teacher', req: 'B.Ed & B.Sc/M.Sc with 3+ years experience', type: 'Full-time' },
    { title: 'Primary English Teacher', req: 'B.Ed & B.A/M.A English with 2+ years experience', type: 'Full-time' },
    { title: 'Sports Coach (Basketball)', req: 'B.P.Ed with relevant coaching experience', type: 'Part-time' },
    { title: 'Student Counselor', req: 'M.A Psychology with background in child counseling', type: 'Full-time' }
  ];

  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Join Our Faculty</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Inspire the next generation. We are looking for passionate, innovative, and dedicated educators.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Current Openings */}
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-school-orange font-semibold tracking-wide uppercase text-xs">
                <span className="w-6 h-0.5 bg-school-orange"></span> Current Openings
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-school-black">Shape the future with us</h2>
            </div>
            
            <div className="space-y-4">
              {openings.map((job, i) => (
                <div key={i} className="bg-[#F9FAFB] p-5 rounded-xl border border-gray-100 hover:border-school-orange transition-colors duration-200 group">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h3 className="text-base md:text-lg font-bold font-heading text-school-black group-hover:text-school-orange transition-colors">{job.title}</h3>
                    <span className="border border-gray-200 bg-white text-gray-500 text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider shrink-0">{job.type}</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-400 font-light leading-relaxed">{job.req}</p>
                </div>
              ))}
            </div>
            <div className="bg-school-orange/5 p-6 rounded-2xl border border-school-orange/20">
               <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                 Don&apos;t see a suitable role? We are always looking for exceptional talent. Submit your application and we&apos;ll keep it on file for future opportunities.
               </p>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-2xl border border-gray-200/60 p-8 shadow-sm -mt-24 relative z-10">
            <div className="w-12 h-12 bg-school-orange/5 border border-school-orange/10 rounded-xl flex items-center justify-center mb-6 text-school-orange">
              <Briefcase className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-school-black mb-6">Employment Application</h2>
            
            {success ? (
              <div className="bg-green-50/50 border border-green-100 text-green-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Application Received!</h3>
                  <p className="text-xs md:text-sm text-green-700/85 mt-2">Your details have been successfully submitted to our HR department. We will contact you if your profile matches our requirements.</p>
                </div>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-green-700 font-semibold text-xs md:text-sm hover:underline"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Years of Experience *</label>
                    <input required type="number" min="0" name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" placeholder="e.g. 5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Position Applying For *</label>
                  <select required name="position" value={formData.position} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all bg-white">
                    <option value="" disabled>Select Position</option>
                    <option value="TGT Science">TGT Science</option>
                    <option value="Primary English">Primary English</option>
                    <option value="Sports Coach">Sports Coach</option>
                    <option value="Student Counselor">Student Counselor</option>
                    <option value="Other">Other (Specify in Message)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Resume/CV Link (Drive, Dropbox, etc.) *</label>
                  <input required type="url" name="resumeLink" value={formData.resumeLink} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" placeholder="https://" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cover Letter / Message (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us why you'd be a great fit..."></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-school-black hover:bg-school-orange text-white font-semibold py-3.5 rounded-lg transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-70 text-sm"
                >
                  {isSubmitting ? 'Submitting...' : <>Submit Application <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
