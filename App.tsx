
import React, { useState } from 'react';
import { Tab, NewsItem } from './types';
import Home from './components/Home';
import NewsDetail from './components/NewsDetail';
import ExamDetail from './components/ExamDetail';
import FeeDetail from './components/FeeDetail';
import FeedbackForm from './components/FeedbackForm';
import Contact from './components/Contact';
import Info from './components/Info';
import { Home as HomeIcon, ClipboardList, Mail, Info as InfoIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showExamDetail, setShowExamDetail] = useState(false);
  const [showFeeDetail, setShowFeeDetail] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return (
          <Home 
            onNewsClick={(news) => setSelectedNews(news)} 
            onExamClick={() => setShowExamDetail(true)}
            onFeeClick={() => setShowFeeDetail(true)}
          />
        );
      case Tab.Form:
        return <FeedbackForm />;
      case Tab.Contact:
        return <Contact />;
      case Tab.Info:
        return <Info />;
      default:
        return <Home onNewsClick={(news) => setSelectedNews(news)} onExamClick={() => setShowExamDetail(true)} onFeeClick={() => setShowFeeDetail(true)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col overflow-hidden bg-[#F8FAFF]">
      
      {/* Detail Overlays */}
      {selectedNews && <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />}
      {showExamDetail && <ExamDetail onBack={() => setShowExamDetail(false)} />}
      {showFeeDetail && <FeeDetail onBack={() => setShowFeeDetail(false)} />}

      {/* Premium Global Header */}
      {activeTab === Tab.Home && (
        <header className="sticky top-0 z-50 premium-header apple-blur px-5 pt-12 pb-6 shadow-sm border-b border-indigo-50">
          <div className="flex items-center space-x-4">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-indigo-50 transform -rotate-2">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-indigo-600">
                  <rect x="4" y="16" width="16" height="4" rx="1.5" fill="currentColor" fillOpacity="0.2" />
                  <rect x="5" y="11" width="15" height="4" rx="1.5" transform="rotate(2, 12.5, 13)" fill="currentColor" fillOpacity="0.6" />
                  <rect x="4" y="6" width="14" height="4" rx="1.5" transform="rotate(-4, 11, 8)" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="title-font text-[19px] font-[900] tracking-tighter leading-tight uppercase text-gradient">
                Güncel Sınav Bilgileri
              </h1>
              <p className="text-[10px] font-black text-indigo-400/80 uppercase tracking-[0.2em] mt-0.5 ml-0.5">
                Öğretmen Rehberi
              </p>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-28 scroll-smooth">
        {renderContent()}
      </main>

      {/* High-End Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-4 pb-4">
        <div className="h-20 bg-[#2D2A26] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-around relative overflow-hidden ring-1 ring-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent pointer-events-none"></div>
          
          {[
            { id: Tab.Home, icon: HomeIcon, label: 'GİRİŞ' },
            { id: Tab.Form, icon: ClipboardList, label: 'FORM' },
            { id: Tab.Contact, icon: Mail, label: 'ULAŞIN' },
            { id: Tab.Info, icon: InfoIcon, label: 'BİLGİ' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-2 transition-all duration-500 relative ${activeTab === item.id ? 'text-white scale-110' : 'text-white/40 hover:text-white/60'}`}
            >
              {activeTab === item.id && (
                <div className="absolute top-0 w-8 h-1 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(129,140,248,0.8)]"></div>
              )}
              <item.icon size={22} className="mb-1.5" strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className={`text-[9px] font-black uppercase tracking-[0.15em] font-['Outfit']`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
