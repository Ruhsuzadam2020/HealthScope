"use client"; // Link takibi için client component
import { Activity, Beaker, FileText, Settings, Database, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: Activity, label: 'Dashboard', href: '/' },
  { icon: FileText, label: 'Kan Analizi', href: '/analysis' },
  { icon: Database, label: 'Gıda Veritabanı', href: '/food-db' },
  { icon: BrainCircuit, label: 'AI Model Hub', href: '/ai-models' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-800/60 p-5 flex flex-col justify-between bg-slate-950/80 backdrop-blur-xl h-screen sticky top-0 z-50">
      <div>
        {/* Logo Bölümü */}
        <div className="flex items-center space-x-3 mb-12 px-2 py-1">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Beaker className="text-white" size={20} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tighter text-white leading-none">HealthScope</h1>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Advanced AI</span>
          </div>
        </div>
        
        {/* Menü Öğeleri */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href}
                href={item.href} 
                className={`flex items-center space-x-3.5 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)] border border-blue-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2 : 1.5} className={`${isActive ? '' : 'group-hover:scale-105'} transition-transform`} />
                <span className="font-medium text-sm tracking-tight">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Alt Bölüm (Ayarlar) */}
      <div className="pt-5 border-t border-slate-800/60">
        <button className="flex items-center space-x-3.5 px-4 py-3 w-full text-slate-500 hover:text-slate-200 hover:bg-slate-800/30 rounded-xl transition-colors">
          <Settings size={19} strokeWidth={1.5} />
          <span className="text-sm font-medium tracking-tight">Sistem Ayarları</span>
        </button>
      </div>
    </aside>
  );
}