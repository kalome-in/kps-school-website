'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* Header */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-school-black">
        <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
        <div className="relative z-10 text-center px-4 max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 rounded-md bg-white/5 text-school-orange font-semibold text-xs tracking-wider uppercase border border-white/10 backdrop-blur-sm">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Contact Us</h1>
          <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info & Map */}
          <div className="space-y-12">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-school-orange/5 border border-school-orange/10 rounded-lg flex items-center justify-center text-school-orange shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold font-heading text-base text-school-black">Visit Us</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    123 Education Boulevard,<br />
                    Korutla, Telangana 505326<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-school-orange/5 border border-school-orange/10 rounded-lg flex items-center justify-center text-school-orange shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold font-heading text-base text-school-black">Office Hours</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Monday - Friday: 8:00 AM - 4:00 PM<br />
                    Saturday: 8:00 AM - 1:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-school-orange/5 border border-school-orange/10 rounded-lg flex items-center justify-center text-school-orange shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold font-heading text-base text-school-black">Call Us</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Primary: +91 98765 43210<br />
                    Secondary: +91 98765 09876
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-school-orange/5 border border-school-orange/10 rounded-lg flex items-center justify-center text-school-orange shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-bold font-heading text-base text-school-black">Email Us</h3>
                  <p className="text-xs md:text-sm text-gray-500 font-light leading-relaxed">
                    Admissions: admissions@kps.edu<br />
                    General: info@kps.edu
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-200/60">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-light text-xs md:text-sm bg-gray-50 flex-col">
                <MapPin className="w-6 h-6 text-gray-300 mb-2" />
                Google Maps Integration
              </div>
            </div>
            
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-lg font-semibold shadow-sm transition-all w-full justify-center text-sm">
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-200/60 p-8 lg:p-10 relative z-10 lg:-mt-32 shadow-sm">
            <h2 className="text-xl font-heading font-bold text-school-black mb-6">Send a Message</h2>
            
            {success ? (
              <div className="bg-green-50/50 border border-green-100 text-green-800 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base md:text-lg">Message Sent!</h3>
                  <p className="text-xs md:text-sm text-green-700/85 mt-2">Thank you for reaching out. We will get back to you as soon as possible.</p>
                </div>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-2 text-green-700 font-semibold text-xs md:text-sm hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address *</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject *</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Message *</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full px-4 py-3 text-sm rounded-lg border border-gray-200 focus:ring-2 focus:ring-school-orange focus:border-transparent outline-none transition-all resize-none"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-school-black hover:bg-school-orange text-white font-semibold py-3.5 rounded-lg transition-all shadow-sm flex justify-center items-center gap-2 disabled:opacity-70 text-sm"
                >
                  {isSubmitting ? 'Sending...' : <>Send Message <Send className="w-4 h-4" /></>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
