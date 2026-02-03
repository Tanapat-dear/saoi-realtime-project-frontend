import type { totalStatusComponentType } from "../type/commontype";
import RealtimeStatus from "./RealtimeStatus";


export default function RealtimestatusArea({ mclayout , status , oeestatus , production_data, product_name}: totalStatusComponentType){
 
    return(
        <div className="border-2 border-black w-full justify-between flex flex-col bg-gray-100"> 
            <div className="p-0.5">
                <RealtimeStatus mclayout={mclayout} status={status} oeestatus={oeestatus} production_data={production_data} product_name={product_name}/>
            </div>
        </div>
    )
}