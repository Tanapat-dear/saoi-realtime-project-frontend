import type { mclayoutType } from "../type/commontype"

export default function ManpowerMaintenance( { data }: { data: Array<mclayoutType> } ){
    console.log(data)
    return(
        <div>
            Manpower Maintenance Page
        </div>
    )
}