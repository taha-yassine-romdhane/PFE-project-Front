import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const AdminDashboard = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
     
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <Widget title="Module Folders" description="Manage Module IA settings and configurations." link="/Module_Folders" />
        <Widget title="Client Management" description="Manage clients, view details, and perform actions." link="/Admin/ClientManagement" />
        <Widget title="Admin Notifications" description="View and manage admin notifications and alerts." link="/AdminNotifications" />
        <Widget title="Analytics" description="Access analytics and generate reports." link="/Analytics" />
      </div>
    </div>
  );
};

const Widget = ({ title, description, link }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div style={widgetStyle}>
          <h3 style={widgetHeaderStyle}>{title}</h3>
          <p style={widgetTextStyle}>{description}</p>
          <span  className="p-2 bg-gray-700 text-white rounded shadow-md mr-2 hover:bg-gray-600  focus:ring-opacity-50">{title}</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <div style={{ padding: '20px' }}>
          <p>{description}</p>
          <Link to={link} style={{ ...widgetLinkStyle, ...{ marginTop: '20px' } }}>Go to {title}</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const widgetStyle = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};

const widgetHeaderStyle = {
  margin: '0',
  marginBottom: '10px',
};

const widgetTextStyle = {
  margin: '0',
  marginBottom: '20px',
};

const widgetLinkStyle = {
  display: 'block',
  backgroundColor: '#007bff',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AdminDashboard;