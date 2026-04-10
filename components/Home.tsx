
import React from 'react';
import { NewsItem, ExamInfo } from '../types';
import { Sparkles, AlertCircle } from 'lucide-react';

interface HomeProps {
  onNewsClick: (news: NewsItem) => void;
  onExamClick: () => void;
  onFeeClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onNewsClick, onExamClick, onFeeClick }) => {
  const topNews: NewsItem[] = [
    {
      id: '1',
      title: 'Kasım Seminerlerinde Süre Uzatıldı',
      date: '20/11/2025',
      imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&q=80&w=600',
      content: (
        <div className="space-y-6 text-justify">
          <p>Kasım 2025 ara tatilinde tamamlanması gereken Mesleki Çalışma Seminer eğitimi, teknik aksaklıklar ve sitede oluşan yoğunluk nedeniyle zorlukla tamamlanabilmişti.</p>
          <p>Tamamlayamayan öğretmenler için eğitimler 23 Kasım Pazar saat 23:59'a kadar uzatıldı.</p>
        </div>
      )
    },
    {
      id: '2',
      title: 'Kasım 2025 Seminerleri',
      date: '07/11/2025',
      imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600',
      content: (
        <div className="space-y-6">
          <p>Milli Eğitim Bakanlığı Kasım 2025 ara tatilinde yapılacak Mesleki Çalışma Seminerlerini açıkladı.</p>
        </div>
      )
    },
    {
      id: '3',
      title: '2025-2026 Akademik Takvim',
      date: '15/05/2025',
      imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600',
      content: (
        <div className="space-y-6">
          <p>Milli Eğitim Bakanlığı "2025-2026 Eğitim Öğretim Yılı Çalışma Takvimi"ni yayımladı.</p>
        </div>
      )
    }
  ];

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
    }
  ];

  return (
    <div className="flex flex-col space-y-6 animate-in fade-in duration-700 pb-16">
      <section className="px-5 mt-4">
        <div className="flex items-center space-x-2 mb-4">
          <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
            <Sparkles size={16} />
          </div>
          <h2 className="text-lg font-black text-indigo-950 title-font tracking-tight uppercase">Son Haberler</h2>
        </div>
        
        <div className="flex overflow-x-auto space-x-5 pb-4 scrollbar-hide snap-x">
          {topNews.map((news) => (
            <div 
              key={news.id} 
              onClick={() => onNewsClick(news)}
              className="min-w-[180px] max-w-[180px] bg-white rounded-3xl overflow-hidden shadow-md snap-start active:scale-95 transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer"
            >
              <div className="h-32 w-full overflow-hidden bg-gray-100 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gray-200 animate-pulse -z-10"></div>
                <img 
                  src={news.imageUrl} 
                  alt="" 
                  loading="eager"
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

      <section className="px-5 space-y-4">
        {heroExams.map((info) => (
          <div key={info.id} className="relative w-full h-64 overflow-hidden rounded-[2rem] shadow-xl border border-white/30 group">
            <img 
              src={info.bgImageUrl} 
              alt="" 
              loading="eager"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.5] block transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
              <h2 className="title-font text-3xl font-bold mb-1 tracking-tight drop-shadow-lg">
                {info.title}
              </h2>
              <p className="text-[15px] font-medium text-white/95 mb-8 drop-shadow-md">
                {info.subtitle}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  info.id === '1' ? onExamClick() : onFeeClick();
                }}
                className="bg-white text-[#A0522D] px-14 py-3.5 rounded-full font-black text-[14px] shadow-2xl active:scale-95 transition-all uppercase tracking-widest hover:bg-gray-50"
              >
                TIKLAYIN
              </button>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-5 p-6 glass-card rounded-[2.5rem] shadow-sm border border-white/60">
        <div className="flex items-start space-x-4">
          <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100">
            <AlertCircle size={18} />
          </div>
          <div>
            <h4 className="text-[11px] font-black text-indigo-900 uppercase tracking-widest mb-1">Resmi Bilgilendirme</h4>
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
