import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSelect from "@/components/customs/CustomSelect";
import { Button } from "@/components/ui/button";
import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InventoryTable from "@/components/table/InventoryTable";
import { useNavigate } from "react-router-dom";

export default function Inventory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const {
    data: fetchProduct,
    loading,
    error,
  } = useFetch("http://localhost:3000/api/products/fetch", []);

  function handleSearchProductReset() {
    setSearch("");
  }

  function handleSearchProduct(event) {
    setSearch(event.target.value);
  }

  console.log(fetchProduct.data);
  const inventoryColumns = [
    {
      accessorKey: "ProductName",
      header: () => <div className="text-center">Product Name</div>,
      cell: ({ row }) => {
        const product_name = row.getValue("ProductName");
        return <div className="text-left">{product_name}</div>;
      },
    },
    {
      accessorKey: "ProductTypeID",
      header: () => <div className="text-center"> Type</div>,
      cell: ({ row }) => {
        const product_type = row.getValue("ProductTypeID");
        return <div className="text-left">{product_type}</div>;
      },
    },
    {
      accessorKey: "ProgramID",
      header: () => <div className="text-center"> Program</div>,
      cell: ({ row }) => {
        // const product_program = row.getValue("ProductProgram");

        const product_program = row.getValue("ProgramID");
        return <div className="text-left">{product_program}</div>;
      },
    },
    {
      accessorKey: "ProductVariantName",
      header: () => <div className="text-center">Variant </div>,
      cell: ({ row }) => {
        const variant_name = row.getValue("ProductVariantName");
        return <div className="text-left">{variant_name || "-"}</div>;
      },
    },
    {
      accessorKey: "ProductSizeName",
      header: () => <div className="text-center">Variant </div>,
      cell: ({ row }) => {
        const size_name = row.getValue("ProductSizeName");
        return <div className="text-left">{size_name || "-"}</div>;
      },
    },

    {
      accessorKey: "ProductStockLeft",
      header: () => <div className="text-center">Stock</div>,
      cell: ({ row }) => {
        const product_stock = row.getValue("ProductStockLeft");
        return <div className="text-left">{product_stock}</div>;
      },
    },

    {
      accessorKey: "ProductStatus",
      header: () => <div className="text-center">Product Status</div>,
      // cell: ({ row }) => {
      cell: () => {
        // const product_status = row.getValue("ProductStatus");
        return (
          <div className="flex justify-center">
            <span>213</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product_id = row.getValue("ProductID");
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
                  navigate(`/admin/inventory/product-details/${product_id}`)
                }
              >
                View Product Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <>
      <section className="flex flex-1 flex-col gap-3 p-2 text-accent lg:flex-col">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <ScrollArea className="flex-1 pr-0.5">
            <div className="flex flex-wrap justify-evenly gap-5 pt-2 text-black">
              {loading && (
                <>
                  <CustomSkeleton times={20} />
                </>
              )}
              {error && (
                <div className="flex-1 text-center text-5xl font-semibold uppercase tracking-wider text-white">
                  {error.message}
                </div>
              )}

              {!loading && !error && (
                <InventoryTable
                  data={
                    fetchProduct.data === undefined ? [] : fetchProduct.data
                  }
                  columns={inventoryColumns}
                  input_search="ProductName"
                />
              )}
            </div>
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
