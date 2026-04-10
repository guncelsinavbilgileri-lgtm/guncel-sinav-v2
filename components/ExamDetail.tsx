
import React from 'react';
import { ChevronLeft, Share2, Minus, Plus } from 'lucide-react';

interface ExamDetailProps {
  onBack: () => void;
}

const ExamDetail: React.FC<ExamDetailProps> = ({ onBack }) => {
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
          <div className="flex items-center bg-indigo-50 rounded-full px-3 py-1 space-x-3">
            <button className="text-indigo-600 font-bold text-sm flex items-center">
              A<Minus size={10} className="ml-0.5" />
            </button>
            <div className="w-px h-3 bg-indigo-200" />
            <button className="text-indigo-600 font-bold text-sm flex items-center">
              A<Plus size={10} className="ml-0.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="w-full h-64 overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=800&auto=format&fit=crop" 
          alt="Güncel Sınavlar" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <article className="px-6 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight mb-4 font-['Outfit'] text-center">
          Güncel Sınavlar
        </h1>

        <div className="flex flex-col items-center justify-center text-center mb-6">
          <p className="text-red-500 text-base font-semibold">
            Son Güncelleme: 20/11/2025
          </p>
          <div className="w-40 h-0.5 bg-gray-200 mt-4" />
        </div>

        <div className="w-full space-y-6 text-gray-700 font-medium">
          <p className="text-lg leading-relaxed text-center">
            Başvuruya açık <span className="text-red-600 font-bold">1</span> sınavda toplam <span className="text-red-600 font-bold">3</span> oturum listelenmiştir.
          </p>

          <h2 className="text-2xl font-black text-red-600 text-center tracking-wide font-['Outfit'] mt-8 mb-4">
            AÖF SINAVLARI:
          </h2>

          <div className="space-y-4">
            <p className="text-lg">1. Güz Dönem Sonu Sınavı</p>
            <p className="text-lg">Toplam 3 oturum görevi vardır.</p>
          </div>

          {/* Sınav Tablosu */}
          <div className="mt-6 overflow-hidden border-2 border-gray-800 rounded-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-800">
                  <th className="p-3 text-left border-r-2 border-gray-800 font-bold text-sm bg-gray-50">Son Başvuru Tarih - Saat</th>
                  <th className="p-3 text-left font-bold text-sm bg-gray-50">Sınav Tarih - Saat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-r-2 border-gray-800 align-middle">
                    <span className="text-gray-800 font-medium text-lg">24.12.2025 - 23:59</span>
                  </td>
                  <td className="p-4 space-y-2">
                    <div className="text-gray-800 font-medium text-lg">17.01.2026 - 09:00</div>
                    <div className="text-gray-800 font-medium text-lg">17.01.2026 - 13:00</div>
                    <div className="text-gray-800 font-medium text-lg">18.01.2026 - 09:00</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>

      {/* Footer Dots */}
      <div className="flex justify-center space-x-2 py-10">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-gray-400' : 'bg-gray-200'}`} />
        ))}
      </div>
    </div>
  );
};

export default ExamDetail;
