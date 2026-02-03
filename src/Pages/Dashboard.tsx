import { useQuery } from "@tanstack/react-query";
import TotalStatus from "../component/TotalStatus";
import RealtimestatusArea from "../component/RealtimestatusArea";
// import WipreportStatus from "../component/WipreportStatus";
import { fetchoeeData , fetchPlanData, fetchProductionData, fetchProductname, fetchstatusData, fetchWeblayoutData } from "../utils/fetchdatautill";
// import { fetchWipData } from "../utils/fetchdatautill";
import OutputandPlan from "../component/OutputandPlan";
import TotalManpower from "../component/TotalManpower";
import Loadingindicator from "../component/Loadingindicator";

export default function Dashboard(){
  
    const realtime_status = useQuery({queryKey: ['realtime_status'],queryFn:fetchstatusData,refetchInterval:3000})
    const weblayout = useQuery({queryKey:['web_layout'],queryFn:fetchWeblayoutData, refetchInterval:10000})
    const oee = useQuery({queryKey: ['oee_data'],queryFn: fetchoeeData,refetchInterval: 5000,});
    // const wipreport = useQuery({queryKey: ['wip_report_data'],queryFn: fetchWipData,refetchInterval: 5000,});
    const product_name = useQuery({queryKey:['productname_data'],queryFn:fetchProductname,refetchInterval:11000,})
    const production_data = useQuery({queryKey:['production_data'],queryFn:fetchProductionData,refetchInterval:5000,})
    const plan_data = useQuery({queryKey:['plan_data'], queryFn:fetchPlanData, refetchInterval: 7000})
   
    if (realtime_status.isPending || weblayout.isPending || oee.isPending || production_data.isPending){
        return <Loadingindicator />
    }
 

   
    return(
        <div className="flex flex-row justify-between w-full min-h-[90vh] px-2 pt-2">
            <div className="flex flex-col w-[16%]">
                
                    <TotalStatus mclayout={weblayout.data?.data || []} status={realtime_status.data?.data || []} production_data={production_data.data?.data || []}/>
                    <OutputandPlan outputdata={production_data.data?.data || []} mcstatus={realtime_status.data?.data || []} mclayout={weblayout.data?.data || []} plandata = {plan_data.data?.data || []}/>
                    <TotalManpower />
                
                {/* <WipreportStatus data={wipreport.data?.data} /> */}
            </div>
            <RealtimestatusArea mclayout={weblayout.data?.data || []} status={realtime_status.data?.data || []} oeestatus={oee.data?.data} production_data = {production_data.data?.data || []} product_name = {product_name.data?.data || []}/>
        </div>
    )
}