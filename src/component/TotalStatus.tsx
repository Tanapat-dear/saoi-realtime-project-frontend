import { useMemo } from "react";
import type { totalstatusConfigType, totalStatusComponentType } from "../type/commontype";
import { mcCodeConverter } from "../utils/mc_codeconverter";
import { calculateStatus } from "../utils/calculatestatus";

export default function TotalStatus({ mclayout, status, production_data }: totalStatusComponentType) {
    
    // 1. Memoize การแปลง Code: ทำเฉพาะเมื่อ status หรือ production_data เปลี่ยน
    const status_converted = useMemo(() => {
        return mcCodeConverter(status, production_data);
    }, [status, production_data]);

    // 2. Memoize การคำนวณสรุปผล: ป้องกันการวนลูปใหม่ทุกครั้งที่ Dashboard Re-render
    const stats = useMemo(() => {
        return calculateStatus(status_converted, mclayout);
    }, [status_converted, mclayout]);

    // 3. Memoize Config Array: ป้องกันการสร้าง Object ชุดใหม่ใน Memory ทุกรอบ
    const totalConfig: Array<totalstatusConfigType> = useMemo(() => [
        { color: "bg-red-500", label: "Machine Prob.", text_color: 'text-white', value: stats.mc_prob_count },
        { color: "bg-yellow-500", label: "Standby", text_color: 'text-white', value: stats.standby_count },
        { color: "bg-green-500", label: "Auto run", text_color: 'text-white', value: stats.run_count },
        { color: "bg-gray-500", label: "Power Off", text_color: 'text-white', value: stats.power_off_count },
    ], [stats]);

    return (
        <div className="flex flex-col gap-4 px-4 pb-2">
            {totalConfig.map((item) => (
                <div 
                    key={item.label}
                    className={`hover:scale-105 transition-transform duration-300 rounded-xl border-3 border-gray-black flex flex-row p-2 justify-between ${item.color}`}
                >
                    <div className={`${item.text_color} font-bold`}>{item.label}</div>
                    <div className={`${item.text_color} font-bold`}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}