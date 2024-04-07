
import { Link,Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { HomeIcon } from "lucide-react";
import { SideBar } from "./SideBar.jsx";
import StudentDropDownMenu from "./StudentDropDownMenu.jsx"; // Import your StudentDropDownMenu component
import Footer from "./Footer.jsx";
import { WELCOMEPAGE_ROUTE,LOGIN_ROUTE } from "../router/index.jsx";

export default function Layout() {

   



  return (
    <>
      <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          <Logo/>  File-Extractor
        </div>
        <div>
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={WELCOMEPAGE_ROUTE}><HomeIcon className={'mx-1'}/> Welcome Page</Link>
            </li>
         
            
            <li className="ml-5 px-2 py-1">
                <StudentDropDownMenu /> 
              </li>
          </ul>
        </div>
      </div>
      </header>
      <main className="flex h-screen">
        <SideBar className="flex-none h-full" />
        <div className="container mx-auto px-4 overflow-y-auto">
          <Outlet />
        </div>
        
        
      </main> 
      <Footer/>
    </> 
  );
  
}
