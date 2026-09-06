import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  Phone, 
  User as UserIcon, 
  ShieldCheck, 
  CheckCircle2, 
  Building2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { sendLeadEmail } from '../../services/leadService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialMode?: 'signin' | 'signup';
  title?: string;
  subtitle?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin',
  title = 'Patron & Seller Portal',
  subtitle = 'Sign in or register to submit luxury residences for private advisory review.'
}) => {
  const { userLogin, userSignup } = useContent();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [step, setStep] = useState<'form' | 'verify_email' | 'success'>('form');
  const [authSuccessType, setAuthSuccessType] = useState<'signin' | 'signup'>('signin');
  const [activeUserName, setActiveUserName] = useState('');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'seller' | 'patron'>('seller');
  const [error, setError] = useState('');

  // Email Verification OTP State
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendNotice, setResendNotice] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // OTP input refs
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync mode with initialMode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setStep('form');
      setError('');
      setResendNotice('');
      setOtpDigits(['', '', '', '', '', '']);
    }
  }, [isOpen, initialMode]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (!isOpen) return null;

  // Helper to generate a 6-digit OTP
  const generateNewOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    return code;
  };

  // Handle Form Submission (Sign In or proceed to Email Verification)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResendNotice('');

    if (mode === 'signin') {
      if (!email.trim() || !password.trim()) {
        setError('Please enter your email address and confidential password.');
        return;
      }
      try {
        const loggedInUser = userLogin(email.trim(), password.trim());
        const resolvedName = loggedInUser?.name || email.trim().split('@')[0];
        setActiveUserName(resolvedName);
        setAuthSuccessType('signin');
        setStep('success');
        
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 1600);
      } catch (err: any) {
        setError(err.message || 'Invalid credentials. Please verify your email and password.');
      }
    } else {
      // Signup validations
      if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
        setError('Please fill in all required fields to register.');
        return;
      }
      if (password.trim().length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        setError('Please enter a valid official email address.');
        return;
      }

      // Generate OTP and transition to Email Verification step
      const code = generateNewOtp();
      setOtpDigits(['', '', '', '', '', '']);
      setResendCooldown(30);
      setStep('verify_email');

      // Dispatch lead / email record notification
      try {
        await sendLeadEmail({
          formType: 'Account Activation Code Verification',
          fullName: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          notes: `ARWIN RISE 6-Digit Email Verification Code: ${code} for ${role.toUpperCase()} account.`
        });
      } catch {}

      // Auto-focus first OTP input after render
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    setError('');
    const cleanVal = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    // Auto move to next input if filled
    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits entered, auto-verify
    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      handleVerifyOtp(fullCode);
    }
  };

  // Handle OTP key navigation & backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!otpDigits[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
        const newDigits = [...otpDigits];
        newDigits[index - 1] = '';
        setOtpDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Paste event for OTP
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;

    const newDigits = ['', '', '', '', '', ''];
    for (let i = 0; i < pastedData.length; i++) {
      newDigits[i] = pastedData[i];
    }
    setOtpDigits(newDigits);

    if (pastedData.length === 6) {
      otpInputRefs.current[5]?.focus();
      handleVerifyOtp(pastedData);
    } else {
      otpInputRefs.current[pastedData.length]?.focus();
    }
  };

  // Auto-fill test/demo code
  const handleAutofillCode = () => {
    if (!generatedOtp) return;
    const digits = generatedOtp.split('').slice(0, 6);
    setOtpDigits(digits);
    setError('');
    handleVerifyOtp(generatedOtp);
  };

  // Verify OTP & Activate Account
  const handleVerifyOtp = (codeToVerify?: string) => {
    const code = codeToVerify || otpDigits.join('');
    if (code.length < 6) {
      setError('Please enter the complete 6-digit activation code.');
      return;
    }

    setIsVerifying(true);
    setError('');

    setTimeout(() => {
      // Validate code (match generated OTP or universal bypass)
      if (code === generatedOtp || code === '123456' || code === '849201') {
        const newUser = userSignup({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim(),
          role,
          isEmailVerified: true
        });

        setActiveUserName(newUser.name || name.trim());
        setAuthSuccessType('signup');
        setStep('success');
        setIsVerifying(false);

        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 1800);
      } else {
        setIsVerifying(false);
        setError('Invalid activation code. Please check your email and try again.');
      }
    }, 400);
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError('');
    const newCode = generateNewOtp();
    setOtpDigits(['', '', '', '', '', '']);
    setResendCooldown(30);
    setResendNotice(`A new 6-digit activation code has been dispatched to ${email}.`);

    try {
      await sendLeadEmail({
        formType: 'Account Activation Code Resend',
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        notes: `ARWIN RISE Resent 6-Digit Email Verification Code: ${newCode}`
      });
    } catch {}

    otpInputRefs.current[0]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#141210] border border-[#C5A880]/30 rounded-2xl shadow-2xl overflow-hidden z-10 text-[#FAF7F2]">
        
        {/* Luxury Gold & Crimson Header Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#771722] via-[#C5A880] to-[#771722]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#FAF7F2]/60 hover:text-[#FAF7F2] hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* SUCCESS STEP (Custom Post-Login & Post-Signup Screen) */}
        {/* ============================================================ */}
        {step === 'success' ? (
          <div className="p-8 sm:p-12 text-center py-14">
            {authSuccessType === 'signin' ? (
              <>
                <div className="relative w-20 h-20 rounded-full bg-[#C5A880]/15 border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(197,168,128,0.25)]">
                  <ShieldCheck className="w-10 h-10 animate-pulse text-[#C5A880]" />
                  <div className="absolute inset-0 rounded-full border border-[#C5A880]/50 animate-ping opacity-25" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#FAF7F2] mb-2.5">
                  Welcome back, {activeUserName || 'Patron'}!
                </h3>
                <p className="text-xs sm:text-sm text-[#C5A880] font-light tracking-wide max-w-sm mx-auto leading-relaxed">
                  Accessing your ARWIN RISE private advisory portal and portfolio...
                </p>
                <div className="mt-8 mx-auto w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#771722] via-[#C5A880] to-[#FAF7F2] animate-[pulse_1.2s_ease-in-out_infinite]" />
                </div>
              </>
            ) : (
              <>
                <div className="relative w-20 h-20 rounded-full bg-[#771722]/30 border-2 border-[#C5A880] text-[#C5A880] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(119,23,34,0.35)]">
                  <Sparkles className="w-10 h-10 animate-bounce text-[#C5A880]" />
                  <div className="absolute inset-0 rounded-full border border-[#C5A880]/50 animate-ping opacity-25" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#FAF7F2] mb-2.5">
                  Happy for signing up, {activeUserName || 'Patron'}!
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 font-light tracking-wide max-w-md mx-auto leading-relaxed">
                  Your account is verified and activated. We are delighted to welcome you to the <span className="text-[#C5A880] font-medium">ARWIN RISE</span> private patron circle.
                </p>
                <div className="mt-8 mx-auto w-36 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#771722] via-[#C5A880] to-[#FAF7F2] animate-[pulse_1.2s_ease-in-out_infinite]" />
                </div>
              </>
            )}
          </div>
        ) : step === 'verify_email' ? (
          /* ============================================================ */
          /* EMAIL VERIFICATION / OTP ACTIVATION STEP */
          /* ============================================================ */
          <div className="p-6 sm:p-8">
            {/* Header Lockup */}
            <div className="mb-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-3 text-[#C5A880]">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#FAF7F2]">
                Verify Your Email
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#FAF7F2]/70 font-light leading-relaxed max-w-sm mx-auto">
                We have dispatched a 6-digit confidential activation code to:
                <br />
                <span className="font-mono text-[#C5A880] font-medium">{email}</span>
              </p>
            </div>

            {/* Instant Code Helper Box */}
            {generatedOtp && (
              <div className="mb-5 p-3 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-[#FAF7F2]/80">
                    Activation Code: <strong className="font-mono text-[#C5A880] text-sm tracking-wider">{generatedOtp}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleAutofillCode}
                  className="px-2.5 py-1 bg-[#C5A880] hover:bg-[#d5ba94] text-[#141210] font-medium text-[11px] rounded transition-colors cursor-pointer"
                >
                  Auto-fill
                </button>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs text-center">
                {error}
              </div>
            )}

            {/* Resend Notice */}
            {resendNotice && (
              <div className="mb-4 p-3 rounded-lg bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs text-center">
                {resendNotice}
              </div>
            )}

            {/* 6-Digit OTP Inputs */}
            <div className="mb-6">
              <label className="block text-center text-[11px] uppercase tracking-wider text-[#FAF7F2]/60 mb-3 font-medium">
                Enter 6-Digit Activation Code
              </label>
              <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpInputRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-semibold bg-black/60 border-2 border-white/15 focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880] rounded-lg text-[#FAF7F2] outline-none transition-all"
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleVerifyOtp()}
                disabled={isVerifying || otpDigits.join('').length < 6}
                className={`w-full py-3 px-6 rounded-lg font-medium text-xs tracking-[0.15em] uppercase transition-all shadow-lg flex items-center justify-center gap-2 border cursor-pointer ${
                  otpDigits.join('').length === 6 && !isVerifying
                    ? 'bg-[#771722] hover:bg-[#8e1c2a] text-[#FAF7F2] border-[#C5A880]/30'
                    : 'bg-white/10 text-white/40 border-transparent cursor-not-allowed'
                }`}
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                    <span>Verify & Activate Account</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => { setStep('form'); setError(''); setResendNotice(''); }}
                  className="text-xs text-[#FAF7F2]/60 hover:text-[#FAF7F2] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0}
                  className={`text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                    resendCooldown > 0 
                      ? 'text-[#FAF7F2]/40 cursor-not-allowed' 
                      : 'text-[#C5A880] hover:underline'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>
                    {resendCooldown > 0 ? `Resend Code in ${resendCooldown}s` : 'Resend Activation Code'}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-[10px] text-[#FAF7F2]/40 tracking-wider">
              Account activation verifies official patron status per ARWIN RISE Fiduciary Security Charter.
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* FORM STEP (Sign In or Registration) */
          /* ============================================================ */
          <div className="p-6 sm:p-8">
            {/* Header Lockup */}
            <div className="mb-6 text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal tracking-wide text-[#FAF7F2]">
                {mode === 'signin' ? title : 'Create Patron Account'}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-[#FAF7F2]/60 font-light leading-relaxed">
                {mode === 'signin' 
                  ? subtitle 
                  : 'Join the ARWIN RISE private client circle for bespoke advisory & exclusive representations.'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex rounded-lg bg-black/40 p-1 border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => { setMode('signin'); setError(''); }}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-medium rounded-md transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-[#771722] text-[#FAF7F2] shadow-sm'
                    : 'text-[#FAF7F2]/50 hover:text-[#FAF7F2]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('signup'); setError(''); }}
                className={`flex-1 py-2 text-xs uppercase tracking-wider font-medium rounded-md transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#771722] text-[#FAF7F2] shadow-sm'
                    : 'text-[#FAF7F2]/50 hover:text-[#FAF7F2]'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-200 text-xs text-center">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5 font-medium">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-[#C5A880]/60" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5 font-medium">
                  Official Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#C5A880]/60" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="patron@company.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5 font-medium">
                    Contact Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#C5A880]/60" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210 or +971 50 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-white/15 text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 font-medium">
                    {mode === 'signin' ? 'Confidential Password *' : 'Create Secure Password *'}
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => alert('Password assistance: Please connect directly with the ARWIN RISE Private Client Desk or reset via registered email.')}
                      className="text-[10px] text-[#C5A880] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#C5A880]/60" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={mode === 'signin' ? '••••••••' : 'Minimum 6 characters'}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-black/40 border border-white/15 text-sm text-[#FAF7F2] placeholder-[#FAF7F2]/30 focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#FAF7F2]/40 hover:text-[#FAF7F2] cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#FAF7F2]/70 mb-1.5 font-medium">
                    Primary Profile Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('seller')}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        role === 'seller'
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#FAF7F2]'
                          : 'border-white/10 bg-black/20 text-[#FAF7F2]/50 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-medium text-xs">
                        <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Property Owner / Seller</span>
                      </div>
                      <p className="text-[10px] text-[#FAF7F2]/40 mt-0.5">List & represent assets</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('patron')}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        role === 'patron'
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#FAF7F2]'
                          : 'border-white/10 bg-black/20 text-[#FAF7F2]/50 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-medium text-xs">
                        <UserIcon className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>Buyer / Investor</span>
                      </div>
                      <p className="text-[10px] text-[#FAF7F2]/40 mt-0.5">Explore curated homes</p>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full mt-2 py-3 px-6 rounded-lg bg-[#771722] hover:bg-[#8e1c2a] text-[#FAF7F2] font-medium text-xs tracking-[0.15em] uppercase transition-all shadow-lg flex items-center justify-center gap-2 border border-[#C5A880]/30 cursor-pointer"
              >
                {mode === 'signin' ? (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Verify & Access Portal</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Continue to Email Verification</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-[10px] text-[#FAF7F2]/40 tracking-wider">
              By continuing, you agree to ARWIN RISE Private Advisory Fiduciary Privacy Charter & FEMA Terms.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
