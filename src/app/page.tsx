"use client";

import React, { useState } from 'react';
import { Brain, CheckCircle2, ChevronRight, BarChart3, Rocket, ShieldCheck, Mail, Phone, ArrowRight, Target, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-[#0b1220] text-[#e8eefc] font-sans selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="border-b border-[#203156] bg-[#0b1220]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight uppercase">Koria</span>
          </div>
          <button onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
            Démarrer le test
          </button>
        </div>
      </nav>

      {/* Hero Section - Page 1 */}
      <header className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="mb-12 relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-emerald-500/20 blur-3xl rounded-full"></div>
              <img 
                src="/assets/img-000.png" 
                alt="L'IA comme levier d'insertion" 
                className="relative rounded-[2.5rem] shadow-2xl border border-white/10 max-w-3xl mx-auto w-full"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-12 leading-tight">
              L'IA comme levier <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                d'insertion professionnelle
              </span>
            </h1>
            
            {/* Logos Row - Page 1 */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-80 mb-16">
              {[
                { name: "ChatGPT", src: "/assets/img-001.png" },
                { name: "DeepSeek", src: "/assets/img-002.png" },
                { name: "Grok", src: "/assets/img-003.png" },
                { name: "Mistral AI", src: "/assets/img-004.png" },
                { name: "Copilot", src: "/assets/img-005.png" }
              ].map((logo, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="h-10 md:h-12 flex items-center">
                    {/* Note: In a real scenario, we'd use the actual logo images from the assets */}
                    <img src={logo.src} alt={logo.name} className="h-full object-contain" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">{logo.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Section Alliée au Quotidien - Page 2 */}
      <section className="py-24 bg-white/5 border-y border-[#203156]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/assets/img-006.png" alt="L'IA votre allié" className="rounded-3xl shadow-2xl border border-white/10" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-4xl font-black mb-8 italic font-serif">L'IA : Votre Allié au Quotidien</h2>
              <div className="pl-6 border-l-4 border-indigo-500 space-y-6">
                <p className="text-xl text-[#a7b4d6] leading-relaxed">
                  Concrètement, l'IA devient un outil du quotidien : comprendre leur parcours, mieux se présenter, mieux se projeter.
                </p>
                <p className="text-2xl font-bold text-white italic">
                  Résultat : plus d'autonomie côté public, plus d'efficacité côté accompagnement.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programme de Formation - Page 3 */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-black mb-2">Programme de Formation : 30 Heures</h2>
              <p className="text-indigo-400 font-bold mb-12">Un parcours complet en 4 modules</p>
              
              <div className="space-y-8">
                {[
                  { id: 1, title: "Module 1: Découverte de l'IA (7h)", items: ["Introduction à l'IA", "Risque et règlementation", "Les limites et le potentiel"] },
                  { id: 2, title: "Module 2: Explorer (CV & Candidatures (8h))", items: ["Optimisation du CV, lettre de motivation avec l'IA", "Création de prompt", "Identifier les outils pertinents"] },
                  { id: 3, title: "Module 3: On passe à l'action (8h)", items: ["Simulations d'entretien avec IA", "Techniques de communication", "Gestion du stress"] },
                  { id: 4, title: "Module 4: Stratégie de Recherche GPS (7h)", items: ["Ciblage des opportunités", "Création d'un agent", "Suivi et relances"] }
                ].map((mod) => (
                  <div key={mod.id} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      {mod.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{mod.title}</h3>
                      <ul className="space-y-2">
                        {mod.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-[#a7b4d6] text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img src="/assets/img-007.png" alt="Formation IA" className="rounded-3xl shadow-2xl border border-white/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact CV - Page 4 */}
      <section className="py-24 bg-[#070b14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-4">L'Impact de l'IA sur la Qualité des CV</h2>
          <p className="text-[#a7b4d6] mb-16">Transformer un CV ordinaire en candidature percutante</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest text-sm">
                <span>❌</span> AVANT : CV Peu Efficace
              </div>
              <img src="/assets/img-008.png" alt="CV Avant" className="rounded-xl border border-white/5 shadow-xl w-full" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-sm">
                <span>✅</span> APRÈS : CV Optimisé avec l'IA
              </div>
              <img src="/assets/img-009.png" alt="CV Après" className="rounded-xl border border-white/5 shadow-xl w-full" />
            </div>
          </div>
          
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-2xl inline-flex items-center gap-4 text-left max-w-3xl">
            <Brain className="w-8 h-8 text-indigo-400 flex-shrink-0" />
            <p className="text-sm font-bold text-indigo-300 uppercase tracking-wide leading-relaxed">
              L'IA aide à structurer, valoriser et personnaliser chaque candidature pour maximiser l'impact.
            </p>
          </div>
        </div>
      </section>

      {/* Simulation d'entretien - Page 5 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black mb-4">Simulation d'entretien</h2>
          <p className="text-[#a7b4d6] mb-16">Mettons-nous en situation pour comprendre les attentes d'un recruteur face à une candidature.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="text-indigo-400 font-mono text-sm border-b border-indigo-500/30 pb-2">01. Le Contexte</div>
              <p className="text-white/80 leading-relaxed">
                Mets-toi dans la peau d'un recruteur chevronné d'une entreprise de bâtiment qui veut recruter un plaquiste.
              </p>
              <img src="/assets/img-010.png" alt="Contexte" className="rounded-2xl border border-white/10" />
            </div>
            <div className="space-y-6">
              <div className="text-indigo-400 font-mono text-sm border-b border-indigo-500/30 pb-2">02. Ce que l'IA Analyse</div>
              <ul className="space-y-4">
                {[
                  { t: "Compétences techniques", d: "Maîtrise des matériaux, précision de pose, qualité des finitions" },
                  { t: "Savoir-être professionnel", d: "Esprit d’équipe, fiabilité sur chantier, respect des consignes" },
                  { t: "Adaptabilité terrain", d: "Capacité à travailler dans des environnements variés" },
                  { t: "Motivation & potentiel", d: "Engagement, envie d’apprendre, capacité d’évolution" }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-1" />
                    <div>
                      <span className="font-bold text-white block">{item.t} :</span>
                      <span className="text-sm text-[#a7b4d6]">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div className="text-indigo-400 font-mono text-sm border-b border-indigo-500/30 pb-2">03. L'Entretien Commence</div>
              <img src="/assets/img-011.png" alt="Entretien" className="rounded-2xl border border-white/10 mb-6" />
              <div className="bg-[#111b2e] p-6 rounded-2xl border-l-4 border-indigo-500">
                <p className="text-indigo-400 font-bold mb-2">Bonjour.</p>
                <p className="text-sm text-white/70 italic">
                  "Avant de parler technique, j’aimerais comprendre votre parcours. Qu’est-ce qui vous a donné envie de travailler comme plaquiste ?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rôle de l'agent IA - Page 6 */}
      <section className="py-24 bg-white/5 border-y border-[#203156]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <img src="/assets/img-012.png" alt="Rôle Agent IA" className="rounded-3xl shadow-2xl border border-white/10" />
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Brain className="w-10 h-10 text-indigo-400" />
                <h2 className="text-4xl font-black">Rôle de l'agent IA</h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: Target, text: "Planifie un programme" },
                  { icon: Zap, text: "Entrainement en vue d'un entretien" },
                  { icon: BarChart3, text: "Analyse compétences, savoir-être et potentiel" },
                  { icon: Users, text: "Aide le candidat à se préparer, se projeter et gagner en confiance" },
                  { icon: ShieldCheck, text: "Apporte un appui complémentaire, rapide et objectivable" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-[#0b1220] p-5 rounded-2xl border border-[#203156] group hover:border-indigo-500/50 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white/90">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plus-Values - Page 7 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-12">Les Multiples Plus-Values de l'IA dans l'Accompagnement</h2>
              <div className="space-y-6 relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-emerald-500 to-transparent"></div>
                {[
                  "Mise en situation et préparation renforcée",
                  "Gain de confiance et d'autonomie",
                  "Parcours de réinsertion plus lisibles et sécurisés"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-8 relative pl-12 group">
                    <div className="absolute left-4 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#0b1220] z-10"></div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 w-full group-hover:bg-indigo-500/5 group-hover:border-indigo-500/30 transition-all">
                      <p className="text-xl font-bold text-white/90">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img src="/assets/img-013.png" alt="Plus-values IA" className="rounded-3xl shadow-2xl border border-white/10" />
          </div>
        </div>
      </section>

      {/* Diagnostic Tool - Keeping it as a conversion element */}
      <section id="diagnostic" className="py-24 bg-[#070b14]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Votre Diagnostic Flash</h2>
            <p className="text-[#a7b4d6]">Identifiez vos freins et valorisez vos compétences en 15 questions.</p>
          </div>
          <div className="bg-[#111b2e] border border-[#203156] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {!showResult ? (
              <div>
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Question {currentStep + 1}/15</span>
                    <h3 className="text-2xl font-bold mt-1">{QUESTIONS[currentStep].label}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-white/40 text-sm font-mono">{Math.round(((currentStep + 1)/15)*100)}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#0b1630] rounded-full mb-12 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${((currentStep + 1)/15)*100}%` }} className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"></motion.div>
                </div>
                <div className="space-y-4">
                  <p className="text-xl mb-6 font-medium text-white/90">{QUESTIONS[currentStep].q}</p>
                  <div className="grid gap-3">
                    {QUESTIONS[currentStep].choices.map((choice, i) => (
                      <button key={i} onClick={() => handleAnswer(QUESTIONS[currentStep].id, choice.v)}
                        className={`w-full p-5 text-left rounded-2xl border transition-all duration-200 group flex items-center justify-between
                          ${answers[QUESTIONS[currentStep].id] === choice.v ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg' : 'border-[#203156] bg-[#0b1220]/50 hover:border-indigo-500/50 hover:bg-[#0b1220] text-[#a7b4d6]'}`}>
                        <span className="font-bold">{choice.t}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[QUESTIONS[currentStep].id] === choice.v ? 'border-indigo-500 bg-indigo-500' : 'border-[#203156]'}`}>
                          {answers[QUESTIONS[currentStep].id] === choice.v && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between mt-12 pt-8 border-t border-[#203156]">
                  <button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)} className="text-[#a7b4d6] hover:text-white font-bold disabled:opacity-30">Précédent</button>
                  {Object.keys(answers).length === QUESTIONS.length ? (
                    <button onClick={() => setShowResult(true)} className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] px-8 py-3 rounded-xl font-black transition-all transform hover:scale-105">Voir mes résultats</button>
                  ) : ( <span className="text-[#203156] font-bold italic">Répondez pour continuer...</span> )}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Rocket className="w-10 h-10 text-emerald-400" /></div>
                  <h3 className="text-3xl font-black">Analyse Terminée !</h3>
                  <p className="text-[#a7b4d6] mt-2">Voici votre profil d'insertion IA.</p>
                </div>
                <div className="grid gap-6 mb-12">
                  {results && [
                    { label: "Freins Périphériques", val: results.periph, color: "bg-orange-500", icon: ShieldCheck },
                    { label: "Adéquation Marché", val: results.market, color: "bg-indigo-500", icon: BarChart3 },
                    { label: "Compétences Transférables", val: results.skills, color: "bg-emerald-500", icon: Rocket }
                  ].map((res, i) => (
                    <div key={i} className="bg-[#0b1220]/50 p-6 rounded-2xl border border-[#203156]">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3"><res.icon className="w-5 h-5 text-indigo-400" /><span className="font-bold text-white/80">{res.label}</span></div>
                        <span className="font-mono font-black text-xl">{res.val}%</span>
                      </div>
                      <div className="w-full h-3 bg-[#0b1630] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${res.val}%` }} transition={{ delay: i*0.2 }} className={`h-full ${res.color}`}></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-indigo-600 rounded-2xl p-8 text-center">
                  <h4 className="text-xl font-bold mb-4">Besoin d'un accompagnement sur-mesure ?</h4>
                  <p className="mb-8 text-indigo-100">Nos experts IA vous aident à lever ces freins en moins de 30 heures.</p>
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform">Réserver mon appel stratégique</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer - Page 8 */}
      <footer className="py-24 border-t border-[#203156] bg-[#0b1220] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-16 relative z-10">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-emerald-500 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <span className="text-3xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Koria</span>
            </div>
            <h5 className="text-2xl font-serif italic text-white/90">Ensemble vers la Réussite</h5>
          </div>
          <div className="space-y-6">
            <h6 className="font-black uppercase text-xs tracking-[0.3em] text-indigo-400">Contact</h6>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-xl text-[#a7b4d6] hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-indigo-500" />
                </div>
                06.50.28.10.92
              </li>
              <li className="flex items-center gap-4 text-[#a7b4d6] hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-indigo-500" />
                </div>
                sb.formation.ia@hotmail.com
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h6 className="font-black uppercase text-xs tracking-[0.3em] text-indigo-400">Informations</h6>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <p className="text-[#a7b4d6] font-mono text-sm">SIRET : 994 406 650</p>
              <p className="text-xs text-white/30 mt-4 leading-relaxed italic">
                La Dream Team (Xénon, Quanta & Nova) vous accompagne dans votre transformation digitale.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
