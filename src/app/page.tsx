"use client";

import React, { useState } from 'react';
import { 
  Brain, CheckCircle2, ChevronRight, BarChart3, Rocket, ShieldCheck, 
  Mail, Phone, ArrowRight, Target, Users, Zap, Award, Presentation, 
  MessageSquare, Briefcase, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION DU QUESTIONNAIRE ---
const QUESTIONS = [
  { id: "p1", axis: "periph", label: "Mobilité", q: "As-tu une solution fiable pour te déplacer vers un emploi ou une formation ?", choices: [{ v: 0, t: "Oui, totalement" }, { v: 1, t: "Plutôt oui" }, { v: 2, t: "Plutôt non" }, { v: 3, t: "Non, c’est un vrai frein" }] },
  { id: "p2", axis: "periph", label: "Logement", q: "Ta situation de logement est-elle stable pour te projeter sur 3 mois ?", choices: [{ v: 0, t: "Oui, stable" }, { v: 1, t: "Assez stable" }, { v: 2, t: "Instable" }, { v: 3, t: "Très instable / urgence" }] },
  { id: "p3", axis: "periph", label: "Garde / contraintes", q: "As-tu des contraintes familiales ou de garde qui limitent tes horaires ?", choices: [{ v: 0, t: "Non" }, { v: 1, t: "Peu" }, { v: 2, t: "Oui, parfois" }, { v: 3, t: "Oui, fortement" }] },
  { id: "m1", axis: "market", label: "Ciblage", q: "Ton objectif métier est-il clair et réaliste sur ton territoire ?", choices: [{ v: 0, t: "Oui, clair et réaliste" }, { v: 1, t: "Plutôt clair" }, { v: 2, t: "Assez flou" }, { v: 3, t: "Pas clair / pas réaliste" }] },
  { id: "m2", axis: "market", label: "Offres & accès", q: "Sais-tu identifier des offres pertinentes et candidater facilement ?", choices: [{ v: 0, t: "Oui, sans difficulté" }, { v: 1, t: "Plutôt oui" }, { v: 2, t: "Difficile" }, { v: 3, t: "Très difficile" }] },
  { id: "m3", axis: "market", label: "Niveau attendu", q: "Ton niveau (diplôme/expérience) correspond-il aux attentes des recruteurs du secteur visé ?", choices: [{ v: 0, t: "Oui" }, { v: 1, t: "Presque" }, { v: 2, t: "Pas vraiment" }, { v: 3, t: "Non, gros écart" }] },
  { id: "s1", axis: "skills", label: "Organisation", q: "Je sais m’organiser : prioriser, respecter des délais, tenir un planning.", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Un peu" }, { v: 2, t: "Souvent" }, { v: 3, t: "Oui, fortement" }] },
  { id: "s2", axis: "skills", label: "Relationnel", q: "Je suis à l’aise pour communiquer, expliquer, écouter, gérer un échange.", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Un peu" }, { v: 2, t: "Souvent" }, { v: 3, t: "Oui, fortement" }] },
  { id: "s3", axis: "skills", label: "Adaptation", q: "Je m’adapte vite : nouveaux outils, nouvelles consignes, nouveaux contextes.", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Un peu" }, { v: 2, t: "Souvent" }, { v: 3, t: "Oui, fortement" }] },
  { id: "ai1", axis: "skills", label: "Outils IA", q: "Utilises-tu déjà ChatGPT ou une IA pour tes recherches d'emploi ?", choices: [{ v: 0, t: "Jamais" }, { v: 1, t: "Rarement" }, { v: 2, t: "Régulièrement" }, { v: 3, t: "Expert" }] },
  { id: "ai2", axis: "skills", label: "CV Optimisation", q: "Ton CV est-il optimisé pour passer les filtres automatiques (ATS) ?", choices: [{ v: 0, t: "C'est quoi un ATS ?" }, { v: 1, t: "Pas sûr" }, { v: 2, t: "Oui, en partie" }, { v: 3, t: "Totalement" }] },
  { id: "ai3", axis: "skills", label: "LinkedIn", q: "As-tu un profil LinkedIn actif et optimisé ?", choices: [{ v: 0, t: "Non" }, { v: 1, t: "En cours" }, { v: 2, t: "Oui" }, { v: 3, t: "Très actif" }] },
  { id: "ai4", axis: "market", label: "Entretien Vidéo", q: "Es-tu à l'aise avec les entretiens de recrutement en visioconférence ?", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Stressant" }, { v: 2, t: "Plutôt oui" }, { v: 3, t: "Très à l'aise" }] },
  { id: "ai5", axis: "skills", label: "Veille Digitale", q: "Sais-tu utiliser les plateformes pro (Indeed, France Travail) ?", choices: [{ v: 0, t: "Difficilement" }, { v: 1, t: "Un peu" }, { v: 2, t: "Oui" }, { v: 3, t: "Expert" }] },
  { id: "ai6", axis: "skills", label: "Soft Skills IA", q: "Sais-tu expliquer comment l'IA booste ta productivité à un recruteur ?", choices: [{ v: 0, t: "Non" }, { v: 1, t: "Vaguement" }, { v: 2, t: "Oui" }, { v: 3, t: "Argumenté" }] },
];

export default function KoriaLanding() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qid: string, val: number) => {
    setAnswers({ ...answers, [qid]: val });
    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const calculateResults = () => {
    const sumByAxis = (axis: string) => {
      const axisQuestions = QUESTIONS.filter(q => q.axis === axis);
      const sum = axisQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      return Math.round((sum / (axisQuestions.length * 3)) * 100);
    };
    return { periph: sumByAxis("periph"), market: sumByAxis("market"), skills: sumByAxis("skills") };
  };

  const results = showResult ? calculateResults() : null;

  return (
    <div className="min-h-screen bg-[#0b1220] text-[#e8eefc] font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="border-b border-[#203156] bg-[#0b1220]/80 backdrop-blur-md sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-indigo-600 to-emerald-500 p-2 rounded-xl shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">Koria</span>
          </div>
          <button 
            onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-white text-[#0b1220] px-6 py-2.5 rounded-full font-black text-sm hover:bg-indigo-50 transition-colors shadow-xl"
          >
            Démarrer le diagnostic
          </button>
        </div>
      </nav>

      {/* --- PAGE 1: HERO --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(99,102,241,0.15),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-16 relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-[2.5rem] blur opacity-30"></div>
              <img 
                src="/assets/img-000.png" 
                alt="L'IA au service de l'emploi" 
                className="relative rounded-[2.5rem] shadow-2xl border border-white/10 max-w-4xl w-full mx-auto"
              />
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-12 leading-[1.05] tracking-tight">
              L'IA comme levier <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">
                d'insertion professionnelle
              </span>
            </h1>
            
            {/* Partenaires / Logos IA */}
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
              {['ChatGPT', 'DeepSeek', 'Grok', 'Mistral AI', 'Copilot'].map((name, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-10 md:h-12 w-auto">
                    <img src={`/assets/img-00${i+1}.png`} alt={name} className="h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">{name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PAGE 2: L'ALLIÉ AU QUOTIDIEN --- */}
      <section className="py-32 relative bg-white/[0.02] border-y border-[#203156]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full"></div>
              <img src="/assets/img-006.png" alt="Analyse IA" className="relative rounded-[2rem] shadow-2xl border border-white/5" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black leading-tight italic font-serif">
                L'IA : Votre Allié <br/><span className="text-indigo-400">au Quotidien</span>
              </h2>
              <div className="space-y-6 text-xl text-[#a7b4d6] leading-relaxed border-l-4 border-emerald-500 pl-8">
                <p>
                  Concrètement, l'IA devient un outil du quotidien : comprendre leur parcours, mieux se présenter, mieux se projeter.
                </p>
                <p className="text-2xl font-bold text-white">
                  Résultat : plus d'autonomie côté public, plus d'efficacité côté accompagnement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- PAGE 3: PROGRAMME DE FORMATION --- */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
              Programme de <span className="text-indigo-500">Formation</span>
            </h2>
            <div className="inline-flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-6 py-2 rounded-full">
              <Zap className="w-5 h-5 text-indigo-400" />
              <span className="text-lg font-black text-indigo-300 uppercase tracking-widest">30 Heures de montée en puissance</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-6">
              {[
                { id: "01", title: "Découverte de l'IA (7h)", desc: "Introduction, risques, règlementation, limites et potentiel.", color: "indigo" },
                { id: "02", title: "Explorer (CV & Candidatures) (8h)", desc: "Optimisation CV/LM, création de prompts, outils pertinents.", color: "emerald" },
                { id: "03", title: "On passe à l'action (8h)", desc: "Simulations d'entretien, techniques de communication, gestion du stress.", color: "blue" },
                { id: "04", title: "Stratégie de Recherche GPS (7h)", desc: "Ciblage opportunités, création d'un agent, suivi et relances.", color: "purple" }
              ].map((module, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 10 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl flex gap-8 items-center group cursor-default"
                >
                  <div className="text-5xl font-black text-white/10 group-hover:text-white transition-colors">
                    {module.id}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">Module {module.title}</h3>
                    <p className="text-[#a7b4d6] leading-relaxed">{module.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32">
              <img src="/assets/img-007.png" alt="Futur" className="rounded-[3rem] shadow-2xl border border-white/5" />
            </div>
          </div>
        </div>
      </section>

      {/* --- PAGE 4: IMPACT CV (AVANT/APRÈS) --- */}
      <section className="py-32 bg-[#070b14] border-y border-[#203156]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-20 uppercase tracking-tighter">
            L'Impact de l'IA sur la <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Qualité des CV</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-red-500 font-black uppercase tracking-widest bg-red-500/10 py-3 rounded-2xl border border-red-500/20">
                ❌ AVANT : CV Peu Efficace
              </div>
              <div className="overflow-hidden rounded-3xl border border-white/5 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500">
                <img src="/assets/img-008.png" alt="Avant" className="w-full" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 text-emerald-400 font-black uppercase tracking-widest bg-emerald-500/10 py-3 rounded-2xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                ✅ APRÈS : CV Optimisé avec l'IA
              </div>
              <div className="overflow-hidden rounded-3xl border border-indigo-500/30 shadow-2xl scale-105">
                <img src="/assets/img-009.png" alt="Après" className="w-full" />
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-indigo-600/10 border border-indigo-500/30 p-8 rounded-[2rem] flex items-center gap-6 text-left">
            <div className="w-16 h-16 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-bold italic leading-relaxed">
              "L'IA aide à structurer, valoriser et personnaliser chaque candidature pour maximiser l'impact auprès des recruteurs."
            </p>
          </div>
        </div>
      </section>

      {/* --- PAGE 5: SIMULATION D'ENTRETIEN --- */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3 mb-12">
              <h2 className="text-4xl md:text-6xl font-black mb-6">Simulation <span className="text-emerald-400">d'entretien</span></h2>
              <p className="text-xl text-[#a7b4d6]">Mettons-nous en situation pour comprendre les attentes d'un recruteur.</p>
            </div>
            
            {[
              { id: "01", t: "Le Contexte", d: "Mets-toi dans la peau d'un recruteur chevronné d'une entreprise de bâtiment qui veut recruter un plaquiste.", img: "img-010.png" },
              { id: "02", t: "Ce que l'IA Analyse", d: "Compétences techniques, savoir-être professionnel, adaptabilité terrain, motivation & potentiel.", list: true },
              { id: "03", t: "L'Entretien Commence", d: "Bonjour. Avant de parler technique, j’aimerais comprendre votre parcours...", img: "img-011.png" }
            ].map((card, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-6 hover:bg-white/[0.08] transition-colors">
                <span className="text-indigo-500 font-black text-sm tracking-widest uppercase">{card.id}</span>
                <h3 className="text-2xl font-black uppercase">{card.t}</h3>
                {card.list ? (
                  <ul className="space-y-4 pt-4">
                    {["Compétences techniques", "Savoir-être pro", "Adaptabilité terrain", "Potentiel d'évolution"].map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-[#a7b4d6]">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div> {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[#a7b4d6] leading-relaxed italic">"{card.d}"</p>
                )}
                {card.img && <img src={`/assets/${card.img}`} alt={card.t} className="rounded-2xl border border-white/5 w-full pt-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PAGE 6: RÔLE DE L'AGENT IA --- */}
      <section className="py-32 bg-indigo-600/5 border-y border-[#203156]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <img src="/assets/img-012.png" alt="Agent IA" className="rounded-[3rem] shadow-2xl order-2 lg:order-1" />
            <div className="space-y-12 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-xl">
                  <Target className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black">Rôle de <br/><span className="text-indigo-400">l'agent IA</span></h2>
              </div>
              
              <div className="space-y-4">
                {[
                  "Planifie un programme d'entrainement",
                  "Analyse compétences, savoir-être et potentiel",
                  "Aide à se préparer, se projeter et gagner en confiance",
                  "Apporte un appui complémentaire, rapide et objectivable"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-5 bg-[#0b1220] p-6 rounded-2xl border border-white/5 shadow-lg group hover:border-indigo-500/50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-lg">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PAGE 7: PLUS-VALUES --- */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                Les Multiples <br/><span className="text-emerald-400 font-serif italic">Plus-Values</span> de l'IA
              </h2>
              
              <div className="relative space-y-12">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-white/10"></div>
                {[
                  { t: "Mise en situation et préparation renforcée", icon: Presentation },
                  { t: "Gain de confiance et d'autonomie", icon: Zap },
                  { t: "Parcours de réinsertion plus lisibles et sécurisés", icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="relative pl-16 group">
                    <div className="absolute left-0 w-8 h-8 rounded-full bg-[#0b1220] border-4 border-indigo-500 z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/5 group-hover:bg-white/10 transition-all">
                      <item.icon className="w-8 h-8 text-indigo-400 mb-4" />
                      <p className="text-2xl font-bold leading-snug">{item.t}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img src="/assets/img-013.png" alt="Succès" className="rounded-[3rem] shadow-2xl" />
          </div>
        </div>
      </section>

      {/* --- CRITICAL SECTION: LE QUESTIONNAIRE (DIAGNOSTIC) --- */}
      <section id="diagnostic" className="py-32 relative bg-[#070b14]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)]"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">Votre Diagnostic <span className="text-indigo-500">IA</span></h2>
            <p className="text-xl text-[#a7b4d6]">Identifiez vos freins et valorisez vos compétences en 15 questions stratégiques.</p>
          </div>

          <div className="bg-[#111b2e] border border-indigo-500/20 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
            {!showResult ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={currentStep} className="space-y-10">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <span className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em]">Question {currentStep + 1} sur 15</span>
                    <h3 className="text-3xl font-black">{QUESTIONS[currentStep].label}</h3>
                  </div>
                  <div className="text-4xl font-mono font-black text-white/10">{Math.round(((currentStep + 1)/15)*100)}%</div>
                </div>
                
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${((currentStep + 1)/15)*100}%` }} 
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                  ></motion.div>
                </div>

                <div className="space-y-6">
                  <p className="text-2xl font-medium text-white/90 leading-relaxed">{QUESTIONS[currentStep].q}</p>
                  <div className="grid gap-4">
                    {QUESTIONS[currentStep].choices.map((choice, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(QUESTIONS[currentStep].id, choice.v)}
                        className={`w-full p-6 text-left rounded-2xl border-2 transition-all duration-300 group flex items-center justify-between
                          ${answers[QUESTIONS[currentStep].id] === choice.v 
                            ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-[0_0_30px_rgba(99,102,241,0.1)] scale-[1.02]' 
                            : 'border-white/5 bg-white/5 hover:border-white/20 text-[#a7b4d6]'}`}
                      >
                        <span className="text-lg font-bold">{choice.t}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                          ${answers[QUESTIONS[currentStep].id] === choice.v ? 'border-indigo-500 bg-indigo-500' : 'border-white/10'}`}>
                          {answers[QUESTIONS[currentStep].id] === choice.v && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-10 border-t border-white/5">
                  <button 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-[#a7b4d6] hover:text-white font-black uppercase text-xs tracking-widest disabled:opacity-20 transition-opacity"
                  >
                    Précédent
                  </button>
                  {Object.keys(answers).length === QUESTIONS.length ? (
                    <button 
                      onClick={() => setShowResult(true)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] px-10 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/20"
                    >
                      Voir mon profil complet
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 text-white/20 italic">
                      <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"></div>
                      <span>En attente de réponse...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-12">
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <Rocket className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-4xl font-black">Analyse Terminée !</h3>
                  <p className="text-xl text-[#a7b4d6]">Voici votre score d'insertion propulsé par l'IA.</p>
                </div>

                <div className="grid gap-6">
                  {results && [
                    { label: "Freins Périphériques", val: results.periph, color: "from-orange-500 to-red-500", icon: ShieldCheck },
                    { label: "Adéquation Marché", val: results.market, color: "from-indigo-500 to-blue-500", icon: BarChart3 },
                    { label: "Compétences IA", val: results.skills, color: "from-emerald-500 to-teal-500", icon: Brain }
                  ].map((res, i) => (
                    <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/5 space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg bg-white/5`}><res.icon className="w-6 h-6 text-white" /></div>
                          <span className="font-black uppercase tracking-widest text-sm">{res.label}</span>
                        </div>
                        <span className="font-mono font-black text-3xl">{res.val}%</span>
                      </div>
                      <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${res.val}%` }} 
                          transition={{ duration: 1, delay: i*0.2 }} 
                          className={`h-full bg-gradient-to-r ${res.color} shadow-lg`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2.5rem] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-10 opacity-10"><Brain className="w-40 h-40" /></div>
                  <h4 className="text-3xl font-black relative z-10">Besoin d'un accompagnement sur-mesure ?</h4>
                  <p className="text-indigo-100 text-lg relative z-10">Nos experts IA vous aident à lever ces freins en moins de 30 heures de formation.</p>
                  <button className="bg-white text-indigo-600 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform relative z-10 shadow-2xl">
                    Réserver mon appel stratégique
                  </button>
                </div>
                
                <button onClick={() => { setShowResult(false); setAnswers({}); setCurrentStep(0); }} 
                  className="text-white/30 hover:text-white font-black uppercase text-xs tracking-widest underline underline-offset-8 transition-colors">
                  Recommencer le diagnostic
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* --- PAGE 8: FOOTER --- */}
      <footer className="py-32 relative border-t border-[#203156] bg-[#0b1220] overflow-hidden">
        {/* Background Image Page 8 */}
        <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none">
          <img src="/assets/img-014.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-end">
            <div className="space-y-12">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 p-3 rounded-2xl"><Brain className="w-10 h-10 text-white" /></div>
                <span className="text-4xl font-black tracking-tighter uppercase italic">Koria</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase">
                Ensemble vers <br/><span className="text-indigo-500">la Réussite</span>
              </h2>
            </div>
            
            <div className="space-y-12 lg:pl-20">
              <div className="space-y-6">
                <h6 className="font-black uppercase text-xs tracking-[0.4em] text-indigo-400">Contact</h6>
                <div className="space-y-4">
                  <a href="tel:0650281092" className="flex items-center gap-6 text-2xl font-bold hover:text-indigo-400 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Phone className="w-5 h-5" /></div>
                    06.50.28.10.92
                  </a>
                  <a href="mailto:sb.formation.ia@hotmail.com" className="flex items-center gap-6 text-2xl font-bold hover:text-indigo-400 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10"><Mail className="w-5 h-5" /></div>
                    sb.formation.ia@hotmail.com
                  </a>
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/5 flex flex-wrap justify-between items-center gap-6">
                <p className="text-[#a7b4d6] font-mono text-sm">SIRET : 994 406 650</p>
                <p className="text-sm text-white/20 font-black uppercase tracking-widest">© 2026 KORIA - DREAM TEAM AGENTS</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
