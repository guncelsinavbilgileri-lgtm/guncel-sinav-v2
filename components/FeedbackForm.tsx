
import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const FeedbackForm: React.FC = () => {
  const [sufficiency, setSufficiency] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sufficiency) return;
    
    setIsSubmitting(true);
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 8000)
      );
      
      const addDocPromise = addDoc(collection(db, 'feedback'), {
        sufficiency,
        note,
        timestamp: serverTimestamp()
      });

      await Promise.race([addDocPromise, timeoutPromise]);
      
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Gönderim sırasında bir sorun oluştu. İnternet bağlantınızı kontrol edip tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-indigo-100">
          <CheckCircle2 size={48} className="text-indigo-600" />
        </div>
        <h2 className="text-2xl font-[900] text-indigo-950 mb-2 font-['Outfit'] tracking-tight">GÖRÜŞÜNÜZ ALINDI</h2>
        <p className="text-indigo-400 font-bold text-[14px] uppercase tracking-widest text-center">Desteğiniz için teşekkür ederiz.</p>
      </div>
    );
  }

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      <div className="premium-header apple-blur pt-[env(safe-area-inset-top,44px)] pb-6 text-center border-b border-indigo-50 shadow-sm sticky top-0 z-30">
        <h1 className="title-font text-[22px] font-[900] tracking-tighter text-gradient uppercase leading-none">
          Görüş Bildir
        </h1>
      </div>

      <div className="px-6 pt-8 max-w-md mx-auto">
        <div className="flex flex-col mb-10">
          <h2 className="text-3xl font-black text-indigo-950 font-['Outfit'] tracking-tighter mb-2">Anket & Not</h2>
          <div className="w-16 h-1.5 bg-indigo-600 rounded-full"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="premium-card p-8 border-indigo-100/30">
            <h3 className="text-indigo-400 text-[10px] font-black tracking-[0.3em] mb-4 uppercase">DENEYİMİNİZ</h3>
            <p className="text-indigo-950 text-xl font-[900] mb-6 font-['Outfit'] tracking-tight">İçerik sizce yeterli mi?</p>
            <div className="space-y-4">
              {['Harika, Her Şey Mevcut', 'Geliştirilmeli', 'Yeni Alanlar Eklenmeli'].map((option) => (
                <button 
                  key={option}
                  type="button"
                  onClick={() => setSufficiency(option)}
                  className={`w-full p-5 rounded-2xl border-2 text-left font-black transition-all text-sm uppercase tracking-wider ${sufficiency === option ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'border-indigo-50 bg-white text-indigo-950 hover:bg-indigo-50/50'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="premium-card p-8 border-indigo-100/30">
            <h3 className="text-indigo-400 text-[10px] font-black tracking-[0.3em] mb-4 uppercase">MESAJINIZ</h3>
            <p className="text-indigo-950 text-xl font-[900] mb-5 font-['Outfit'] tracking-tight">Eklemek istedikleriniz:</p>
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Önerilerinizi buraya yazabilirsiniz..."
              className="w-full p-5 rounded-3xl border border-indigo-50 bg-indigo-50/20 text-indigo-950 font-bold placeholder:text-indigo-200 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all min-h-[160px] resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting || !sufficiency}
            className={`w-full py-6 rounded-[2.5rem] text-lg font-black tracking-[0.2em] uppercase active:scale-95 transition-all flex items-center justify-center space-x-4 ${isSubmitting || !sufficiency ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)]'}`}
          >
            <span>{isSubmitting ? 'GÖNDERİLİYOR' : 'GÖRÜŞÜ GÖNDER'}</span>
            {!isSubmitting && <Send size={22} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
