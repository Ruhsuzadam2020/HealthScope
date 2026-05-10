"use client";
import React from 'react';
import { Activity, Brain, Database, Zap, Cpu, Terminal, ShieldCheck } from 'lucide-react';

const ModelStat = ({ label, value, subtext, icon: Icon, color }: any) => (
  <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-[2rem] backdrop-blur-xl relative overflow-hidden group">
    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color}-500/5 rounded-full blur-2xl group-hover:bg-${color}-500/10 transition-all`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 bg-${color}-500/10 rounded-2xl text-${color}-500`}>
        <Icon size={20} />
      </div>
      <div className="flex space-x-1">
        <div className={`w-1.5 h-1.5 rounded-full bg-${color}-500 animate-pulse`} />
      </div>
    </div>
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-slate-400 text-[9px] font-medium uppercase tracking-tight">{subtext}</p>
  </div>
);

export default function AIModelHub() {
  return (
    <div className="space-y-10 pb-20">
      {/* BAŞLIK */}
      <div>
        <h1 className="text-4xl font-bold text-gradient tracking-tighter">AI Model Hub</h1>
        <p className="text-slate-400 mt-1 uppercase text-[10px] font-bold tracking-[0.2em]">Model Performance & Infrastructure</p>
      </div>

      {/* MODEL METRİKLERİ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModelStat label="Aktif Model" value="BERTurk" subtext="Medical-Adapted BERT" icon={Brain} color="blue" />
        <ModelStat label="İşlemci" value="RTX 4060" subtext="8GB GDDR6 VRAM" icon={Cpu} color="amber" />
        <ModelStat label="Gecikme (Lat)" value="142ms" subtext="Avg Inference Time" icon={Zap} color="emerald" />
        <ModelStat label="Eğitim Seti" value="100K+" subtext="Tokenized Medical-QA" icon={Database} color="purple" />
      </div>

      {/* MODEL DETAYLARI VE LOGLAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Teknik Detaylar Kartı */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600/5 to-transparent border border-blue-500/10 p-10 rounded-[3rem] backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Model Konfigürasyonu</h2>
              <p className="text-slate-500 text-xs uppercase tracking-widest">Inference Settings</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-y-8">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Checkpoint</p>
              <p className="text-white font-mono text-sm">#8439 (Stable Release)</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Precision</p>
              <p className="text-white font-mono text-sm">FP16 (Half-Precision)</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Device Target</p>
              <p className="text-emerald-500 font-mono text-sm">CUDA:0 (Active)</p>
            </div>
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase mb-2">Max Sequence Length</p>
              <p className="text-white font-mono text-sm">512 Tokens</p>
            </div>
          </div>
        </div>

        {/* Canlı Terminal Simülasyonu */}
        <div className="bg-black/60 border border-slate-800 rounded-[2.5rem] p-6 overflow-hidden">
          <div className="flex items-center space-x-2 text-slate-500 mb-6 border-b border-slate-800/50 pb-3">
            <Terminal size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Inference Logs</span>
          </div>
          <div className="space-y-3 font-mono text-[10px] text-emerald-500/80">
            <p className="opacity-50">[{new Date().toLocaleTimeString()}] BERTurk engine standby.</p>
            <p className="text-blue-400">[{new Date().toLocaleTimeString()}] CUDA device 0: Ready.</p>
            <p className="text-amber-500">[{new Date().toLocaleTimeString()}] Pipeline: fill-mask active.</p>
            <p className="animate-pulse">[{new Date().toLocaleTimeString()}] Listening for blood analysis...</p>
            <p className="text-slate-600 mt-4 italic">No active requests in queue.</p>
          </div>
        </div>
      </div>
    </div>
  );
}