
import React, { useState, useEffect } from 'react';
import { NewsItem, ExamInfo } from '../types';
import { Sparkles, AlertCircle, Share2, ChevronRight, Calendar, MousePointerClick, ExternalLink, GraduationCap, UserCheck, FileText, ClipboardList, ShieldCheck, Link as LinkIcon } from 'lucide-react';
import { subscribeToNews } from '../services/newsService';
import { auth } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { handleShare } from '../lib/share';
import { Browser } from '@capacitor/browser';

interface HomeProps {
  onNewsClick: (news: NewsItem) => void;
  onExamClick: () => void;
  onFeeClick: () => void;
  onHowToApplyClick: () => void;
  onAcademicCalendarClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onNewsClick, onExamClick, onFeeClick, onHowToApplyClick, onAcademicCalendarClick }) => {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const unsubscribeNews = subscribeToNews((news) => {
      setNewsList(news);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeNews();
    };
  }, []);

  const heroExams: ExamInfo[] = [
    {
      id: '1',
      title: 'Güncel Sınav Bilgileri',
      subtitle: 'Başvuru Yapılabilen Sınavlar',
      bgImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      title: 'Sınav Ücretleri',
      subtitle: 'Kurumların Son Ödediği Ücretler',
      bgImageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '3',
      title: 'Nasıl Başvurulur?',
      subtitle: 'Sınav Görevi Başvuru Adımları',
      bgImageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const displayNews = newsList.length > 0 ? newsList : [];

  const calculateDaysLeft = () => {
    const targetDate = new Date('2026-06-26');
    const today = new Date();
    const diffTime = targetDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysLeft();

  const openLink = async (url: string) => {
    try {
      console.log('Opening link:', url);
      await Browser.open({ url });
    } catch (error) {
      console.error('Browser error:', error);
      window.open(url, '_blank');
    }
  };

  const quickLinks = [
    { title: 'MEBBİS', url: 'https://mebbis.meb.gov.tr/', icon: UserCheck, color: 'bg-blue-500' },
    { title: 'e-Okul', url: 'https://e-okul.meb.gov.tr/', icon: GraduationCap, color: 'bg-orange-500' },
    { title: 'ÖSYM GİS', url: 'https://gis.osym.gov.tr/', icon: FileText, color: 'bg-red-500' },
    { title: 'Anadolu Üni.', url: 'https://augis.anadolu.edu.tr/#!/', icon: ClipboardList, color: 'bg-green-600' },
    { title: 'Atatürk Üni.', url: 'https://aoftek.ataaof.edu.tr/', icon: ClipboardList, color: 'bg-indigo-500' },
    { title: 'E-Devlet', url: 'https://www.turkiye.gov.tr/', icon: ShieldCheck, color: 'bg-red-700' },
  ];

  return (
    <div className="flex flex-col space-y-1.5 animate-in fade-in duration-700 pb-4">
      {/* Akademik Takvim & Sayaç Kutusu */}
      <section className="px-5 mt-4">
        <div className="premium-card p-6 border-indigo-100/50">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
                <Calendar size={18} />
              </div>
              <h2 className="text-[17px] font-black text-indigo-950 uppercase tracking-tight">Akademik Takvim</h2>
            </div>
            <button 
              onClick={onAcademicCalendarClick}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-[12px] font-black shadow-lg shadow-indigo-200 active:scale-95 transition-all flex items-center space-x-2"
            >
              <span>2025-2026</span>
              <MousePointerClick size={14} className="animate-bounce" />
            </button>
          </div>
          
          <div className="relative overflow-hidden h-20 rounded-3xl border border-blue-200/50 shadow-inner flex items-center justify-center bg-blue-400">
            {/* Gerçekçi Arka Plan Resmi */}
            <img 
              src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1000&auto=format&fit=crop" 
              alt="Yaz Tatili" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.75]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            <div className="relative z-10 text-center w-full px-4">
              <p className="text-white font-extrabold text-sm flex items-center justify-center gap-x-3 tracking-tight drop-shadow-xl">
                <span className="drop-shadow-md">Yaz Tatiline</span>
                <span className="text-4xl font-black text-yellow-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
                  {daysLeft}
                </span>
                <span className="drop-shadow-md">Gün Kaldı</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600 shadow-sm">
              <Sparkles size={18} />
            </div>
            <h2 className="text-xl font-black text-indigo-950 title-font tracking-tight uppercase">Son Haberler</h2>
          </div>
        </div>
        
        <div className="flex overflow-x-auto space-x-4 pb-6 scrollbar-hide snap-x px-1">
          {displayNews.length === 0 && (
            <div className="w-full py-12 text-center text-gray-400 font-medium italic premium-card">
              Henüz haber bulunmuyor...
            </div>
          )}
          {displayNews.map((news) => (
            <div 
              key={news.id} 
              onClick={() => onNewsClick(news)}
              className="min-w-[190px] max-w-[190px] bg-white rounded-[2rem] overflow-hidden shadow-card snap-start active:scale-95 transition-all duration-400 border border-gray-100/60 flex flex-col cursor-pointer card-hover-effect"
              style={{ boxShadow: 'var(--card-shadow)' }}
            >
              <div className="h-36 w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
                <img 
                  src={news.imageUrl} 
                  alt="" 
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover block transition-opacity duration-700 hover:scale-110"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365234-781fcdb4c8ef?q=80&w=300';
                  }}
                />
              </div>
              <div className="p-5 flex-1 bg-gradient-to-b from-white to-indigo-50/20">
                <h3 className="text-gray-900 font-bold text-[15px] leading-snug line-clamp-3 font-serif">
                  {news.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hızlı Bağlantılar */}
      <section className="px-5 mt-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <LinkIcon size={18} />
          </div>
          <h2 className="text-xl font-black text-indigo-950 title-font tracking-tight uppercase">Hızlı Bağlantılar</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pb-6">
          {quickLinks.map((link, idx) => (
            <button 
              key={idx}
              onClick={() => openLink(link.url)}
              className="flex flex-col items-center p-3 premium-card active:scale-90 transition-all border-none bg-white hover:bg-indigo-50/30"
              style={{ borderRadius: '1.5rem', boxShadow: '0 8px 30px rgba(79, 70, 229, 0.05)' }}
            >
              <div className={`w-12 h-12 ${link.color} rounded-2xl shadow-lg flex items-center justify-center text-white relative mb-2.5`}>
                <link.icon size={24} />
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 shadow-md text-gray-400">
                  <ExternalLink size={10} />
                </div>
              </div>
              <span className="text-[10px] font-black text-indigo-950 uppercase tracking-tighter text-center leading-tight">
                {link.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 space-y-5">
        {heroExams.map((info) => (
          <div 
            key={info.id} 
            onClick={() => {
              if (info.id === '1') onExamClick();
              else if (info.id === '2') onFeeClick();
              else onHowToApplyClick();
            }}
            className="card-hover-effect relative w-full h-72 overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/40 group cursor-pointer"
          >
            <img 
              src={info.bgImageUrl} 
              alt="" 
              loading="eager"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.7] block transition-transform duration-1000 group-hover:scale-110" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-black/30"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-end text-white p-8 text-center">
              <h2 className="title-font text-3xl font-[900] mb-2 tracking-tight drop-shadow-lg">
                {info.title}
              </h2>
              <p className="text-[14px] font-bold text-white/90 mb-8 drop-shadow-md">
                {info.subtitle}
              </p>
              <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-12 py-3.5 rounded-full font-black text-[13px] shadow-xl transition-all uppercase tracking-[0.2em] group-hover:bg-white group-hover:text-indigo-600">
                İNCELEYİN
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-5 mt-6">
        <button 
          onClick={handleShare}
          className="w-full p-7 bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[2.5rem] shadow-2xl flex items-center justify-between group active:scale-95 transition-all overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="flex items-center space-x-5 relative z-10">
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/20">
              <Share2 size={26} />
            </div>
            <div className="text-left">
              <h4 className="text-white font-[900] text-xl font-['Outfit'] leading-tight tracking-tight">Arkadaşlarınla Paylaş</h4>
              <p className="text-indigo-100 text-[13px] font-bold opacity-80 mt-1">Öğretmen dostlarına tavsiye edebilirsin</p>
            </div>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white group-hover:bg-white/30 transition-colors relative z-10">
            <ChevronRight size={24} />
          </div>
        </button>
      </section>

      <section className="mx-5 p-8 glass-card rounded-[3rem] shadow-sm border border-white/60 mb-12 mt-6">
        <div className="flex items-start space-x-5">
          <div className="p-3 bg-indigo-600 rounded-[1.2rem] text-white shadow-xl shadow-indigo-100">
            <AlertCircle size={20} />
          </div>
          <div>
            <h4 className="text-[12px] font-black text-indigo-950 uppercase tracking-widest mb-2">Resmi Bilgilendirme</h4>
            <p className="text-[12px] text-gray-500 leading-relaxed font-bold opacity-80">
              Bu uygulama bir rehber niteliğindedir. Kesin ve en güncel bilgi için lütfen ilgili kurumların resmi web sitelerini düzenli olarak ziyaret ediniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
