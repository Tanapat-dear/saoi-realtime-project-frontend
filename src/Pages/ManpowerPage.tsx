import Manpowerfront from "../component/Manpowerfront";
import { useQuery } from "@tanstack/react-query";
import { fetchManpower } from "../utils/fetchdatautill";
import Loadingindicator from "../component/Loadingindicator";

export default function Manpower(){

    const manpower = useQuery({queryKey:['manpower_op'],queryFn:fetchManpower,refetchOnMount:true, refetchOnReconnect:true, refetchOnWindowFocus:true})
    console.log(manpower.data?.data)
    if (manpower.isLoading){
        return <Loadingindicator />
    }
    return(
        <div>
            <Manpowerfront manpowerdata={manpower.data?.data}/>
        </div>
    )
}