
import React, { useState } from 'react';
import { NewsItem } from '../types';
import { ChevronLeft, Share2, Minus, Plus } from 'lucide-react';
import { handleShare } from '../lib/share';

interface NewsDetailProps {
  news: NewsItem;
  onBack: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ news, onBack }) => {
  const [fontSize, setFontSize] = useState(18); // Varsayılan text-lg (18px)

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(prev => prev + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 14) setFontSize(prev => prev - 2);
  };

  return (
    <div className="absolute inset-0 bg-white z-[60] overflow-y-auto animate-in slide-in-from-right duration-500 shadow-2xl">
      {/* Detail Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-xl z-10 px-5 pt-[env(safe-area-inset-top,44px)] pb-4 flex items-center justify-between">
        <button onClick={onBack} className="p-3 -ml-3 bg-indigo-50 text-indigo-600 rounded-2xl active:scale-90 transition-all shadow-sm">
          <ChevronLeft size={24} strokeWidth={3} />
        </button>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleShare}
            className="p-3 bg-white border border-indigo-50 text-indigo-600 rounded-2xl active:scale-90 transition-all shadow-sm"
          >
            <Share2 size={20} />
          </button>
          <div className="flex items-center bg-indigo-600 rounded-2xl p-1 shadow-lg shadow-indigo-100">
            <button 
              onClick={decreaseFontSize}
              className="w-10 h-10 text-white font-black text-sm flex items-center justify-center active:scale-90 transition-transform"
            >
              A-
            </button>
            <div className="w-px h-5 bg-white/20" />
            <button 
              onClick={increaseFontSize}
              className="w-10 h-10 text-white font-black text-base flex items-center justify-center active:scale-90 transition-transform"
            >
              A+
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-72 overflow-hidden relative">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Container */}
      <article className="px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-indigo-600 rounded-full"></div>
            <p className="text-indigo-400 text-[11px] font-black uppercase tracking-[0.3em]">Haber Detayı</p>
          </div>
          <h1 className="text-[32px] font-[900] text-indigo-950 leading-[1.1] mb-6 font-['Outfit'] tracking-tight">
            {news.title}
          </h1>
          <div className="flex items-center space-x-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black">GSB</div>
            <div>
              <p className="text-indigo-950 font-black text-[14px]">Editör Masası</p>
              <p className="text-indigo-400 text-[11px] font-bold uppercase tracking-wider">{news.date}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-10" />

        <div 
          className="prose prose-indigo max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap font-medium opacity-90"
          style={{ fontSize: `${fontSize}px` }}
        >
          {news.content}
        </div>
      </article>

      {/* Footer Decoration */}
      <div className="flex flex-col items-center py-16 space-y-4 opacity-20">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          ))}
        </div>
        <p className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.5em]">Son Bilgi</p>
      </div>
    </div>
  );
};

export default NewsDetail;
