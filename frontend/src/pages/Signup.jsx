import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const icons = {
    User: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    Mail: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    ),
    Lock: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    ),
    Eye: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        </svg>
    ),
    EyeOff: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
    ),
    ArrowRight: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    ),
    Monitor: (props) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
    )
};

const SignupPage = () => {
    const [mounted, setMounted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsSubmitting(true);
        try {
            await register(name, email, password);
            navigate('/profile'); // Redirect to profile after successful signup and login
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to register account');
        } finally {
            setIsSubmitting(false);
        }
    };

    const glassStyle = "bg-white/40 backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]";
    const inputStyle = "w-full bg-white/50 backdrop-blur-[8px] [-webkit-backdrop-filter:blur(8px)] border border-white/60 text-[#1D1E20] px-11 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FCD34D] focus:bg-white/80 transition-all shadow-inner placeholder:text-[#9A9B9F]";
    const darkGlassStyle = "bg-[#2A2B2F]/90 backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)] border border-white/10 shadow-[0_12px_40px_0_rgba(0,0,0,0.2)]";

    return (
        <>
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 bg-[#FDFBF7] overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-[#FFF2CB]/80 to-[#FDFBF7]/10 blur-[120px]" />
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#F2F0E9]/60 to-transparent blur-[100px]" />
                <div className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#FFF4D5]/60 to-transparent blur-[120px]" />
            </div>

            <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-stagger-1 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .animate-stagger-2 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-stagger-3 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        
        .float-1 { animation: floatSlow 6s ease-in-out infinite; }
        .float-2 { animation: floatMedium 5s ease-in-out infinite; animation-delay: 1s; }
        .float-3 { animation: floatFast 4s ease-in-out infinite; animation-delay: 2s; }
        
        .hatched-pattern {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 6px,
            rgba(255, 255, 255, 0.6) 6px,
            rgba(255, 255, 255, 0.6) 8px
          );
        }
      `}</style>

            {/* Main Container Wrapper */}
            <div className={`relative z-10 min-h-screen w-full font-sans text-[#1D1E20] flex bg-white/10 backdrop-blur-[4px] [-webkit-backdrop-filter:blur(4px)] border-x border-white/20 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>

                {/* Left Side: Animated Glass Elements */}
                <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center border-r border-white/30 overflow-hidden bg-gradient-to-bl from-white/10 to-transparent">

                    {/* Decorative Large Background Blur Sphere */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#60A5FA]/30 to-[#F2F0E9]/50 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative w-full h-full max-w-[600px] max-h-[800px] flex items-center justify-center animate-stagger-2">

                        {/* Animated Element 1: Top Right Progress Card */}
                        <div className={`absolute top-[20%] right-[10%] w-[240px] rounded-[24px] p-5 flex flex-col float-1 ${glassStyle} z-20`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[14px] font-medium text-[#1D1E20]">Course Progress</span>
                                <span className="text-[20px] font-light leading-none">0%</span>
                            </div>
                            <div className="flex items-center gap-1.5 h-6">
                                <div className="w-[5%] bg-[#60A5FA]/90 h-full rounded-full shadow-inner border border-white/40"></div>
                                <div className="flex-1 bg-[#2A2B2F]/20 h-full rounded-full shadow-inner"></div>
                            </div>
                        </div>

                        {/* Animated Element 2: Center Main Visual (Dashboard Mock) */}
                        <div className={`relative w-[380px] h-[420px] rounded-[32px] p-6 flex flex-col float-2 ${glassStyle} z-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border-white/80`}>
                            <div className="w-full flex justify-between items-center mb-6">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[#5A5B5F] bg-white/60 border border-white shadow-sm`}>
                                    <icons.Monitor className="w-5 h-5" />
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold text-[#2563EB] bg-[#60A5FA]/90 border border-white/60 shadow-sm`}>
                                    Start Journey
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mb-8">
                                <span className="text-[12px] font-medium text-[#7A7B7F]">Available Courses</span>
                                <span className="text-[48px] font-light text-[#1D1E20] leading-none tracking-tighter">45+</span>
                            </div>

                            {/* Fake Graph Lines */}
                            <div className="flex-1 w-full flex flex-col justify-end px-2 gap-3 pb-2">
                                <div className="w-full h-12 bg-gray-200/40 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 w-1/3 bg-[#60A5FA]/80 rounded-xl"></div>
                                </div>
                                <div className="w-full h-12 bg-gray-200/40 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 w-1/2 bg-[#FCD34D]/80 rounded-xl shadow-[0_0_12px_rgba(252,211,77,0.4)]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Animated Element 3: Bottom Left Card */}
                        <div className={`absolute bottom-[15%] left-[5%] w-[260px] rounded-[24px] p-5 flex flex-col float-3 ${darkGlassStyle} z-30`}>
                            <span className="text-[13px] font-medium text-white mb-4">Learn New Skills</span>
                            <div className="flex flex-col gap-3">
                                {[1, 2].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 overflow-hidden flex items-center justify-center">
                                            <span className="text-white text-xs">AI</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="w-20 h-2.5 bg-white/80 rounded-full mb-1"></div>
                                            <div className="w-12 h-2 bg-white/40 rounded-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Decorative Sphere */}
                        <div className={`absolute top-[35%] -left-[5%] w-[80px] h-[80px] rounded-full float-1 border border-white/80 shadow-lg flex items-center justify-center bg-white/40 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] z-20`}>
                            <div className="w-[60%] h-[60%] rounded-full hatched-pattern"></div>
                        </div>

                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <div className="w-full lg:w-[45%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
                    <div className="max-w-[420px] w-full mx-auto animate-stagger-1">

                        {/* Logo */}
                        <div className={`inline-block px-5 py-2 mb-8 rounded-full text-lg tracking-tight font-medium text-[#1D1E20] ${glassStyle}`}>
                            ProfileLMS
                        </div>

                        {/* Headers */}
                        <div className="mb-8">
                            <h1 className="text-[40px] font-light tracking-tight text-[#1D1E20] leading-tight mb-2">
                                Create Account
                            </h1>
                            <p className="text-[15px] font-medium text-[#7A7B7F]">
                                Sign up to start your learning journey.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="flex flex-col gap-4 animate-stagger-2" onSubmit={handleSubmit}>

                            {error && (
                                <div className="bg-red-500/20 text-red-600 px-4 py-3 rounded-xl border border-red-300/40 text-[13px] font-medium backdrop-blur-sm">
                                    {error}
                                </div>
                            )}

                            <div className="relative">
                                <icons.User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7B7F] w-5 h-5" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Full Name"
                                    className={inputStyle}
                                    autoComplete="name"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <icons.Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7B7F] w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email address"
                                    className={inputStyle}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7B7F] w-5 h-5" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className={inputStyle}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7B7F] hover:text-[#1D1E20] transition-colors"
                                >
                                    {showPassword ? <icons.EyeOff className="w-5 h-5" /> : <icons.Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="relative">
                                <icons.Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7B7F] w-5 h-5" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className={inputStyle}
                                    autoComplete="new-password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7A7B7F] hover:text-[#1D1E20] transition-colors"
                                >
                                    {showConfirmPassword ? <icons.EyeOff className="w-5 h-5" /> : <icons.Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-[15px] font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${darkGlassStyle} text-white mt-4 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed`}
                            >
                                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                                {!isSubmitting && <icons.ArrowRight className="w-4 h-4" />}
                            </button>

                        </form>

                        <div className="mt-8 flex flex-col gap-6 animate-stagger-3">
                            <p className="text-center text-[13px] font-medium text-[#7A7B7F] mt-2">
                                Already have an account? <Link to="/login" className="text-[#1D1E20] underline decoration-gray-300 underline-offset-4 hover:decoration-[#1D1E20] transition-all">Log in</Link>
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
};

export default SignupPage;
