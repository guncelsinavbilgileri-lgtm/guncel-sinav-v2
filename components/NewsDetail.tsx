
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
    <div className="absolute inset-0 bg-white z-[60] overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
      {/* Detail Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-100 px-4 pt-[env(safe-area-inset-top,44px)] pb-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-indigo-600 active:scale-90 transition-transform">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleShare}
            className="p-2 text-indigo-600 active:scale-90 transition-transform"
          >
            <Share2 size={22} />
          </button>
          <div className="flex items-center bg-indigo-50 rounded-full px-3 py-1 space-x-3">
            <button 
              onClick={decreaseFontSize}
              className="text-indigo-600 font-bold text-sm flex items-center active:scale-90 transition-transform"
            >
              A<Minus size={10} className="ml-0.5" />
            </button>
            <div className="w-px h-3 bg-indigo-200" />
            <button 
              onClick={increaseFontSize}
              className="text-indigo-600 font-bold text-sm flex items-center active:scale-90 transition-transform"
            >
              A<Plus size={10} className="ml-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-64 overflow-hidden">
        <img 
          src={news.imageUrl} 
          alt={news.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <article className="px-6 py-8">
        <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4 font-['Outfit']">
          {news.title}
        </h1>

        <div className="flex flex-col items-center justify-center text-center mb-8">
          <p className="text-indigo-400 text-sm font-semibold mb-1">
            Yazılma zamanı {news.date}
          </p>
          <p className="text-indigo-900 font-bold text-lg">
            Bir Öğretmen
          </p>
          <div className="w-32 h-0.5 bg-indigo-100 mt-4" />
        </div>

        <div 
          className="prose prose-indigo max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap"
          style={{ fontSize: `${fontSize}px` }}
        >
          {news.content}
        </div>
      </article>

      {/* Footer Navigation Dots Simulation */}
      <div className="flex justify-center space-x-2 py-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-indigo-400' : 'bg-indigo-100'}`} />
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
