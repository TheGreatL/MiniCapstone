import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import UsersTable from "@/components/table/UsersTable";
export default function AccountMaintenance() {
  const {
    data: fetchData,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/users/fetch", []);

  const user_columns = [
    {
      accessorKey: "UserID",
      header: () => <div className="text-center">User ID</div>,
      cell: ({ row }) => {
        const user_id = row.getValue("UserID");
        return <div className="text-center">{user_id}</div>;
      },
    },
    {
      accessorKey: "UserFName",
      header: () => <div className="text-center">First Name</div>,
      cell: ({ row }) => {
        const user_fname = row.getValue("UserFName");
        return <div className="text-left">{user_fname}</div>;
      },
    },
    {
      accessorKey: "UserLName",
      header: () => <div className="text-center">Last Name</div>,
      cell: ({ row }) => {
        const user_lname = row.getValue("UserLName");
        return <div className="text-left">{user_lname}</div>;
      },
    },
    {
      accessorKey: "UserEmail",
      header: () => <div className="text-center">Email</div>,
      cell: ({ row }) => {
        const user_email = row.getValue("UserEmail");
        return <div className="text-left">{user_email}</div>;
      },
    },

    {
      accessorKey: "UserRole",
      header: () => <div className="text-center">Role</div>,
      cell: ({ row }) => {
        const user_role = row.getValue("UserRole");
        return <div className="text-center">{user_role}</div>;
      },
    },
  ];

  return (
    <section className="flex flex-1 flex-col gap-3 p-2 text-accent lg:flex-col">
      <div className="flex flex-1 flex-col gap-2 overflow-hidden">
        <ScrollArea className="flex-1 pr-0.5 text-black">
          <div className="space-x-5">
            <Button variant="secondary">Add User</Button>
            <Button variant="secondary">Modify Programs</Button>
          </div>
          {loading && <CustomSkeleton times={20} />}
          {error && (
            <div className="m-auto text-2xl text-white">
              Error: {error.message}
            </div>
          )}
          {!loading && !error && (
            <UsersTable
              data={fetchData.data}
              columns={user_columns}
              input_search="UserFName"
            />
          )}
        </ScrollArea>
      </div>
    </section>
  );
}
