'use client';

import { useState } from 'react';
import { CheckCircle2, FileText, Send, PhoneCall } from 'lucide-react';

export default function AdmissionsPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    phone: '',
    grade: '',
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
      setFormData({ parentName: '', studentName: '', email: '', phone: '', grade: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Admissions Open
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Admissions 2026-2027</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Take the first step towards a brighter future. We welcome you to join the Korutla Public School family.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Details & Process */}
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-heading font-bold text-school-black">Admission Process</h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {[
                  { step: 1, title: 'Inquiry', desc: 'Fill the online inquiry form or visit the campus to understand our methodology.' },
                  { step: 2, title: 'Registration', desc: 'Procure and submit the admission registration form with necessary documents.' },
                  { step: 3, title: 'Interaction / Assessment', desc: 'A brief interaction session for Pre-Primary, and a basic written assessment for higher grades.' },
                  { step: 4, title: 'Confirmation', desc: 'Fee payment and final confirmation of the admission.' },
                ].map((item) => (
                  <div key={item.step} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg border border-school-orange/20 bg-school-orange/5 text-school-orange font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10 text-xs">
                      {item.step}
                    </div>
                    <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2rem)] bg-[#F9FAFB] p-5 rounded-xl border border-gray-100 group-hover:border-school-orange transition-colors">
                      <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-school-black text-sm md:text-base">{item.title}</div>
                      </div>
                      <div className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-school-black text-white p-8 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-dot-pattern opacity-10"></div>
              <div className="relative z-10 space-y-6">
                <h3 className="text-lg font-heading font-bold flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-school-orange" /> Required Documents
                </h3>
                <ul className="space-y-4 text-xs md:text-sm text-gray-300 font-light">
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-school-orange shrink-0 mt-0.5" /> Passport size photographs of student and parents</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-school-orange shrink-0 mt-0.5" /> Birth Certificate of the student</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-school-orange shrink-0 mt-0.5" /> Aadhar Card copy of student and parents</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-school-orange shrink-0 mt-0.5" /> Previous academic records/Report card (if applicable)</li>
                  <li className="flex gap-2 items-start"><CheckCircle2 className="w-4 h-4 text-school-orange shrink-0 mt-0.5" /> Original Transfer Certificate (if applicable)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-school-orange/5 border border-school-orange/20 p-6 rounded-2xl flex items-center gap-4">
              <PhoneCall className="w-6 h-6 text-school-orange shrink-0" />
              <div>
                <h4 className="font-bold text-school-black text-sm md:text-base">Need assistance?</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5">Call our Admissions Desk at <strong className="text-school-black font-semibold">+91 98765 43210</strong></p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200/60 p-8 h-fit sticky top-28 shadow-sm">
            <h2 className="text-xl font-heading font-bold text-school-black mb-6">Admission Inquiry Form</h2>
            
            {success ? (
              <div className="bg-green-50/50 border border-green-100 text-green-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Inquiry Submitted Successfully!</h3>
                  <p className="text-xs md:text-sm text-green-700/85 mt-2">Thank you for your interest in Korutla Public School. Our admissions counselor will contact you shortly.</p>
                </div>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-green-700 font-semibold text-xs md:text-sm hover:underline"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Parent/Guardian Name *</label>
                    <input required type="text" name="parentName" value={formData.parentName} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name *</label>
                    <input required type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" placeholder="Jane Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" placeholder="+91 90000 00000" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Applying for Grade *</label>
                  <select required name="grade" value={formData.grade} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all bg-white">
                    <option value="" disabled>Select Grade</option>
                    <option value="Pre-Nursery">Pre-Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class I</option>
                    <option value="Class 2">Class II</option>
                    <option value="Class 3">Class III</option>
                    <option value="Class 4">Class IV</option>
                    <option value="Class 5">Class V</option>
                    <option value="Class 6">Class VI</option>
                    <option value="Class 7">Class VII</option>
                    <option value="Class 8">Class VIII</option>
                    <option value="Class 9">Class IX</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Additional Remarks (Optional)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all resize-none" placeholder="Any specific questions?"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-school-orange hover:bg-school-yellow text-white hover:text-school-black font-semibold py-3.5 rounded-lg transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-70 text-sm"
                >
                  {isSubmitting ? 'Submitting Inquiry...' : <>Submit Inquiry <Send className="w-4 h-4" /></>}
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-4 leading-relaxed">By submitting, you agree to be contacted by Korutla Public School via Phone/WhatsApp/Email.</p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
