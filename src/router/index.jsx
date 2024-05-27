import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from "../pages/Login.jsx";
import AdminLogin from "../components/AdminLogin/AdminLogin.jsx";
import Signup from "../pages/Signup.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layouts/Layout.jsx";
import GuestLayout from "../layouts/GuestLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";
import ClientDashboard from "../components/Admin/ClientDashboard.jsx";
import AdminDashboard from "../components/Admin/AdminDashboard.jsx"
import FileManagement from "../pages/Client_document/FileManagement.jsx";
import WelcomePage from "../pages/WelcomePage.jsx";
import Billing from "../pages/Client_document/Billing.jsx";
import Notifications from "../pages/Client_document/Notifications.jsx";
import Analytics from "../pages/Admin_pages/Analytics.jsx";
import Settings from "../pages/Client_document/SettingsPage.jsx";
import AdminSettings from "../pages/Admin_pages/AdminSettingsPage.jsx";  
import ProfilePage from "../pages/Client_document/ProfilePage.jsx";
import ModuleIAManagement from "../pages/Client_document/ModuleIAManagement.jsx";
import AdminProfilePage from "../pages/Admin_pages/AdminProfilePage.jsx";
import ClientManagement from "../pages/Admin_pages/ClientManagementFolder/ClientManagement.jsx";
import DocumentsPage from "../pages/Client_document/homePageClient/DocumentsPage.jsx";
import Archives from "../pages/Client_document/Archives.jsx";
import Module_Folders from "../pages/Admin_pages/Module_Folders.jsx";
import FolderManagementPage from "../pages/Client_document/FolderManagementClient/FolderManagement.jsx";
export const CLIENTS_MANAGEMNET_ROUTE = '/Admin/ClientManagement';
export const LOGIN_ROUTE = '/Client/login';
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
export const PROFILE_ROUTE = '/ProfilePage';
export const MANAGEMENT_ROUTE='/ModuleIAManagement';
export const ADMIN_NOTIFICATIONS_ROUTE='/AdminNotifications';
export const ADMIN_PROFILE_ROUTE='/AdminProfilePage';


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
            path: '/FolderManagement',
            element: <FolderManagementPage/>
          },
          {
            path: '/documents',
            element: <DocumentsPage/>
          },
          {
            path: '/Archives',
            element: <Archives/>
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
            path: '/Module_Folders',
            element: <Module_Folders/>
            
          }, 
          {
            path: ADMIN_PROFILE_ROUTE,
            element: <AdminProfilePage/>
          },
          {
            path: CLIENTS_MANAGEMNET_ROUTE,
            element: <ClientManagement/>
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
