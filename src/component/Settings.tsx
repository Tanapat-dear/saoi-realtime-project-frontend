import { Link } from 'react-router';

interface AuthResponse {
  isAuthen: boolean;
  user: {
    username: string;
    role: string;
    iat: number;
    exp: number;
  };
}

export default function Settings({ authData }: { authData: AuthResponse }) {
  

  if (!authData?.isAuthen) {
    return (
      <div className="min-h-[92vh] bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-200 text-center max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m4-8a4 4 0 11-8 0 4 4 0 018 0zM15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-800 uppercase mb-2">Access Restricted</h2>
          <p className="text-slate-500 font-medium mb-8">Please Login to do this action</p>
          <Link to="/auth/login" className="block w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

 const allMenus = [
  {
    id: 1,
    title: "Machine Layout",
    subtitle: "Physical Workspace",
    description: "Manage machine layouts and operator workflow paths across all production zones.",
    theme: "blue",
    path: "/settings/editmachinelayout",
    allowedRoles: ["ADMIN", "ENGINEER", "USER"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Plan Output",
    subtitle: "Target Management",
    description: "Configure daily production targets and establish work plans for each shift.",
    theme: "emerald",
    path: "/settings/editoutputplan",
    allowedRoles: ["ADMIN", "ENGINEER", "USER"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Manpower Config",
    subtitle: "Manpower Parameters",
    description: "Assign operator headcounts, manage labor distribution, and set staffing requirements for each production zone.",
    theme: "purple",
    path: "/settings/editmanpower",
    allowedRoles: ["ADMIN","USER"],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];


  const filteredMenus = allMenus.filter(menu =>
    menu.allowedRoles.includes(authData.user.role.toUpperCase())
  );

  const themeClasses: Record<string, string> = {
    blue: "from-blue-600 to-blue-400 shadow-blue-100 text-blue-600 bg-blue-50",
    emerald: "from-emerald-600 to-emerald-400 shadow-emerald-100 text-emerald-600 bg-emerald-50",
    purple: "from-purple-600 to-purple-400 shadow-purple-100 text-purple-600 bg-purple-50",
  };

  return (
    <div className="min-h-[92vh] bg-slate-50 p-6 md:p-12 relative overflow-hidden font-sans">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-6 w-1.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]"></div>
            <span className="text-slate-400 font-bold tracking-[0.2em] text-[10px] uppercase">Management Console</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">System <span className="text-blue-600">Settings</span></h1>
          
          {/* --- ส่วน User และ Role ถูกลบออกแล้วจ้ะ --- */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredMenus.map((menu) => (
            <Link to={menu.path} key={menu.id} className="group outline-none">
              <div className="relative h-full bg-white rounded-[2.5rem] p-9 border border-white shadow-lg transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.12)] group-hover:-translate-y-3 group-hover:border-blue-100">
                
                {/* Icon Box */}
                <div className={`w-16 h-16 rounded-[1.25rem] mb-8 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg ${themeClasses[menu.theme].split(' ').slice(3).join(' ')}`}>
                  <div className={`scale-110 ${themeClasses[menu.theme].split(' ').slice(2, 3).join(' ')}`}>
                    {menu.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-slate-50 border border-slate-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{menu.subtitle}</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{menu.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80">{menu.description}</p>
                </div>

                <div className="mt-12 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-tighter group-hover:text-slate-900 transition-colors">Configure System</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 group-hover:translate-x-1 shadow-sm ${themeClasses[menu.theme].split(' ').slice(3).join(' ')}`}>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                     </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}