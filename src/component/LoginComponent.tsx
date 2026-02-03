import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // นำเข้า useNavigate เพื่อใช้ Redirect
import { useQueryClient } from '@tanstack/react-query';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const navigate = useNavigate(); 

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}auth/login`,
        { username, password },
        { 
          withCredentials: true, 
          headers: { 'Content-Type': 'application/json' }
        }
      );

      console.log("Login Success! Response Data:", response.data);
      await queryClient.invalidateQueries({ queryKey: ['auth-profile'] });
      // หลังจาก Login สำเร็จ ให้เปลี่ยนหน้าไปหน้าหลัก
      // replace: true เพื่อไม่ให้พนักงานกด Back กลับมาหน้า Login ได้
      navigate('/', { replace: true });

    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || 'Invalid username or password');
      } else if (err.request) {
        setError('Cannot connect to server. Please check your network.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[92vh] bg-[#e2e8f0] flex items-center justify-center font-sans p-4 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-teal-400 to-blue-600"></div>
      <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-200 rounded-full blur-[120px] opacity-40"></div>
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-teal-200 rounded-full blur-[120px] opacity-40"></div>

      <div className="w-full max-w-sm relative">
        <div className="bg-white/90 backdrop-blur-sm p-10 rounded-[2.5rem] 
                        shadow-[0_22px_70px_4px_rgba(0,0,0,0.12)] 
                        border border-white flex flex-col items-center">
          
          <div className="mb-10 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              SAOI Data Management System
            </div>
            <div className="flex items-center justify-center gap-2">
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                SAOI <span className="text-blue-600">RT</span>
              </h1>
            </div>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 text-red-500 text-[11px] p-3 rounded-xl border border-red-100 text-center font-bold animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-2">Username</label>
              <input
                type="text"
                autoComplete="username" // แก้ Warning และช่วย Auto-fill
                required
                disabled={isLoading}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-slate-800 shadow-sm disabled:opacity-50"
                placeholder="Enter ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-2">Password</label>
              <input
                type="password"
                autoComplete="current-password" // แก้ Warning [DOM] ตามที่เบราว์เซอร์แนะนำ
                required
                disabled={isLoading}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-slate-800 shadow-sm disabled:opacity-50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0f172a] hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 hover:shadow-blue-500/30 transition-all transform active:scale-[0.98] uppercase tracking-[0.15em] text-xs mt-4 disabled:bg-slate-400 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Verifying...</span>
                </div>
              ) : "Sign In to System"}
            </button>
          </form>

          <div className="mt-12 pt-6 border-t border-slate-100 w-full flex flex-col items-center">
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mb-1 text-center font-sans">Developed by</p>
            <p className="text-[11px] text-slate-600 font-black tracking-tight text-center font-sans">FUJIKURA IOT TEAM</p>
          </div>
        </div>
      </div>
    </div>
  );
}