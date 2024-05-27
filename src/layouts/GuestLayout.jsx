import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { User, UserCog, UserCheck } from "lucide-react";
import { LOGIN_ROUTE, SIGNUP_ROUTE, LOGIN_ADMIN_ROUTE, HOME_ROUTE, HOME_ADMIN_ROUTE } from "../router/index.jsx";
import { useEffect } from "react";
import Footer from "./Footer.jsx";

export default function GuestLayout() {
  const navigate = useNavigate();
   
  useEffect(() => {
    const accessToken = window.localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      // Determine if the user is logging in from the admin login or client login
      const isLoggingInFromAdminLogin = window.localStorage.getItem(LOGIN_ADMIN_ROUTE);
      if (isLoggingInFromAdminLogin) {
        navigate(HOME_ADMIN_ROUTE);
      } else {
        navigate(HOME_ROUTE);
      }
    }
  }, [navigate]);
  
  return (
    <>
      <header>
        <div className="items-center justify-between flex bg-gray-900 bg-opacity-100 px-12 py-4 mb-4 mx-auto shadow-2xl">
          <div className="text-2xl text-white font-semibold inline-flex items-center">
            <Logo /> 
            <div className=" px-2 " >File-Extractor</div>
          </div>
          <div>
            <ul className="flex text-white">
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={LOGIN_ROUTE}>
                  <User className={"mx-1"} /> Login-client
                </Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={LOGIN_ADMIN_ROUTE} onClick={() => window.localStorage.setItem('IS_ADMIN_LOGIN', true)}>
                  <UserCog className={"mx-1"} /> Login-Admin
                </Link>
              </li>
              <li className="ml-5 px-2 py-1">
                <Link className={"flex"} to={SIGNUP_ROUTE}>
                  <UserCheck className={"mx-1"} /> Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="flex h-screen">
        <div className="container mx-auto px-4 overflow-y-auto">
          <Outlet />
        </div>
      </main>
      <Footer/>
    </>
  );
}
