
import React from 'react';
import { ArrowLeft, Shield, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalDetailProps {
  type: 'privacy' | 'terms';
  onBack: () => void;
}

const LegalDetail: React.FC<LegalDetailProps> = ({ type, onBack }) => {
  const isPrivacy = type === 'privacy';

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-[#F8FAFF] flex flex-col h-full overflow-hidden"
    >
      {/* Header */}
      <header className="premium-header apple-blur px-5 pt-[env(safe-area-inset-top,44px)] pb-4 shadow-sm border-b border-indigo-50 flex items-center shrink-0">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-xl active:scale-90 transition-all text-indigo-950/60"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="ml-2 text-[17px] font-[900] text-indigo-950 uppercase tracking-tight">
          {isPrivacy ? 'Gizlilik Politikası' : 'Kullanım Şartları'}
        </h2>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
          
          <div className="flex justify-center mb-8">
            <div className={`p-5 rounded-3xl ${isPrivacy ? 'bg-indigo-600' : 'bg-red-600'} text-white shadow-xl shadow-indigo-100`}>
              {isPrivacy ? <Shield size={40} /> : <FileText size={40} />}
            </div>
          </div>

          <h1 className="text-2xl font-[900] text-indigo-950 text-center uppercase tracking-tight leading-none mb-8">
            {isPrivacy ? 'Gizlilik Politikası' : 'Kullanım Şartları ve Koşulları'}
          </h1>

          {isPrivacy ? (
            <div className="space-y-8 text-gray-700 font-bold text-[15px] leading-relaxed">
              <p>Güncel Sınav Bilgileri uygulaması olarak kişisel verilerinizin güvenliği bizim için önemlidir. Bu metin, uygulamanın hangi verileri nasıl işlediği hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.</p>
              
              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">1. Veri Toplama ve Kullanım</h3>
                <p>Uygulamamız temel olarak bir rehber uygulamasıdır ve kullanıcıların özel hayatına ilişkin hassas verileri doğrudan toplamaz. Ancak aşağıdaki durumlarda veri işlenebilir:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span><strong>Geri Bildirim Formu:</strong> Bize ulaşın bölümünden gönderdiğiniz mesajlar, taleplerinizi yanıtlayabilmek adına kaydedilir.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span><strong>Analiz:</strong> Uygulamanın performansını iyileştirmek amacıyla tamamen anonim olarak kullanım istatistikleri görülebilir.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">2. Bilgi Kaynakları ve Doğruluk</h3>
                <p>Uygulamada sunulan bilgiler resmi kurumların (ÖSYM, MEB vb.) kamuya açık duyurularından derlenmektedir. Uygulama bu verileri saklamaz, sadece kullanıcıya kolay erişim için bir arayüz sağlar.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">3. Üçüncü Taraf Bağlantıları</h3>
                <p>Uygulama içeriğinde resmi kurumların web sitelerine yönlendiren bağlantılar bulunabilir. Bu sitelerin gizlilik politikalarından uygulama sahibi sorumlu değildir.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">4. Çocukların Gizliliği</h3>
                <p>Uygulamamız yetişkinlere (öğretmenlere) yöneliktir ve 13 yaş altındaki bireylerden bilerek veri toplamaz.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">5. İletişim</h3>
                <p>Gizlilik politikamız hakkındaki sorularınız için <strong>guncelsinavbilgileri@gmail.com</strong> adresinden veya uygulama içerisindeki "Bize Ulaşın" formundan bize ulaşabilirsiniz.</p>
              </section>
            </div>
          ) : (
            <div className="space-y-8 text-gray-700 font-bold text-[15px] leading-relaxed">
              <p>Güncel Sınav Bilgileri uygulamasını kullanarak aşağıdaki şartları ve koşulları kabul etmiş sayılırsınız.</p>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">1. Uygulamanın Amacı</h3>
                <p>Bu uygulama, farklı kurumlardan sınav görevi almak isteyen öğretmenlere zaman kazandırılıp kolaylık sağlanması amacıyla hazırlanmış bir rehber uygulamasıdır.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">2. Resmi Temsiliyet Reddi</h3>
                <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-950 text-sm">
                  Uygulama bir hükümet kuruluşunu temsil ETMEMEKTEDİR, resmi bilgi açıklamaya yetkili bir uygulama DEĞİLDİR. Uygulamayı güncelleyen ve düzenleyen kişilerden hiçbiri hükümet veya bakanlık yetkilisi DEĞİLDİR.
                </div>
                <p>Uygulama içeriğindeki bilgiler; www.osym.gov.tr, www.meb.gov.tr, www.istanbul.edu.tr ve www.anadolu.edu.tr sitelerinin "Duyurular" bölümlerinden alınıp derlenmektedir.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">3. Sorumluluk Sınırları</h3>
                <p>İçerikteki bilgi ve tarih bölümleri güncel tutulmaya çalışılmakla birlikte, uygulama kullanıcıya hiçbir taahhütte bulunmaz:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span>Uygulama içeriğinde verilen bilgilerde hatalar olabilir.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span>Bilgilerin güncelliğinin sağlanamaması mümkündür.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                    <span>Tarih ve ücret bilgilerinde hatalar olabilir.</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-indigo-600 text-sm font-black uppercase tracking-widest border-b border-indigo-50 pb-2">4. Değişiklik Hakları</h3>
                <p>Uygulama sahibi, bu kullanım şartlarını dilediği zaman güncelleme hakkını saklı tutar. Kullanıcılar güncel şartları periyodik olarak kontrol etmekle yükümlüdür.</p>
              </section>
            </div>
          )}

          <div className="pt-10 border-t border-indigo-50 text-center text-[12px] text-gray-400 font-bold italic">
            © 2026 Güncel Sınav Bilgileri - Tüm Hakları Saklıdır.
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LegalDetail;
