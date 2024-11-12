import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import ActivityHistoryTable from "@/components/table/ActivityHistoryTable";
export default function ActivityHistory() {
  const ActivityHistoryData = [
    {
      activity_date: "2023-01-01",
      activity_type: "Order Placed",
      activity_description: "Order #1234 was placed on 01/01/2023",
    },
    {
      activity_date: "2023-02-01",
      activity_type: "Order Shipped",
      activity_description: "Order #1234 was shipped on 02/01/2023",
    },
    {
      activity_date: "2023-03-01",
      activity_type: "Order Delivered",
      activity_description: "Order #1234 was delivered on 03/01/2023",
    },
  ];
  const SalesHistoryColumns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "activity_date",
      header: ({ column }) => {
        return (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              onClick={() => {
                column.toggleSorting(column.getIsSorted() === "asc");
                console.log(column.getIsSorted());
              }}
            >
              Activity Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const formattedDate = format(
          row.getValue("activity_date"),
          "MMMM dd, y",
        );
        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "activity_type",
      header: <div className="text-center">Activity Type</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">{row.getValue("activity_type")}</div>
        );
      },
    },
    {
      accessorKey: "activity_description",
      header: <div className="text-center">Activity Description</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.getValue("activity_description")}
          </div>
        );
      },
    },
  ];
  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1">
        <ActivityHistoryTable
          data={ActivityHistoryData}
          columns={SalesHistoryColumns}
          input_search="activity_date"
        />
      </div>
    </section>
  );
}
