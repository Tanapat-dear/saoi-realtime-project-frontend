
import './App.css'
import RootLayout from './component/Rootlayout';
import Dashboard from './Pages/Dashboard'
import ErrorPage from './Pages/ErrorPage';

import EditMachineLayout from './Pages/EditMachineLayout';
import Editmanpower from './Pages/Editmanpower';
import Manpower from './Pages/ManpowerPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter , RouterProvider } from 'react-router';
import { initial_loader, machine_layoutloader, manpower_layoutloader, planeditor_loader, settingpage_loader } from './loader/loader';
import EditOutputPlan from './Pages/EditOutputPlan';
import { planEditorAction } from './action/action';
import LoginPage from './Pages/LoginPage';
import SettingsPage from './Pages/SettingsPage';
import NotFound from './Pages/NotFound';
const queryClient = new QueryClient()

let router = createBrowserRouter([
  {
    path:"/",
    element: <RootLayout />,
 
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/auth/login",
        element: <LoginPage />
      },
      {
        path: "/manpower",
        element: <Manpower />
      },
      {
        path: "/settings",
        element: <SettingsPage />,
        loader: settingpage_loader
      },
      {
        path: "/settings/editmanpower",
        element: <Editmanpower />,
        loader: manpower_layoutloader,
      },
      {
        path:"/settings/editmachinelayout",
        element: <EditMachineLayout />,
        loader: machine_layoutloader,
      },
        {
        path:"/settings/editoutputplan",
        element: <EditOutputPlan />,
        loader: planeditor_loader,
        action: planEditorAction
      },
      {
        path:'*',
        element: <NotFound />
      }
      
    ]
  },
  {
  }
])

function App() {
  

  return (
    <>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
      
    </>
  )
}

export default App
