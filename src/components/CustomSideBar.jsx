import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import {
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function CustomSideBar() {
  const navigate = useNavigate();
  const sidebarContent = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Order Status", path: "order" },
    { name: "Inventory", path: "inventory" },
    { name: "Sales History", path: "sales-history" },
    { name: "Activity History", path: "activity-history" },
    { name: "Product Category", path: "product-category" },
  ];
  return (
    <Sidebar className="border-r">
      <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
      <DialogDescription className="sr-only">{"asdasds"}</DialogDescription>
      <SidebarContent className="bg-neutral py-4">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <p>Admin</p>
                    <ChevronDown className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => navigate("/", { replace: true })}
                  >
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            {sidebarContent.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm ${isActive ? "bg-gray-600 text-white" : "hover:bg-gray-100"}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
