import { Outlet } from "react-router-dom";
import { Logs } from "lucide-react";
import NavigationBar from "@/components/NavigationHeader";
import { Dialog } from "@radix-ui/react-dialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import CustomSideBar from "@/components/sidebar/CustomSideBar";
export default function AdminPage() {
  return (
    <SidebarProvider>
      <Dialog>
        <main className="flex min-h-screen w-full overflow-auto">
          <CustomSideBar />
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
