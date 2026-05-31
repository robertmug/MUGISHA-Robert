import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Code2, Cpu, FileText, Sparkles, CheckCircle, RefreshCw, Terminal, Eye, HelpCircle } from 'lucide-react';
import { ALGORITHMIC_CHALLENGES } from '../data';
import { AlgorithmicChallenge } from '../types';

export default function AlgoSandbox() {
  const [selectedAlgo, setSelectedAlgo] = useState<AlgorithmicChallenge>(ALGORITHMIC_CHALLENGES[0]);
  const [inputValue, setInputValue] = useState<string>(selectedAlgo.sampleInput);
  const [executionResult, setExecutionResult] = useState<{
    success: boolean;
    result: string;
    consoleLogs: string[];
    isExecuted: boolean;
  }>({
    success: false,
    result: '',
    consoleLogs: [],
    isExecuted: false,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(true);

  const handleSelectAlgo = (algo: AlgorithmicChallenge) => {
    setSelectedAlgo(algo);
    setInputValue(algo.sampleInput);
    setExecutionResult({
      success: false,
      result: '',
      consoleLogs: [],
      isExecuted: false,
    });
  };

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate clock cycles calculation speed for extra immersion
    setTimeout(() => {
      const output = selectedAlgo.execute(inputValue);
      setExecutionResult({
        success: output.success,
        result: output.result,
        consoleLogs: output.consoleLogs,
        isExecuted: true,
      });
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-indigo-500/20 rounded-3xl p-6 lg:p-8 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Absolute design accents from Vibrant Palette */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-display font-black text-white flex items-center gap-2">
              Algorithmic Problem-Solving Lab
            </h3>
            <p className="text-xs text-slate-450">Execute verified algorithms with custom inputs and view memory trace logs</p>
          </div>
        </div>

        {/* Algorithm selection pills from Vibrant Palette */}
        <div className="flex flex-wrap gap-2">
          {ALGORITHMIC_CHALLENGES.map((algo) => (
            <button
              key={algo.id}
              onClick={() => handleSelectAlgo(algo)}
              className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer uppercase ${
                selectedAlgo.id === algo.id
                  ? 'bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold shadow-md'
                  : 'bg-slate-950 text-slate-450 hover:text-white border border-slate-800 hover:border-slate-750'
              }`}
            >
              {algo.id === 'algo-prime' ? 'PrimeFactor' : algo.id === 'algo-bracket' ? 'BracketCheck' : 'Fibonacci'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input & Options panel */}
        <div className="lg:col-span-4 space-y-4 font-sans">
          <div className="bg-slate-950/80 border border-slate-805 rounded-3xl p-5 space-y-4">
            <div>
              <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                selectedAlgo.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/25'
              }`}>
                {selectedAlgo.difficulty} Difficulty
              </span>
              <h4 className="text-base font-display font-bold text-white mt-2">{selectedAlgo.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-light">{selectedAlgo.description}</p>
            </div>

            <form onSubmit={handleExecute} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 mb-1.5 flex items-center justify-between uppercase tracking-wider">
                  <span>INPUT PARAMETER</span>
                  <button
                    type="button"
                    onClick={() => setInputValue(selectedAlgo.sampleInput)}
                    className="text-[10px] text-emerald-450 hover:underline flex items-center gap-1 cursor-pointer font-bold"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> reset sample
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={selectedAlgo.inputPlaceholder}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-400 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-emerald-450"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 hover:opacity-90 text-slate-950 font-bold py-3.5 px-4 rounded-xl text-xs font-display flex items-center justify-center gap-2 shadow-lg cursor-pointer transform transition-all uppercase tracking-wider"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Compiling cycles...
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current text-slate-950" /> Initialize Logic Trace
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 text-[11px] text-slate-405 leading-normal flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Robert designed this sandbox using real mathematical functions. Modify the inputs to test edge cases or inspect loop variables.
            </span>
          </div>
        </div>

        {/* Console / Code view panel */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          
          {/* Diagnostic Console Panel */}
          <div className="bg-slate-950 border border-slate-800 rounded-3xl flex-1 flex flex-col min-h-[220px] font-mono text-[11px] overflow-hidden">
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
              <span className="text-slate-405 flex items-center gap-2 font-bold tracking-widest uppercase">
                <Terminal className="w-3.5 h-3.5 text-emerald-450" /> VIRTUAL LOG CONSOLE
              </span>
              <button
                onClick={() => setShowCode(!showCode)}
                className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer bg-slate-950 border border-slate-800 px-3 py-1 rounded-full text-xs font-bold transition-all"
              >
                <Code2 className="w-3.5 h-3.5 text-emerald-400" /> {showCode ? 'Hide Code' : 'Show Code'}
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-1.5 scrollbar-thin text-slate-300">
              {!executionResult.isExecuted ? (
                <div className="h-full flex items-center justify-center text-slate-600 italic">
                  <span>Engine awaiting execution. Click "Initialize Logic Trace" to begin.</span>
                </div>
              ) : (
                <>
                  {executionResult.consoleLogs.map((log, index) => (
                    <div key={index} className="text-emerald-400/90 leading-relaxed border-l-2 border-emerald-900/30 pl-2">
                      {log}
                    </div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 p-4 rounded-2xl border leading-relaxed ${
                      executionResult.success
                        ? 'bg-emerald-950/10 border-emerald-500/20 text-emerald-300'
                        : 'bg-indigo-950/10 border-indigo-500/20 text-indigo-300'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-bold mb-1 text-[10px] uppercase tracking-wider">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                      <span>FUNCTION RETURN VALUE:</span>
                    </div>
                    <div className="font-bold text-xs select-all bg-black/30 p-2.5 rounded-xl border border-slate-900 overflow-x-auto text-white">
                      {executionResult.result}
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </div>

          {/* Source Code Overlay */}
          <AnimatePresence>
            {showCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden font-mono text-[11px]"
              >
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Robert's Optimized TypeScript Implementation
                  </span>
                </div>
                <div className="p-4 bg-slate-950/90 overflow-x-auto text-slate-300 max-h-48 overflow-y-auto">
                  <pre>{selectedAlgo.codeSnippet}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
