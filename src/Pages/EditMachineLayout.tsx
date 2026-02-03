import { useLoaderData , Await} from "react-router"
import { Suspense } from "react"
import Loadingindicator from "../component/Loadingindicator"
import Layoutsettings from "../component/Layoutsettings"


export default function EditMachineLayout(){
    const layoutdata = useLoaderData()
    console.log(layoutdata)
    return(
       <Suspense fallback={<Loadingindicator />}>
            <Await resolve={layoutdata.data}>
                {(data) => (
                <Layoutsettings data={data.data} />
                )}
            </Await>
        </Suspense>
    )
}