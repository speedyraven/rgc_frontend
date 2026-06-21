import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './Login';
import Admin from './Admin';
import { Heart, MapPin, Phone, ShieldCheck, Target, Send, Users, BookOpen, Music, Baby } from 'lucide-react';

function App() {
  const [user] = useAuthState(auth);
  const [prayerRequest, setPrayerRequest] = useState({ name: '', phone: '', email: '', request: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: prayerRequest.name,
          phone: prayerRequest.phone,
          email: prayerRequest.email,
          request: prayerRequest.request
        })
      });

      const data = await response.json();

      if (data.message) {
        alert('🙏 Prayer request sent!');
        setPrayerRequest({ name: '', phone: '', email: '', request: '' });
      }

    } catch (error) {
      alert('Could not send prayer request. Please try again.');
      console.error('Error:', error);
    }
  };

  const ministries = [
    { title: "Men's Fellowship", icon: <Users size={32} />, desc: "Empowering men to be spiritual leaders in their homes and community." },
    { title: "Women's Guild", icon: <BookOpen size={32} />, desc: "A community of women growing together in faith and service." },
    { title: "Youth Ministry", icon: <Music size={32} />, desc: "Helping the next generation discover their purpose in Christ." },
    { title: "Sunday School", icon: <Baby size={32} />, desc: "Nurturing our children in the ways of the Lord from an early age." }
  ];

  const MainSite = () => (
    <div className="min-h-screen bg-white text-gray-900 font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="RGC Logo" className="h-14 md:h-20 w-auto" />
          <div className="flex flex-col">
            <span className="text-red-700 font-black text-xl leading-none">RGC</span>
            <span className="text-gray-600 font-bold text-xs uppercase tracking-widest">Mwihoko 2</span>
          </div>
        </div>
        <div className="hidden lg:flex gap-8 font-bold text-gray-700 uppercase text-sm">
          <a href="#home" className="hover:text-red-600 transition">Home</a>
          <a href="#about" className="hover:text-red-600 transition">About</a>
          <a href="#ministries" className="hover:text-red-600 transition">Ministries</a>
          <a href="#schedule" className="hover:text-red-600 transition">Services</a>
          <a href="#give" className="hover:text-red-600 transition">Give</a>
        </div>
        <a href="#give" className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition shadow-md">
          GIVE NOW
        </a>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src="/Home_.jpg"
          className="absolute inset-0 w-full h-full object-cover transform scale-105"
          alt="RGC Mwihoko 2 Background"
        />
        <img
          src="/Home_.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Background"
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1438232992991-995b7058bbb3"; }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-white font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-lg">
            Redeemed Gospel Church Inc.
          </h2>
          <h1 className="text-red-500 text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none uppercase drop-shadow-2xl">
            RGC MWIHOKO 2
          </h1>
          <p className="text-xl md:text-2xl mb-10 italic font-light text-gray-200">
            "Preach, Demonstrate, Impact"
          </p>
          <a href="#schedule" className="bg-red-600 text-white px-12 py-5 rounded-full text-lg font-black hover:bg-red-700 transition shadow-2xl inline-block uppercase tracking-widest">
            Join Us This Sunday
          </a>
        </div>
      </header>

      {/* Ministries Section */}
      <section id="ministries" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900">Our Ministries</h2>
            <div className="h-2 w-24 bg-red-700 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ministries.map((m, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:bg-red-700 hover:text-white transition duration-500 group cursor-pointer shadow-sm">
                <div className="text-red-700 group-hover:text-white mb-6 transition duration-500">{m.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{m.title}</h3>
                <p className="text-gray-500 group-hover:text-red-100 transition duration-500">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-zinc-900 text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="bg-zinc-800 p-10 rounded-3xl border-l-8 border-red-700">
            <Target className="text-red-500 mb-6" size={50} />
            <h3 className="text-3xl font-black mb-4 uppercase">Our Mission</h3>
            <p className="text-zinc-400 text-xl italic font-medium">"Be the transformative church that impacts society by demonstrating the word of Christ."</p>
          </div>
          <div className="bg-zinc-800 p-10 rounded-3xl border-l-8 border-red-700">
            <ShieldCheck className="text-red-500 mb-6" size={50} />
            <h3 className="text-3xl font-black mb-4 uppercase">Our Vision</h3>
            <p className="text-zinc-400 text-xl italic font-medium">"Local action, global impact."</p>
          </div>
        </div>
      </section>

      {/* Service Schedule */}
      <section id="schedule" className="py-24 px-6 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-16 uppercase tracking-widest text-gray-900 underline decoration-red-700 underline-offset-8">Service Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl mb-3 text-red-700 uppercase">Sunday Bible Study</h3>
              <p className="text-2xl font-light">8:00 AM — 10:00 AM</p>
            </div>
            <div className="bg-red-700 p-8 rounded-2xl shadow-2xl text-white transform scale-110">
              <h3 className="font-black text-xl mb-3 uppercase tracking-widest">Main Service</h3>
              <p className="text-3xl font-black">10:00 AM — 1:00 PM</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl mb-3 text-red-700 uppercase">Wed Mid-Week</h3>
              <p className="text-2xl font-light">5:30 PM — 7:30 PM</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-xl mb-3 text-red-700 uppercase">Saturday Prayer</h3>
              <p className="text-2xl font-light">8:00 PM — 10:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section id="prayer" className="py-24 px-6 bg-red-50">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2rem] shadow-xl text-center">
          <Send className="mx-auto text-red-700 mb-6" size={50} />
          <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter text-red-600">Prayer Requests</h2>
          <p className="text-gray-500 text-lg mb-8 italic font-medium">How can we pray for you this week?</p>
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition duration-300"
                value={prayerRequest.name}
                onChange={(e) => setPrayerRequest({...prayerRequest, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. 0722 000 000"
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition duration-300"
                value={prayerRequest.phone}
                onChange={(e) => setPrayerRequest({...prayerRequest, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition duration-300"
                value={prayerRequest.email}
                onChange={(e) => setPrayerRequest({...prayerRequest, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Your Prayer Request</label>
              <textarea
                placeholder="Write your request here..."
                rows="5"
                className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition duration-300"
                value={prayerRequest.request}
                onChange={(e) => setPrayerRequest({...prayerRequest, request: e.target.value})}
                required
              ></textarea>
            </div>
            <button className="w-full bg-red-700 text-white font-black py-4 rounded-xl hover:bg-red-800 transition duration-300 shadow-lg uppercase tracking-widest">
              Send Prayer Request
            </button>
          </form>
        </div>
      </section>

      {/* Giving Section */}
      <section id="give" className="py-24 px-6 text-center bg-red-50">
        <Heart className="text-red-600 mx-auto mb-8 animate-pulse" size={60} />
        <h2 className="text-5xl font-black mb-6 uppercase tracking-tighter">Giving & Tithes</h2>
        <div className="bg-green-600 text-white p-12 rounded-[3rem] inline-block shadow-2xl transform hover:scale-105 transition duration-500">
          <p className="text-green-200 font-bold text-xl mb-4 tracking-widest uppercase">M-PESA Number</p>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">0722 877 893</h3>
          <p className="text-2xl font-bold italic border-t border-green-500 pt-4 mt-4">REVEREND KEN KIMAMA</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-950 text-white py-16 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-6">
            <div className="bg-white p-2 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <img
                src="/logo.png"
                className="h-20 md:h-24 w-auto object-contain"
                alt="RGC Logo Clear"
              />
            </div>
            <div className="h-16 w-px bg-zinc-800 hidden md:block"></div>
            <p className="text-zinc-400 text-sm max-w-[250px] leading-relaxed italic">
              "Be the transformative church that impacts society by demonstrating the word of Christ."
            </p>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-red-600 font-black uppercase tracking-widest mb-4">Contact Information</h4>
            <div className="space-y-2 font-medium">
              <p className="text-zinc-300 flex items-center justify-center md:justify-end gap-2">
                <MapPin size={18} className="text-red-600" /> Mwihoko 2, Next to Utumishi Academy
              </p>
              <p className="text-zinc-300 flex items-center justify-center md:justify-end gap-2">
                <Phone size={18} className="text-red-600" /> 0722 877 893
              </p>
            </div>
            <p className="text-[10px] text-zinc-700 mt-10 tracking-[0.4em] uppercase font-bold">
              © 2026 Redeemed Gospel Church Mwihoko 2
            </p>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <Routes>
      <Route path="/admin" element={user ? <Admin /> : <Login />} />
      <Route path="/*" element={<MainSite />} />
    </Routes>
  );
}

export default App;