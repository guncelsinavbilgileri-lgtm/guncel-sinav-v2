
import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

const FeedbackForm: React.FC = () => {
  const [sufficiency, setSufficiency] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sufficiency) return;
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
          <CheckCircle2 size={48} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-2 font-['Outfit']">Gönderildi!</h2>
        <p className="text-gray-500 text-center font-bold">Desteğiniz için teşekkür ederiz.</p>
      </div>
    );
  }

  return (
    <div className="pb-28 animate-in fade-in duration-500">
      <div className="premium-header apple-blur pt-12 pb-6 text-center border-b border-indigo-50 shadow-sm sticky top-0 z-30">
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
          <div className="glass-card p-6 rounded-[2.5rem] shadow-sm border border-white/60">
            <h3 className="text-indigo-400 text-[10px] font-black tracking-[0.2em] mb-4 uppercase">DEĞERLENDİRME</h3>
            <p className="text-gray-800 text-lg font-black mb-6 font-['Outfit']">İçerik yeterli mi?</p>
            <div className="space-y-3">
              {['Yeterli', 'Yeni alanlar eklenmeli', 'Alanlar geliştirilmeli'].map((option) => (
                <button 
                  key={option}
                  type="button"
                  onClick={() => setSufficiency(option)}
                  className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all ${sufficiency === option ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-gray-100 bg-white/50 text-gray-400'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-5 rounded-[2rem] text-lg font-black tracking-[0.2em] shadow-2xl shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center space-x-3"
          >
            <span>GÖNDER</span>
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
