import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button.jsx";
import { Folder } from 'lucide-react';
import { Settings  } from 'lucide-react';
import { Bell } from 'lucide-react';
import { BarChart } from 'lucide-react';
import { Users } from "lucide-react";
import { Home } from 'lucide-react';

import { useNavigate } from "react-router-dom";
import { HOME_ADMIN_ROUTE,MANAGEMENT_ROUTE,ADMIN_NOTIFICATIONS_ROUTE,ANALYTICS_ROUTE,ADMIN_SETTINGS_ROUTE,CLIENTS_MANAGEMNET_ROUTE } from "../router/index.jsx";


export function SideBarAdmin({ className }) {
  const navigate = useNavigate();

  return (
    <div className={cn("pb-12", className)}>
      <div className="flex flex-col h-full w-64 bg-gray-200">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu 
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(HOME_ADMIN_ROUTE)}>
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/Module_Folders')}>
              <Folder className="mr-2 h-4 w-4" /> Module Folders
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(CLIENTS_MANAGEMNET_ROUTE)}>
              <Users  className="mr-2 h-4 w-4" /> Clients Management
            </Button>
           
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(ANALYTICS_ROUTE)}>
              <BarChart className="mr-2 h-4 w-4" /> Analytics
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(ADMIN_SETTINGS_ROUTE)}>
              <Settings  className="mr-2 h-4 w-4" /> Settings
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Need Help ? 
          </h2>
          <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(ADMIN_SETTINGS_ROUTE)}>
              <Settings  className="mr-2 h-4 w-4" /> Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
