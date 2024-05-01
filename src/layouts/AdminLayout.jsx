import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { Bell ,HomeIcon  } from "lucide-react";
import { SideBarAdmin } from "./SideBarAdmin.jsx";
import AdminDropDownMenu from "./AdminDropDownMenu.jsx"; // Import your StudentDropDownMenu component
import Footer from "./Footer.jsx";
import { HOME_ADMIN_ROUTE, WELCOMEPAGE_ROUTE } from "../router/index.jsx";
import { useEffect } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("ACCESS_TOKEN")) {
      navigate(HOME_ADMIN_ROUTE);
    }
  }, []);
  return (
    <>
      <header>
        <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            <Logo /> 
            <div className=" px-2 " >Admin-Dashboard</div>
          </div>
          <div>
            <ul className="flex text-white">
              <li className="mt-2 px-2 py-1">
                <Link className={"flex"} to={WELCOMEPAGE_ROUTE}>
                  <HomeIcon className={"mx-1"} />{"Welcome Page "}
                </Link>
              </li>
             
              <li className=" px-2 py-1">
                <AdminDropDownMenu />
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="flex h-screen">
        <SideBarAdmin className="flex-none h-full" />
        <div className="container mx-auto px-4 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
