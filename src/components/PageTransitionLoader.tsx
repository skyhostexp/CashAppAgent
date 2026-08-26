import React from 'react';
import { RefreshCw, ShieldCheck, Sparkles } from 'lucide-react';
import { PAGE_ROUTES } from '../utils/navigation';
import { PageView } from '../types';

interface PageTransitionLoaderProps {
  isLoading: boolean;
  targetPage: PageView;
  progress: number;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({
  isLoading,
  targetPage,
  progress
}) => {
  if (!isLoading && progress === 0) return null;

  const targetRoute = PAGE_ROUTES[targetPage] || PAGE_ROUTES.home;

  return (
    <>
      {/* Top Animated Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-black/40 overflow-hidden pointer-events-none"
        style={{ opacity: isLoading ? 1 : 0, transition: 'opacity 0.3s ease' }}
      >
        <div
          className="h-full bg-gradient-to-r from-[#00A827] via-[#00D632] to-[#00FF50] shadow-[0_0_12px_#00D632]"
          style={{
            width: `${progress}%`,
            transition: 'width 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>

      {/* Floating Reload & Route Sync Indicator Toast */}
      {isLoading && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#090e13]/95 border border-[#00D632]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,214,50,0.25)] backdrop-blur-xl text-white text-xs font-semibold">
            <RefreshCw className="w-4 h-4 text-[#00D632] animate-spin shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-white font-bold">Reloading</span>
                <span className="text-[#00D632] font-mono">{targetRoute.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                {targetRoute.fullUrl}
              </span>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#00D632] animate-ping ml-1" />
          </div>
        </div>
      )}
    </>
  );
};
