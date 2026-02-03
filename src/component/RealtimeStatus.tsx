import React, { useMemo } from "react";
import type { totalStatusComponentType } from "../type/commontype";
import { mcCodeConverter } from "../utils/mc_codeconverter";

const STATUS_DISPLAY: Record<string, { label: string; color: string }> = {
  MC_PROB: { label: "Prob.", color: "bg-gradient-to-b from-red-500 to-red-700 text-white" },
  STB30: { label: "STB", color: "bg-gradient-to-b from-orange-400 to-orange-600 text-white" },
  STANDBY: { label: "Standby", color: "bg-gradient-to-b from-yellow-300 to-yellow-500 text-black" },
  RUN: { label: "Run", color: "bg-gradient-to-b from-green-400 to-green-600 text-black" },
  OFF: { label: "Off", color: "bg-gradient-to-b from-gray-500 to-gray-700 text-white border border-gray-400 shadow-[inset_0_0_6px_rgba(0,0,0,0.5)]" },
};

const ZONE_STYLE_MAP: Record<string, { border: string; bg: string; header: string }> = {
  ZONE1: { border: "border-blue-400", bg: "bg-blue-100", header: "bg-blue-500" },
  ZONE2: { border: "border-green-400", bg: "bg-lime-100", header: "bg-green-500" },
  ZONE3: { border: "border-purple-400", bg: "bg-purple-100", header: "bg-purple-500" },
};

export const RealtimestatusArea = React.memo(({ mclayout, status, oeestatus, production_data, product_name }: totalStatusComponentType) => {
  return (
    <div className="border-2 border-black w-full justify-between flex flex-col bg-gray-100"> 
      <div className="p-0.5">
        <RealtimeStatus mclayout={mclayout} status={status} oeestatus={oeestatus} production_data={production_data} product_name={product_name}/>
      </div>
    </div>
  );
});

export default function RealtimeStatus({ mclayout, status, oeestatus, production_data, product_name }: totalStatusComponentType) {
  const masterDataMap = useMemo(() => {
    const map: Record<string, { product: string; runtime: string }> = {};
    const pNameMap: Record<string, string> = {};
    product_name?.forEach(p => { pNameMap[p.mc_code] = p.product_name; });

    production_data?.forEach(pd => {
      const mc = pd.mc_code;
      const name = pd.has_scr_repair ? `SCR-${pd.rephd_no ?? "No Data"}` : (pNameMap[mc] ?? "No Data");
      const oee = oeestatus?.find(o => o.mc_code === mc);
      const totalMinutes = oee ? Number(oee.run_count || 0) : 0;
      const runtime = `${Math.floor(totalMinutes / 60).toString().padStart(2, "0")}.${(totalMinutes % 60).toString().padStart(2, "0")} h`;
      map[mc] = { product: name, runtime };
    });
    return map;
  }, [product_name, production_data, oeestatus]);

  const status_converted = useMemo(() => mcCodeConverter(status, production_data), [status, production_data]);

  const zoneGroups = useMemo(() => {
    const layoutArray = Array.isArray(mclayout) ? mclayout : [];
    return layoutArray.reduce<Record<string, any[]>>((acc, row) => {
      const area = row.area || "UNKNOWN";
      if (!acc[area]) acc[area] = [];
      acc[area].push(row);
      return acc;
    }, {});
  }, [mclayout]);

  return (
    <div className="flex flex-row gap-6 justify-center items-start p-1">
      {Object.entries(zoneGroups).map(([zoneName, rows]) => {
        const zoneStyle = ZONE_STYLE_MAP[zoneName] || { border: "border-gray-400", bg: "bg-gray-50", header: "bg-gray-500" };

        return (
          <div key={zoneName} className={`flex flex-col gap-1 border-2 border-dashed ${zoneStyle.border} rounded-2xl p-2 ${zoneStyle.bg}`}>
            <div className={`inline-block self-start px-2 py-0.5 rounded-md text-[12px] font-bold text-white uppercase ${zoneStyle.header}`}>
              {zoneName}
            </div>

            <div className="flex flex-row gap-3">
              {rows.map((item, rowIdx) => (
                <div key={`${zoneName}-row-${item.row || rowIdx}`} className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2">
                    {Array.isArray(item.machine) && item.machine.map((mc: string | null, mcIndex: number) => {
                      if (!mc || mc.startsWith("{")) return <div key={`empty-${mcIndex}`} className="w-[145px] h-12 invisible" />;

                      const light = status_converted[mc]?.status_light || "OFF";
                      const display = STATUS_DISPLAY[light] || { label: "N/A", color: "bg-gray-300" };
                      const data = masterDataMap[mc] || { product: "No Data", runtime: "00.00 h" };

                      return (
                        <div key={`mc-${mc}`} className={`flex flex-col border-2 border-black rounded-xl px-1.5 py-1 min-w-40 transition-transform duration-200 hover:scale-105 shadow-sm ${display.color}`}>
                          <div className="flex flex-row justify-between items-center gap-x-1 mb-1">
                            <span className="text-[12px] font-black whitespace-nowrap tracking-tighter ">{mc}</span>
                            <div className="bg-slate-900/80 text-white px-1 rounded flex items-center shadow-inner border border-white/10">
                              <span className="text-[10px] font-mono font-semibold leading-none py-0.5">{data.runtime}</span>
                            </div>
                          </div>
                          <div className="text-center text-[10px] font-bold border-t bg-white/90 border-black/10 pt-0.5 text-gray-800 rounded-b-lg -mx-1.5">
                            {data.product}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {item.has_walkpath_right && Array.isArray(item.manpower_layout) && (
                    <div className="flex flex-col justify-center items-center border-2 border-dashed border-gray-400 rounded-xl bg-gray-100 min-w-[22px] px-1">
                      <div className="text-[11px] text-gray-500 flex flex-col flex-1 justify-around items-center py-1">
                        {item.manpower_layout.map((count: number, idx: number) => (
                          <div key={`man-${idx}`} className="text-[11px] text-gray-800 font-bold whitespace-nowrap">
                            👤×{count}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}