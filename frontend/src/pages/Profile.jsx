import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const icons = {
    Setting: (props) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
    ),
    Bell: (props) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
    ),
    User: (props) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ),
    ArrowUpRight: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
    ),
    ChevronDown: (props) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    ),
    ChevronUp: (props) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    ),
    MoreVertical: (props) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="12" cy="5" r="1"></circle>
            <circle cx="12" cy="19" r="1"></circle>
        </svg>
    ),
    Play: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
    ),
    Pause: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
        </svg>
    ),
    Clock: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
    ),
    Monitor: (props) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
    ),
    Lightning: (props) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
    ),
    Chat: (props) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            <line x1="9" y1="10" x2="15" y2="10"></line>
        </svg>
    ),
    Ruler: (props) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
            <path d="m15 5 4 4"></path>
        </svg>
    ),
    Link: (props) => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
    ),
    Check: (props) => (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ),
    LogOut: (props) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
    ),
    Plus: (props) => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    ),
};

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [editingEdu, setEditingEdu] = useState(false);
    const [edu10, setEdu10] = useState({ percent: 85, board: 'CBSE' });
    const [edu12, setEdu12] = useState({ percent: 78, board: 'TN HSC' });
    const [tempEdu10, setTempEdu10] = useState({ ...edu10 });
    const [tempEdu12, setTempEdu12] = useState({ ...edu12 });
    const [editingCourse, setEditingCourse] = useState(false);
    const [courseData, setCourseData] = useState([{ name: 'GenAI', duration: '6 Months', fee: '₹7,000/mo', status: 'Applied' }]);
    const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
    const [tempCourse, setTempCourse] = useState({ name: '', duration: '', fee: '', status: 'Applied' });
    const [isAddingCourse, setIsAddingCourse] = useState(false);
    const [editingPersonal, setEditingPersonal] = useState(false);
    const [personalData, setPersonalData] = useState({ email: 'student@kalvium.com', dob: '2000-01-15', mobile: '+91 98765 43210', location: 'Chennai, TN' });
    const [tempPersonal, setTempPersonal] = useState({ ...personalData });
    const [chatMessages, setChatMessages] = useState([{ role: 'ai', content: "Hi! I'm your ProfileLMS AI . Ask me anything about your courses or profile." }]);
    const [chatInput, setChatInput] = useState('');
    const [chatLoading, setChatLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState('gemini');
    const chatEndRef = useRef(null);
    const [profileName, setProfileName] = useState('Lora Piterson');
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop');
    const [editingProfile, setEditingProfile] = useState(false);
    const [tempProfileName, setTempProfileName] = useState(profileName);
    const [tempProfileImage, setTempProfileImage] = useState(profileImage);
    const fileInputRef = useRef(null);
    const [profileStats, setProfileStats] = useState({ courses: 0, modules: 0, certificates: 0 });
    const [isChatMinimized, setIsChatMinimized] = useState(false);

    const renderMetric = (label, value, icon, vertical = false) => {
        if (vertical) {
            return (
                <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md flex-1 w-full text-center">
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#FCD34D]/20 text-[#FCD34D] border border-[#FCD34D]/30">
                        {icon}
                    </div>
                    <span className="text-[18px] font-light text-white leading-none mt-1">{value}</span>
                    <span className="text-[8px] font-medium text-white/40 uppercase tracking-wider">{label}</span>
                </div>
            );
        }
        return (
            <div key={label} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-[#5A5B5F]">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-[36px] md:text-[44px] leading-none font-light tracking-tighter">{value}</span>
                    <span className="text-[12px] font-medium text-[#7A7B7F]">{label}</span>
                </div>
            </div>
        );
    };

    const fetchProfileData = async () => {
        try {
            const res = await api.get('/profile/me');
            if (res.data) {
                const { personal_info, education, course_info } = res.data;
                if (personal_info) {
                    setProfileName(personal_info.name || 'Student');
                    if (personal_info.profile_image) setProfileImage(personal_info.profile_image);
                    setPersonalData(prev => ({
                        ...prev,
                        email: personal_info.email || prev.email,
                        dob: personal_info.dob || prev.dob,
                        mobile: personal_info.mobile || prev.mobile,
                        location: personal_info.location || prev.location
                    }));
                }
                if (education) {
                    setEdu10({ percent: education.percentage_10 || 0, board: education.board_10 || 'N/A' });
                    setEdu12({ percent: education.percentage_12 || 0, board: education.board_12 || 'N/A' });
                }
                if (course_info) {
                    if (course_info.course_enrolled && course_info.application_status) {
                        setCourseData([{
                            name: course_info.course_enrolled,
                            duration: course_info.course_duration || '6 Months',
                            fee: course_info.course_fee || '₹7,000/mo',
                            status: course_info.application_status
                        }]);
                    }
                    setProfileStats({
                        courses: course_info.courses_count || 0,
                        modules: course_info.modules_count || 0,
                        certificates: course_info.certificates_count || 0
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        }
    };

    useEffect(() => {
        setMounted(true);
        fetchProfileData();
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages, chatLoading]);

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (!chatInput.trim() || chatLoading) return;
        const msg = chatInput.trim();
        setChatInput('');
        setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
        setChatLoading(true);
        try {
            const res = await api.post('/chat/query', {
                message: msg
            });
            setChatMessages(prev => [...prev, { role: 'ai', content: res.data.reply }]);
            if (res.data.success && res.data.updateOccurred) {
                fetchProfileData();
            }
        } catch {
            setChatMessages(prev => [...prev, { role: 'ai', content: "Sorry, I couldn't connect. Try again later." }]);
        } finally {
            setChatLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const glassStyle = "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg";
    const hoverGlassStyle = "transition-all duration-400 ease-out hover:bg-white/30 hover:shadow-xl hover:-translate-y-1";

    const darkGlassStyle = "bg-[#24252A]/60 backdrop-blur-md border border-white/10 shadow-lg";
    const darkHoverGlassStyle = "transition-all duration-400 ease-out hover:bg-[#24252A]/70 hover:shadow-xl hover:-translate-y-1";

    return (
        <div className={`min-h-screen w-full font-sans text-[#1D1E20] overflow-hidden bg-[#FDFBF7] relative ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>

            {/* Background Gradients */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-[#FFF2CB]/80 to-[#FDFBF7]/10 blur-[120px]" />
                <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#F2F0E9]/60 to-transparent blur-[100px]" />
                <div className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-[#FFF4D5]/60 to-transparent blur-[120px]" />
            </div>

            <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger-1 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; opacity: 0; }
        .animate-stagger-2 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; opacity: 0; }
        .animate-stagger-3 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .animate-stagger-4 { animation: slideUpFade 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
        
        .hatched-pattern {
          background-image: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 6px,
            rgba(255, 255, 255, 0.8) 6px,
            rgba(255, 255, 255, 0.8) 8px
          );
        }
        
        ::-webkit-scrollbar { width: 0px; background: transparent; }
      `}</style>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col gap-8">

                {/* Top Navigation */}
                <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 animate-stagger-1">
                    <div className={`px-6 py-2.5 rounded-full text-xl tracking-tight text-[#1D1E20] ${glassStyle}`}>
                        ProfileLMS
                    </div>

                    <div className={`flex items-center p-1.5 rounded-full ${glassStyle} gap-1 flex-wrap justify-center`}>
                        {[
                            { name: 'Home', path: '/' },
                            { name: 'Profile', path: '/' },
                            { name: 'Logout', path: '/login' },
                        ].map((item, i) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all duration-300 ${i === 1 ? 'bg-[#2A2B2F]/60 backdrop-blur-md text-white shadow-lg border border-white/10' : 'text-[#5A5B5F] hover:text-[#1D1E20] hover:bg-white/20 hover:backdrop-blur-md'}`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={async () => {
                                await logout();
                                navigate('/login');
                            }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium text-[#1D1E20] ${glassStyle} hover:bg-red-500/20 hover:text-red-600 hover:border-red-300/40 transition-colors pointer-events-auto`}
                        >
                            <icons.LogOut className="w-[18px] h-[18px]" /> Logout
                        </button>
                    </div>
                </nav>

                {/* Welcome Section */}
                <section className="flex flex-col md:flex-row items-start md:items-end justify-between px-2 gap-6 animate-stagger-2">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-[32px] md:text-[42px] font-light tracking-tight text-[#1D1E20]">Hello, {profileName}</h1>
                        <span className="text-[12px] font-medium text-[#7A7B7F]">Welcome to your LMS profile dashboard</span>
                    </div>

                    <div className={`flex items-center gap-6 md:gap-10 flex-wrap transition-all duration-500 ${isChatMinimized ? 'opacity-0 -translate-y-4 pointer-events-none scale-95' : 'opacity-100 translate-y-0'}`}>
                        {renderMetric('Courses', profileStats.courses, <icons.Monitor className="w-4 h-4" />)}
                        {renderMetric('Modules', profileStats.modules, <icons.Lightning className="w-4 h-4" />)}
                        {renderMetric('Certificates', profileStats.certificates, <icons.Check className="w-4 h-4" />)}
                    </div>
                </section>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full pb-10">

                    {/* Left Column */}
                    <div className="lg:col-span-3 flex flex-col gap-6 animate-stagger-3">

                        {/* Profile Card */}
                        <div className={`relative h-[320px] rounded-[32px] overflow-hidden group ${glassStyle} p-2`}>
                            <div className="absolute inset-2 rounded-[24px] overflow-hidden bg-[#D3CECA]">
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105" />
                            </div>

                            {/* Profile Overlays */}
                            <div className="absolute bottom-6 left-6 flex flex-col z-10">
                                <span className="text-[20px] font-medium text-white drop-shadow-md">{profileName}</span>
                                <span className="text-[12px] font-light text-white/80 drop-shadow-md">Student</span>
                            </div>

                            {/* Edit Button on Profile Card - Bottom Right */}
                            <button
                                onClick={() => {
                                    if (!editingProfile) {
                                        setTempProfileName(profileName);
                                        setTempProfileImage(profileImage);
                                    }
                                    setEditingProfile(!editingProfile);
                                }}
                                className={`absolute bottom-5 right-5 z-10 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-300 shadow-lg ${editingProfile ? 'bg-red-500/20 border-red-300/40 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
                            >
                                {editingProfile ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                )}
                            </button>
                        </div>

                        {/* Profile Edit Panel - Always visible, blurred when not editing */}
                        <div className={`rounded-[32px] p-6 flex flex-col gap-4 transition-all duration-500 ${glassStyle} ${editingProfile ? 'opacity-100 filter-none pointer-events-auto' : 'opacity-40 blur-[3px] pointer-events-none'}`}>
                            <span className="text-[14px] font-semibold text-[#1D1E20]">Edit Profile</span>

                            {/* Profile Image Preview */}
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30 shadow-lg shrink-0">
                                    <img src={editingProfile ? tempProfileImage : profileImage} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }} />
                                </div>
                                <div className="flex-1 flex flex-col gap-1">
                                    <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Profile Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={editingProfile ? tempProfileImage : profileImage}
                                            onChange={(e) => setTempProfileImage(e.target.value)}
                                            className="flex-1 px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[11px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                            placeholder="Paste image URL..."
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-3 py-2 rounded-xl bg-white/30 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all text-[#1D1E20] shadow-sm"
                                            title="Upload from computer"
                                        >
                                            <icons.Plus className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>
                                    <span className="text-[9px] text-[#7A7B7F] mt-1 ml-1">Paste a URL or upload a file</span>
                                </div>
                            </div>

                            {/* Name Field */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={editingProfile ? tempProfileName : profileName}
                                    onChange={(e) => setTempProfileName(e.target.value)}
                                    className="w-full px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                    placeholder="Your name"
                                />
                            </div>



                            {/* Save / Cancel */}
                            <div className="flex gap-2 mt-1">
                                <button
                                    onClick={async () => {
                                        try {
                                            await api.put('/profile/update', { personal_info: { name: tempProfileName, profile_image: tempProfileImage } });
                                            setProfileName(tempProfileName);
                                            setProfileImage(tempProfileImage);
                                            setEditingProfile(false);
                                        } catch (error) {
                                            console.error("Failed to save profile:", error);
                                        }
                                    }}
                                    className="flex-1 py-2 rounded-xl bg-[#FCD34D] text-[#8C6D1F] text-[11px] font-semibold hover:bg-[#FCD34D]/80 transition-all shadow-md"
                                >Save</button>
                                <button
                                    onClick={() => setEditingProfile(false)}
                                    className="flex-1 py-2 rounded-xl bg-white/30 backdrop-blur-md text-[#7A7B7F] text-[11px] font-semibold border border-white/30 hover:bg-white/40 transition-all"
                                >Cancel</button>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column */}
                    <div className="lg:col-span-6 flex flex-col gap-6 animate-stagger-4">

                        {/* Personal Details Card */}
                        <div className={`rounded-[32px] p-7 flex flex-col relative ${glassStyle} ${hoverGlassStyle}`}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[18px] font-medium text-[#1D1E20]">Personal Details</span>
                                    <span className="text-[11px] font-medium text-[#7A7B7F] mt-1">Student Information</span>
                                </div>
                                <button
                                    onClick={() => {
                                        if (!editingPersonal) setTempPersonal({ ...personalData });
                                        setEditingPersonal(!editingPersonal);
                                    }}
                                    className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-300 shadow-lg ${editingPersonal ? 'bg-red-500/20 border-red-300/40 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
                                >
                                    {editingPersonal ? (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                    ) : (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                    )}
                                </button>
                            </div>

                            {editingPersonal ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {[{ label: 'Email', key: 'email', type: 'email' }, { label: 'Date of Birth', key: 'dob', type: 'date' }, { label: 'Mobile Number', key: 'mobile', type: 'tel' }, { label: 'Location', key: 'location', type: 'text' }].map((field) => (
                                        <div key={field.key} className="flex flex-col gap-1">
                                            <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">{field.label}</label>
                                            <input
                                                type={field.type}
                                                value={tempPersonal[field.key]}
                                                onChange={(e) => setTempPersonal({ ...tempPersonal, [field.key]: e.target.value })}
                                                className="w-full px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                            />
                                        </div>
                                    ))}
                                    <div className="col-span-2 flex gap-2 mt-2">
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await api.put('/profile/update', {
                                                        personal_info: {
                                                            dob: tempPersonal.dob,
                                                            gender: tempPersonal.gender || '',
                                                            email: tempPersonal.email,
                                                            mobile: tempPersonal.mobile,
                                                            location: tempPersonal.location
                                                        }
                                                    });
                                                    setPersonalData({ ...tempPersonal });
                                                    setEditingPersonal(false);
                                                } catch (error) {
                                                    console.error("Failed to save personal data:", error);
                                                }
                                            }}
                                            className="flex-1 py-2 rounded-xl bg-[#FCD34D] text-[#8C6D1F] text-[11px] font-semibold hover:bg-[#FCD34D]/80 transition-all shadow-md"
                                        >Save</button>
                                        <button
                                            onClick={() => setEditingPersonal(false)}
                                            className="flex-1 py-2 rounded-xl bg-white/30 backdrop-blur-md text-[#7A7B7F] text-[11px] font-semibold border border-white/30 hover:bg-white/40 transition-all"
                                        >Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-[#5A5B5F]">
                                            <icons.Chat className="w-4 h-4" />
                                        </div>
                                        <span className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Email</span>
                                        <span className="text-[12px] font-medium text-[#1D1E20] truncate">{personalData.email}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-[#5A5B5F]">
                                            <icons.Clock className="w-4 h-4" />
                                        </div>
                                        <span className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Date of Birth</span>
                                        <span className="text-[12px] font-medium text-[#1D1E20]">{personalData.dob}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-[#5A5B5F]">
                                            <icons.Lightning className="w-4 h-4" />
                                        </div>
                                        <span className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Mobile</span>
                                        <span className="text-[12px] font-medium text-[#1D1E20]">{personalData.mobile}</span>
                                    </div>
                                    <div className="flex flex-col gap-2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg text-[#5A5B5F]">
                                            <icons.Link className="w-4 h-4" />
                                        </div>
                                        <span className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Location</span>
                                        <span className="text-[12px] font-medium text-[#1D1E20]">{personalData.location}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Education & Course Tracker Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Education Details Card */}
                            <div className={`rounded-[32px] p-7 flex flex-col relative ${glassStyle} ${hoverGlassStyle}`}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[18px] font-medium text-[#1D1E20]">Education</span>
                                        <span className="text-[11px] font-medium text-[#7A7B7F] mt-1">Board Result</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (!editingEdu) {
                                                setTempEdu10({ ...edu10 });
                                                setTempEdu12({ ...edu12 });
                                            }
                                            setEditingEdu(!editingEdu);
                                        }}
                                        className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center border transition-all duration-300 shadow-lg ${editingEdu ? 'bg-red-500/20 border-red-300/40 hover:bg-red-500/30' : 'bg-white/20 border-white/30 hover:bg-white/30'}`}
                                    >
                                        {editingEdu ? (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                        ) : (
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                        )}
                                    </button>
                                </div>

                                {/* Edit Mode */}
                                {editingEdu ? (
                                    <div className="flex flex-col gap-4">
                                        {[{ label: '10th', data: tempEdu10, setData: setTempEdu10 }, { label: '12th', data: tempEdu12, setData: setTempEdu12 }].map((item, i) => (
                                            <div key={i} className="flex flex-col gap-1.5">
                                                <span className="text-[11px] font-medium text-[#1D1E20]">{item.label} Board</span>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number" min="0" max="100"
                                                        value={item.data.percent}
                                                        onChange={(e) => item.setData({ ...item.data, percent: Math.min(100, Math.max(0, Number(e.target.value))) })}
                                                        className="flex-1 px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                                        placeholder="%"
                                                    />
                                                    <select
                                                        value={item.data.board}
                                                        onChange={(e) => item.setData({ ...item.data, board: e.target.value })}
                                                        className="flex-1 px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all cursor-pointer"
                                                    >
                                                        <option value="CBSE">CBSE</option>
                                                        <option value="ICSE">ICSE</option>
                                                        <option value="SSLC">SSLC</option>
                                                        <option value="TN HSC">TN HSC</option>
                                                        <option value="State Board">State Board</option>
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex gap-2 mt-2">
                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await api.put('/profile/update', {
                                                            education: {
                                                                board_10: tempEdu10.board,
                                                                percentage_10: tempEdu10.percent,
                                                                board_12: tempEdu12.board,
                                                                percentage_12: tempEdu12.percent
                                                            }
                                                        });
                                                        setEdu10({ ...tempEdu10 });
                                                        setEdu12({ ...tempEdu12 });
                                                        setEditingEdu(false);
                                                    } catch (error) {
                                                        console.error("Failed to save education data:", error);
                                                    }
                                                }}
                                                className="flex-1 py-2 rounded-xl bg-[#FCD34D] text-[#8C6D1F] text-[11px] font-semibold hover:bg-[#FCD34D]/80 transition-all shadow-md"
                                            >Save</button>
                                            <button
                                                onClick={() => setEditingEdu(false)}
                                                className="flex-1 py-2 rounded-xl bg-white/30 backdrop-blur-md text-[#7A7B7F] text-[11px] font-semibold border border-white/30 hover:bg-white/40 transition-all"
                                            >Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-5">
                                        {/* 10th Board */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-[11px] font-medium text-[#1D1E20]">10th Board</span>
                                                <span className="text-[10px] font-medium text-[#7A7B7F] uppercase">{edu10.board}</span>
                                            </div>
                                            <div className="relative h-10 bg-[#FCD34D]/40 backdrop-blur-md rounded-full flex items-center px-4 shadow-lg border border-[#FCD34D]/30">
                                                <span className="text-[12px] font-medium text-[#8C6D1F]">{edu10.percent}%</span>
                                            </div>
                                        </div>
                                        {/* 12th Board */}
                                        <div className="relative">
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-[11px] font-medium text-[#1D1E20]">12th Board</span>
                                                <span className="text-[10px] font-medium text-[#7A7B7F] uppercase">{edu12.board}</span>
                                            </div>
                                            <div className="relative h-10 bg-[#2A2B2F]/60 backdrop-blur-md rounded-full flex items-center px-4 shadow-lg border border-white/10">
                                                <span className="text-[12px] font-medium text-white">{edu12.percent}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Course Tracker Card */}
                            <div className={`rounded-[32px] p-7 flex flex-col items-center relative ${glassStyle} ${hoverGlassStyle}`}>
                                <div className="w-full flex justify-between items-start absolute top-7 left-0 px-7">
                                    <div className="flex flex-col">
                                        <span className="text-[18px] font-medium text-[#1D1E20]">Course Tracker</span>
                                        <span className="text-[11px] font-medium text-[#7A7B7F] mt-0.5">{editingCourse ? (isAddingCourse ? 'Add New Course' : 'Edit Course') : 'Enrolled Program'}</span>
                                    </div>
                                    {!editingCourse && (
                                        <div className="flex gap-2">
                                            {/* Edit Current Button */}
                                            <button
                                                onClick={() => {
                                                    setTempCourse({ ...courseData[currentCourseIndex] });
                                                    setIsAddingCourse(false);
                                                    setEditingCourse(true);
                                                }}
                                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/30 transition-all duration-300 shadow-lg group"
                                                title="Edit current course"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#1D1E20] group-hover:text-black"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                                            </button>
                                            {/* Add New Button */}
                                            <button
                                                onClick={() => {
                                                    setTempCourse({ name: '', duration: '', fee: '', status: 'Applied' });
                                                    setIsAddingCourse(true);
                                                    setEditingCourse(true);
                                                }}
                                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/30 transition-all duration-300 shadow-lg group"
                                                title="Add new course"
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1D1E20] group-hover:text-black"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {editingCourse ? (
                                    <div className="flex flex-col gap-4 w-full mt-16 px-1">
                                        <div className="flex gap-3">
                                            <div className="flex-1 flex flex-col gap-1.5">
                                                <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Course Name</label>
                                                <input
                                                    type="text"
                                                    value={tempCourse.name}
                                                    onChange={(e) => setTempCourse({ ...tempCourse, name: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                                    placeholder="e.g. GenAI"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1.5">
                                                <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Duration</label>
                                                <input
                                                    type="text"
                                                    value={tempCourse.duration}
                                                    onChange={(e) => setTempCourse({ ...tempCourse, duration: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                                    placeholder="e.g. 6 Months"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <div className="flex-1 flex flex-col gap-1.5">
                                                <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Fee</label>
                                                <input
                                                    type="text"
                                                    value={tempCourse.fee}
                                                    onChange={(e) => setTempCourse({ ...tempCourse, fee: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all"
                                                    placeholder="e.g. ₹7,000/mo"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1.5">
                                                <label className="text-[9px] font-medium text-[#7A7B7F] uppercase tracking-wider">Status</label>
                                                <select
                                                    value={tempCourse.status}
                                                    onChange={(e) => setTempCourse({ ...tempCourse, status: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-xl bg-white/40 backdrop-blur-md border border-white/40 text-[12px] font-medium text-[#1D1E20] outline-none focus:border-[#FCD34D] transition-all cursor-pointer"
                                                >
                                                    <option value="Admitted">Admitted</option>
                                                    <option value="Applied">Applied</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Rejected">Rejected</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 mt-3">
                                            <button
                                                onClick={async () => {
                                                    if (tempCourse.name.trim()) {
                                                        try {
                                                            // For now we only track one course in DB, but UI allows multiple.
                                                            // We'll update the main course in DB if it's the first one.
                                                            if (isAddingCourse || currentCourseIndex === 0) {
                                                                await api.put('/profile/update', {
                                                                    course_info: {
                                                                        course_enrolled: tempCourse.name,
                                                                        application_status: tempCourse.status,
                                                                        course_duration: tempCourse.duration,
                                                                        course_fee: tempCourse.fee
                                                                    }
                                                                });
                                                            }

                                                            const updatedCourses = [...courseData];
                                                            if (isAddingCourse) {
                                                                updatedCourses.push({ ...tempCourse });
                                                                setCurrentCourseIndex(updatedCourses.length - 1);
                                                            } else {
                                                                updatedCourses[currentCourseIndex] = { ...tempCourse };
                                                            }
                                                            setCourseData(updatedCourses);
                                                        } catch (error) {
                                                            console.error("Failed to save course tracker data:", error);
                                                        }
                                                    }
                                                    setEditingCourse(false);
                                                }}
                                                className="flex-1 py-2.5 rounded-xl bg-[#FCD34D] text-[#8C6D1F] text-[12px] font-semibold hover:bg-[#FCD34D]/80 transition-all shadow-md"
                                            >{isAddingCourse ? 'Add to Tracker' : 'Save Changes'}</button>
                                            <button
                                                onClick={() => setEditingCourse(false)}
                                                className="flex-1 py-2.5 rounded-xl bg-white/30 backdrop-blur-md text-[#7A7B7F] text-[12px] font-semibold border border-white/30 hover:bg-white/40 transition-all"
                                            >Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute left-2 right-2 md:left-4 md:right-4 top-[148px] flex items-center justify-between pointer-events-none z-20">
                                            <button
                                                onClick={() => setCurrentCourseIndex(prev => (prev > 0 ? prev - 1 : courseData.length - 1))}
                                                className="w-8 h-8 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center transition-all border border-white/60 shadow-lg backdrop-blur-md text-[#1D1E20] pointer-events-auto"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                            </button>

                                            <button
                                                onClick={() => setCurrentCourseIndex(prev => (prev < courseData.length - 1 ? prev + 1 : 0))}
                                                className="w-8 h-8 rounded-full bg-white/40 hover:bg-white/60 flex items-center justify-center transition-all border border-white/60 shadow-lg backdrop-blur-md text-[#1D1E20] pointer-events-auto"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-center w-full mt-4 px-2 relative z-10">
                                            <div className="text-[11px] font-bold text-[#8C6D1F] bg-[#FCD34D]/90 px-3 py-1 rounded-full border border-white/60 shadow-sm uppercase tracking-widest">
                                                {currentCourseIndex + 1} / {courseData.length}
                                            </div>
                                        </div>

                                        <div className="relative w-[180px] h-[180px] mt-2 flex items-center justify-center">
                                            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                                <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="4" strokeDasharray="4 4" className="opacity-50" />
                                                <circle cx="50" cy="50" r="45" fill="none" stroke={courseData[currentCourseIndex]?.status === 'Admitted' ? '#60A5FA' : courseData[currentCourseIndex]?.status === 'Applied' ? '#FCD34D' : courseData[currentCourseIndex]?.status === 'Pending' ? '#FB923C' : '#EF4444'} strokeWidth="6" strokeLinecap="round" strokeDasharray="283" strokeDashoffset={courseData[currentCourseIndex]?.status === 'Admitted' ? '0' : courseData[currentCourseIndex]?.status === 'Applied' ? '70' : courseData[currentCourseIndex]?.status === 'Pending' ? '140' : '250'} className="transition-all duration-1000 ease-out" />
                                            </svg>
                                            <div className="absolute flex flex-col items-center justify-center text-center px-4">
                                                <span className="text-[24px] font-light text-[#1D1E20] leading-tight line-clamp-2">{courseData[currentCourseIndex]?.name || 'No Course'}</span>
                                                <span className="text-[11px] font-medium text-[#7A7B7F] mt-1">{courseData[currentCourseIndex]?.duration}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mt-auto w-full justify-between px-2">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md border ${courseData[currentCourseIndex]?.status === 'Admitted' ? 'bg-blue-400/20 text-blue-600 border-blue-300/40' : courseData[currentCourseIndex]?.status === 'Applied' ? 'bg-[#FCD34D]/30 text-[#8C6D1F] border-[#FCD34D]/40' : courseData[currentCourseIndex]?.status === 'Pending' ? 'bg-orange-400/20 text-orange-600 border-orange-300/40' : 'bg-red-400/20 text-red-600 border-red-300/40'}`}>
                                                    {courseData[currentCourseIndex]?.status === 'Admitted' && '✓ '}{courseData[currentCourseIndex]?.status || 'N/A'}
                                                </span>
                                            </div>
                                            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shadow-lg">
                                                <span className="text-[11px] font-semibold text-[#1D1E20]">{courseData[currentCourseIndex]?.fee || '₹—'}</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-3 flex flex-col gap-6 animate-stagger-1 h-full">

                        {/* Quick Stats Card */}


                        {/* AI Chatbot Card */}
                        <div className={`flex-1 rounded-[32px] flex flex-col relative overflow-hidden transition-all duration-500 shadow-2xl ${isChatMinimized ? 'max-h-[420px] bg-transparent border-none shadow-none translate-y-0' : `${darkGlassStyle} hover:-translate-y-1`} h-full`}>

                            {isChatMinimized ? (
                                <div className="flex flex-col items-start gap-4 py-2 animate-stagger-1 h-full justify-end pl-10 mb-6">
                                    {/* Metrics Stacked Vertically when Minimized */}
                                    <div className="flex flex-col gap-6 w-full items-start">
                                        {renderMetric('Courses', profileStats.courses, <icons.Monitor className="w-4 h-4" />)}
                                        {renderMetric('Modules', profileStats.modules, <icons.Lightning className="w-4 h-4" />)}
                                        {renderMetric('Certificates', profileStats.certificates, <icons.Check className="w-4 h-4" />)}
                                    </div>

                                    {/* Minimized Logo Button */}
                                    <button
                                        onClick={() => setIsChatMinimized(false)}
                                        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center shadow-[0_8px_20px_rgba(245,158,11,0.4)] hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 group"
                                    >
                                        <icons.Chat className="w-7 h-7 text-[#24252A] group-hover:rotate-12 transition-transform" />
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 border-2 border-[#24252A] rounded-full"></div>
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Chat Header */}
                                    <div className="flex justify-between items-center p-5 pb-3 relative z-10 border-b border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center shadow-[0_0_12px_rgba(252,211,77,0.3)]">
                                                <icons.Chat className="w-4 h-4 text-[#24252A]" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[14px] font-semibold text-white flex items-center gap-2"> ProfileLMS AI Assistant <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span></span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => setChatMessages([{ role: 'ai', content: "Chat cleared! How can I help you?" }])} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="Clear chat">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                                            </button>
                                            <button onClick={() => setIsChatMinimized(true)} className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" title="Minimize">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Chat Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 min-h-[200px]" style={{ scrollbarWidth: 'none' }}>
                                        {chatMessages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                {msg.role === 'ai' && (
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center mr-2 mt-1 shrink-0">
                                                        <img src="/logo.png" alt="Logo" className="w-6 h-6 rounded-full" />
                                                    </div>
                                                )}
                                                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[12px] leading-relaxed ${msg.role === 'user'
                                                    ? 'bg-[#FCD34D]/20 text-[#FCD34D] rounded-br-sm border border-[#FCD34D]/20'
                                                    : 'bg-white/10 text-white/80 rounded-bl-sm border border-white/10'
                                                    }`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        ))}
                                        {chatLoading && (
                                            <div className="flex justify-start">
                                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center mr-2 mt-1 shrink-0">
                                                    <icons.Lightning className="w-3 h-3 text-[#24252A]" />
                                                </div>
                                                <div className="bg-white/10 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                                                    <span className="w-1.5 h-1.5 bg-[#FCD34D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-[#FCD34D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-[#FCD34D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={chatEndRef} />
                                    </div>

                                    {/* Chat Input */}
                                    <div className="p-4 pt-4 pb-6 relative z-20 mt-auto sticky bottom-0 bg-[#24252A]/90 backdrop-blur-xl border-t border-white/5 rounded-b-[32px]">
                                        <form onSubmit={handleChatSubmit} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={chatInput}
                                                onChange={(e) => setChatInput(e.target.value)}
                                                placeholder="Ask anything..."
                                                disabled={chatLoading}
                                                className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-[12px] text-white placeholder-white/30 outline-none focus:border-[#FCD34D]/40 transition-all"
                                            />
                                            <button type="submit" disabled={!chatInput.trim() || chatLoading} className="w-10 h-10 rounded-xl bg-[#FCD34D] flex items-center justify-center hover:bg-[#FCD34D]/80 transition-all disabled:opacity-30 shrink-0">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#24252A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                            </button>
                                        </form>
                                    </div>

                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDashboard;