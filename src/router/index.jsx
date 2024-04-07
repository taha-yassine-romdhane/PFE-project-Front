import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login.jsx";
import AdminLogin from "../components/Login/AdminLogin.jsx";
import Signup from "../pages/Signup.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layouts/Layout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ClientDashboard from "../components/Admin/ClientDashboard.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx"
import FileManagement from "../pages/FileManagement.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import Billing from "../pages/Billing.jsx";
import Notifications from "../pages/Notifications.jsx";
import Analytics from "../pages/Analytics.jsx";
import Settings from "../pages/SettingsPage.jsx";
import AdminSettings from "../pages/AdminSettingsPage.jsx";  
import ProfilePage from "../pages/ProfilePage.jsx";
import ModuleIAManagement from "../pages/ModuleIAManagement.jsx";
export const LOGIN_ROUTE = '/login';
export const LOGIN_ADMIN_ROUTE = '/Admin/Login';
export const SIGNUP_ROUTE = '/signup';
export const WELCOMEPAGE_ROUTE = '/';
export const FILEMANAGEMENT_ROUTE = '/FileManagement';
export const BILLING_ROUTE = '/Billing';
export const NOTIFICATIONS_ROUTE = '/Notifications';
export const ANALYTICS_ROUTE = '/Analytics';
export const SETTINGS_ROUTE = '/Settings';
export const ADMIN_SETTINGS_ROUTE = '/AdminSettings';
export const HOME_ROUTE = '/Client/dashboard';
export const HOME_ADMIN_ROUTE = '/Admin/dashboard'
export const PROFILE_ROUTE = '/ProfilePage'
export const MANAGEMENT_ROUTE='/ModuleIAManagement'
export const ADMIN_NOTIFICATIONS_ROUTE='AdminNotifications'
//ProfilePage

const router = createBrowserRouter([


    {
        element:<GuestLayout/>,
        children: 
        [  
           
            {
                path:LOGIN_ROUTE,
                element:<Login/>
            },
            {
              path:LOGIN_ADMIN_ROUTE,
              element:<AdminLogin/>
            },
            {
                path:SIGNUP_ROUTE,
                element:<Signup/>
            },
           
            {
                path:'*',
                element:<NotFound/>
            },
            {
                path:WELCOMEPAGE_ROUTE,
                element:<WelcomePage/>
            },
         
        ]
        

    },
    {
        element: <Layout/>,
        children: [
          {
            path: HOME_ROUTE,
            element: <ClientDashboard/>
          }, 
          {
            path: PROFILE_ROUTE,
            element: <ProfilePage/>
          },
          {
            path:FILEMANAGEMENT_ROUTE,
            element: <FileManagement/>
          },
          {
            path:BILLING_ROUTE,
            element: <Billing/>
          },
          {
            path: NOTIFICATIONS_ROUTE,
            element: <Notifications/>
          },
          {
            path: SETTINGS_ROUTE,
            element: <Settings/>
          },
        ]
      },
      {
        element: <AdminLayout/>,
        children: [
          {
            path: HOME_ADMIN_ROUTE,
            element: <AdminDashboard/>
            
          }, 
          {
            path: PROFILE_ROUTE,
            element: <ProfilePage/>
          },
          {
            path:MANAGEMENT_ROUTE,
            element: <ModuleIAManagement/>
          },
       
          {
            path: ADMIN_NOTIFICATIONS_ROUTE,
            element: <Notifications/>
          },
          {
            path:ANALYTICS_ROUTE,
            element: <Analytics/>
          },
          {
            path: ADMIN_SETTINGS_ROUTE,
            element: <AdminSettings/>
          },
        ]

      }
   
   
])
export default router; 