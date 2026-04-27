
import React, { useState } from 'react';
import { NewsItem } from '../types';
import { ChevronLeft, Share2, Minus, Plus, Newspaper } from 'lucide-react';
import { handleShare } from '../lib/share';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

          <div className="mb-6 flex items-center space-x-2">
            <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <p className="text-[11px] text-amber-800 font-black uppercase tracking-wider">
                Resmi Kaynak: {news.source || 'Kamu Duyurusu'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Newspaper size={20} />
            </div>
            <div>
              <p className="text-indigo-950 font-black text-[14px]">Editör: GSB Haber Masası</p>
              <p className="text-indigo-400 text-[11px] font-bold uppercase tracking-wider">{news.date} | Yayıncı: Güncel Sınav Bilgileri</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-10" />

        <div 
          className="markdown-body text-gray-800 leading-relaxed font-medium opacity-90"
          style={{ fontSize: `${fontSize}px` }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {news.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Resource Box - Smaller and at Bottom */}
      <div className="px-8 mt-4">
        <div className="p-5 bg-gray-50 border-l-4 border-indigo-600 rounded-r-2xl shadow-sm">
          <p className="text-[11px] text-indigo-600 font-black mb-2 uppercase tracking-widest flex items-center">
            <span className="mr-2">📢</span> EDİTORYAL ŞEFFAFLIK & KAYNAK
          </p>
          <p className="text-[12px] text-indigo-950 font-bold leading-relaxed mb-3">
            Bu haber içeriği, resmi kamu duyuruları (ÖSYM, MEB veya ilgili Üniversiteler) temel alınarak 
            <span className="text-indigo-600 font-black"> Güncel Sınav Bilgileri Editör Masası </span> tarafından hazırlanmıştır.
          </p>
          <div className="flex flex-col space-y-1 pt-2 border-t border-gray-200">
            <p className="text-[10px] text-gray-500 font-bold">
              Yazar: Güncel Sınav Bilgileri (Editör Masası)
            </p>
            <p className="text-[10px] text-gray-500 font-bold">
              Asıl Kaynak: Kamu Duyuruları (Resmi Web Siteleri)
            </p>
            <p className="text-[10px] text-gray-500 font-bold">
              İletişim: guncelsinavbilgileri@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="flex flex-col items-center py-12 space-y-4 opacity-40">
        <div className="flex space-x-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          ))}
        </div>
        <p className="text-[9px] font-black text-indigo-950 uppercase tracking-[0.5em]">Son Bilgi</p>
      </div>
      
      {/* Bottom Spacer */}
      <div className="h-24" />
    </div>
  );
};

export default NewsDetail;
