import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { ref, onValue, update } from 'firebase/database';
import { auth, db } from './firebase';

function Admin() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prayersRef = ref(db, 'prayerRequests');
    const unsubscribe = onValue(prayersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value
        }));
        list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setPrayers(list);
      } else {
        setPrayers([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const markAsPrayed = async (id) => {
    const prayerRef = ref(db, `prayerRequests/${id}`);
    await update(prayerRef, { prayedFor: true });
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-KE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <nav className="bg-zinc-950 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="RGC Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-white font-black text-lg uppercase tracking-wide">Admin Panel</h1>
            <p className="text-zinc-400 text-xs">Redeemed Gospel Church Mwihoko 2</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-6 py-2 rounded-full font-bold hover:bg-red-800 transition text-sm uppercase"
        >
          Logout
        </button>
      </nav>

      {/* Stats Bar */}
      <div className="bg-red-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex gap-8">
          <div className="text-white">
            <p className="text-red-200 text-xs uppercase font-bold tracking-widest">Total Requests</p>
            <p className="text-3xl font-black">{prayers.length}</p>
          </div>
          <div className="text-white">
            <p className="text-red-200 text-xs uppercase font-bold tracking-widest">Prayed For</p>
            <p className="text-3xl font-black">{prayers.filter(p => p.prayedFor).length}</p>
          </div>
          <div className="text-white">
            <p className="text-red-200 text-xs uppercase font-bold tracking-widest">Pending</p>
            <p className="text-3xl font-black">{prayers.filter(p => !p.prayedFor).length}</p>
          </div>
        </div>
      </div>

      {/* Prayer Requests */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-6">
          Prayer Requests
        </h2>
        {loading ? (
          <p className="text-gray-500 text-center py-20">Loading prayer requests...</p>
        ) : prayers.length === 0 ? (
          <p className="text-gray-500 text-center py-20">No prayer requests yet.</p>
        ) : (
          <div className="space-y-4">
            {prayers.map((prayer) => (
              <div
                key={prayer.id}
                className={`bg-white rounded-2xl shadow-sm border-l-4 p-6 ${
                  prayer.prayedFor ? 'border-green-500 opacity-70' : 'border-red-600'
                }`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-black text-gray-900 text-lg">{prayer.name}</h3>
                      {prayer.prayedFor && (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                          ✅ Prayed For
                        </span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{prayer.request}</p>
                    <div className="flex gap-6 flex-wrap text-sm text-gray-500">
                      {prayer.phone && (
                        <span>📞 <a href={`tel:${prayer.phone}`} className="text-red-600 font-bold hover:underline">{prayer.phone}</a></span>
                      )}
                      {prayer.email && (
                        <span>✉️ <a href={`mailto:${prayer.email}`} className="text-red-600 font-bold hover:underline">{prayer.email}</a></span>
                      )}
                      <span>🕐 {formatDate(prayer.timestamp)}</span>
                    </div>
                  </div>
                  {!prayer.prayedFor && (
                    <button
                      onClick={() => markAsPrayed(prayer.id)}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition text-sm uppercase tracking-wide whitespace-nowrap"
                    >
                      Mark as Prayed ✅
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;