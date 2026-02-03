export default function TotalManpower() {
  return (
    <div className="bg-[#2d333b] p-2 rounded-xl shadow-2xl border border-white/5 w-full max-w-[165px] mx-2 mt-2 font-sans hover:scale-105 transition-transform delay-100 duration-200">
      {/* Header - ปรับ Font และ Tracking ให้ตรงกับกล่องบน */}
      <div className="text-slate-500 text-[12px] font-black uppercase tracking-tighter mb-2 px-0.5">
        Operator Summary
      </div>

      <div className="flex flex-col gap-2 py-2">
        {/* ZONE 1 - ปรับสีพื้นหลังให้กลืนกับกล่องหลักมากขึ้น */}
        <div className="flex justify-between items-center bg-blue-500/5 px-2 py-1.5 rounded border-l-2 border-blue-400">
          <span className="text-slate-100 text-[14px] font-bold tracking-tighter uppercase">Zone 1</span>
          <span className="text-blue-400 font-black text-[16px] leading-none">10</span>
        </div>

        {/* ZONE 2 */}
        <div className="flex justify-between items-center bg-emerald-500/5 px-2 py-1.5 rounded border-l-2 border-emerald-400">
          <span className="text-slate-100 text-[14px] font-bold tracking-tighter uppercase">Zone 2</span>
          <span className="text-emerald-400 font-black text-[16px] leading-none">8</span>
        </div>

        {/* ZONE 3 */}
        <div className="flex justify-between items-center bg-purple-500/5 px-2 py-1.5 rounded border-l-2 border-purple-400">
          <span className="text-slate-100 text-[14px] font-bold tracking-tighter uppercase">Zone 3</span>
          <span className="text-purple-400 font-black text-[16px] leading-none">7</span>
        </div>
      </div>
    </div>
  );
}