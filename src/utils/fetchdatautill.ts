import axios from "axios";
import type { OeeStatusAPIType,  wipReportAPIType , RealtimeStatusAPIType} from "../type/commontype";


export async function fetchstatusData(): Promise<RealtimeStatusAPIType> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}realtimestatus`);

        return res.data;
    }
    catch (error) {
        console.error("Error fetching OEE data:", error);
        throw error;
    }
}

export async function fetchWeblayoutData(): Promise<any> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}weblayout`);

        return res.data;
    }
    catch (error) {
        console.error("Error fetching OEE data:", error);
        throw error;
    }
}

export async function fetchoeeData(): Promise<OeeStatusAPIType> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}oee`);

        return res.data;
    }
    catch (error) {
        console.error("Error fetching OEE data:", error);
        throw error;
    }
}


export async function fetchWipData(): Promise<wipReportAPIType> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}wipreport`);
        return res.data;
    }
    catch (error) {
        console.error("Error fetching WIP Report data:", error);
        throw error;
    }
}

export async function fetchProductionData(): Promise<any> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}production`);
        return res.data;
    }
    catch (error) {
        console.error("Error fetching WIP Report data:", error);
        throw error;
    }
}



export async function fetchProductname(): Promise<any> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}production/productname`);
        return res.data;
    }
    catch (error) {
        console.error("Error fetching WIP Report data:", error);
        throw error;
    }
}


export async function fetchPlanData(): Promise<any> {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}planeditor`);
        return res.data;
    }
    catch (error) {
        console.error("Error fetching WIP Report data:", error);
        throw error;
    }
}

export async function fetchAuthData(): Promise<any> {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}auth/profile`, {
            withCredentials: true 
        });
        return res.data; 
    }
    catch (error: any) {
     
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized: Session expired or not logged in.");
            return {
                isAuthen: false,
                user: { username: '', role: '' }
            };
        }

     
        console.error("Fetch Auth Error:", error.message);
        throw error; 
    }
}


export async function fetchManpower(){
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}manpower`);
        return res.data;
    }
    catch (error) {
        console.error("Error fetching manpower data:", error);
        throw error;
    }
}