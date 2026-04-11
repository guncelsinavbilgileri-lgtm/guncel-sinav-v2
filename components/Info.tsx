
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Globe, Info as InfoIcon, LogIn, LogOut, User as UserIcon, Database } from 'lucide-react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { seedDatabase } from '../services/seedService';

const Info: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'guncelsinavbilgileri@gmail.com';

  const handleSeed = async () => {
    setSeedStatus('idle');
    setIsSeeding(true);
    const success = await seedDatabase();
    setIsSeeding(false);
    
    if (success) {
      setSeedStatus('success');
      setTimeout(() => setSeedStatus('idle'), 3000);
    } else {
      setSeedStatus('error');
      setTimeout(() => setSeedStatus('idle'), 3000);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      {/* Premium Header */}
      <div className="premium-header apple-blur pt-12 pb-6 text-center border-b border-indigo-50 shadow-sm sticky top-0 z-30">
        <h1 className="title-font text-[22px] font-[900] tracking-tighter text-gradient uppercase leading-none">
          Bilgi Rehberi
        </h1>
      </div>

      <div className="w-full h-56 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" 
          alt="Uygulama Hakkında" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent"></div>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto space-y-10">
        
        {/* Cam Kart Tasarımıyla Bölümler */}
        <section className="glass-card p-6 rounded-[2.5rem] border border-white/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md">
                <UserIcon size={20} />
              </div>
              <h2 className="text-xl font-black text-indigo-950 font-['Outfit'] tracking-tight">
                {user ? 'Profilim' : 'Giriş Yap'}
              </h2>
            </div>
            {user ? (
              <button onClick={handleLogout} className="text-red-500 font-bold text-xs uppercase tracking-widest flex items-center space-x-1">
                <LogOut size={14} />
                <span>Çıkış</span>
              </button>
            ) : (
              <button onClick={handleLogin} className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center space-x-1">
                <LogIn size={14} />
                <span>Giriş</span>
              </button>
            )}
          </div>
          {user ? (
            <div className="flex items-center space-x-3">
              <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border-2 border-indigo-100" />
              <div>
                <p className="text-sm font-bold text-gray-800">{user.displayName}</p>
                <p className="text-[10px] text-gray-500 font-medium">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Yönetici araçlarına erişmek ve size özel bildirimler almak için giriş yapın.
            </p>
          )}
        </section>

        <section className="glass-card p-6 rounded-[2.5rem] border border-white/60 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md">
              <InfoIcon size={20} />
            </div>
            <h2 className="text-xl font-black text-indigo-950 font-['Outfit'] tracking-tight">
              Uygulama Hakkında
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed font-medium">
            Öğretmenlerimizin sınav görevlerini daha kolay takip edebilmesi ve duyurulardan anında haberdar olması için geliştirilmiştir.
          </p>
        </section>

        <section className="p-6 bg-red-50/50 rounded-[2.5rem] border border-red-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-600 rounded-xl text-white shadow-md">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-black text-red-600 font-['Outfit'] uppercase tracking-tight">
              FERAGATNAME
            </h3>
          </div>
          <p className="text-red-900 text-[13px] leading-relaxed font-bold">
            Uygulamamız resmi bir hükümet kuruluşu değildir ve hiçbir bakanlığı temsil etmez. Bilgiler rehberlik amaçlıdır.
          </p>
        </section>

        {isAdmin && (
          <section className="glass-card p-6 rounded-[2.5rem] border border-indigo-100 bg-indigo-50/30">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md">
                <Database size={20} />
              </div>
              <h3 className="text-lg font-black text-indigo-950 font-['Outfit'] uppercase tracking-tight">
                Yönetici Araçları
              </h3>
            </div>
            <button 
              onClick={handleSeed}
              disabled={isSeeding}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 ${
                seedStatus === 'success' ? 'bg-green-500 text-white' : 
                seedStatus === 'error' ? 'bg-red-500 text-white' : 
                'bg-indigo-600 text-white'
              }`}
            >
              {isSeeding ? 'GÜNCELLENİYOR...' : 
               seedStatus === 'success' ? 'BAŞARIYLA GÜNCELLENDİ!' :
               seedStatus === 'error' ? 'HATA OLUŞTU!' :
               'VERİTABANINI SIFIRLA / GÜNCELLE'}
            </button>
            <p className="mt-3 text-[10px] text-indigo-400 font-bold text-center">
              * Bu işlem tüm detay sayfalarını varsayılan içerikle günceller.
            </p>
          </section>
        )}

        {/* Listenin mikro-detaylarla zenginleştirilmesi */}
        <section className="space-y-4">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
            <h3 className="text-lg font-black text-indigo-950 font-['Outfit'] uppercase tracking-tight">ÖNEMLİ UYARILAR</h3>
          </div>
          <div className="space-y-3">
            {[
              "Bilgilerde hatalar olabilir.",
              "Güncellik garantisi verilmez.",
              "Kesin bilgi resmi sitelerdedir."
            ].map((text, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-4 bg-white/40 rounded-2xl border border-white/60">
                <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                <span className="text-sm font-bold text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;
