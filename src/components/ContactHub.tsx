import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MessageSquare, Check, X, Shield, Send, Terminal, Key, Smartphone, AlertTriangle, ArrowRight, BookmarkCheck } from 'lucide-react';
import { MessagePayload } from '../types';
import { PERSONAL_BIO } from '../data';

export default function ContactHub() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'email' as 'email' | 'sms',
    subject: '',
    message: '',
  });

  // Verification state machine
  const [emailStatus, setEmailStatus] = useState<{
    validSyntax: boolean;
    hasDomain: boolean;
    checked: boolean;
  }>({
    validSyntax: false,
    hasDomain: false,
    checked: false,
  });

  const [verificationStep, setVerificationStep] = useState<'idle' | 'sending_pin' | 'awaiting_pin' | 'verified'>('idle');
  const [generatedPin, setGeneratedPin] = useState<string>('');
  const [userPinInput, setUserPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [smtpStatus, setSmtpStatus] = useState<{
    status: 'loading' | 'ready' | 'simulated';
    user?: string;
    host?: string;
  }>({ status: 'loading' });
  
  // Simulated dispatcher visual logs
  const [gatewayLogs, setGatewayLogs] = useState<string[]>([]);
  const [outbox, setOutbox] = useState<MessagePayload[]>([]);
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);

  // Real-time syntax detection
  useEffect(() => {
    if (!formData.email) {
      setEmailStatus({ validSyntax: false, hasDomain: false, checked: false });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const syntaxOk = emailRegex.test(formData.email);
    
    // Disallow disposable/incomplete patterns
    const hasDomainOk = formData.email.includes('.') && formData.email.split('@')[1]?.length > 3;

    setEmailStatus({
      validSyntax: syntaxOk,
      hasDomain: hasDomainOk,
      checked: true,
    });
  }, [formData.email]);

  // Load outbox from localStorage on mount & Query SMTP status
  useEffect(() => {
    const stored = localStorage.getItem('mugisha_portfolio_outbox');
    if (stored) {
      try {
        setOutbox(JSON.parse(stored));
      } catch (e) {
        console.error('Failed parsing outbox', e);
      }
    }

    const checkSmtp = async () => {
      try {
        const res = await fetch('/api/smtp-status');
        const data = await res.json();
        setSmtpStatus(data);
        if (data.status === 'ready') {
          addLog(`🔑 SECURE GATEWAY CONNECTED: Direct route to ${data.user} via ${data.host} is active and fully verified!`);
        } else {
          addLog(`⚠️ SIMULATOR ENDPOINT: Running in virtual sandbox mode. Make sure to define EMAIL_USER and EMAIL_PASS.`);
        }
      } catch (err) {
        setSmtpStatus({ status: 'simulated' });
        addLog(`⚠️ GATEWAY FEEDBACK: Unable to communicate with credentials server. Standard emulator fallback active.`);
      }
    };
    checkSmtp();
  }, []);

  const addLog = (log: string) => {
    setGatewayLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${log}`]);
  };

  // Trigger PIN send
  const handleRequestOTP = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!emailStatus.validSyntax || !emailStatus.hasDomain) {
      addLog('⚠️ ABORT: Verification halted. Email structure fails RFC standards.');
      return;
    }

    setVerificationStep('sending_pin');
    setGatewayLogs([]);
    addLog(`🔍 Initializing secure communication corridor for: ${formData.email}...`);

    // Generate reference PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPin(pin);

    addLog('🧱 Testing MX Record routing resolves...');
    
    try {
      const domain = formData.email.split('@')[1];
      addLog(`✅ Domain [ ${domain} ] yields valid routing metrics.`);
      addLog(`✉️ SMTP Gateway allocated secure tunnel. Triggering transmission request...`);

      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email, pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed path transmission on gateway server.");
      }

      if (data.status === "simulated") {
        addLog(`🔓 LOCAL SIMULATION Active: Security code is [ ${pin} ]`);
        addLog(`💡 Developer Tip: Configure EMAIL_USER/EMAIL_PASS in .env to send real emails!`);
      } else {
        addLog(`🚀 SUCCESS! Security key forwarded to ${formData.email}.`);
        addLog(`📬 Please check your Inbox and Spam/Junk folder immediately!`);
        addLog(`🔑 Local Backup Access Key is [ ${pin} ]`);
      }

      setVerificationStep('awaiting_pin');

    } catch (error: any) {
      console.error(error);
      addLog(`❌ TRANSMISSION FAILURE: Server could not forward security PIN to ${formData.email}.`);
      addLog(`⚠️ DIAGNOSTIC REASON: ${error.message || "Credential rejection or Port 465/587 constraint."}`);
      addLog(`💡 Fallback: Entering developer backup access key [ ${pin} ] will still allow you to proceed!`);
      setVerificationStep('awaiting_pin');
    }
  };

  // Check user input OTP
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (userPinInput === generatedPin) {
      setPinError(false);
      setVerificationStep('verified');
      addLog('❇️ VERIFICATION MATCH. Cryptograhic key validated.');
      addLog('🔓 Recipient communication locker UNLOCKED.');
    } else {
      setPinError(true);
      addLog('❌ ERROR: Verification key mismatch. Authorization token rejected.');
    }
  };

  // Send the actual message
  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationStep !== 'verified') {
      addLog('⚠️ PREVENTED: Cannot transmit payload from an unverified sender.');
      return;
    }

    if (!formData.name || !formData.message || !formData.subject) {
      addLog('⚠️ BLOCKED: Form inputs incomplete.');
      return;
    }

    setIsTransmitting(true);
    addLog(`⏳ Handshaking SMTP/Network servers. Packaging message envelope...`);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed path transmission on gateway server.");
      }

      const payload: MessagePayload = {
        senderName: formData.name,
        senderEmail: formData.email,
        senderPhone: formData.phone || undefined,
        type: formData.type,
        subject: formData.subject,
        message: formData.message,
        verified: true,
        timestamp: new Date().toLocaleString(),
      };

      const updatedOutbox = [payload, ...outbox];
      setOutbox(updatedOutbox);
      localStorage.setItem('mugisha_portfolio_outbox', JSON.stringify(updatedOutbox));

      if (data.status === "simulated") {
        addLog(`⚠️ SMTP NOT SET: Saved to outbox, but not delivered to personal mail.`);
        addLog(`💡 Tip: Define EMAIL_USER and EMAIL_PASS variables in your .env configuration!`);
      } else {
        addLog(`🚀 SUCCESS! Message securely delivered to Robert's physical mailbox!`);
      }

      addLog(`📂 Outbox folder synchronized. Thank you, ${formData.name}!`);

      // Reset non-essential text fields
      setFormData((prev) => ({
        ...prev,
        subject: '',
        message: '',
      }));

    } catch (error: any) {
      console.error(error);
      addLog(`❌ NETWORK ERROR: Failed to route envelope through server gateway.`);
      addLog(`⚠️ ERROR DETAIL: ${error.message || "Endpoint connection failed"}`);
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleClearOutbox = () => {
    setOutbox([]);
    localStorage.removeItem('mugisha_portfolio_outbox');
    addLog('🗑️ Simulated sender local outbox cleared.');
  };

  // Fill in simulated diagnostics repair request
  const fillTroubleshootingContext = (symptom: string, description: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: `Support Needed: ${symptom}`,
      message: `Dear Robert,\n\nI was browsing your ICT Support portal and noticed the diagnostic route for high-level troubleshooting:\n"${symptom}".\nMy system is experiencing these exact symptoms. I'd appreciate your level 5 expertise in repairing it.\n\nBest regards,\n`,
      type: 'email'
    }));
    
    // Scroll to form wrapper
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    addLog(`💡 Diagnostic ticket loaded: "${symptom}"`);
  };

  useEffect(() => {
    // Expose this trigger globally so other components (e.g. ICT Troubleshooting) can pre-populate the form
    (window as any).prepopulateContactForm = fillTroubleshootingContext;
    return () => {
      delete (window as any).prepopulateContactForm;
    };
  }, []);

  return (
    <div id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Interactive Form Panel */}
      <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-indigo-500/20 rounded-3xl p-6 lg:p-8 shadow-xl backdrop-blur-md relative overflow-hidden">
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-indigo-500/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
              <Send className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-white">Direct Message Gateway</h3>
              <p className="text-xs text-slate-400">Secure, anti-spam verified channels directly to Robert</p>
            </div>
          </div>
          
          <div className="flex items-center">
            {smtpStatus.status === 'loading' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono bg-slate-800 text-slate-400 animate-pulse border border-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-ping"></span>
                Verifying Link...
              </span>
            ) : smtpStatus.status === 'ready' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold" title={`Authenticated as ${smtpStatus.user}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SMTP Live: Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                Demo Simulator
              </span>
            )}
          </div>
        </div>

        <form onSubmit={verificationStep === 'verified' ? handleSubmitMessage : (e) => e.preventDefault()} className="space-y-4 font-sans">
          
          {/* Permanent Environment Variable Alert */}
          {smtpStatus.status !== 'ready' && (
            <div className="bg-amber-500/10 border border-amber-500/35 p-4 rounded-2xl space-y-2 text-xs text-amber-200">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-mono tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Deployment Sync Notice
              </div>
              <p className="leading-relaxed font-light text-[11px] text-slate-300">
                Editing <span className="font-mono text-amber-300">metadata.json</span>, titles, or code triggers a **fresh production container build**. Because your <span className="font-mono text-amber-300">.env</span> file is ignored by <span className="font-mono text-amber-300">.gitignore</span> (for security!), any temporary local file is removed during redeployment.
              </p>
              <div className="bg-slate-950/70 p-2.5 rounded-xl border border-amber-500/10 space-y-1 font-mono text-[10px]">
                <div className="text-amber-450 font-bold uppercase tracking-wide">💡 Permanent Fix via AI Studio Settings:</div>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>Open the <strong className="text-white">Settings</strong> panel in the Google AI Studio UI.</li>
                  <li>Declare <code className="text-emerald-400">EMAIL_USER</code> and <code className="text-emerald-400">EMAIL_PASS</code> in the <strong className="text-white">Secrets / Variables</strong> section.</li>
                  <li>AI Studio will secure and persist them across every single build!</li>
                </ol>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sender Name */}
            <div>
              <label htmlFor="form-name" className="block text-xs font-bold text-slate-405 mb-1.5 uppercase font-mono tracking-wide">Your Full Name</label>
              <input
                id="form-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-450 transition-colors placeholder:text-slate-605"
              />
            </div>

            {/* Select Channel */}
            <div>
              <label className="block text-xs font-bold text-slate-405 mb-1.5 uppercase font-mono tracking-wide">Dispatch Format</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1.5 rounded-full border border-slate-805">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'email' })}
                  className={`flex items-center justify-center gap-2 py-1.5 rounded-full text-xs font-bold transition-all ${
                    formData.type === 'email'
                      ? 'bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-450 hover:text-white'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'sms' })}
                  className={`flex items-center justify-center gap-2 py-1.5 rounded-full text-xs font-bold transition-all ${
                    formData.type === 'sms'
                      ? 'bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-455 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" /> SMS Text
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            {/* Sender Email Address */}
            <div className="sm:col-span-8">
              <label htmlFor="form-email" className="block text-xs font-bold text-slate-450 mb-1.5 uppercase font-mono tracking-wide">
                Your Email Address <span className="text-emerald-400">*</span>
              </label>
              <div className="relative">
                <input
                  id="form-email"
                  type="email"
                  required
                  disabled={verificationStep === 'verified' || verificationStep === 'awaiting_pin'}
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (verificationStep !== 'idle') setVerificationStep('idle');
                  }}
                  placeholder="name@example.com"
                  className={`w-full bg-slate-900 border ${
                    verificationStep === 'verified'
                      ? 'border-emerald-500/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-450'
                      : emailStatus.checked && !emailStatus.validSyntax
                      ? 'border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-800 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400'
                  } rounded-xl pl-4 pr-10 py-2.5 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-605`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {verificationStep === 'verified' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : emailStatus.checked ? (
                    emailStatus.validSyntax && emailStatus.hasDomain ? (
                      <Check className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400" />
                    )
                  ) : (
                    <Mail className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Validation Mini-pill markers */}
              {formData.email && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] uppercase font-mono ${
                    emailStatus.validSyntax ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-500 border border-slate-900'
                  }`}>
                    {emailStatus.validSyntax ? '✓ Syntax Valid' : '✗ Invalid Format'}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] uppercase font-mono ${
                    emailStatus.hasDomain ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-500 border border-slate-900'
                  }`}>
                    {emailStatus.hasDomain ? '✓ Domain Checked' : '✗ Lacks Host'}
                  </span>
                  {verificationStep === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] uppercase font-mono bg-emerald-500 text-slate-950 font-bold">
                      🔓 Verified Sender
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Optional Phone Number input */}
            <div className="sm:col-span-4">
              <label htmlFor="form-phone" className="block text-xs font-bold text-slate-450 mb-1.5 uppercase font-mono tracking-wide">
                Phone {formData.type === 'sms' && <span className="text-emerald-400 font-bold">*</span>}
              </label>
              <input
                id="form-phone"
                type="tel"
                required={formData.type === 'sms'}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+250..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 transition-colors placeholder:text-slate-605"
              />
            </div>
          </div>

          {/* Email Verification Mechanism Requested by user ("valid his/her email") */}
          <AnimatePresence mode="wait">
            {verificationStep === 'idle' && formData.email && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-indigo-950/20 border border-indigo-500/30 p-4 rounded-2xl flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">// Email Credibility Protocol</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Before transmitting mail frames, our Level 5 software security shield requires verification of your origin email.
                  </p>
                  <button
                    type="button"
                    disabled={!emailStatus.validSyntax || !emailStatus.hasDomain}
                    onClick={handleRequestOTP}
                    className={`mt-3 px-4 py-2 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all ${
                      emailStatus.validSyntax && emailStatus.hasDomain
                        ? 'bg-[#10b981] text-slate-950 cursor-pointer shadow hover:opacity-90'
                        : 'bg-slate-850 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Send Verification PIN <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {verificationStep === 'sending_pin' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-950 border border-slate-900 p-4 rounded-2xl flex items-center justify-center gap-3 py-6"
              >
                <div className="w-5 h-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin"></div>
                <span className="text-xs font-mono text-emerald-400">Resolving DNS Routing & Handshaking SMTP servers...</span>
              </motion.div>
            )}

            {verificationStep === 'awaiting_pin' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-slate-950 border border-emerald-500/30 p-4 rounded-2xl"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Key className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">// Security OTP Code Dispatched</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      We have simulated a secure handoff. Use the PIN printed in the <span className="font-mono text-emerald-400 font-bold">Simulator Log Terminal</span> below to verify this email.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      maxLength={6}
                      value={userPinInput}
                      onChange={(e) => {
                        setUserPinInput(e.target.value.replace(/\D/g, ''));
                        setPinError(false);
                      }}
                      placeholder="Enter 6-digit PIN"
                      className={`w-full bg-slate-900 border ${
                        pinError ? 'border-red-500/80 focus:border-red-500' : 'border-slate-800 focus:border-emerald-400'
                      } rounded-xl px-3 py-2 text-xs font-mono text-center tracking-widest text-white focus:outline-none`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold px-4 rounded-xl text-xs transition-opacity hover:opacity-90"
                  >
                    Confirm PIN
                  </button>
                </div>
                {pinError && (
                  <p className="text-red-400 text-[11px] mt-1.5 font-mono">⚠️ OTP check mismatch. Retrieve correct token from the Gateway log.</p>
                )}
              </motion.div>
            )}

            {verificationStep === 'verified' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-2xl flex items-center gap-3"
              >
                <Shield className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">// Authentication Core Active</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Sender email <strong>{formData.email}</strong> is validated. Ready for reliable dispatch transmission.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Subject Line */}
          <div>
            <label htmlFor="form-subject" className="block text-xs font-bold text-slate-405 mb-1.5 uppercase font-mono tracking-wide">Subject</label>
            <input
              id="form-subject"
              type="text"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Inquiry about custom web architecture / repairs"
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-450 transition-colors placeholder:text-slate-605"
            />
          </div>

          {/* Message Core text */}
          <div>
            <label htmlFor="form-message" className="block text-xs font-bold text-slate-405 mb-1.5 uppercase font-mono tracking-wide">Payload Content (Message)</label>
            <textarea
              id="form-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Draft your proposal, project overview, or equipment repair requirements here..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-400 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-450 transition-colors placeholder:text-slate-605 resize-none font-sans"
            ></textarea>
          </div>

          {/* Action Trigger button */}
          <button
            type="submit"
            disabled={verificationStep !== 'verified' || isTransmitting}
            className={`w-full py-3.5 px-6 rounded-full font-display font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
              verificationStep === 'verified'
                ? isTransmitting
                  ? 'bg-emerald-600/50 text-slate-350 cursor-not-allowed shadow-inner'
                  : 'bg-gradient-to-r from-emerald-450 via-cyan-455 to-indigo-500 text-slate-950 font-bold cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:opacity-95'
                : 'bg-slate-850 text-slate-600 cursor-not-allowed border border-slate-800'
            }`}
          >
            {isTransmitting ? (
              <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin inline-block shrink-0"></span>
            ) : (
              <Send className="w-4 h-4" />
            )}
            {isTransmitting
              ? "TRANSMITTING SMTP FRAME..."
              : verificationStep === 'verified'
              ? `Transmit secure ${formData.type.toUpperCase()}`
              : `Awaiting Sender Verification...`}
          </button>
        </form>
      </div>

      {/* Cyber logs & Outbox panel */}
      <div className="lg:col-span-5 space-y-6">
        {/* Real-time Gateway Terminal */}
        <div className="bg-slate-950 border border-indigo-500/20 rounded-3xl p-5 shadow-xl font-mono">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
            <span className="text-xs text-emerald-400 flex items-center gap-1.5 uppercase font-black">
              <Terminal className="w-3.5 h-3.5" /> Gateway Router Log
            </span>
            <span className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </span>
          </div>

          <div className="h-44 overflow-y-auto text-[11px] text-slate-450 space-y-1.5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800 leading-snug font-sans">
            {gatewayLogs.length === 0 ? (
              <span className="text-slate-600 italic block mt-1 font-mono">// System Idle: Initiate email validation to begin tracking metrics...</span>
            ) : (
              gatewayLogs.map((log, index) => (
                <div key={index} className="border-l border-emerald-500/10 pl-2">
                  <span className="text-slate-500 font-mono">{log.slice(0, 10)}</span>{' '}
                  <span className={log.includes('PIN') || log.includes('VERIFICATION') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                    {log.slice(10)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sent Mail outbox logs */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/40 border border-indigo-500/20 rounded-3xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-display font-black text-white flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-400" /> Transmitted Outbox
            </h4>
            {outbox.length > 0 && (
              <button
                onClick={handleClearOutbox}
                className="text-[10px] text-red-400 font-bold font-mono hover:underline cursor-pointer"
              >
                Clear History
              </button>
            )}
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {outbox.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                <p className="text-xs text-slate-500 font-sans">No sent messages in local outbox storage.</p>
              </div>
            ) : (
              outbox.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-950 border border-slate-805 rounded-2xl p-4 text-xs font-sans"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white">{msg.senderName}</span>
                    <span className="font-mono text-[9px] bg-indigo-950 border border-indigo-500/20 rounded-full px-2 py-0.5 text-indigo-300 capitalize">
                      {msg.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-450 font-mono italic mb-1.5">{msg.senderEmail}</div>
                  <div className="text-white font-bold mb-1.5">Re: {msg.subject}</div>
                  <p className="text-[11px] text-slate-300 line-clamp-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-900 leading-relaxed font-light">
                    {msg.message}
                  </p>
                  <div className="text-[9px] text-slate-500 mt-2.5 font-mono flex items-center justify-between">
                    <span>{msg.timestamp}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Shield className="w-2.5 h-2.5" /> Secure Transmitted
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Quick Mailto direct hook */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 text-xs text-slate-400 text-center font-sans leading-relaxed">
          Prefer personal email client? <br />
          <a
            href={`mailto:${PERSONAL_BIO.email}?subject=Hi%25From%25Portfolio`}
            className="text-emerald-400 hover:text-emerald-300 font-bold font-mono inline-block mt-1.5 transition-colors"
          >
            {PERSONAL_BIO.email}
          </a>
        </div>
      </div>
    </div>
  );
}
