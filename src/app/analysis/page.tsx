"use client";
import React, { useState } from 'react';
import { AnalysisForm } from '@/components/analysis/AnalysisForm';
import { ResultCard } from '@/components/analysis/ResultCard';

export default function KanAnaliziPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleRunAnalysis = async (formData: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          values: formData.labValues,
          biometrics: formData.biometrics,
          medical: formData.medical
        })
      });

      if (!response.ok) throw new Error("Sunucuya ulaşılamadı.");

      const data = await response.json();
      
      // VERİLER BURADA EŞLEŞİYOR
      setAnalysisResult({
        summary: data.summary,
        risks: data.risks,
        foods: data.foods,
        dietAdvice: data.dietAdvice,
        patient_metrics: data.patient_metrics, // İşte kartı çökerten eksik damar burasıydı
        ai_report: data.ai_report
      });
      
    } catch (error) {
      console.error("Analiz Hatası:", error);
      alert("API bağlantı hatası!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold text-white tracking-tighter">AI Derin Analiz Merkezi</h1>
      {!analysisResult ? (
        <AnalysisForm onAnalyze={handleRunAnalysis} isLoading={isLoading} />
      ) : (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
          <button onClick={() => setAnalysisResult(null)} className="bg-slate-800 text-blue-400 px-6 py-3 rounded-2xl font-bold border border-slate-700">
            ← YENİ ANALİZ BAŞLAT
          </button>
          <ResultCard result={analysisResult} />
        </div>
      )}
    </div>
  );
}