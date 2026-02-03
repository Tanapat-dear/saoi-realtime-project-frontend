import { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router'; 
import axios from 'axios';
import '../style/Navbar.css';
import machine_logo from '../assets/tools.png';
import usericon from '../assets/user_2.png';
import { useQueryClient } from '@tanstack/react-query';

interface NavbarProps {
    authData: {
        isAuthen: boolean;
        user?: { // ใส่ ? เพราะถ้าไม่ล็อกอิน ข้อมูล user อาจไม่มี
            username: string;
            role: string;
            exp: number;
            iat: number;
        };
    };
}

export default function Navbar({ authData }: NavbarProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient(); 

    const handleLogout = async () => {
        try {
            setIsDropdownOpen(false);
            queryClient.setQueryData(['auth-profile'], { isAuthen: false, user: null });
            await axios.post(`${import.meta.env.VITE_API_URL}auth/logout`, {}, { withCredentials: true });
            navigate('/auth/login');
        } catch (error) {
            console.error("Logout failed:", error);
            navigate('/auth/login');
        }
    };

    return (
        <nav className="w-full bg-[#1e293b] h-[8vh] min-h-[58px] border-b border-slate-700/50 shadow-sm px-6 relative z-[100]">
            <div className="flex flex-row justify-between items-center h-full">
                
                {/* ฝั่งซ้าย: Logo & Title */}
                <div className="flex items-center gap-4">
                    <div className="bg-slate-700/30 p-2 rounded-xl border border-slate-700/50">
                        <img src={machine_logo} alt="Machine Logo" className="w-6 h-6 object-contain" />
                    </div>
                    <span className="text-white text-lg font-black tracking-tight font-sans">
                        SAOI Realtime <span className="text-blue-500">Dashboard</span>
                    </span>
                </div>

                {/* ฝั่งขวา: Navigation & Auth State */}
                <div className="flex items-center gap-8">
                    <div className="flex flex-row gap-6">
                        <NavLink to="/" className={({ isActive }) => 
                            `text-sm font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-white'}`
                        }>Dashboard</NavLink>
                        
                        <NavLink to="/manpower" className={({ isActive }) => 
                            `text-sm font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-white'}`
                        }>Manpower</NavLink>

                        <NavLink to="/settings" className={({ isActive }) => 
                            `text-sm font-bold tracking-wide transition-all duration-300 ${isActive ? 'text-blue-500 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-white'}`
                        }>Settings</NavLink>
                    </div>

                    {/* --- จุดที่แก้ไข: เช็คสถานะการล็อกอิน --- */}
                    {authData?.isAuthen ? (
                        <div className="relative">
                            <div 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-3 pl-6 border-l border-slate-700/50 group cursor-pointer"
                            >
                                <div className="flex flex-col items-end mr-1">
                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Logged in as</span>
                                    <span className="text-xs font-bold text-white leading-tight">
                                        {authData.user?.username}
                                    </span>
                                </div>
                                
                                <div className="relative">
                                    <img 
                                        src={usericon} 
                                        className={`h-9 w-9 rounded-full border-2 p-0.5 transition-all ${isDropdownOpen ? 'border-blue-500 scale-105' : 'border-slate-600 group-hover:border-blue-500'}`} 
                                        alt="User Profile" 
                                    />
                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#1e293b] rounded-full"></div>
                                </div>
                            </div>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-2 border-b border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Assigned</p>
                                        <p className="text-xs font-bold text-blue-600 uppercase">{authData.user?.role}</p>
                                    </div>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* --- แสดงปุ่ม Login เมื่อยังไม่ได้ล็อกอิน --- */
                        <Link 
                            to="/auth/login" 
                            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                        >
                            Login
                        </Link>
                    )}
                </div>

            </div>
        </nav>
    );
}