import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Database, Brain, Laptop, Mail, Phone, ExternalLink, MapPin, 
  School, Award, Terminal, Code, Settings2, Languages, ArrowUpRight, 
  BookOpen, ChevronRight, CheckCircle2, Menu, X, Instagram, Facebook, ShieldCheck
} from 'lucide-react';
import { PERSONAL_BIO, PORTFOLIO_SKILLS, PORTFOLIO_CERTIFICATES, PORTFOLIO_LANGUAGES } from './data';
import AlgoSandbox from './components/AlgoSandbox';
import IctDiagnostics from './components/IctDiagnostics';
import ContactHub from './components/ContactHub';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'database' | 'problem-solving' | 'hardware'>('all');

  const filteredSkills = activeTab === 'all' 
    ? PORTFOLIO_SKILLS 
    : PORTFOLIO_SKILLS.filter(skill => skill.category === activeTab);

  const navigationItems = [
    { name: 'About', href: '#about' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Skills Network', href: '#skills' },
    { name: 'Algorithmic Lab', href: '#sandbox' },
    { name: 'ICT Diagnostic Desk', href: '#support' },
    { name: 'Verified Outbox', href: '#contact' },
  ];

  // Map skill icon strings to actual Lucide components
  const renderSkillIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Atom':
        return <Code className={className} />;
      case 'Layers':
        return <Settings2 className={className} />;
      case 'Palette':
        return <Award className={className} />;
      case 'Zap':
        return <Terminal className={className} />;
      case 'Database':
        return <Database className={className} />;
      case 'Server':
        return <Database className={className} />;
      case 'Cpu':
        return <Laptop className={className} />;
      case 'Binary':
        return <Brain className={className} />;
      case 'Variable':
        return <Code className={className} />;
      case 'Laptop':
        return <Laptop className={className} />;
      case 'Smartphone':
        return <Phone className={className} />;
      default:
        return <Code className={className} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Background ambient light effects from Vibrant Palette */}
      <div className="absolute top-[5%] left-[2%] w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[35%] right-[2%] w-[40rem] h-[40rem] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[8%] left-[5%] w-[30rem] h-[30rem] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Insignia / Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-500 p-0.5 shadow-lg shadow-indigo-500/10 overflow-hidden">
              <img 
                src="/src/assets/images/favicon_1780299437513.png" 
                alt="Mugisha Robert Logo" 
                className="w-full h-full rounded-[10px] object-cover group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display font-black text-sm tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 block">MUGISHA ROBERT</span>
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-bold">// L5 FULLSTACK</span>
            </div>
          </a>

          {/* Desktop Navigation Link row with hover highlights */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            {navigationItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="hover:text-emerald-400 transition-colors py-2 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-indigo-500 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Callouts */}
          <div className="hidden sm:flex items-center gap-4 text-xs font-mono">
            <a 
              href={PERSONAL_BIO.whatsappUrl} 
              target="_blank" 
              referrerPolicy="no-referrer"
              className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 px-4 py-2 rounded-full border border-emerald-500/25 hover:border-transparent transition-all font-bold uppercase tracking-wider"
            >
              <Phone className="w-3.5 h-3.5" /> WhatsApp Direct
            </a>
          </div>

          {/* Mobile responsive toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#070a13] border-b border-slate-800"
            >
              <nav className="px-4 py-4 space-y-2 text-xs font-semibold uppercase tracking-wider">
                {navigationItems.map((item) => (
                  <a 
                    key={item.name} 
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-slate-300 hover:text-cyan-400 py-2.5 px-3 rounded-lg hover:bg-slate-900 transition-all"
                  >
                    {item.name}
                  </a>
                ))}
                
                <div className="pt-4 border-t border-slate-850 px-3 flex flex-col gap-2 font-mono text-xs">
                  <span className="text-slate-500">Fast Diagnostics Hotline:</span>
                  <a 
                    href="tel:0734311902" 
                    className="text-cyan-400 hover:underline flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" /> 0734311902
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Showcase Section */}
      <section className="relative pt-12 pb-20 sm:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className="order-last lg:order-first lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-72 sm:w-85 sm:h-85">
                {/* Decorative rotating orbits */}
                <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-4 rounded-full border border-double border-indigo-500/15 animate-reverse-spin pointer-events-none" />
                
                {/* Neon Backing Glow with Vibrant Palette theme gradients */}
                <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-500 opacity-20 blur-3xl pointer-events-none" />
                
                {/* Real Developer Interface Badge Card */}
                <div className="absolute inset-6 rounded-[2rem] bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between shadow-2xl relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-emerald-450 tracking-widest uppercase font-bold">SYSSTATUS: ACTIVE</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  <div className="space-y-4 my-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src="/src/assets/images/favicon_1780299437513.png" 
                        alt="Mugisha Robert Avatar" 
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800 shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-display font-black tracking-tight text-white text-base">Mugisha Robert</h4>
                        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Level 5 Software Cert</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-slate-800/80 pt-4 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Primary Hub:</span>
                        <span className="text-slate-300 font-bold">Nyamagabe, Rwanda</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Core Engine:</span>
                        <span className="text-emerald-450 font-bold">MERN + NextJS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Logic Core:</span>
                        <span className="text-indigo-400 font-bold">Asymptotic Big O</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850 font-mono text-[9px] text-slate-400 flex items-center justify-between gap-2 overflow-x-auto">
                    <span>$ node --version && pm2 show</span>
                    <span className="text-cyan-400 font-bold">v20.12.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 border border-emerald-500/25 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                <School className="w-3.5 h-3.5" /> Trained at GSNDP CYANIKA
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95]">
                Hello, I am <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">{PERSONAL_BIO.name}</span>
              </h1>

              <p className="text-xs sm:text-sm font-mono text-emerald-400 mt-2 tracking-widest uppercase font-bold flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1.5">
                <span>💻 FULLSTACK DEVELOPER (LEVEL 5)</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span>🧮 MATH & ALGORITHMIC THINKER</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span>🔧 ICT DIAGNOSTICIAN</span>
              </p>

              <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {PERSONAL_BIO.tagline} Specially trained through physical and intellectual software development internships, completing Level 3, Level 4, and Level 5 software qualifications.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a 
                  href="#contact" 
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-450 via-cyan-450 to-indigo-500 hover:opacity-90 text-slate-950 font-bold font-display px-8 py-3.5 rounded-full shadow-lg shadow-indigo-500/10 flex items-center justify-center gap-2 uppercase tracking-wider text-xs transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Message Robert <ChevronRight className="w-4 h-4 text-slate-950" />
                </a>

                <a 
                  href="#sandbox" 
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-cyan-400 px-8 py-3.5 rounded-full border border-slate-805 flex items-center justify-center gap-2 transition-colors font-bold uppercase tracking-wider text-xs cursor-pointer"
                >
                  <Terminal className="w-4 h-4" /> Code Playground
                </a>
              </div>

              {/* Fast stats list */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8 max-w-md mx-auto lg:mx-0 border-t border-slate-900">
                <div>
                  <div className="text-2xl font-black tracking-tight text-white">GSNDP</div>
                  <div className="text-[10px] uppercase font-mono text-slate-505 font-semibold tracking-wider">CYANIKA Parents</div>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tight text-emerald-400">LEVEL 5</div>
                  <div className="text-[10px] uppercase font-mono text-slate-505 font-semibold tracking-wider">Active Certification</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-2xl font-black tracking-tight text-indigo-400">3x Certs</div>
                  <div className="text-[10px] uppercase font-mono text-slate-505 font-semibold tracking-wider">Accredited Credentials</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* About & Languages Section */}
      <section id="about" className="py-20 bg-slate-900/30 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Bio info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400" />
                <span className="text-xs uppercase font-mono text-emerald-400 font-bold tracking-widest">PERSONAL DOSSIER</span>
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight">
                Crafting Modern Web Apps while Tuning Advanced Algorithmic Logic
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {PERSONAL_BIO.about}
              </p>

              {/* Deep structural highlights of learning */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
                  <h4 className="font-display font-bold text-white text-sm flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-emerald-400" /> Academics Hub
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Trained rigorously inside Nyamagabe district at <strong>GSNDP CYANIKA</strong> which builds students to tackle robust real-world industrial needs.
                  </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl">
                  <h4 className="font-display font-bold text-white text-sm flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-indigo-400" /> Mathematics & Physics
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deeply interested in physical formula equations, numerical computations, and applying computational mathematics into modular software scripts.
                  </p>
                </div>
              </div>
            </div>

            {/* Language proficiency block */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shrink-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-lg font-display font-bold text-white flex items-center gap-2 pb-4 border-b border-slate-800 mb-5">
                <Languages className="w-5 h-5 text-emerald-400" /> Multilingual Capability
              </h3>

              <div className="space-y-4">
                {PORTFOLIO_LANGUAGES.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{lang.code}</span>
                        {lang.name}
                      </span>
                      <span className="font-mono text-emerald-400 font-bold">{lang.level}</span>
                    </div>
                    {/* Visual Slider Bar */}
                    <div className="h-1.5 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 rounded-full" 
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-slate-950 rounded-xl p-3 border border-slate-850 text-[11px] text-slate-450 font-mono leading-relaxed">
                🚀 Multi-language proficiency allows Robert to communicate effectively with multi-layered national and international clients safely.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Academic Qualifications Timeline & The 3 Certificates */}
      <section id="certificates" className="py-20 select-none bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              INTERNSHIP ACCREDITATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mt-4">
              The 3 Milestone Software Certificates
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Robert validated his software knowledge across continuous stages of evaluation and hardware/software internship projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO_CERTIFICATES.map((cert) => (
              <div 
                key={cert.id} 
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-emerald-450/60 transition-all flex flex-col justify-between relative overflow-hidden group shadow-md"
              >
                {/* Visual marker from Vibrant Palette */}
                <div className="absolute top-0 right-0 p-3 bg-indigo-500/10 text-indigo-400 font-mono text-[10px] font-bold rounded-bl-2xl border-l border-b border-slate-800/80 uppercase tracking-wider">
                  {cert.level}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="p-2.5 bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
                      <Award className="w-5 h-5 animate-pulse" />
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold tracking-widest">{cert.year} Certification</span>
                  </div>

                  <h3 className="text-base font-display font-bold text-white group-hover:text-emerald-450 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {cert.description}
                  </p>

                  {/* Skills validated pill group */}
                  <div className="border-t border-slate-850 pt-4">
                    <span className="text-[9px] font-mono font-bold text-slate-500 uppercase block mb-2 tracking-widest">Validated Competencies</span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsValidated.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="bg-slate-950 border border-slate-800/80 rounded px-2.5 py-1 text-[9px] font-mono text-slate-300 font-semibold"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-850 flex items-center justify-between text-[11px] font-mono text-slate-450">
                  <span className="flex items-center gap-1.5">
                    <School className="w-3.5 h-3.5 text-slate-500" /> GSNDP CYANIKA
                  </span>
                  <span className="text-emerald-400 font-bold tracking-wider">WDA Accredited</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Tech Skills Dashboard Grid */}
      <section id="skills" className="py-20 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
                ENGINE CAPABILITY MATRIX
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mt-2">
                Familiarity Network & Skill Graph
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mt-1.5 leading-normal">
                Filtering Robert's software architecture capabilities. Select any sub-category pill below to filter active grids.
              </p>
            </div>

            {/* Filter Pill Row from Vibrant Palette */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', name: 'All Stack' },
                { id: 'frontend', name: 'Frontend React' },
                { id: 'database', name: 'Databases' },
                { id: 'problem-solving', name: 'Logic & Math' },
                { id: 'hardware', name: 'Troubleshooting' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveTab(pill.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                    activeTab === pill.id
                      ? 'bg-gradient-to-r from-emerald-450 via-cyan-450 to-indigo-500 text-slate-950 shadow-md shadow-emerald-500/10'
                      : 'bg-slate-900 text-slate-450 hover:text-white border border-slate-800'
                  }`}
                >
                  {pill.name}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout of filtered skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  layout
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-3xl p-6 transition-all flex items-start gap-4 shadow-sm"
                >
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-emerald-400 shrink-0">
                    {renderSkillIcon(skill.iconName, 'w-5 h-5')}
                  </div>

                  <div className="space-y-1 bg-transparent flex-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white tracking-wide">{skill.name}</span>
                      <span className="font-mono text-emerald-400 font-bold">{skill.proficiency}%</span>
                    </div>
                    {/* Vibrant Palette gradient microbar */}
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden border border-slate-950">
                      <div className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light pt-2">
                       {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Algorithmic Logic Playground Panel Component */}
      <section id="sandbox" className="py-20 select-none bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-400 font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">
              TEST BENCH SYSTEMS
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-4">
              The Interactive Algorithmic Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2 leading-relaxed">
              Robert possesses a strict theoretical model of algorithmics. Execute real-time calculation matrices below to inspect loop cycles, memory outputs, and diagnostics code.
            </p>
          </div>

          {/* Real sandbox widget */}
          <AlgoSandbox />

        </div>
      </section>

      {/* Hardware & Diagnostics support services panel Component */}
      <section id="support" className="py-20 bg-slate-900/30 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              HARDWARE & NETWORKING
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-4">
              Mugisha Robert's ICT Support Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Can resolve any bug inside your computers, workstation software, cabling networks, and smartphone electronic components.
            </p>
          </div>

          {/* Service widget */}
          <IctDiagnostics />

        </div>
      </section>

      {/* Message and verified sending interface */}
      <section id="contact-hub" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold bg-cyan-500/10 px-4 py-1.5 rounded-full border border-cyan-500/20">
              DISPATCH CENTRAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white mt-4">
              Verify Credentials & Transmit Mail
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Robert built an interactive anti-spam router. Verify your syntax legitimacy and send custom requests safely.
            </p>
          </div>

          <ContactHub />

        </div>
      </section>

      {/* Footer detailing physical locations, social accounts and contact details */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-405 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1 Logo and Location */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-400 via-cyan-400 to-indigo-500 p-0.5">
                  <div className="w-full h-full rounded-[6px] bg-slate-950 flex items-center justify-center font-display font-black text-xs text-white">
                    MR
                  </div>
                </div>
                <span className="font-display font-black text-white text-sm">MUGISHA ROBERT</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                Certified Level 5 Software Engineer providing state-of-the-art web application architecture and precise hardware diagnostics.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Nyamagabe, Rwanda
              </div>
            </div>

            {/* Column 2 Direct Hotlines */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">// Fast Channels</h4>
              <div className="space-y-2 text-xs">
                <a href="tel:0734311902" className="flex items-center gap-2 hover:text-[#34d399] font-mono transition-colors">
                  <Phone className="w-3.5 h-3.5 text-slate-600" /> 0734311902 (Direct Mobile)
                </a>
                <a href={PERSONAL_BIO.whatsappUrl} target="_blank" className="flex items-center gap-2 hover:text-emerald-400 font-mono transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> +250 734311902 (WA)
                </a>
                <a href={`mailto:${PERSONAL_BIO.email}`} className="flex items-center gap-2 hover:text-cyan-400 font-mono transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-600" /> robertmugisha908@gmail.com
                </a>
              </div>
            </div>

            {/* Column 3 Social Media Network Handles with explicit links */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">// Social Handles</h4>
              <div className="space-y-2 text-xs">
                <a href={PERSONAL_BIO.instagramUrl} target="_blank" className="flex items-center gap-2 hover:text-emerald-450 transition-colors">
                  <Instagram className="w-3.5 h-3.5 text-slate-600" /> instagram: m__robert12
                </a>
                <a href={PERSONAL_BIO.facebookUrl} target="_blank" className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                  <Facebook className="w-3.5 h-3.5 text-slate-600" /> facebook: Ro Bert
                </a>
                <a href={PERSONAL_BIO.linkedinUrl} target="_blank" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600" /> Linkedin: MUGISHA Robert
                </a>
              </div>
            </div>

            {/* Column 4 Educational Background and details */}
            <div className="space-y-3.5 text-xs text-slate-400 leading-relaxed font-light">
              <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">// Education Core</h4>
              <div className="p-4 bg-slate-900 rounded-3xl border border-slate-805 font-mono text-[10px] space-y-1.5 text-slate-400 shadow-sm">
                <div className="font-bold text-white">📚 GSNDP CYANIKA</div>
                <div className="text-slate-500">📍 Nyamagabe District</div>
                <div className="text-emerald-450 font-bold">🏫 Rwanda TVET Level 5</div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div>
              © 2026 MUGISHA ROBERT. All rights reserved.
            </div>
            <div className="text-[10px] text-slate-650 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Level 5 Verified Technical Core
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
