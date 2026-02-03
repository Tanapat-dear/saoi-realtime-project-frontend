import { Outlet } from "react-router";
import Navbar from "../component/Navbar";
import Loadingindicator from "../component/Loadingindicator";
import '../style/Navbar.css';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// ฟังก์ชันสำหรับดึงข้อมูล Profile จาก NestJS จ้ะ
const fetchProfileData = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}auth/profile`, {
        withCredentials: true,
    });
    return response.data; 
};

export default function RootLayout() {
    
    const authQuery = useQuery({
        queryKey: ['auth-profile'],
        queryFn: fetchProfileData,
        staleTime: Infinity,         
        refetchOnWindowFocus: true,    
        refetchOnMount: true,
        refetchOnReconnect: true,
        retry: (failureCount, error: any) => {
                if (error.response?.status === 401) return false;
                return failureCount < 3;
    },
        meta: {
            errorMessage: "Failed to authorize session"
        }
    });

 
    if (authQuery.isLoading) return <Loadingindicator />;

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
       
            <Navbar authData={authQuery.data} />
            
            <main className="flex-1 relative z-10">
                {/* 🛠️ ส่ง authQuery.data เป็น Context ให้หน้าลูกๆ (Dashboard, Settings) */}
                <Outlet context={authQuery.data} />
            </main>
        </div>
    );
}