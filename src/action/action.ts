import type { ActionFunctionArgs } from "react-router-dom";
import axios from "axios";

export async function planEditorAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  const payload = {
    mc_plan: Number(formData.get("mc_plan")),
    man_plan: Number(formData.get("man_plan")),
    output_lot_plan: Number(formData.get("output_lot_plan")),
    output_sht_plan: Number(formData.get("output_sht_plan")),
  };

  try {
    // เพิ่ม { withCredentials: true } เพื่อให้ส่ง Cookie (HttpOnly) ไปกับ Request
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}planeditor`, 
      payload,
      {
        withCredentials: true,
      }
    );
    
    return { success: true, data: response.data }; 

  } catch (error: any) {
    return { 
      success: false,
      error: error.response?.data?.message || "Cannot connect to server" 
    };
  }
}