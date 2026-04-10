
import React from 'react';
import { AlertTriangle, ShieldCheck, Globe, Info as InfoIcon } from 'lucide-react';

const Info: React.FC = () => {
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
