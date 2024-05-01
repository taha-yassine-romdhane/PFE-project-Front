import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel,  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../components/ui/dropdown-menu.jsx";
import { Button } from "../components/ui/button.jsx";
import {Bell, LifeBuoy, LogOut, Settings, User } from 'lucide-react';
import UserApi from "../services/Api/ClientApi.js";
import { WELCOMEPAGE_ROUTE } from "../router/index.jsx";
import { useUserContext } from "../context/StudentContext.jsx";
import { useNavigate } from "react-router-dom";
import { ADMIN_PROFILE_ROUTE } from "../router/index.jsx";

export default function AdminDropDownMenu() {
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
            <DropdownMenuItem onClick={() => navigate(ADMIN_PROFILE_ROUTE)} >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          
            <DropdownMenuItem onClick={() => navigate("/AdminNotifications")}>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          
          
          <DropdownMenuItem onClick={() => navigate("/AdminSettings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
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
