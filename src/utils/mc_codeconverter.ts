interface MachineStatus {
  ptime: string;              // "YYYY-MM-DD HH:mm:ss"
  update_at: string;          // "YYYY-MM-DD HH:mm:ss"
  mac_address: string;
  user_name: string;
  red_info: number;
  amber_info: number;
  green_info: number;
  blue_info?: number;
  white_info?: number;
  buzzer_info?: number;
  wdt_monitor_info?: number | string;
  [key: string]: any;
}
interface MachineStatusWithDiff extends MachineStatus {
  diffSeconds: number;
  diffMinutes: number;
  diffHours: number;
  diffDays: number;
  diffMonths: number;
  wdt_monitor_info: number;
  status_light: string;
}

export function mcCodeConverter(
  status: MachineStatus[],
  production_data?: any[],
): Record<string, MachineStatusWithDiff> {
  
  // 1. สร้าง Index Map สำหรับ production_data ก่อน (ลด O(N^2) เหลือ O(N))
  const prodMap = new Map();
  if (Array.isArray(production_data)) {
    for (const p of production_data) {
      prodMap.set(p.mc_code, p);
    }
  }

  // 2. ใช้ลูปสร้าง Object ตรงๆ (เร็วกว่า Object.fromEntries + map ในข้อมูลปริมาณมาก)
  const mapped: Record<string, MachineStatusWithDiff> = {};

  for (const item of status) {
    let diffSeconds = 0, diffMinutes = 0, diffHours = 0, diffDays = 0, diffMonths = 0;
    let wdt_monitor_info = Number(item.wdt_monitor_info ?? 0);
    let status_light = "UNKNOWN";

    if (item.ptime && item.update_at) {
      // ใช้ getTime() ตรงๆ เพื่อความเร็ว
      const ptimeMs = new Date(item.ptime.replace(' ', 'T')).getTime();
      const updateMs = new Date(item.update_at.replace(' ', 'T')).getTime();
      const totalSeconds = Math.floor(Math.abs(updateMs - ptimeMs) / 1000);

      diffMonths = Math.floor(totalSeconds / 2592000);
      diffDays = Math.floor((totalSeconds % 2592000) / 86400);
      diffHours = Math.floor((totalSeconds % 86400) / 3600);
      diffMinutes = Math.floor((totalSeconds % 3600) / 60);
      diffSeconds = totalSeconds % 60;

      // ✅ Logic สถานะไฟ
      if (item.green_info === 1) {
        status_light = "RUN";
      } else if (item.amber_info === 1 || item.red_info === 1) {
        status_light = "STANDBY";
      } else {
        status_light = "OFF";
      }

      if (wdt_monitor_info === 0 || (item.green_info === 0 && item.amber_info === 0 && item.red_info === 0)) {
        status_light = "OFF";
      }

      // 🔧 IoT Box Check
      if (item.user_name.includes("IoT_box") && totalSeconds > 5) {
        wdt_monitor_info = 0;
        status_light = "OFF";
      }
    }

    // ⚡️ ตรวจสอบ SCR Repair จาก Map (O(1) lookup) - จุดแก้หลัก
    const prod = prodMap.get(item.mac_address);
    if (prod?.has_scr_repair === true) {
      status_light = "MC_PROB";
    }

    // เก็บลง Object โดยใช้ mac_address เป็น Key
    mapped[item.mac_address] = {
      ...item,
      diffSeconds,
      diffMinutes,
      diffHours,
      diffDays,
      diffMonths,
      wdt_monitor_info,
      status_light,
    };
  }

  return mapped;
}