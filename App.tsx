
import React, { useState } from 'react';
import { Tab, NewsItem } from './types';
import Home from './components/Home';
import NewsDetail from './components/NewsDetail';
import ExamDetail from './components/ExamDetail';
import FeeDetail from './components/FeeDetail';
import HowToApplyDetail from './components/HowToApplyDetail';
import AcademicCalendarDetail from './components/AcademicCalendarDetail';
import FeedbackForm from './components/FeedbackForm';
import Contact from './components/Contact';
import Info from './components/Info';
import SplashScreen from './components/SplashScreen';
import LegalDetail from './components/LegalDetail';
import { Home as HomeIcon, ClipboardList, Mail, Info as InfoIcon } from 'lucide-react';

const App: React.FC = () => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showExamDetail, setShowExamDetail] = useState(false);
  const [showFeeDetail, setShowFeeDetail] = useState(false);
  const [showHowToApply, setShowHowToApply] = useState(false);
  const [showAcademicCalendar, setShowAcademicCalendar] = useState(false);
  const [legalDetail, setLegalDetail] = useState<'privacy' | 'terms' | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Home:
        return (
          <Home 
            onNewsClick={(news) => setSelectedNews(news)} 
            onContactClick={() => setActiveTab(Tab.Contact)}
            onExamClick={() => setShowExamDetail(true)}
            onFeeClick={() => setShowFeeDetail(true)}
            onHowToApplyClick={() => setShowHowToApply(true)}
            onAcademicCalendarClick={() => setShowAcademicCalendar(true)}
          />
        );
      case Tab.Form:
        return <FeedbackForm />;
      case Tab.Contact:
        return <Contact />;
      case Tab.Info:
        return <Info onLegalClick={(type) => setLegalDetail(type)} />;
      default:
        return (
          <Home 
            onNewsClick={(news) => setSelectedNews(news)} 
            onContactClick={() => setActiveTab(Tab.Contact)}
            onExamClick={() => setShowExamDetail(true)} 
            onFeeClick={() => setShowFeeDetail(true)} 
            onHowToApplyClick={() => setShowHowToApply(true)}
            onAcademicCalendarClick={() => setShowAcademicCalendar(true)}
          />
        );
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative flex flex-col overflow-hidden bg-[#F8FAFF]">
      {!isSplashComplete && <SplashScreen onComplete={() => setIsSplashComplete(true)} />}
      
      {/* Detail Overlays */}
      {(selectedNews || showExamDetail || showFeeDetail || showHowToApply || showAcademicCalendar || legalDetail) && (
        <div className="fixed inset-x-0 top-0 bottom-0 max-w-md mx-auto z-[60] bg-[#F8FAFF]">
          <div className="relative w-full h-full">
            {selectedNews && <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />}
            {showExamDetail && <ExamDetail onBack={() => setShowExamDetail(false)} />}
            {showFeeDetail && <FeeDetail onBack={() => setShowFeeDetail(false)} />}
            {showHowToApply && <HowToApplyDetail onBack={() => setShowHowToApply(false)} />}
            {showAcademicCalendar && <AcademicCalendarDetail onBack={() => setShowAcademicCalendar(false)} />}
            {legalDetail && <LegalDetail type={legalDetail} onBack={() => setLegalDetail(null)} />}
          </div>
        </div>
      )}

      {/* Premium Global Header */}
      {activeTab === Tab.Home && (
        <header className="sticky top-0 z-50 premium-header apple-blur px-5 pt-[env(safe-area-inset-top,44px)] pb-3 shadow-sm border-b border-indigo-50">
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
      <main className="flex-1 overflow-y-auto pb-20 scroll-smooth">
        {renderContent()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 px-5 pb-6">
        <div className="h-20 bg-indigo-950/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(30,27,75,0.4)] flex items-center justify-around relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none"></div>
          
          {[
            { id: Tab.Home, icon: HomeIcon, label: 'ANA SAYFA' },
            { id: Tab.Form, icon: ClipboardList, label: 'FORM' },
            { id: Tab.Contact, icon: Mail, label: 'ULAŞIN' },
            { id: Tab.Info, icon: InfoIcon, label: 'BİLGİ' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-500 relative ${activeTab === item.id ? 'text-white' : 'text-white/30 hover:text-white/50'}`}
            >
              <div className={`transition-all duration-500 ${activeTab === item.id ? 'scale-110 -translate-y-1' : ''}`}>
                <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] font-['Outfit'] mt-1.5 transition-all duration-500 ${activeTab === item.id ? 'opacity-100' : 'opacity-40'}`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute bottom-2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_15px_rgba(129,140,248,1)]"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;
