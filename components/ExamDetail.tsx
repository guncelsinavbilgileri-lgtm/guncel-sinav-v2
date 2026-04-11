
import React, { useEffect, useState } from 'react';
import { ChevronLeft, Share2, Minus, Plus, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getExamDetailById, ExamDetailData } from '../services/examService';

interface ExamDetailProps {
  onBack: () => void;
  examId?: string;
}

const ExamDetail: React.FC<ExamDetailProps> = ({ onBack, examId = '1' }) => {
  const [detail, setDetail] = useState<ExamDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const data = await getExamDetailById(examId);
        setDetail(data);
      } catch (error) {
        console.error("Error fetching exam detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [examId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-[65] flex items-center justify-center max-w-md mx-auto">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="fixed inset-0 bg-white z-[65] flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <p className="text-gray-500 mb-4">Bu sınav için henüz detaylı bilgi eklenmemiş.</p>
        <button onClick={onBack} className="text-indigo-600 font-bold">Geri Dön</button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[65] overflow-y-auto animate-in slide-in-from-right duration-300 max-w-md mx-auto shadow-2xl">
      {/* Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-gray-100 px-4 py-4 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-indigo-600 active:scale-90 transition-transform">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-indigo-600 active:scale-90 transition-transform">
            <Share2 size={22} />
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-64 overflow-hidden relative">
        <img 
          src={detail.imageUrl || "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop"} 
          alt={detail.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <article className="px-6 py-8">
        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight mb-4 font-['Outfit'] text-center">
          {detail.title}
        </h1>

        <div className="flex flex-col items-center justify-center text-center mb-6">
          <p className="text-red-500 text-base font-semibold">
            Son Güncelleme: {detail.lastUpdate || (detail as any).lastupdate || 'Belirtilmedi'}
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

export default ExamDetail;
