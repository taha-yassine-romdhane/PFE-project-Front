import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { HomeIcon } from "lucide-react";
import { SideBar } from "./SideBar.jsx";
import ClientDropDownMenu from "./ClientDropDownMenu.jsx"; // Import your StudentDropDownMenu component
import Footer from "./Footer.jsx";
import { WELCOMEPAGE_ROUTE, LOGIN_ROUTE } from "../router/index.jsx";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            <Logo /> 
            <div className=" px-2 " >File-Extractor</div>
          </div>
          <div>
            <ul className="flex text-white">
              <li className="mt-2 px-2 py-1">
                <Link className={"flex"} to={""}>
                  <HomeIcon className={"mx-1"} />{""}
                </Link>
              </li>
              <li className=" px-2 py-1">
                <ClientDropDownMenu />
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
      <Footer />
    </>
  );
}
