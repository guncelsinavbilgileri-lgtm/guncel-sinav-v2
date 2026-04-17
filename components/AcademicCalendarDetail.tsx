import React, { useEffect, useState } from 'react';
import { ChevronLeft, Share2, Loader2, Calendar, Construction, TriangleAlert } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getAcademicCalendarById, AcademicCalendarData } from '../services/examService';
import { handleShare } from '../lib/share';

interface AcademicCalendarDetailProps {
  onBack: () => void;
  id?: string;
}

const AcademicCalendarDetail: React.FC<AcademicCalendarDetailProps> = ({ onBack, id = '1' }) => {
  const [detail, setDetail] = useState<AcademicCalendarData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 5000);

      try {
        const data = await getAcademicCalendarById(id);
        setDetail(data);
      } catch (error) {
        console.error("Error fetching academic calendar detail:", error);
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

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
    <div className="absolute inset-0 bg-white z-[65] overflow-y-auto animate-in slide-in-from-right duration-300 shadow-2xl">
      {/* Header */}
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
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-72 overflow-hidden relative bg-indigo-900">
        <img 
          src={detail.imageUrl || "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=800"} 
          alt={detail.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-90"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <article className="px-5 py-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Calendar size={24} />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-800 leading-tight font-['Outfit'] uppercase">
            {detail.title}
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-6">
          <p className="text-indigo-600 text-sm font-semibold">
            Son Güncelleme: {detail.lastUpdate || 'Belirtilmedi'}
          </p>
          <div className="w-40 h-0.5 bg-gray-200 mt-4" />
        </div>

        <div className="markdown-body prose prose-indigo max-w-none text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {detail.content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="h-20" />
    </div>
  );
};

export default AcademicCalendarDetail;
