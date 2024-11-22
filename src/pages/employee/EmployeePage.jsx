import { Outlet } from "react-router-dom";
import { Logs } from "lucide-react";
import NavigationBar from "@/components/NavigationHeader";
import { Dialog } from "@radix-ui/react-dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CustomSideBar from "@/components/sidebar/CustomSideBar";
import {
  Activity,
  Shirt,
  ChartPie,
  House,
  BadgeDollarSign,
} from "lucide-react";
export default function EmployeePage() {
  const sidebarContent = [
    { name: "Dashboard", path: "dashboard", icon: <House /> },
    { name: "Orders", path: "orders", icon: <ChartPie /> },
    { name: "Inventory", path: "inventory", icon: <Shirt /> },
    { name: "Sales History", path: "sales-history", icon: <BadgeDollarSign /> },
    { name: "Activity History", path: "activity-history", icon: <Activity /> },
  ];
  const userRole = "Employee";
  return (
    <SidebarProvider>
      <Dialog>
        <main className="flex min-h-screen w-full overflow-auto">
          <CustomSideBar sidebarContent={sidebarContent} userRole={userRole} />
          <section className="flex h-screen w-full flex-1 flex-col">
            <NavigationBar
              triggerButton={
                <SidebarTrigger
                  className="btn btn-ghost bg-accent text-primary duration-300"
                  icon={<Logs />}
                />
              }
            />
            <main className="flex h-screen w-full overflow-auto bg-primary scrollbar scrollbar-track-gray-500 scrollbar-thumb-gray-900">
              <Outlet />
            </main>
          </section>
        </main>
      </Dialog>
    </SidebarProvider>
  );
}
