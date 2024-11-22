import { useFetch } from "@/hooks/useFetch";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/functions";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MyCustomTable from "@/components/OrdersTable";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useNavigate } from "react-router-dom";
import OrdersTable from "@/components/OrdersTable";
export default function Orders() {
  const navigate = useNavigate();
  const {
    data: orderedData,
    loading,
    error,
  } = useFetch(
    "http://localhost:3000/api/orders/fetch",
    [],
    "Error fetching Orders",
  );
  const newOrderedData = [];
  function reareangeData(passedData) {
    if (!passedData) return;

    for (let i = 0; i < passedData.length; i++) {
      newOrderedData.push({
        or_date: passedData[i].OrderDate,
        or_no: passedData[i].OrderID,
        status: passedData[i].OrderStatusID,
        sales: passedData[i].Sales,
        total: passedData[i].TotalPrice,
        s_name: ` ${passedData[i].UserFirstName} ${passedData[i].UserMiddleName} ${passedData[i].UserLastName}`,
        s_program: passedData[i].UserProgram,
        s_no: passedData[i].UserID,
      });
    }
  }
  reareangeData(orderedData?.data);
  console.log("Orders Page", orderedData);
  const orderStatusColumn = [
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
      accessorKey: "or_date",
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
              Or Date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
      cell: ({ row }) => {
        const formattedDate = format(row.getValue("or_date"), "MMM dd, y");

        return <div className="text-center">{formattedDate}</div>;
      },
    },
    {
      accessorKey: "s_no",
      header: () => <div className="text-center">Student Number</div>,
      cell: ({ row }) => {
        const studentNumber = row.getValue("s_no");
        return <div className="text-center">{studentNumber}</div>;
      },
    },
    {
      accessorKey: "s_name",

      header: () => <div className="flex justify-center">Student Name</div>,
      cell: ({ row }) => {
        const name = row.getValue("s_name");
        return <div className="text-center">{name}</div>;
      },
    },
    {
      accessorKey: "s_program",
      header: () => <div className="text-center">Program</div>,
      cell: ({ row }) => {
        const program = row.getValue("s_program");
        return <div className="text-center">{program}</div>;
      },
    },
    {
      accessorKey: "or_no",
      header: () => <div className="text-center">Order Number</div>,
      cell: ({ row }) => {
        const orderNumber = row.getValue("or_no");
        return <div className="text-center">{orderNumber}</div>;
      },
    },
    {
      accessorKey: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <span>asdjashjd</span>
          </div>
        );
      },
    },
    {
      accessorKey: "sales",
      header: () => <div className="text-center">Sales</div>,
      cell: ({ row }) => {
        const sales = parseFloat(row.getValue("sales"));
        const formatted = formatCurrency(sales);

        return <div className="text-left font-medium">{formatted}</div>;
      },
    },

    {
      accessorKey: "total",
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total"));
        const formatted = formatCurrency(total);
        return <div className="text-left font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const orderNumber = row.getValue("or_no");

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigate(`/admin/orders/order-details/${orderNumber}`)
                }
              >
                View Order Breakdown
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <section className="flex h-full flex-1 flex-col gap-3 bg-white p-2 lg:flex-col">
      <span>Orders</span>
      {/* <div className="flex flex-1 outline">
        {loading && <CustomSkeleton times={5} />}
        {error && (
          <div className="text-2xl text-white">Error: {error.message}</div>
        )}
        {!loading && !error && (
          <OrdersTable
            data={newOrderedData}
            columns={orderStatusColumn}
            input_search="s_name"
          />
        )}
      </div> */}
    </section>
  );
}
