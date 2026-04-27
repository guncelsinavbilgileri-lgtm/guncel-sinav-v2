
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShieldCheck, Info as InfoIcon, Database, Wifi, ExternalLink } from 'lucide-react';
import { testConnection } from '../services/newsService';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Info: React.FC<{ onLegalClick: (type: 'privacy' | 'terms') => void }> = ({ onLegalClick }) => {
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Note: We are keeping the database connection logic but we prioritize internal components
  // to avoid Google Play rejection due to external link errors.
  
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
        
        {/* Künye / Masthead Section - CRITICAL for Google News */}
        <section className="premium-card p-8 border-indigo-100/30">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-indigo-950 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <InfoIcon size={24} />
            </div>
            <h2 className="text-2xl font-[900] text-indigo-950 font-['Outfit'] tracking-tight uppercase">
              Künye (Masthead)
            </h2>
          </div>
          
          <div className="space-y-4 p-5 bg-indigo-50/30 rounded-2xl border border-indigo-100">
            <div className="flex flex-col space-y-3">
              <div className="pb-3 border-b border-indigo-100/50">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">Uygulama Sahibi & Yayıncı</p>
                <p className="text-sm font-black text-indigo-950">Güncel Sınav Bilgileri</p>
              </div>
              
              <div className="pb-3 border-b border-indigo-100/50">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">Genel Yayın Yönetmeni & Editör</p>
                <p className="text-sm font-black text-indigo-950">Güncel Sınav Bilgileri</p>
              </div>

              <div className="pb-3 border-b border-indigo-100/50">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">İletişim & Destek</p>
                <p className="text-sm font-black text-indigo-950">guncelsinavbilgileri@gmail.com</p>
              </div>

              <div>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-1">Sunucu & Teknik Alt Yapı</p>
                <p className="text-sm font-black text-indigo-950">Google Cloud Platform & Firebase</p>
              </div>
            </div>
          </div>
          
          <p className="mt-4 text-[11px] text-gray-500 font-bold italic leading-relaxed">
            Bu uygulama, öğretmenlerin sınav görevleri hakkında şeffaf ve hızlı bilgi alabilmesi için kurulan bağımsız bir bilgi platformudur.
          </p>
        </section>

        {/* GİZLİLİK ÖZETİ - GÖRSELDEKİ TÜM MADDELER */}
        <section className="premium-card p-10 border-indigo-100/30">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-2xl font-[900] text-indigo-950 font-['Outfit'] tracking-tight">Gizlilik Özetimiz</h2>
          </div>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-[12px] font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                1. Veri Toplama
              </h4>
              <p className="text-[14px] text-gray-700 font-bold leading-relaxed ml-3.5">
                Sadece "Görüş Bildir" formundaki mesajlarınız ve anonim kullanım istatistikleri işlenir. Özel hayatınıza ilişkin hassas veriler asla toplanmaz.
              </p>
            </div>

            <div>
              <h4 className="text-[12px] font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                2. Bilgi Kaynakları
              </h4>
              <p className="text-[14px] text-gray-700 font-bold leading-relaxed ml-3.5">
                Tüm bilgiler ÖSYM, MEB ve Üniversitelerin kamuya açık duyurularından derlenir. Uygulama bu verileri saklamaz, sadece kolay erişim sağlar.
              </p>
            </div>

            <div>
              <h4 className="text-[12px] font-black text-indigo-600 uppercase tracking-widest mb-3 flex items-center">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                3. Çocukların Gizliliği
              </h4>
              <p className="text-[14px] text-gray-700 font-bold leading-relaxed ml-3.5">
                Uygulamamız yetişkinlere (öğretmenlere) yöneliktir ve 13 yaş altındaki bireylerden bilerek veri toplamaz.
              </p>
            </div>

            <div className="pt-6 border-t border-indigo-50">
              <p className="text-[11px] text-indigo-400 font-bold italic leading-relaxed">
                * Politikamız hakkındaki tüm sorularınız için guncelsinavbilgileri@gmail.com üzerinden veya Bize Ulaşın formundan destek alabilirsiniz.
              </p>
            </div>
          </div>
        </section>

        {/* Hakkında & Yasal Uyarı */}
        <section className="premium-card p-8 border-indigo-100/30">
          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-red-600 rounded-2xl text-white shadow-xl shadow-red-100">
              <AlertTriangle size={24} />
            </div>
            <h2 className="text-2xl font-[900] text-indigo-950 font-['Outfit'] tracking-tight">
              Yasal Uyarılar
            </h2>
          </div>

          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 mb-6">
            <p className="text-red-950 font-black text-[14px] leading-relaxed">
              ÖNEMLİ: Bu uygulama bağımsız bir öğretmen rehberidir ve herhangi bir devlet kurumuyla (ÖSYM, MEB, Bakanlık vb.) resmi bir bağı veya temsilciliği bulunmamaktadır.
            </p>
          </div>
          <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed font-bold opacity-90">
            <p>
              Uygulama, öğretmenlere sınav görevleri süreçlerinde zaman kazandırmak amacıyla profesyonel bir hassasiyetle hazırlanmıştır.
            </p>
            <p>
              İçerikteki tüm veriler, ilgili resmi kurum sitelerinden (osym.gov.tr, meb.gov.tr vb.) serbestçe elde edilebilen açık kaynaklı bilgilerdir.
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
              onClick={() => onLegalClick('terms')}
            >
              <span>Kullanım Koşulları</span>
              <ExternalLink size={16} className="text-indigo-400" />
            </button>
            <button 
              className="w-full py-5 bg-white border border-indigo-50 rounded-2xl text-[14px] font-black text-indigo-950 uppercase tracking-[0.2em] active:scale-95 transition-all shadow-sm flex items-center justify-center space-x-3 hover:bg-gray-50"
              onClick={() => onLegalClick('privacy')}
            >
              <span>Gizlilik Politikası</span>
              <ExternalLink size={16} className="text-indigo-400" />
            </button>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-[0.4em]">Versiyon 2.0.8</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;
