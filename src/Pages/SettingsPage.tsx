import { Suspense } from "react";
import { useLoaderData, Await } from "react-router";
import Settings from "../component/Settings";
import Loadingindicator from "../component/Loadingindicator";
// import LoadingIndicator from "../component/LoadingIndicator"; // อย่าลืมตัว Loading นะจ๊ะ

export default function SettingsPage() {

  const data = useLoaderData() as { auth: Promise<any> };
 
  return (
    <Suspense fallback={<div className="min-h-[92vh]"><Loadingindicator /></div>}>
      <Await resolve={data.auth}>
        {(authData) => (
          <div>
            <Settings authData={authData} />
          </div>
        )}
      </Await>
    </Suspense>
  );
}