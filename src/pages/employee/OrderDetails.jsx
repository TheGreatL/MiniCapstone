import { useFetch } from "@/hooks/useFetch";
import { useParams } from "react-router-dom";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { formatCurrency } from "@/lib/functions";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import OrderBreakdownTable from "@/components/table/OrderDetailsTable";
import { ArrowUpDown } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/orders/fetch/${orderId}`,
    [],
    `Error fetching ${orderId} Data`,
  );
  const orderDetails = data.data === undefined ? [] : data.data;
  console.log("data", orderDetails);
  const columnsOrderDetailsColumns = [
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
      accessorKey: "ProductName",
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
              Product Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "ProductVariantID",
      header: () => <div className="text-center">Product Variant</div>,
      cell: ({ row }) => {
        const productVariantID = row.getValue("ProductVariantID");
        return <div className="text-center">{productVariantID}</div>;
      },
    },
    {
      accessorKey: "ProductSizeID",
      header: () => <div className="text-center">Product Size</div>,
      cell: ({ row }) => {
        const productSizeID = row.getValue("ProductSizeID");
        return <div className="text-center">{productSizeID}</div>;
      },
    },

    {
      accessorKey: "OrderQuantity",
      header: () => <div className="text-center">Order Quantity</div>,
      cell: ({ row }) => {
        const studentNumber = row.getValue("OrderQuantity");
        return <div className="text-center">{studentNumber}</div>;
      },
    },
    {
      accessorKey: "OrderStatusID",
      header: () => <div className="text-center">Order Status</div>,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <span>asdas</span>
          </div>
        );
      },
    },
    {
      accessorKey: "Sales",
      header: () => <div className="text-center">Sales</div>,
      cell: ({ row }) => {
        const sales = parseFloat(row.getValue("Sales"));
        const formatted = formatCurrency(sales);

        return <div className="text-left font-medium">{formatted}</div>;
      },
    },

    {
      accessorKey: "Total",
      header: () => <div className="text-center">Total</div>,
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("Total"));
        const formatted = formatCurrency(total);
        return <div className="text-left font-medium">{formatted}</div>;
      },
    },
  ];
  if (loading) {
    return <CustomSkeleton times={20} />;
  }
  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-white">
      <Button
        className="self-start bg-white text-black hover:bg-white/80"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
      </Button>
      <span className="text-center text-2xl font-semibold">
        Breakdown of{" "}
        {!error &&
          !loading &&
          `${orderDetails[0].UserFirstName} ${orderDetails[0].UserMiddleName} ${orderDetails[0].UserLastName}`}
        {"`"}s Order
      </span>
      <span className="text-center text-2xl font-semibold">
        Student Number: {!error && !loading && `${orderDetails[0].UserID}`}
      </span>
      <span className="text-center text-2xl font-semibold">
        Student Program:{" "}
        {!error && !loading && `${orderDetails[0].UserProgram}`}
      </span>
      <span className="text-center text-2xl font-semibold">
        Order Date:{" "}
        {!error &&
          !loading &&
          `${format(orderDetails[0].OrderDate, "MMM dd, y")}`}
      </span>
      <span className="text-center text-2xl font-semibold">
        Order Time: {!error && !loading && `${orderDetails[0].OrderTime}`}
      </span>
      {/* <ScrollArea className="z-50 flex h-[20rem] flex-1 flex-col overflow-hidden rounded-lg pr-0.5 pr-5 text-black"> */}
      <OrderBreakdownTable
        columns={columnsOrderDetailsColumns}
        data={orderDetails}
        error={error}
        input_search="ProductName"
      />
      {/* </ScrollArea> */}
    </main>
  );
}
