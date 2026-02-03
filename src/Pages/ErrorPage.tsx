import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
      <div className="max-w-md w-full text-center">
        {/* Icon & Glitch Effect */}
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-red-200 blur-2xl rounded-full opacity-30 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-red-100">
            <AlertTriangle size={64} className="text-red-500" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-8xl font-black text-slate-200 mb-2">500</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Internal Server Error
        </h2>
        <p className="text-slate-500 mb-10 leading-relaxed">
          Oops! มีบางอย่างผิดพลาดที่ฝั่ง Server <br /> 
          เรากำลังเร่งแก้ไขปัญหา โปรดลองใหม่อีกครั้งในภายหลัง
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-slate-400 text-sm">
          Technical Support ID: <span className="font-mono text-slate-500 uppercase">#err-500-saoi</span>
        </div>
      </div>
    </div>
  );
}