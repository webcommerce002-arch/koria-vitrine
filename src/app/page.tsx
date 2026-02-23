"use client";

import React, { useState } from 'react';
import { Brain, CheckCircle2, ChevronRight, BarChart3, Rocket, MessageSquare, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QUESTIONS = [
  // Freins périphériques
  { id: "p1", axis: "periph", label: "Mobilité", q: "As-tu une solution fiable pour te déplacer vers un emploi ou une formation ?", choices: [{ v: 0, t: "Oui, totalement" }, { v: 1, t: "Plutôt oui" }, { v: 2, t: "Plutôt non" }, { v: 3, t: "Non, c’est un vrai frein" }] },
  { id: "p2", axis: "periph", label: "Logement", q: "Ta situation de logement est-elle stable pour te projeter sur 3 mois ?", choices: [{ v: 0, t: "Oui, stable" }, { v: 1, t: "Assez stable" }, { v: 2, t: "Instable" }, { v: 3, t: "Très instable / urgence" }] },
  { id: "p3", axis: "periph", label: "Garde / contraintes", q: "As-tu des contraintes familiales ou de garde qui limitent tes horaires ?", choices: [{ v: 0, t: "Non" }, { v: 1, t: "Peu" }, { v: 2, t: "Oui, parfois" }, { v: 3, t: "Oui, fortement" }] },
  
  // Freins du marché
  { id: "m1", axis: "market", label: "Ciblage", q: "Ton objectif métier est-il clair et réaliste sur ton territoire ?", choices: [{ v: 0, t: "Oui, clair et réaliste" }, { v: 1, t: "Plutôt clair" }, { v: 2, t: "Assez flou" }, { v: 3, t: "Pas clair / pas réaliste" }] },
  { id: "m2", axis: "market", label: "Offres & accès", q: "Sais-tu identifier des offres pertinentes et candidater facilement ?", choices: [{ v: 0, t: "Oui, sans difficulté" }, { v: 1, t: "Plutôt oui" }, { v: 2, t: "Difficile" }, { v: 3, t: "Très difficile" }] },
  { id: "m3", axis: "market", label: "Niveau attendu", q: "Ton niveau (diplôme/expérience) correspond-il aux attentes des recruteurs du secteur visé ?", choices: [{ v: 0, t: "Oui" }, { v: 1, t: "Presque" }, { v: 2, t: "Pas vraiment" }, { v: 3, t: "Non, gros écart" }] },

  // Compétences transférables
  { id: "s1", axis: "skills", label: "Organisation", q: "Je sais m’organiser : prioriser, respecter des délais, tenir un planning.", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Un peu" }, { v: 2, t: "Souvent" }, { v: 3, t: "Oui, fortement" }] },
  { id: "s2", axis: "skills", label: "Relationnel", q: "Je suis à l’aise pour communiquer, expliquer, écouter, gérer un échange.", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Un peu" }, { v: 2, t: "Souvent" }, { v: 3, t: "Oui, fortement" }] },
  { id: "s3", axis: "skills", label: "Adaptation", q: "Je m’adapte vite : nouveaux outils, nouvelles consignes, nouveaux contextes.", choices: [{ v: 0, t: "Pas du tout" }, { v: 1, t: "Un peu" }, { v: 2, t: "Souvent" }, { v: 3, t: "Oui, fortement" }] },

  // IA & Carrière (Nouvelles questions)
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

    return {
      periph: sumByAxis("periph"),
      market: sumByAxis("market"),
      skills: sumByAxis("skills"),
    };
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

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
              L'IA au service de votre carrière
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] max-w-4xl">
              L'IA comme levier <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                d'insertion professionnelle
              </span>
            </h1>
            <p className="text-xl text-[#a7b4d6] max-w-2xl mb-10 leading-relaxed">
              Transformez votre recherche d'emploi. Apprenez à maîtriser les outils qui feront de vous le candidat idéal en 2026.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => document.getElementById('diagnostic')?.scrollIntoView({ behavior: 'smooth' })} 
                className="bg-white text-[#0b1220] px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-2 group">
                Lancer mon diagnostic <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0b1220] bg-[#111b2e] flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                  </div>
                ))}
                <div className="pl-4 flex flex-col justify-center">
                  <span className="text-sm font-bold">+500 formés</span>
                  <span className="text-xs text-emerald-400">98% de satisfaction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-3xl -z-0"></div>
      </header>

      {/* Stats Section */}
      <section className="py-12 border-y border-[#203156] bg-[#111b2e]/30">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Durée", val: "30 Heures" },
            { label: "Modules", val: "4 Étapes" },
            { label: "Coaching", val: "1-on-1" },
            { label: "Format", val: "Distanciel" }
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black text-white">{s.val}</div>
              <div className="text-sm text-indigo-400 font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Diagnostic Tool */}
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
                      <button
                        key={i}
                        onClick={() => handleAnswer(QUESTIONS[currentStep].id, choice.v)}
                        className={`w-full p-5 text-left rounded-2xl border transition-all duration-200 group flex items-center justify-between
                          ${answers[QUESTIONS[currentStep].id] === choice.v 
                            ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/5' 
                            : 'border-[#203156] bg-[#0b1220]/50 hover:border-indigo-500/50 hover:bg-[#0b1220] text-[#a7b4d6]'}`}
                      >
                        <span className="font-bold">{choice.t}</span>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                          ${answers[QUESTIONS[currentStep].id] === choice.v ? 'border-indigo-500 bg-indigo-500' : 'border-[#203156]'}`}>
                          {answers[QUESTIONS[currentStep].id] === choice.v && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-12 pt-8 border-t border-[#203156]">
                  <button 
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-[#a7b4d6] hover:text-white font-bold disabled:opacity-30 transition-opacity">
                    Précédent
                  </button>
                  {Object.keys(answers).length === QUESTIONS.length ? (
                    <button 
                      onClick={() => setShowResult(true)}
                      className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] px-8 py-3 rounded-xl font-black transition-all transform hover:scale-105">
                      Voir mes résultats
                    </button>
                  ) : (
                    <span className="text-[#203156] font-bold italic">Répondez pour continuer...</span>
                  )}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="text-center mb-12">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10 text-emerald-400" />
                  </div>
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
                        <div className="flex items-center gap-3">
                          <res.icon className="w-5 h-5 text-indigo-400" />
                          <span className="font-bold text-white/80">{res.label}</span>
                        </div>
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
                  <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-black hover:scale-105 transition-transform">
                    Réserver mon appel stratégique
                  </button>
                </div>
                
                <button onClick={() => { setShowResult(false); setAnswers({}); setCurrentStep(0); }} 
                  className="w-full mt-6 text-[#a7b4d6] hover:text-white font-bold text-sm underline">
                  Recommencer le test
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-[#203156] bg-[#0b1220]">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-indigo-500" />
              <span className="text-2xl font-black tracking-tighter uppercase">Koria</span>
            </div>
            <p className="text-[#a7b4d6] leading-relaxed">
              Ensemble vers la réussite professionnelle grâce à la puissance de l'Intelligence Artificielle.
            </p>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-widest text-indigo-400 mb-6">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#a7b4d6]">
                <Phone className="w-5 h-5" /> 06.50.28.10.92
              </li>
              <li className="flex items-center gap-3 text-[#a7b4d6]">
                <Mail className="w-5 h-5" /> sb.formation.ia@hotmail.com
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase text-xs tracking-widest text-indigo-400 mb-6">Légal</h5>
            <p className="text-sm text-[#a7b4d6]">SIRET : 994 406 650</p>
            <p className="text-sm text-[#a7b4d6] mt-2">© 2026 Koria. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
