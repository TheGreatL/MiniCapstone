import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatCurrency } from "@/lib/functions";
import { MoreHorizontal } from "lucide-react";
import SalesHistoryTable from "@/components/table/SalesHistoryTable";
export default function SalesHistory() {
  const OrderStatusData = [
    {
      or_date: "2024-04-01",
      or_no: "95730102024309924",

      sales: 20000,
      total: 200000,
    },
    {
      or_date: "2023-05-01",
      or_no: "95730102024309925",
      sales: 20000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309926",
      sales: 2000,
      total: 20000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309927",
      sales: 2000,
      total: 20000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309928",
      sales: 200000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "95730102024309929",
      sales: 200000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "957301020243099210",
      sales: 200000,
      total: 200000,
    },
    {
      or_date: "2023-04-01",
      or_no: "957301020243099211",
      sales: 2000000,
      total: 20000000,
    },
    {
      or_date: "2023-04-01",
      or_no: "9573010202430992",
      sales: 200000,
      total: 200000,
    },
  ];

  const SalesHistoryColumns = [
    {
      accessorKey: "or_no",
      header: () => <div className="text-center">OR NO</div>,
      cell: ({ row }) => {
        const or_no = row.getValue("or_no");
        return <div className="text-center">{or_no}</div>;
      },
    },
    {
      accessorKey: "or_date",
      header: () => <div className="flex justify-center">Or Date</div>,
      cell: ({ row }) => {
        const formattedDate = format(row.getValue("or_date"), "MMM dd, y");

        return <div className="text-center">{formattedDate}</div>;
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
      accessorKey: "transaction_person",
      header: () => <div className="text-center">Transaction Person</div>,
      cell: ({ row }) => {
        const transaction_person = row.getValue("transaction_person");
        return (
          <div className="text-center">{transaction_person || "Maam Kim"}</div>
        );
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
        const payment = row.original;

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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <section className="h flex-1 flex-col gap-3 p-2 lg:flex-col">
      <div className="flex flex-1">
        <SalesHistoryTable
          data={OrderStatusData}
          columns={SalesHistoryColumns}
          input_search="or_no"
        />
      </div>
    </section>
  );
}
