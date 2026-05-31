import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Laptop, Smartphone, ShieldAlert, Terminal, Flame, AlertCircle, Wrench, Clock, CheckSquare, Plus, ArrowRight } from 'lucide-react';
import { ICT_DIAGNOSTICS_DB } from '../data';
import { ICTIssue } from '../types';

export default function IctDiagnostics() {
  const [activeTab, setActiveTab] = useState<'pc' | 'phone'>('pc');
  const [selectedIssue, setSelectedIssue] = useState<ICTIssue | null>(null);

  const filteredIssues = ICT_DIAGNOSTICS_DB.filter((issue) => issue.device === activeTab);

  // Dynamic Icon selector
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      default:
        return <Smartphone className={className} />;
    }
  };

  const handleBookRepair = (issue: ICTIssue) => {
    const trigger = (window as any).prepopulateContactForm;
    if (typeof trigger === 'function') {
      trigger(
        `${activeTab.toUpperCase()} Error: ${issue.symptom}`,
        `Estimating fix duration at ~ ${issue.resolutionTime}.`
      );
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-indigo-500/20 rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Visual glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <h3 className="text-xl font-display font-black text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-emerald-400 animate-pulse" /> ICT Diagnostics & Repair Desk
          </h3>
          <p className="text-xs text-slate-405 font-light">Technical debugging standards for PC, laptop, and phone hardware & software failures</p>
        </div>

        {/* Tab switcher using rounded-full matching theme */}
        <div className="flex bg-slate-950 p-1.5 rounded-full border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => {
              setActiveTab('pc');
              setSelectedIssue(null);
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold font-display transition-all cursor-pointer ${
              activeTab === 'pc'
                ? 'bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" /> PC & Workstations
          </button>
          <button
            onClick={() => {
              setActiveTab('phone');
              setSelectedIssue(null);
            }}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold font-display transition-all cursor-pointer ${
              activeTab === 'phone'
                ? 'bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" /> Smart Telephones
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Issues List Column */}
        <div className="lg:col-span-5 space-y-3 font-sans">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 block mb-1">
            // Common Symptoms {activeTab === 'pc' ? '(PCs)' : '(Smartphones)'}
          </span>
          {filteredIssues.map((issue) => {
            const isSelected = selectedIssue?.id === issue.id;
            return (
              <button
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 relative overflow-hidden group ${
                  isSelected
                    ? activeTab === 'pc'
                      ? 'bg-emerald-950/20 border-emerald-500/50'
                      : 'bg-indigo-950/20 border-indigo-500/50'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Visual marker */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${
                  isSelected
                    ? activeTab === 'pc'
                      ? 'bg-emerald-450'
                      : 'bg-indigo-400'
                    : 'bg-transparent group-hover:bg-slate-700'
                }`} />

                <div className={`p-2.5 rounded-xl shrink-0 ${
                  isSelected
                    ? activeTab === 'pc'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-indigo-500/10 text-indigo-400'
                    : 'bg-slate-950 text-slate-450 group-hover:text-white'
                }`}>
                  {renderIcon(issue.iconName, 'w-4 h-4')}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-white group-hover:text-cyan-40 px-0.5 leading-snug line-clamp-2">
                    {issue.symptom}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" /> {issue.resolutionTime}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Diagnostic Actions Column */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedIssue ? (
              <motion.div
                key={selectedIssue.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="bg-slate-950/90 border border-slate-800 rounded-3xl p-5 lg:p-6 space-y-5"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">// DIAGNOSTIC PROTOCOL ACTIVE</span>
                  <h4 className="text-base font-display font-bold text-white mt-1">{selectedIssue.symptom}</h4>
                </div>

                {/* Common ROOT CAUSES */}
                <div className="font-sans">
                  <h5 className="text-[11px] font-mono text-slate-455 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Structural Malfunction Roots
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedIssue.commonCauses.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-900/50 p-2.5 rounded-xl border border-slate-900 text-slate-305 font-light">
                        <span className="text-amber-505 font-bold shrink-0 mt-0.5">•</span>
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Diagnostic Tasks */}
                <div className="border-t border-slate-900 pt-4 font-sans">
                  <h5 className="text-[11px] font-mono text-slate-455 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-450" /> Level 5 Action Checkpoints (Step-by-step)
                  </h5>
                  <div className="space-y-2 text-xs font-mono">
                    {selectedIssue.diagnosticSteps.map((step, idx) => (
                      <div key={idx} className="flex gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-900 text-slate-300">
                        <span className="text-emerald-400 font-bold shrink-0">{`[0${idx + 1}]`}</span>
                        <p className="leading-relaxed font-light">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing info and book link */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-900 pt-4 font-sans">
                  <div className="text-xs">
                    <div className="text-slate-450 font-mono text-[10px] tracking-widest uppercase mb-1">// Diagnosis SLA Status</div>
                    <div className="font-bold text-white font-mono flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Done under {selectedIssue.resolutionTime}
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookRepair(selectedIssue)}
                    className="bg-gradient-to-r from-emerald-455 via-cyan-455 to-indigo-500 text-slate-950 font-display font-bold text-xs py-3 px-5 rounded-full flex items-center justify-center gap-2 shadow-lg hover:opacity-90 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    Load Diagnostics to Outbox <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </motion.div>
            ) : (
              <div className="border border-dashed border-slate-800 rounded-3xl bg-slate-950/20 p-12 text-center flex flex-col items-center justify-center min-h-[300px] font-sans animate-pulse-slow">
                <Plus className="w-8 h-8 text-slate-600 mb-3 animate-pulse" />
                <h4 className="text-sm font-bold text-slate-400">Select an ICT Symptom Card</h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1 leading-normal font-light">
                  Toggle between Workstations and Smart Mobile tabs. Click on any standard diagnostic card to read custom level 5 troubleshooting workflows compiled by Robert.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
