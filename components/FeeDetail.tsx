
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Share2, Minus, Plus, Loader2, Construction, TriangleAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getFeeDetailById, FeeDetailData } from '../services/examService';
import { handleShare } from '../lib/share';

interface FeeDetailProps {
  onBack: () => void;
  feeId?: string;
}

const FeeDetail: React.FC<FeeDetailProps> = ({ onBack, feeId = '1' }) => {
  const [detail, setDetail] = useState<FeeDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    if (fontSize < 24) setFontSize(prev => prev + 2);
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) setFontSize(prev => prev - 2);
  };

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 5000);

      try {
        const data = await getFeeDetailById(feeId);
        setDetail(data);
      } catch (error) {
        console.error("Error fetching fee detail:", error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [feeId]);

  if (loading) {
    return (
      <div className="absolute inset-0 bg-white z-[65] flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="absolute inset-0 bg-white z-[65] flex flex-col items-center justify-center p-8 text-center">
        <div className="relative mb-8">
          <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
          <Construction size={80} className="text-yellow-500 relative z-10" />
          <div className="absolute -bottom-2 -right-2 bg-red-500 text-white p-1.5 rounded-lg shadow-lg">
            <TriangleAlert size={20} />
          </div>
        </div>
        
        <div className="space-y-4 max-w-[280px]">
          <h3 className="text-xl font-black text-gray-900 font-['Outfit'] uppercase tracking-tight">
            GÜNCELLEME YAPILIYOR
          </h3>
          <p className="text-gray-500 font-bold text-sm leading-relaxed">
            Bu sayfada şu an güncelleme yapılmaktadır. Lütfen daha sonra tekrar kontrol ediniz.
          </p>
        </div>

        <div className="mt-10 flex items-center space-x-2 w-full max-w-[200px]">
          <div className="h-2 flex-1 bg-gradient-to-r from-yellow-400 via-black to-yellow-400 rounded-full opacity-20"></div>
          <div className="h-2 flex-1 bg-gradient-to-r from-yellow-400 via-black to-yellow-400 rounded-full opacity-20"></div>
        </div>

        <button 
          onClick={onBack} 
          className="mt-12 bg-indigo-600 text-white px-10 py-3.5 rounded-full font-black text-sm shadow-xl shadow-indigo-100 active:scale-95 transition-all uppercase tracking-widest"
        >
          ANA SAYFAYA DÖN
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white z-[65] overflow-y-auto animate-in slide-in-from-right duration-500 shadow-2xl">
      {/* Header */}
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
          src={detail.imageUrl || "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop"} 
          alt={detail.title} 
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent"></div>
      </div>

      {/* Content Container */}
      <article className="px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-1 bg-green-500 rounded-full"></div>
            <p className="text-green-600 text-[11px] font-black uppercase tracking-[0.3em]">Ücret Bilgileri</p>
          </div>
          <h1 className="text-[32px] font-[900] text-indigo-950 leading-[1.1] mb-6 font-['Outfit'] tracking-tight">
            {detail.title}
          </h1>
          <div className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black">GSB</div>
              <div>
                <p className="text-indigo-950 font-black text-[13px]">Son Güncelleme</p>
                <p className="text-indigo-400 text-[11px] font-bold uppercase tracking-wider">
                  {detail.lastUpdate || (detail as any).lastupdate || 'Belirtilmedi'}
                </p>
              </div>
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-black text-[10px] active:scale-95 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest"
            >
              <span>PAYLAŞ</span>
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-gray-100 mb-10" />

        <div 
          className="markdown-body prose prose-indigo max-w-none text-gray-800 leading-relaxed font-medium opacity-90"
          style={{ fontSize: `${fontSize}px` }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {detail.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="h-20" />
    </div>
  );
};

export default FeeDetail;
