"use client";
import React from 'react';
import { 
  ShieldCheck, Utensils, AlertTriangle, TrendingUp, TrendingDown, 
  CheckCircle2, Cpu, User, Activity, Info, BarChart3 
} from 'lucide-react';

interface AbnormalParam {
  key: string;
  label: string;
  value: number;
  unit: string;
  status: 'high' | 'low';
  reference: string;
  deviation: number;
}

interface DiagnosisProbability {
  name: string;
  probability: string;
  rank: number;
}

interface ResultCardProps {
  result: {
    summary?: string;
    patient_metrics?: {
      age: number;
      gender: string;
      bmi: number;
      allergy_count: number;
    };
    ai_report?: {
      top_diagnosis: string;
      probabilities: DiagnosisProbability[];
      detailed_comment: string;
    };
    risks?: string[];
    foods?: string[];
    dietAdvice?: string;
    abnormalParams?: AbnormalParam[];
  };
}

export const ResultCard = ({ result }: ResultCardProps) => {
  // HAYAT KURTARAN DÜZELTME: Veri gelmese bile çökmeyi engelleyen varsayılan değerler
  const patient_metrics = result?.patient_metrics || { age: 0, gender: '-', bmi: 0, allergy_count: 0 };
  const ai_report = result?.ai_report || { top_diagnosis: 'Belirsiz', probabilities: [], detailed_comment: 'Veri bekleniyor...' };
  const risks = result?.risks || [];
  const foods = result?.foods || [];
  const summary = result?.summary || "Analiz tamamlandı.";
  const dietAdvice = result?.dietAdvice || "";

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
      
      {/* 1. HASTA KÜNYESİ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Yaş', value: patient_metrics.age, icon: User, color: 'blue' },
          { label: 'Cinsiyet', value: patient_metrics.gender, icon: Activity, color: 'purple' },
          { label: 'BMI / VKI', value: patient_metrics.bmi, icon: Info, color: patient_metrics.bmi > 25 ? 'amber' : 'emerald' },
          { label: 'Alerji Kaydı', value: `${patient_metrics.allergy_count} Tespit`, icon: AlertTriangle, color: 'rose' }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 backdrop-blur-sm">
            <stat.icon size={16} className={`text-${stat.color}-500 mb-3`} />
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-white text-lg font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 2. ANA AI RAPORU KARTI */}
      <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/5 border border-blue-500/30 rounded-[3rem] p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={160} className="text-blue-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/50">
              <Cpu className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight italic">AI KLİNİK DEĞERLENDİRME</h3>
              <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">BERTurk Inference Engine v3.0</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-xl text-slate-100 font-medium leading-relaxed">
                {summary}
              </p>
              <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10 italic text-slate-300 text-sm">
                "{ai_report.detailed_comment}"
              </div>
            </div>

            {/* AI OLASILIK ÇİZELGESİ */}
            <div className="bg-black/20 rounded-[2.5rem] p-8 border border-white/5 space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <BarChart3 size={18} className="text-blue-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-widest">Olası Teşhisler</h4>
              </div>
              
              <div className="space-y-5">
                {ai_report.probabilities.map((prob, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                      <span className={i === 0 ? "text-blue-400" : "text-slate-400"}>{prob.name}</span>
                      <span className="text-white">{prob.probability}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 rounded-full ${i === 0 ? 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]' : 'bg-slate-600'}`}
                        style={{ width: prob.probability }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TEKNİK BULGULAR VE BESLENME */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8">
          <div className="flex items-center space-x-3 mb-8 text-rose-500">
            <AlertTriangle size={20} />
            <h4 className="font-bold uppercase tracking-widest text-[10px]">Tespit Edilen Sapmalar</h4>
          </div>
          <div className="space-y-4">
            {risks.map((risk, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl">
                <TrendingUp size={16} className="text-rose-500 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">{risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-[2.5rem] p-8">
          <div className="flex items-center space-x-3 mb-8 text-emerald-400">
            <Utensils size={20} />
            <h4 className="font-bold uppercase tracking-widest text-[10px]">AI Beslenme Protokolü</h4>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {foods.map((food, i) => (
              <span key={i} className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                {food}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">
            {dietAdvice}
          </p>
        </div>
      </div>
    </div>
  );
};