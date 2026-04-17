
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

      <div className="w-full h-56 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop" 
          alt="Uygulama Hakkında" 
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent"></div>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto space-y-8">
        
        {/* Uygulama Hakkında */}
        <section className="glass-card p-6 rounded-[2.5rem] border border-white/60 shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md">
              <InfoIcon size={20} />
            </div>
            <h2 className="text-xl font-black text-indigo-950 font-['Outfit'] tracking-tight">
              Uygulama Hakkında
            </h2>
          </div>
          <div className="space-y-4 text-gray-600 text-[14px] leading-relaxed font-medium">
            <p>
              Uygulama, farklı kurumlardan sınav görevi almak isteyen öğretmenlere zaman kazandırılıp kolaylık sağlanması amacıyla hazırlanmıştır.
            </p>
            <p>
              Uygulama içeriğindeki bilgiler, herkesin ilgili kurum sitelerinden serbestçe elde edebileceği bilgilerden oluşmaktadır.
            </p>
            <p>
              Uygulamada geliştirilmesi istenen bölümler; eklenmesi, düzeltilmesi veya kaldırılması talep edilen bilgiler "Bize Ulaşın" bölümünden iletilmelidir.
            </p>
          </div>
        </section>

        {/* Feragatname */}
        <section className="p-6 bg-red-50/50 rounded-[2.5rem] border border-red-100">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-red-600 rounded-xl text-white shadow-md">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-black text-red-600 font-['Outfit'] uppercase tracking-tight">
              FERAGATNAME
            </h3>
          </div>
          <div className="space-y-4 text-red-950 text-[13px] leading-relaxed font-bold">
            <p>
              Uygulama bir hükümet kuruluşunu temsil ETMEMEKTEDİR, resmi bilgi açıklamaya yetkili bir uygulama DEĞİLDİR. Uygulamayı güncelleyen ve düzenleyen kişilerden hiçbiri hükümet veya bakanlık yetkilisi DEĞİLDİR.
            </p>
            <p>
              Kullanılan bilgiler <span className="underline">www.osym.gov.tr</span>, <span className="underline">www.meb.gov.tr</span>, <span className="underline">www.istanbul.edu.tr</span> ve <span className="underline">www.anadolu.edu.tr</span> sitelerinin "Duyurular" bölümlerinden alınıp derlenmektedir.
            </p>
          </div>
        </section>

        {/* Uyarı */}
        <section className="glass-card p-6 rounded-[2.5rem] border border-indigo-100 bg-indigo-50/20">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md">
              <AlertTriangle size={20} />
            </div>
            <h3 className="text-lg font-black text-indigo-950 font-['Outfit'] uppercase tracking-tight">
              UYARI
            </h3>
          </div>
          <div className="space-y-4 text-gray-700 text-[13px] leading-relaxed font-semibold">
            <p>
              İçerikteki bilgi-tarih bölümleri güncel tutulmakta olmakla birlikte; uygulama, kullanıcıya hiçbir taahhütte bulunmaz.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1 text-indigo-900">
              <li>Uygulama içeriğinde verilen bilgilerde hatalar olabilir.</li>
              <li>Güncelliğin sağlanamaması mümkündür.</li>
              <li>Tarih bilgilerinde hatalar olabilir.</li>
            </ul>
            <p>
              Burada yazılan veya yazılmayan sorunlar, uygulama sahibinin sorumluluğunda değildir. Kullanıcı, bu bilgileri bilerek uygulamayı kurmalı ve yüklemelidir.
            </p>
            <p>
              Önemli bilgileri ilgili kurumların sitelerine girerek kontrol etmek, kullanıcının sorumluluğundadır. Uygulama, oluşacak mağduriyetlerden, yaşanabilecek sıkıntılardan sorumlu tutulamaz.
            </p>
          </div>
        </section>

        {/* Yasal Bağlantılar */}
        <section className="px-2 pt-2 pb-10">
          <p className="text-[12px] text-gray-500 font-medium leading-relaxed mb-6 italic text-center">
            Bu çerçevede, sürekli güncellenen "Kullanım Şartları ve Koşulları" ve "Gizlilik Politikası" bölümleri incelenmelidir.
          </p>
          <div className="flex flex-col space-y-3">
            <button 
              className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-[13px] font-black text-indigo-950 uppercase tracking-widest active:scale-95 transition-all shadow-sm flex items-center justify-center space-x-2"
              onClick={() => window.open(legalUrls.terms, '_blank')}
            >
              <span>Kullanım Şartları ve Koşulları</span>
              <ExternalLink size={14} className="text-gray-400" />
            </button>
            <button 
              className="w-full py-4 bg-white border border-gray-200 rounded-2xl text-[13px] font-black text-indigo-950 uppercase tracking-widest active:scale-95 transition-all shadow-sm flex items-center justify-center space-x-2"
              onClick={() => window.open(legalUrls.privacy, '_blank')}
            >
              <span>Gizlilik Politikası</span>
              <ExternalLink size={14} className="text-gray-400" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;
