
import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:guncelsinavbilgileri@gmail.com";
  };

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      <div className="premium-header apple-blur pt-[env(safe-area-inset-top,44px)] pb-6 text-center border-b border-indigo-50 shadow-sm sticky top-0 z-30">
        <h1 className="title-font text-[22px] font-[900] tracking-tighter text-gradient uppercase leading-none">
          Bize Ulaşın
        </h1>
      </div>

      <div className="px-8 pt-20 max-w-md mx-auto text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 border border-indigo-50 transform rotate-3">
          <Mail size={40} className="text-indigo-600" />
        </div>

        <h2 className="text-3xl font-black text-indigo-950 mb-6 font-['Outfit'] tracking-tighter">
          Destek & İletişim
        </h2>

        <p className="text-gray-500 text-base leading-relaxed mb-12 font-bold px-4">
          Hata bildirimi, geliştirme önerileri veya iş birliği için bize her zaman yazabilirsiniz.
        </p>

        <button 
          onClick={handleEmailClick}
          className="group w-full bg-indigo-950 text-white py-6 rounded-[2.5rem] flex items-center justify-center space-x-4 shadow-[0_20px_40px_rgba(30,27,75,0.3)] active:scale-95 transition-all ring-1 ring-white/10"
        >
          <span className="text-lg font-black tracking-[0.2em] uppercase">E-POSTA GÖNDER</span>
          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
        </button>
        
        <div className="mt-12 w-full p-8 bg-gray-50 rounded-[2rem] border border-gray-100 text-left">
          <h3 className="text-[12px] font-black text-indigo-950 uppercase tracking-[0.2em] mb-4">Yayıncı & İletişim Bilgileri</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-bold">Yayıncı:</span>
              <span className="text-indigo-950 font-black">Güncel Sınav Bilgileri</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-gray-400 font-bold">E-posta:</span>
              <span className="text-indigo-950 font-black">guncelsinavbilgileri@gmail.com</span>
            </div>
            <div className="flex justify-between items-start text-[13px]">
              <span className="text-gray-400 font-bold">Adres:</span>
              <span className="text-indigo-950 font-black text-right ml-4">Türkiye / İstanbul (Dijital Yayıncılık)</span>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[10px] text-indigo-200 font-black tracking-widest uppercase">
          Telif Hakları © 2026 - Tüm Hakları Saklıdır.
        </p>
      </div>
    </div>
  );
};

export default Contact;
