
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Info as InfoIcon, Database, Wifi, ExternalLink } from 'lucide-react';
import { testConnection } from '../services/newsService';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Info: React.FC = () => {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [legalUrls, setLegalUrls] = useState({
    privacy: 'https://guncelsinav.com/privacy',
    terms: 'https://guncelsinav.com/terms'
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'app_config'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLegalUrls({
          privacy: data.privacyUrl || 'https://guncelsinav.com/privacy',
          terms: data.termsUrl || 'https://guncelsinav.com/terms'
        });
      }
    });
    return () => unsub();
  }, []);

  const handleTestConnection = async () => {
    setTestStatus('testing');
    setErrorMessage(null);
    
    try {
      const result: any = await testConnection();
      if (result.success) {
        setTestStatus('success');
        setTimeout(() => setTestStatus('idle'), 3000);
      } else {
        setTestStatus('error');
        setErrorMessage(`Bağlantı kurulamadı. Lütfen internetinizi kontrol edin.`);
      }
    } catch (error: any) {
      console.error("Test error:", error);
      setTestStatus('error');
      setErrorMessage(error.message || 'Test sırasında hata oluştu.');
    }
  };

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      {/* Premium Header */}
      <div className="premium-header apple-blur pt-[env(safe-area-inset-top,44px)] pb-6 text-center border-b border-indigo-50 shadow-sm sticky top-0 z-30">
        <h1 className="title-font text-[22px] font-[900] tracking-tighter text-gradient uppercase leading-none">
          Bilgi Rehberi
        </h1>
      </div>

      {/* Hero Section */}
      <div className="w-full h-64 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" 
          alt="Uygulama Hakkında" 
          className="w-full h-full object-cover brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/60 via-indigo-950/20 to-transparent"></div>
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-white/70 text-[10px] uppercase font-black tracking-[0.3em] mb-2">Platform Hakkında</p>
          <h2 className="title-font text-3xl font-[900] text-white tracking-tight leading-none uppercase">Genel Bilgiler</h2>
        </div>
      </div>

      <div className="px-6 py-10 max-w-md mx-auto space-y-10">
        
        {/* Uygulama Hakkında */}
        <section className="premium-card p-8 border-indigo-100/30">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <InfoIcon size={24} />
            </div>
            <h2 className="text-2xl font-[900] text-indigo-950 font-['Outfit'] tracking-tight">
              Uygulama Hakkında
            </h2>
          </div>
          <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed font-bold opacity-90">
            <p>
              Uygulama, farklı kurumlardan sınav görevi almak isteyen öğretmenlere zaman kazandırılması ve kolaylık sağlanması amacıyla profesyonel bir hassasiyetle hazırlanmıştır.
            </p>
            <p>
              Uygulama içeriğindeki tüm veriler, herkesin ilgili resmi kurum sitelerinden serbestçe elde edebileceği açık kaynaklı bilgilerden derlenerek oluşturulmaktadır.
            </p>
            <p>
              Uygulamada geliştirilmesi istenen bölümler, yeni eklenmesi talep edilen özellikler veya düzeltilmesi gereken kısımlar "Bize Ulaşın" bölümünden tarafımıza iletilebilir.
            </p>
          </div>
        </section>

        {/* Feragatname */}
        <section className="p-8 bg-red-50/40 rounded-[2.5rem] border border-red-100/50 shadow-sm">
          <div className="flex items-center space-x-4 mb-5">
            <div className="p-3 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-100">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-[900] text-red-600 font-['Outfit'] uppercase tracking-tight">
              Yasal Sorumluluk
            </h3>
          </div>
          <div className="space-y-5 text-red-950 text-[14px] leading-relaxed font-black opacity-90">
            <p>
              Uygulama herhangi bir resmi hükümet kuruluşunu temsil etmemektedir ve resmi bilgi açıklamaya yetkili bir Merci değildir. Uygulamayı güncelleyen ve düzenleyen kişilerden hiçbiri hükümet veya bakanlık yetkilisi statüsünde değildir.
            </p>
            <p>
              Kullanılan bilgiler başta <span className="underline decoration-red-200">www.osym.gov.tr</span>, <span className="underline decoration-red-200">www.meb.gov.tr</span>, <span className="underline decoration-red-200">www.istanbul.edu.tr</span> ve <span className="underline decoration-red-200">www.anadolu.edu.tr</span> olmak üzere resmi kurumların duyurular bölümlerinden alınmaktadır.
            </p>
          </div>
        </section>

        {/* Uyarı */}
        <section className="premium-card p-8 border-indigo-100/30 bg-indigo-50/10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-xl font-[900] text-indigo-950 font-['Outfit'] uppercase tracking-tight">
              Önemli Bilgilendirme
            </h3>
          </div>
          <div className="space-y-6 text-indigo-950 text-[14px] leading-relaxed font-bold opacity-80">
            <p>
              İçerikteki tüm bilgiler ve tarihler sürekli güncel tutulmaya çalışılsa da; uygulama, kullanıcılara yönelik hiçbir hukuki taahhütte bulunmamaktadır.
            </p>
            <ul className="space-y-3">
              {[
                'Sunulan bilgilerde yazım veya veri hataları bulunabilir.',
                'Teknik nedenlerle güncelliğin anlık sağlanamaması mümkündür.',
                'Sınav takvimlerinde kurumlarca yapılan son dakika değişiklikleri olabilir.'
              ].map((text, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 italic">
              Önemli bilgileri her zaman ilgili kurumların kendi resmi web sitelerine giriş yaparak bizzat kontrol etmek kullanıcının asli sorumluluğundadır.
            </p>
          </div>
        </section>

        {/* Yasal Bağlantılar */}
        <section className="px-2 pt-4 pb-12">
          <div className="text-center mb-10">
            <div className="w-12 h-1 bg-indigo-100 mx-auto mb-6 rounded-full"></div>
            <p className="text-[14px] text-indigo-900/40 font-bold leading-relaxed italic max-w-xs mx-auto">
              Sürekli güncellenen kullanım koşullarımızı ve gizlilik politikamızı incelemenizi tavsiye ederiz.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <button 
              className="w-full py-5 bg-white border border-indigo-50 rounded-2xl text-[14px] font-black text-indigo-950 uppercase tracking-[0.2em] active:scale-95 transition-all shadow-sm flex items-center justify-center space-x-3 hover:bg-gray-50"
              onClick={() => window.open(legalUrls.terms, '_blank')}
            >
              <span>Kullanım Koşulları</span>
              <ExternalLink size={16} className="text-indigo-400" />
            </button>
            <button 
              className="w-full py-5 bg-white border border-indigo-50 rounded-2xl text-[14px] font-black text-indigo-950 uppercase tracking-[0.2em] active:scale-95 transition-all shadow-sm flex items-center justify-center space-x-3 hover:bg-gray-50"
              onClick={() => window.open(legalUrls.privacy, '_blank')}
            >
              <span>Gizlilik Politikası</span>
              <ExternalLink size={16} className="text-indigo-400" />
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.4em]">Versiyon 2.0.0</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;
