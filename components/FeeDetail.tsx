
import React from 'react';
import { ChevronLeft, Share2, Minus, Plus } from 'lucide-react';

interface FeeDetailProps {
  onBack: () => void;
}

const FeeDetail: React.FC<FeeDetailProps> = ({ onBack }) => {
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
      <div className="w-full h-72 overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop" 
          alt="Sınav Ücretleri" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Content Container */}
      <article className="px-5 py-8 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-gray-800 leading-tight mb-4 font-['Outfit'] text-center uppercase">
          Sınav Ücretleri
        </h1>

        <div className="flex flex-col items-center justify-center text-center mb-6">
          <p className="text-[#A0522D] text-base font-semibold">
            Son Güncelleme: 04/05/2025
          </p>
          <div className="w-40 h-0.5 bg-gray-200 mt-4" />
        </div>

        <div className="w-full space-y-12">
          
          {/* MEB Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4 underline decoration-2 underline-offset-8 uppercase">MEB:</h2>
            <div className="border-[1.5px] border-gray-800 rounded-sm">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-50">
                  <tr className="border-b-[1.5px] border-gray-800">
                    <th className="p-2 text-left border-r-[1.5px] border-gray-800 font-bold">Görev</th>
                    <th className="p-2 text-right font-bold">Net Ücret</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 border-r-[1.5px] border-gray-800">Salon Başkanı</td>
                    <td className="p-2 text-right font-bold">1.626 TL</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 border-r-[1.5px] border-gray-800">Gözetmen</td>
                    <td className="p-2 text-right font-bold">1.577 TL</td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 border-r-[1.5px] border-gray-800">Yedek Gözetmen</td>
                    <td className="p-2 text-right font-bold">1.182 TL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ÖSYM Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4 underline decoration-2 underline-offset-8 uppercase">ÖSYM:</h2>
            <div className="border-[1.5px] border-gray-800 rounded-sm">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-gray-50">
                  <tr className="border-b-[1.5px] border-gray-800">
                    <th className="p-2 text-left border-r-[1.5px] border-gray-800 font-bold">Görev</th>
                    <th className="p-2 text-right font-bold">Net Ücret</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="p-2 border-r-[1.5px] border-gray-800">Salon Başkanı</td>
                    <td className="p-2 text-right font-bold">1.370 TL</td>
                  </tr>
                  <tr>
                    <td className="p-2 border-r-[1.5px] border-gray-800">Gözetmen</td>
                    <td className="p-2 text-right font-bold">1.226 TL</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* UYARI Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 underline decoration-2 underline-offset-4">ÖNEMLİ NOTLAR:</h3>
            <div className="space-y-6 text-sm text-gray-700 font-medium leading-relaxed text-justify">
              <p>
                Hesaplara yatan net ücretler; vergi dilimi ve kesintilere göre değişiklik gösterebilir. Lütfen resmi duyuruları takip ediniz.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Footer Dots */}
      <div className="flex justify-center space-x-2 py-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-gray-400' : 'bg-gray-200'}`} />
        ))}
      </div>
    </div>
  );
};

export default FeeDetail;
