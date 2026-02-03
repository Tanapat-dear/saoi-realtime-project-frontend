import { mcCodeConverter } from "../utils/mc_codeconverter";
import { calculateStatus } from "../utils/calculatestatus";


export default function OutputandPlan({ outputdata, mcstatus, mclayout, plandata }: any) {
  const status_converted = mcCodeConverter(mcstatus);
  const { run_count } = calculateStatus(status_converted, mclayout);

  const f = (n: any) => Number(n || 0).toLocaleString();

  const DataRow = ({ label, unit, plan, actual, isLast = false }: any) => (
    /* ล็อคสัดส่วนคอลัมน์: Label(ยืดหยุ่น) | Plan(48px) | Actual(62px) */
    <div className={`grid grid-cols-[1fr_48px_62px] items-center py-1.5 ${!isLast ? 'border-b border-white/5' : ''}`}>
      {/* 1. Label Section */}
      <div className="flex flex-col min-w-0">
        <span className="text-[12px] font-extrabold text-white tracking-tight leading-none">
          {label}
        </span>
        {unit && <span className="text-[8px] text-slate-500 font-bold uppercase mt-0.5">{unit}</span>}
      </div>

      {/* 2. Plan Section: วางกึ่งกลางคอลัมน์ให้ตรงหัวข้อ */}
      <div className="text-center">
        <span className="text-[12px] font-bold text-amber-500/90 tabular-nums tracking-tighter">
          {f(plan)}
        </span>
      </div>

      {/* 3. Actual Section: ใช้กล่องแบบ Low-profile เพื่อให้ดูสะอาดตา */}
      <div className="flex justify-end">
        <div className="bg-emerald-400/5 border border-emerald-400/20 px-1 py-1 rounded w-full text-center">
          <span className="text-emerald-400 font-black text-[13px] tabular-nums tracking-tighter leading-none">
            {f(actual)}
          </span>
        </div>
      </div>
    </div>
  );

  return (
  
    <div className="bg-[#0f172a] p-2.5 ml-2 rounded-xl shadow-2xl border border-white/10 w-[175px] font-sans hover:scale-105 transition-all duration-200 delay-100">
    
      <div className="grid grid-cols-[1fr_48px_62px] mb-2 px-0.5 border-b border-white/10 pb-1">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Items</span>
        <span className="text-[10px] font-black text-amber-600/80 uppercase text-center">Plan</span>
        <span className="text-[10px] font-black text-emerald-600/80 uppercase text-center">Actual</span>
      </div>

   
      <div className="flex flex-col space-y-0.5">
        <DataRow label="M/C" unit="Status" plan={plandata[0]?.mc_plan || 0} actual={run_count} />
        <DataRow label="MAN" unit="Power" plan={plandata[0]?.man_plan || 0} actual="25" />
        <DataRow 
          label="LOT" 
          unit="Output" 
          plan={plandata[0]?.output_lot_plan || 0}
          actual={outputdata[0]?.sumlot_byall ?? 0} 
        />
        <DataRow 
          label="SHT" 
          unit="Output" 
          plan={plandata[0]?.output_sht_plan || 0}
          actual={outputdata[0]?.sumsht_byall ?? 0} 
          isLast={true} 
        />
      </div>
    </div>
  );
}