import { useLoaderData , Await} from "react-router";
import { Suspense } from "react";
import ManpowerMaintenance from "../component/ManpowerMaintenance";
import Loadingindicator from "../component/Loadingindicator";
export default function Editmanpower() {
    const manpower_layout = useLoaderData();
    console.log(manpower_layout);
    return (
        <Suspense fallback={<Loadingindicator />}>
            <Await resolve={manpower_layout.data}>
                {(data) => (
                <ManpowerMaintenance data={data.data} />
                )}
            </Await>
        </Suspense>
    )
}