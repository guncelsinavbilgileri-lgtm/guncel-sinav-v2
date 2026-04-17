
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
      <section className="px-5 mt-2">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-5 rounded-[2.5rem] border border-indigo-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
                <Calendar size={16} />
              </div>
              <h2 className="text-[15px] font-black text-indigo-950 uppercase tracking-tight">Akademik Takvim</h2>
            </div>
            <button 
              onClick={onAcademicCalendarClick}
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[12px] font-black shadow-md active:scale-95 transition-all flex items-center space-x-1.5"
            >
              <span>2025-2026</span>
              <MousePointerClick size={14} className="animate-bounce" />
            </button>
          </div>
          
          <div className="relative overflow-hidden h-16 rounded-[1.5rem] border border-blue-200 shadow-sm flex items-center justify-center bg-blue-400">
            {/* Gerçekçi Arka Plan Resmi - Daha Aydınlık ve Güvenilir Link */}
            <img 
              src="https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1000&auto=format&fit=crop" 
              alt="Yaz Tatili" 
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.8]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

            <div className="relative z-10 text-center w-full px-4">
              <p className="text-white font-extrabold text-sm flex items-center justify-center gap-x-2 tracking-tight drop-shadow-lg">
                <span className="drop-shadow-md">Yaz Tatiline</span>
                <span className="text-3xl font-black text-yellow-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
                  {daysLeft}
                </span>
                <span className="drop-shadow-md">Gün Kaldı :)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 mt-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
              <Sparkles size={16} />
            </div>
            <h2 className="text-lg font-black text-indigo-950 title-font tracking-tight uppercase">Son Haberler</h2>
          </div>
        </div>
        
        <div className="flex overflow-x-auto space-x-3 pb-4 scrollbar-hide snap-x">
          {displayNews.length === 0 && (
            <div className="w-full py-10 text-center text-gray-400 font-medium italic">
              Henüz haber bulunmuyor...
            </div>
          )}
          {displayNews.map((news) => (
            <div 
              key={news.id} 
              onClick={() => onNewsClick(news)}
              className="min-w-[170px] max-w-[170px] bg-white rounded-3xl overflow-hidden shadow-md snap-start active:scale-95 transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
            >
              <div className="h-32 w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
                <img 
                  src={news.imageUrl} 
                  alt="" 
                  loading="eager"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover block transition-opacity duration-500"
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.opacity = '1';
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1585829365234-781fcdb4c8ef?q=80&w=300';
                  }}
                />
              </div>
              <div className="p-4 flex-1">
                <h3 className="text-gray-800 font-bold text-[14px] leading-[1.3] line-clamp-3 font-serif">
                  {news.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hızlı Bağlantılar (Kısayol Merkezi) */}
      <section className="px-5 mt-1">
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
            <LinkIcon size={16} />
          </div>
          <h2 className="text-lg font-black text-indigo-950 title-font tracking-tight uppercase">Hızlı Bağlantılar</h2>
        </div>
        
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide snap-x">
          {quickLinks.map((link, idx) => (
            <button 
              key={idx}
              onClick={() => openLink(link.url)}
              className="flex flex-col items-center space-y-2 min-w-[75px] snap-start active:scale-90 transition-transform cursor-pointer"
            >
              <div className={`w-14 h-14 ${link.color} rounded-2xl shadow-lg flex items-center justify-center text-white relative group`}>
                <link.icon size={28} />
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm text-gray-400">
                  <ExternalLink size={10} />
                </div>
              </div>
              <span className="text-[11px] font-black text-gray-700 uppercase tracking-tighter text-center leading-tight">
                {link.title}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 space-y-1.5">
        {heroExams.map((info) => (
          <div key={info.id} className="relative w-full h-64 overflow-hidden rounded-[2rem] shadow-xl border border-white/30 group bg-indigo-900">
            <img 
              src={info.bgImageUrl} 
              alt="" 
              loading="eager"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.65] block transition-transform duration-700 group-hover:scale-105" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <h2 className="title-font text-3xl font-bold mb-1 tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {info.title}
              </h2>
              <p className="text-[15px] font-medium text-white/95 mb-8 drop-shadow-[0_1px_5px_rgba(0,0,0,0.8)]">
                {info.subtitle}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (info.id === '1') onExamClick();
                  else if (info.id === '2') onFeeClick();
                  else onHowToApplyClick();
                }}
                className="bg-white text-[#A0522D] px-14 py-3.5 rounded-full font-black text-[14px] shadow-2xl active:scale-95 transition-all uppercase tracking-widest hover:bg-gray-50"
              >
                TIKLAYIN
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-5">
        <button 
          onClick={handleShare}
          className="w-full p-6 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] shadow-xl flex items-center justify-between group active:scale-95 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-2xl text-white">
              <Share2 size={24} />
            </div>
            <div className="text-left">
              <h4 className="text-white font-black text-lg font-['Outfit'] leading-tight">Arkadaşlarınla Paylaş</h4>
              <p className="text-indigo-100 text-xs font-bold opacity-80">Öğretmen dostlarına tavsiye et!</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-white/20 transition-colors">
            <ChevronRight size={20} />
          </div>
        </button>
      </section>

      <section className="mx-5 p-6 glass-card rounded-[2.5rem] shadow-sm border border-white/60 mb-8">
        <div className="flex items-start space-x-4">
          <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <AlertCircle size={18} />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-indigo-950 uppercase tracking-widest mb-1">Resmi Bilgilendirme</h4>
            <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
              Bu uygulama bir rehberdir. Kesin bilgi için lütfen ilgili kurumların resmi web sitelerini ziyaret ediniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
