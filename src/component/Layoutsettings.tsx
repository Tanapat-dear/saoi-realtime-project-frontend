import { useState } from "react";
import { Settings2, Save, Map as MapIcon, ArrowLeft, Loader2 } from "lucide-react"; 
import { useNavigate } from "react-router"; 
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LayoutSettingsProps {
  data: any[];
}

export default function LayoutSettings({ data }: LayoutSettingsProps) {
  console.log(data)
  const normalizeData = (rawList: any[]) => {
    return rawList.map((item) => {
      let machineArray = item.machine;
      if (
        Array.isArray(machineArray) &&
        machineArray.length === 1 &&
        typeof machineArray[0] === "string" &&
        machineArray[0].startsWith("{")
      ) {
        machineArray = machineArray[0]
          .replace(/{|}/g, "")
          .split(",")
          .map((m: string) => m.replace(/^"|"$/g, "").trim())
          .map((m: string) => (m === "NULL" ? "" : m));
      } else if (Array.isArray(machineArray)) {
        machineArray = machineArray.map((m: any) => (m === null ? "" : m));
      }

      return {
        ...item,
        machine: machineArray,
      };
    });
  };

  const [layout, setLayout] = useState(() => normalizeData(data));
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
  mutationFn: async (updatedLayout: any[]) => {
    // แปลง manpower_layout จาก Array กลับเป็น String ก่อนส่งไปหา NestJS
    const formattedData = updatedLayout.map(item => ({
      ...item,
      manpower_layout: Array.isArray(item.manpower_layout) 
        ? JSON.stringify(item.manpower_layout) 
        : item.manpower_layout
    }));

    const response = await axios.post(
      "http://localhost:5076/api/weblayout/machine",
      { data: formattedData }, // ส่งข้อมูลที่แปลงแล้วไป
      { withCredentials: true }
    );
    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["auth-profile"] });
    alert("บันทึกข้อมูล Machine Layout เรียบร้อยแล้ว ✅");
  },
  onError: (error: any) => {
    console.error("Save Error:", error);
    alert("ไม่สามารถบันทึกข้อมูลได้: " + (error.response?.data?.message || "Internal Server Error"));
  },
});

  const getHeaderColor = (area: string) => {
    const name = area.toUpperCase();
    if (name.includes("1")) return "bg-blue-600";
    if (name.includes("2")) return "bg-green-600";
    if (name.includes("3")) return "bg-purple-600";
    return "bg-slate-800";
  };

  const handleChange = (itemIndex: number, mcIndex: number, value: string) => {
    setLayout((prev: any[]) =>
      prev.map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              machine: item.machine.map((mc: any, j: number) =>
                j === mcIndex ? value : mc
              ),
            }
          : item
      )
    );
  };

  const layoutByArea = layout.reduce((acc: any, item: any) => {
    if (!acc[item.area]) acc[item.area] = [];
    acc[item.area].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-screen mx-auto">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6 group mx-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Settings</span>
        </button>

        <div className="mb-8 flex justify-between items-center mx-10">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Settings2 className="w-6 h-6 text-blue-600" />
              Machine Layout Setting
            </h1>
            <p className="text-slate-500 text-sm">จัดการตำแหน่งเครื่องจักรและทางเดินในแต่ละโซน</p>
          </div>

          <button
            onClick={() => saveMutation.mutate(layout)}
            disabled={saveMutation.isPending}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg active:scale-95 ${
              saveMutation.isPending
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200"
            }`}
          >
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saveMutation.isPending ? "Saving..." : "Save Layout"}
          </button>
        </div>

        <div className="flex justify-center mx-auto overflow-x-auto pb-6">
          <div className="flex flex-row gap-8 items-start">
            {Object.entries(layoutByArea).map(([area, items]: any) => (
              <div
                key={area}
                className="flex-shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
              >
                <div className={`${getHeaderColor(area)} px-5 py-3 text-white flex items-center justify-between`}>
                  <span className="font-semibold tracking-wide uppercase text-sm">{area}</span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded text-white/90">
                    {items.length} Columns
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex flex-row gap-0">
                    {items.map((item: any, itemIdx: number) => {
                      const realIndex = layout.indexOf(item);
                      return (
                        <div key={itemIdx} className="flex flex-row">
                          <div className="flex flex-col gap-3">
                            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1 text-center">
                              Col {itemIdx + 1}
                            </div>
                            {item.machine.map((mc: any, mcIdx: number) => (
                              <div key={mcIdx} className="relative group">
                                <input
                                  type="text"
                                  value={mc}
                                  placeholder="Machine ID"
                                  onChange={(e) => handleChange(realIndex, mcIdx, e.target.value)}
                                  className="border border-slate-200 rounded-lg px-3 py-2 w-[130px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white"
                                />
                              </div>
                            ))}
                          </div>

                          {item.has_walkpath_right && (
                            <div className="mx-4 flex flex-col">
                              <div className="h-4" />
                              <div className="flex-grow w-12 bg-slate-100 rounded-lg border-x-2 border-dashed border-slate-200 flex items-center justify-center relative group">
                                <div className="rotate-90 text-[10px] font-bold text-slate-400 tracking-widest uppercase whitespace-nowrap">
                                  WALKWAY
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-blue-50/50 flex items-center justify-center">
                                  <MapIcon className="w-4 h-4 text-blue-400" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 flex gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-white border border-slate-200 rounded" /> Machine Slot
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-slate-100 border-x-2 border-dashed border-slate-200 rounded" /> Walkpath
          </div>
        </div>
      </div>
    </div>
  );
}