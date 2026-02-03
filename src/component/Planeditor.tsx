import { Form, useNavigation, useActionData, useNavigate } from "react-router-dom";
import { useEffect, useState ,useMemo } from "react";
import { ArrowLeft, RotateCcw, Trash2 } from "lucide-react";

export default function PlanEditor({ plandata }: any) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData() as { error?: string; success?: boolean };
  const isSubmitting = navigation.state === "submitting";
  
  const [showStatus, setShowStatus] = useState(false);
  const initialPlan = useMemo(() => plandata?.[0] || {}, [plandata]);

  const [values, setValues] = useState({
    mc_plan: initialPlan.mc_plan ?? 0,
    man_plan: initialPlan.man_plan ?? 0,
    output_lot_plan: initialPlan.output_lot_plan ?? 0,
    output_sht_plan: initialPlan.output_sht_plan ?? 0,
  });

  useEffect(() => {
    setValues({
      mc_plan: initialPlan.mc_plan ?? 0,
      man_plan: initialPlan.man_plan ?? 0,
      output_lot_plan: initialPlan.output_lot_plan ?? 0,
      output_sht_plan: initialPlan.output_sht_plan ?? 0,
    });
  }, [initialPlan]);

  useEffect(() => {
    if (actionData?.success || actionData?.error) {
      setShowStatus(true);
    }
  }, [actionData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleResetInitial = () => {
    setValues({
      mc_plan: initialPlan.mc_plan ?? 0,
      man_plan: initialPlan.man_plan ?? 0,
      output_lot_plan: initialPlan.output_lot_plan ?? 0,
      output_sht_plan: initialPlan.output_sht_plan ?? 0,
    });
  };

  const handleResetZero = () => {
    setValues({
      mc_plan: 0,
      man_plan: 0,
      output_lot_plan: 0,
      output_sht_plan: 0,
    });
  };

  return (
    <div className="min-h-[90vh] bg-slate-200/60 flex flex-col flex-1 items-center justify-center p-4 font-sans relative">
      
      {showStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-slate-200 animate-in fade-in zoom-in duration-300">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${actionData?.success ? 'bg-green-100' : 'bg-red-100'}`}>
              {actionData?.success ? (
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <h3 className="text-xl font-black text-slate-800 uppercase mb-2">
              {actionData?.success ? 'Update Success' : 'Update Failed'}
            </h3>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              {actionData?.success ? 'Production plan has been synchronized to the system.' : actionData?.error || 'Unable to connect to the database.'}
            </p>
            <button
              onClick={() => setShowStatus(false)}
              className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 ${
                actionData?.success ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200' : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-2xl mb-6">
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Settings</span>
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-300 overflow-hidden ring-1 ring-black/5">
        <div className="bg-slate-100 px-6 py-5 border-b border-slate-300 flex justify-between items-center">
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tight">
              Production Plan <span className="text-blue-600 font-black">Configuration</span>
            </h2>
            <p className="text-[10px] text-slate-500 font-bold mt-0.5 uppercase tracking-tighter">System ID: SAOI-001</p>
          </div>
          {isSubmitting && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-blue-600 animate-pulse uppercase tracking-widest">Saving...</span>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
            </div>
          )}
        </div>

        <Form method="post">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Parameter</th>
                <th className="px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest w-48">Value Setting</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {[
                { label: "Machine Target", desc: "Operational goal per shift", name: "mc_plan" },
                { label: "Manpower", desc: "Total assigned operators", name: "man_plan" },
                { label: "Lot Quantity", desc: "Target lot completions", name: "output_lot_plan" },
                { label: "Sheet Target", desc: "Total sheet production goal", name: "output_sht_plan" },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4 border-r border-slate-100">
                    <span className="text-xs font-black text-slate-800 block uppercase group-hover:text-blue-600 transition-colors">{row.label}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter italic">{row.desc}</span>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      name={row.name}
                      type="number"
                      value={values[row.name as keyof typeof values]}
                      onChange={handleChange}
                      className="w-full bg-slate-50/50 border-2 border-slate-200 rounded-lg px-3 py-2 text-sm font-mono font-bold text-blue-700 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-6 bg-slate-50 border-t border-slate-300 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetInitial}
                className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-600 transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm"
              >
                <RotateCcw className="w-3 h-3" />
                Reset Initial
              </button>
              <button
                type="button"
                onClick={handleResetZero}
                className="flex items-center gap-1.5 text-[9px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm"
              >
                <Trash2 className="w-3 h-3" />
                Reset Zero
              </button>
            </div>
            <div className="flex gap-4 items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-slate-900 text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Syncing..." : "Update Settings"}
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}