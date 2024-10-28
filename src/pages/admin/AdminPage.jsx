import { Outlet } from "react-router-dom";
import { Logs } from "lucide-react";
import NavigationBar from "@/components/NavigationHeader";
import { Dialog } from "@radix-ui/react-dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CustomSideBar from "@/components/CustomSideBar";
export default function AdminPage() {
  return (
    <SidebarProvider>
      <Dialog>
        <main className="flex min-h-screen w-full overflow-auto">
          {/* Sidebar Section */}
          <CustomSideBar />
          {/* Main Content Section */}
          <section className="flex h-screen w-full flex-1 flex-col">
            {/* Trigger outside sidebar */}

            <NavigationBar
              triggerButton={
                <SidebarTrigger
                  className="btn btn-circle btn-ghost text-accent duration-300"
                  icon={<Logs className="size-96" />} // Change the size here
                />
              }
            />

            <main className="flex h-screen w-full overflow-hidden bg-primary">
              <Outlet />
            </main>
          </section>
        </main>
      </Dialog>
    </SidebarProvider>
  );
}
