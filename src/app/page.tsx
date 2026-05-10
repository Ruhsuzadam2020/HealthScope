"use client";
import React from 'react';
import { Brain, Zap, Activity, Database } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] backdrop-blur-xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 bg-${color}-500/10 rounded-2xl text-${color}-500`}>
        <Icon size={24} />
      </div>
    </div>
    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
    <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
    <p className="text-slate-400 text-[10px] font-medium">{subtext}</p>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tighter">Sağlık Komuta Merkezi</h1>
        <p className="text-slate-400 mt-1 uppercase text-[10px] font-bold tracking-[0.2em]">Sistem Özet Verileri</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Model Durumu" value="BERTurk" subtext="Aktif & Optimize" icon={Brain} color="blue" />
        <StatCard title="Donanım" value="RTX 4060" subtext="GPU Hızlandırma Devrede" icon={Zap} color="amber" />
        <StatCard title="Validasyon" value="1.431" subtext="Güncel Kayıp Oranı" icon={Activity} color="emerald" />
        <StatCard title="Veri Havuzu" value="100K+" subtext="Tıbbi Eğitim Seti" icon={Database} color="purple" />
      </div>

      <div className="bg-slate-900/20 border border-slate-800/40 p-10 rounded-[3rem] text-center">
        <p className="text-slate-500">Analiz yapmak için sol menüden <span className="text-blue-400 font-bold">Kan Analizi</span> sekmesine gidiniz.</p>
      </div>
    </div>
  );
}