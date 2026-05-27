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
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Contact Message',
          timestamp: new Date().toLocaleString(),
          ...formData
        }),
      });
      
      const res = await response.json();
      
      if (response.ok && (res.status === 'success' || res.status === 'mock_success')) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                    Jhansi Road, Near Geetha Bhavan,<br />
                    Korutla – 505326,<br />
                    District Jagtial, Telangana
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
                    Primary: +91 98484 59246<br />
                    Secondary: +91 99894 09246
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
                    General & Admissions:<br />
                    kpskorutla@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="w-full h-64 bg-gray-50 rounded-2xl overflow-hidden relative border border-gray-100 shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3776.3642701077865!2d78.70836876332763!3d18.826464272747984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcd0b24ae43c8d1%3A0x9c502bf94492cc36!2sKorutla%20Public%20School%20E%2FM!5e0!3m2!1sen!2sin!4v1779708958621!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
            
            <a href="https://wa.me/919848459246" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3.5 rounded-lg font-semibold shadow-sm transition-all w-full justify-center text-sm">
              <MessageSquare className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 lg:p-10 relative z-10 lg:-mt-32 shadow-sm">
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
