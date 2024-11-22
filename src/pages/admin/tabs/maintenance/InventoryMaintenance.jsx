import { ScrollArea } from "@/components/ui/scroll-area";

import { useFetch } from "@/hooks/useFetch";
import CustomSkeleton from "@/components/customs/CustomSkeleton";

import InventoryTable from "@/components/table/InventoryTable";

export default function InventoryMaintenance() {
  const {
    data: fetchData,
    loading,
    error,
    setData,
  } = useFetch("http://localhost:3000/api/products/fetch", []);
  console.log(fetchData);
  const inventoryColumns = [
    {
      accessorKey: "ProductName",
      header: () => <div className="text-center"> Name</div>,
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
        return <div className="text-center">{product_type}</div>;
      },
    },
    {
      accessorKey: "ProgramLevel",
      header: () => <div className="text-center">Level</div>,
      cell: ({ row }) => {
        const product_level = row.getValue("ProgramLevel");
        return (
          <div className="text-center">
            {product_level === "TR" ? "Tertiary" : "Senior High"}
          </div>
        );
      },
    },
    {
      accessorKey: "ProductProgram",
      header: () => <div className="text-center"> Program</div>,
      cell: ({ row }) => {
        const product_program = row.getValue("ProductProgram");

        return <div className="text-center">{product_program}</div>;
      },
    },
    {
      accessorKey: "P_AttributeValue",
      header: () => <div className="text-center">Variant </div>,
      cell: ({ row }) => {
        const variant_name = row.getValue("P_AttributeValue");
        return <div className="text-center">{variant_name || "-"}</div>;
      },
    },
    {
      accessorKey: "P_AttributeSize",
      header: () => <div className="text-center">Size</div>,
      cell: ({ row }) => {
        const size_name = row.getValue("P_AttributeSize");
        return <div className="text-center">{size_name || "-"}</div>;
      },
    },

    {
      accessorKey: "Product_StockCondition",
      header: () => <div className="text-center">Stock Level </div>,
      cell: ({ row }) => {
        const product_status = row.getValue("Product_StockCondition");
        let badgeColor = "";
        if (product_status === "HIGH") badgeColor = "badge-success";
        else if (product_status === "MEDIUM") badgeColor = "badge-warning";
        else if (product_status === "LOW") badgeColor = "badge-error";
        else badgeColor = "badge-neutral";
        return (
          <div className="flex justify-center">
            <span
              className={`badge font-semibold tracking-wider text-white ${badgeColor}`}
            >
              {product_status}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Product_StockLeft",
      header: () => <div className="text-center">Stock Left</div>,
      cell: ({ row }) => {
        const product_stock = row.getValue("Product_StockLeft");
        const productAttributeID = row.original.P_StockID;

        const handleStockChange = (event) => {
          console.log(productAttributeID);
          console.log(event.target.value);
        };
        return (
          <div className="flex items-center justify-center gap-2 text-center">
            {/* <Button size="icon" className="text-white">
              <Plus />
            </Button> */}
            <input
              type="number"
              className="input ring-2 ring-black focus-within:ring-black"
              defaultValue={product_stock}
              onBlur={handleStockChange}
            />
            {/* <Button size="icon">
              <Minus />
            </Button> */}
          </div>
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
                  data={fetchData.data}
                  columns={inventoryColumns}
                  setData={setData}
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
