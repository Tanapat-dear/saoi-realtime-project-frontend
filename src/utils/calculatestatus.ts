import type { mclayoutType } from "../type/commontype";

export function calculateStatus(status_converted: any, mclayout: mclayoutType[]) {
    // 1. วนลูป Object status_converted เพียงรอบเดียวเพื่อเก็บค่าทุกอย่าง (O(n))
    const counts = {
        run_count: 0,
        standby_count: 0,
        stb30_count: 0,
        mc_prob_count: 0
    };

    const statusValues = Object.values(status_converted);
    
    for (const item of statusValues as any[]) {
        switch (item.status_light) {
            case "RUN": counts.run_count++; break;
            case "STANDBY": counts.standby_count++; break;
            case "STB30": counts.stb30_count++; break;
            case "MC_PROB": counts.mc_prob_count++; break;
        }
    }

    // 2. คำนวณจำนวนเครื่องจักรทั้งหมดจาก mclayout (Memoize ตัวนี้ใน component จะดีมาก)
    const totalMachines = mclayout.reduce((acc, row) => {
        // กรองเฉพาะ machine ที่ไม่เป็น null หรือ undefined
        const validMachinesCount = row.machine.filter(m => m !== null && m !== undefined).length;
        return acc + validMachinesCount;
    }, 0);

    // 3. คำนวณ Power Off
    const power_off_count = totalMachines - (counts.run_count + counts.standby_count + counts.stb30_count + counts.mc_prob_count);

    return {
        ...counts,
        power_off_count
    };
}