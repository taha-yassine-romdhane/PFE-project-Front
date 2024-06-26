import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../components/ui/dropdown-menu.jsx";
import { Button } from "../components/ui/button.jsx";
import {CreditCard, LifeBuoy, LogOut, Settings, User } from 'lucide-react';
import UserApi from "../services/Api/UserApi.js";
import { WELCOMEPAGE_ROUTE } from "../router/index.jsx";
import { useUserContext } from "../context/ClientContext.jsx";
import { useNavigate } from "react-router-dom";
import { PROFILE_ROUTE } from "../router/index.jsx";

export default function ClientDropDownMenu() {
  const navigate = useNavigate();
  const { logout: contextLogout, user } = useUserContext();

  const logout = async () => {
    try {
      await UserApi.logout(); // Assuming this function clears authentication token on the server
      contextLogout(); // Clear user context
      navigate(WELCOMEPAGE_ROUTE); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <Button className="bg-gray-660 bg-opacity-90">
            <User  />
            {user.name}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate(PROFILE_ROUTE)} >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/Billing")}>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem >
            <DropdownMenuItem onClick={() => navigate("/Settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
         
         
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
