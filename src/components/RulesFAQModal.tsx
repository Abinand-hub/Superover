import React, { useState } from 'react';
import { X, Award, HelpCircle, ShieldCheck, CheckCircle2, Trophy, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { FAQItem } from '../types';
import { formatINR, PAYOUT_TIERS } from '../utils/payoutCalculator';
import { DEFAULT_QUESTIONS } from '../data/initialData';

interface RulesFAQModalProps {
  faqs: FAQItem[];
  onClose: () => void;
}

export const RulesFAQModal: React.FC<RulesFAQModalProps> = ({ faqs, onClose }) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'payouts' | 'faqs'>('rules');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-white font-display">Rules, Payouts & FAQs</h2>
              <p className="text-xs text-slate-400">Everything you need to know about playing SuperOver</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-4 pt-2 gap-2 flex-shrink-0">
          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-2.5 px-4 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'rules' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            The 6 Stat Rules
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`pb-2.5 px-4 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'payouts' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Multiplier Matrix (100X)
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`pb-2.5 px-4 text-xs font-extrabold transition-all border-b-2 ${
              activeTab === 'faqs' ? 'border-amber-400 text-amber-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'rules' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <span className="font-bold block">Game Objective:</span>
                Pick an upcoming match, choose an entry fee (₹25, ₹50, or ₹100), and predict the winner for all 6 stats before submissions lock 10 minutes prior to match toss.
              </div>

              <div className="space-y-2.5">
                {DEFAULT_QUESTIONS.map((q) => (
                  <div key={q.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs">
                        {q.number}. {q.title} ({q.shortTitle})
                      </span>
                      <span className="text-[10px] text-amber-400 font-mono font-bold">Category {q.number}/6</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{q.subtitle}</p>
                    <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-900 flex items-center gap-1">
                      <span className="text-emerald-400 font-semibold">Criteria:</span>
                      <span>{q.criteria}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payouts' && (
            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="font-bold text-white block">Official Mathematical Payout Scale:</span>
                <p className="text-slate-400 text-[11px]">
                  Payouts depend strictly on your count of correct predictions C out of 6. Platform deducts net rake prior to settlement.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Correct Answers (C)</th>
                      <th className="p-3">Gross Multiplier</th>
                      <th className="p-3">₹25 Entry Win</th>
                      <th className="p-3">₹50 Entry Win</th>
                      <th className="p-3">₹100 Entry Win</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-900/60">
                    <tr className="bg-amber-500/10 font-bold">
                      <td className="p-3 text-amber-400">6 / 6 Correct</td>
                      <td className="p-3 text-amber-400 font-black">100X</td>
                      <td className="p-3 font-mono text-emerald-400">{formatINR(2500)}</td>
                      <td className="p-3 font-mono text-emerald-400">{formatINR(5000)}</td>
                      <td className="p-3 font-mono text-emerald-400">{formatINR(10000)}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-emerald-300 font-bold">5 / 6 Correct</td>
                      <td className="p-3 text-emerald-400 font-black">10X</td>
                      <td className="p-3 font-mono text-emerald-300">{formatINR(250)}</td>
                      <td className="p-3 font-mono text-emerald-300">{formatINR(500)}</td>
                      <td className="p-3 font-mono text-emerald-300">{formatINR(1000)}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-blue-300 font-bold">4 / 6 Correct</td>
                      <td className="p-3 text-blue-400 font-black">3X</td>
                      <td className="p-3 font-mono text-blue-300">{formatINR(75)}</td>
                      <td className="p-3 font-mono text-blue-300">{formatINR(150)}</td>
                      <td className="p-3 font-mono text-blue-300">{formatINR(300)}</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-slate-300 font-bold">3 / 6 Correct</td>
                      <td className="p-3 text-slate-300 font-black">0.5X (Guard)</td>
                      <td className="p-3 font-mono text-slate-300">{formatINR(12.5)}</td>
                      <td className="p-3 font-mono text-slate-300">{formatINR(25)}</td>
                      <td className="p-3 font-mono text-slate-300">{formatINR(50)}</td>
                    </tr>
                    <tr className="text-slate-500">
                      <td className="p-3">0 - 2 Correct</td>
                      <td className="p-3">0X</td>
                      <td className="p-3">₹0</td>
                      <td className="p-3">₹0</td>
                      <td className="p-3">₹0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="space-y-3 text-xs">
              {faqs.map((faq) => (
                <div key={faq.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{faq.question}</span>
                    <span className="text-[10px] text-amber-400 px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800">
                      {faq.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed pt-1">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
