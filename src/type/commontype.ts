export interface apiConfigType {
    key: string,
    url: string,
    interval:number,

}
export type wipreportType = {
    id: number | string;
    product_name: string;
    process: string;
    unit: string;
    update_at: string;
    create_at: string;
    qty: number;
}

export type wipReportAPIType = {
    status: number;
    data: Array<wipreportType>;
    timestamp: string;
}

export type WipreportStatusProps = {
  data?: wipreportType[]

}

export type oeeStatusType = {
    mc_code: string;
    ptime_start: string;
    ptime_end: string;
    run_count: number;
    poweron_count: number;
    poweroff_count: number;
}

export type OeeStatusAPIType = {
    status: number;
    data: Array<oeeStatusType>;
    timestamp: string;
}
export type RealtimeStatusAPIType= {
    status: number;
    data: Array<realtimestatusType>;
    timestamp:string;
}

export interface totalstatusConfigType{
    color: string,
    label: string,
    text_color: string,
    value: number,

}

export interface mclayoutType{
    row: number,
    machine: string[],
    has_walkpath_right: boolean,
    manpower_layout: string,
    area: string,
}
export interface realtimestatusType {
    ptime: string,
    mac_address: string,
    red_info:number,
    amber_info:number,
    green_info:number,
    user_name: string,
    wdt_monitor_info: string,
    update_at: string,

}

export interface productionDataType {

  mc_code: string;
    proc_grp_name: string | null;

    // ข้อมูลจาก latest_by_mc (เป็น null ได้ถ้าไม่มี output วันนี้)
    proc_disp: string | null;
    prd_item_code: string | null;
    output_date: string | null;

    // ข้อมูลจาก sum_by_mc (ตัวเลขมักจะมาเป็น string หรือ null จาก SQL)
    sumlot_bymc: number | string | null;
    sumsht_bymc: number | string | null;

    // ข้อมูลจาก sum_output_byall (ค่ารวม)
    sumlot_byall: number | string;
    sumsht_byall: number | string;

    // ข้อมูลจาก SCR PTE Repair
    result_desc: string | null;
    rephd_no: string | null;
    
    // สถานะที่เราจะคำนวณเพิ่มเอง
    has_scr_repair: boolean;
}

export interface timestampRealtimeType{
    mc_layout:string,
    realtime_status:string,

}
export interface totalStatusComponentType {
    mclayout: Array<mclayoutType>,
    status: Array<realtimestatusType>,
    timestamp?: timestampRealtimeType,
    oeestatus?: Array<oeeStatusType>,
    production_data?: Array<productionDataType>,
    product_name?: Array<any>
}

