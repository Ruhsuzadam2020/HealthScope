"use client";
import React, { useRef, useState } from 'react';
import { 
  Upload, Activity, Loader2, Microchip, Scale, 
  Ruler, HeartPulse, Dna, ShieldAlert, FlaskConical,
  User, ClipboardList, Info
} from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (data: any) => void;
  isLoading: boolean;
}

export const AnalysisForm = ({ onAnalyze, isLoading }: AnalysisFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<any>({
    biometrics: { boy: "", kilo: "", yas: "", cinsiyet: "male" },
    medical: { kronik: "", genetik: "", alerjiler: [] },
    labValues: {}
  });

  // KAN VERİ SETLERİ (Genişletilmiş)
  const hemogramFields = [
    { id: 'rbc', label: 'RBC', unit: 'M/uL', ref: '3.90-5.50' },
    { id: 'wbc', label: 'WBC', unit: 'K/uL', ref: '4.0-10.6' },
    { id: 'hgb', label: 'HGB', unit: 'g/dL', ref: '12-16.8' },
    { id: 'plt', label: 'PLT', unit: 'K/uL', ref: '139-346' },
    { id: 'mcv', label: 'MCV', unit: 'fL', ref: '81.7-99.6' },
    { id: 'hct', label: 'HCT', unit: '%', ref: '36.2-49.7' },
  ];

  const biochemistryFields = [
    { id: 'glukoz', label: 'GLUKOZ', unit: 'mg/dL', ref: '70-99' },
    { id: 'crp', label: 'CRP', unit: 'mg/L', ref: '0-5' },
    { id: 'alt', label: 'ALT', unit: 'U/L', ref: '1-50' },
    { id: 'ast', label: 'AST', unit: 'U/L', ref: '0-50' },
    { id: 'ure', label: 'ÜRE', unit: 'mg/dL', ref: '17-43' },
    { id: 'kreatinin', label: 'KREATİNİN', unit: 'mg/dL', ref: '0.8-1.2' },
    { id: 'ggt', label: 'GGT', unit: 'U/L', ref: '1-55' },
  ];

  const handleBioChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      biometrics: { ...prev.biometrics, [field]: value }
    }));
  };

  const handleMedicalChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      medical: { ...prev.medical, [field]: value }
    }));
  };

  const handleLabChange = (id: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      labValues: { ...prev.labValues, [id]: value }
    }));
  };

 // 1. Hook bileşenin en üstünde olmalı (Fonksiyonun dışında veya tepesinde)
// const [formData, setFormData] = useState(...); 

const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log("DOSYA SEÇİLDİ, İŞLEM BAŞLIYOR...");
  const file = e.target.files?.[0];
  if (!file) return;

  const bodyData = new FormData();
  bodyData.append("file", file); // Python tarafındaki 'file: UploadFile' ile aynı isim olmalı

  try {
    const response = await fetch('http://127.0.0.1:8000/upload-report', {
      method: 'POST',
      body: bodyData,
    });

    if (!response.ok) {
      // 404 mü 500 mü buradan göreceğiz
      console.error("Sunucu yanıt vermedi! Durum kodu:", response.status);
      return;
    }

    const data = await response.json();
    console.log("GELEN VERİ:", data);
    
    if (data.extracted) {
      setFormData((prev: any) => ({
        ...prev,
        labValues: { ...prev.labValues, ...data.extracted }
      }));
      alert("Başarıyla yüklendi!");
    }
  } catch (error) {
    console.error("Ağ hatası veya bağlantı reddedildi:", error);
  }
};
  return (
    <div className="space-y-8 pb-20">
      {/* 1. BÖLÜM: BİYOMETRİK VERİLER */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-6">
          <User className="text-blue-400" size={24} />
          <h3 className="text-lg font-bold text-white uppercase tracking-widest">Biyometrik Profil</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2"><Ruler size={12}/> Boy (cm)</label>
            <input type="number" placeholder="180" className="w-full bg-black/40 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500" onChange={(e) => handleBioChange('boy', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2"><Scale size={12}/> Kilo (kg)</label>
            <input type="number" placeholder="75" className="w-full bg-black/40 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500" onChange={(e) => handleBioChange('kilo', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Yaş</label>
            <input type="number" placeholder="25" className="w-full bg-black/40 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-blue-500" onChange={(e) => handleBioChange('yas', e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase">Cinsiyet</label>
            <select className="w-full bg-black/40 border border-slate-800 rounded-2xl p-4 text-white outline-none appearance-none cursor-pointer" onChange={(e) => handleBioChange('cinsiyet', e.target.value)}>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. BÖLÜM: SAĞLIK GEÇMİŞİ & ALERJİLER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <HeartPulse className="text-rose-500" size={24} />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Kronik & Genetik</h3>
          </div>
          <textarea 
            placeholder="Mevcut hastalıklar ve ailevi geçmişiniz..." 
            className="w-full h-32 bg-black/40 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-rose-500 resize-none"
            onChange={(e) => handleMedicalChange('kronik', e.target.value)}
          />
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 backdrop-blur-md">
          <div className="flex items-center space-x-3 mb-6">
            <ShieldAlert className="text-amber-500" size={24} />
            <h3 className="text-lg font-bold text-white uppercase tracking-widest">Alerjiler</h3>
          </div>
          <textarea 
            placeholder="Gıda veya ilaç alerjilerinizi belirtin (Örn: Gluten, Penisilin)..." 
            className="w-full h-32 bg-black/40 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:border-amber-500 resize-none"
            onChange={(e) => handleMedicalChange('alerjiler', e.target.value.split(","))}
          />
        </div>
      </div>

      {/* 3. BÖLÜM: CLOUD VISION OCR YÜKLEME */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 text-center cursor-pointer hover:bg-slate-900/50 transition-all"
        >
          <input type="file" ref={fileInputRef} className="hidden" accept=".pdf,image/*" onChange={handleFileUpload} />
          <Upload className="mx-auto text-blue-500 mb-4" size={32} />
          <h2 className="text-xl font-bold text-white tracking-tight">Tahlil Raporu Yükle (Vision AI)</h2>
          <p className="text-slate-400 mt-2 text-sm font-mono tracking-tighter">Google Cloud Vision ile veriler otomatik işlenecektir.</p>
        </div>
      </section>

      {/* 4. BÖLÜM: KAN VERİLERİ (HEMOGRAM & BİYOKİMYA) */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Activity size={20} />
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Biyokimyasal Parametreler</h3>
          </div>
          <Info size={16} className="text-slate-600" />
        </div>
        <div className="p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[...hemogramFields, ...biochemistryFields].map(field => (
            <div key={field.id} className="space-y-2 group">
              <div className="flex justify-between px-1">
                <label className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 transition-colors uppercase">{field.label}</label>
                <span className="text-[9px] text-slate-600 italic">{field.ref}</span>
              </div>
              <input 
                type="text" placeholder={field.unit}
                className="w-full bg-black/40 border border-slate-800 rounded-2xl p-3 text-sm text-white focus:border-blue-500 outline-none"
                onChange={(e) => handleLabChange(field.id, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      

      {/* ANALİZ BUTONU */}
      <button 
        onClick={() => onAnalyze(formData)}
        disabled={isLoading}
        className="w-full h-24 bg-blue-600 rounded-[2.5rem] shadow-2xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-6"
      >
        {isLoading ? (
          <div className="flex items-center space-x-3 uppercase font-black tracking-[0.3em] text-white">
             <Loader2 className="animate-spin" size={32} />
             <span>Hücresel Veri İşleniyor...</span>
          </div>
        ) : (
          <>
            <Microchip className="text-white/80" size={32} />
            <span className="text-2xl font-black text-white uppercase tracking-[0.2em]">Kapsamlı AI Analizi Başlat</span>
          </>
        )}
      </button>
    </div>
  );
};