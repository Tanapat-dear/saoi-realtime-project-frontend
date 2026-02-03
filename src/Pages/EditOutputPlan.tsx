import PlanEditor from "../component/Planeditor";
import { useLoaderData } from "react-router";
import { Suspense } from "react";
import Loadingindicator from "../component/Loadingindicator";
import { Await } from "react-router";

export default function EditOutputPlan(){
    const data = useLoaderData();
    return(
         <Suspense fallback={<Loadingindicator />}>
            <Await resolve={data.plandata}>
                 {(planData) => (
                          <div>
                            <PlanEditor plandata={planData.data}/>
                          </div>
                        )}
                 
            </Await>
        </Suspense>
        
    )
}