import { useState, ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Topbar onMenuClick={toggleSidebar} />
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-muted">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
