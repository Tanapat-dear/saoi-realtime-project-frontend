
import { useState } from 'react';

type ManpowerData = {
    id: string | number,
    op_id: null | undefined | string,
    op_name: null | undefined | string,
    mc_code: string,
    is_run_normal: boolean,
    is_run_ot: boolean,
    created_date: string,
    update_date: string
}

export default function ManpowerFront({ manpowerdata }: { manpowerdata: ManpowerData[] }) {
  // 1. สร้าง State สำหรับเก็บคำค้นหา
  const [searchTerm, setSearchTerm] = useState("");

  // 2. กรองข้อมูลตาม mc_code ก่อนนำไปแสดง (รองรับทั้งตัวเล็ก-ใหญ่)
  const filteredData = manpowerdata.filter((item) =>
    item.mc_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      
      {/* --- ส่วนของ Search Input --- */}
      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Search by Machine Code (e.g. R2-34)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="text-sm text-gray-500">
          Showing <b>{filteredData.length}</b> of <b>{manpowerdata.length}</b> entries
        </div>
      </div>

      {/* --- ส่วนของตาราง --- */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">MC Code</th>
              <th className="px-6 py-3">Operator</th>
              <th className="px-6 py-3 text-center">NORMAL TIME</th>
              <th className="px-6 py-3 text-center">OT TIME</th>
              <th className="px-6 py-3">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.id}</td>
                  <td className="px-6 py-4 font-bold text-blue-600">{item.mc_code}</td>
                  <td className="px-6 py-4">
                    {item.op_name ?? <span className="text-gray-400 italic">No Name</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.is_run_normal ? <span className="text-green-600 font-semibold">✅ Yes</span> : <span className="text-red-400">❌ No</span>}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.is_run_ot ? <span className="text-green-600 font-semibold">✅ Yes</span> : <span className="text-red-400">❌ No</span>}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {item.update_date}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-400 italic bg-gray-50">
                  ไม่พบข้อมูลเครื่องจักรที่ตรงกับ "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}