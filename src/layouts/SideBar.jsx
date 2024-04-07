import { cn } from "@/lib/utils";
import { Button } from "../components/ui/button.jsx";
import { Folder } from 'lucide-react';
import { Settings  } from 'lucide-react';
import { Bell } from 'lucide-react';
import { BarChart } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { Info } from 'lucide-react';
import { MessageCircle } from 'lucide-react';
import { Home } from 'lucide-react';
import { Euro  } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../router/index.jsx";

export function SideBar({ className }) {
  const navigate = useNavigate();

  return (
    <div className={cn("pb-12", className)}>
      <div className="flex flex-col h-full w-64 bg-gray-200">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu 
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate(HOME_ROUTE)}>
              <Home className="mr-2 h-4 w-4" /> Home
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/FileManagement')}>
              <Folder className="mr-2 h-4 w-4" /> File Management
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/Billing')}>
              <Euro  className="mr-2 h-4 w-4" />  Billing
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/Notifications')}>
              <Bell className="mr-2 h-4 w-4" /> Notifications
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/Settings')}>
              <Settings  className="mr-2 h-4 w-4" /> Settings
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Need Help ? 
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/help-center')}>
              <HelpCircle className="mr-2 h-4 w-4" /> Help Center
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/about')}>
              <Info className="mr-2 h-4 w-4" /> About
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/contact')}>
              <MessageCircle className="mr-2 h-4 w-4" /> Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
