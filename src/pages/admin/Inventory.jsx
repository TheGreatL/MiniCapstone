import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomSelect from "@/components/customs/CustomSelect";
import { Button } from "@/components/ui/button";
import ProcessOrderModal from "@/components/modals/ProcessOrderModal";
import { useFetch } from "@/hooks/useFetch";
import { useRef } from "react";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
import { useState } from "react";
import Products from "@/components/Products";
import { filterData } from "@/lib/functions";
import { handleOnPostOrder } from "@/lib/handleData";
import { usePost } from "@/hooks/usePost";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Inventory() {
  const navigate = useNavigate();
  const processOrderModalRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [search, setSearch] = useState("");
  const { data, loading, error } = useFetch(
    "http://localhost:3000/api/products/fetch",
    [],
  );
  const {
    data: postedData,
    loading: postLoading,
    error: postError,
    postData: postOrder,
  } = usePost(
    "http://localhost:3000/api/products/post_order",
    [],
    "Error posting order",
  );

  function handleSearchProductReset() {
    setSearch("");
  }
  async function handleOrderSubmit(event, selectedProduct, action) {
    const formData = new FormData(event.target);
    if (action === "ProcessOrder") {
      await postOrder(handleOnPostOrder(formData, selectedProduct));
    } else {
      console.log("Added To Cart");
    }
    handleSearchProductReset();
  }
  function handleSearchProduct(event) {
    setSearch(event.target.value);
  }
  function handleResetSelectedProduct() {
    setSelectedProduct({});
  }

  function handleProcessOrder(product, action) {
    setSelectedProduct(product);
    processOrderModalRef.current.open(action);
  }
  const filteredData = filterData(data.data ? data.data : [], search);

  const numSelect = [
    { id: 1, value: "ICT" },
    { id: 2, value: "BSTM" },
    { id: 3, value: "BSBA" },
    { id: 4, value: "BACOMM" },
    { id: 5, value: "BSHM" },
    { id: 6, value: "BSMOM" },
    { id: 7, value: "OTHER UNIFORMS" },
  ];

  if (postLoading) {
    return <CustomSkeleton times={20} />;
  }
  if (postedData?.message === "Order received successfully!" && !postLoading) {
    toast("Order Process Successful 🎉", {
      className: "m-5",
      description: `Placed order successfully for ${postedData.data.productID} `,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <>
      {postError && <div className="text-white">{postError?.message}</div>}
      <ProcessOrderModal
        handleOrderSubmit={handleOrderSubmit}
        handleResetSelectedProduct={handleResetSelectedProduct}
        selectedProduct={selectedProduct}
        ref={processOrderModalRef}
      />
      <section className="flex flex-1 flex-col gap-3 p-2 text-accent lg:flex-col">
        <div className="flex flex-1 flex-col gap-2 overflow-hidden">
          <div className="m-5 flex items-center gap-2 text-black">
            <Input
              onChange={handleSearchProduct}
              placeholder="Search..."
              className="flex-1"
            />

            <div className="flex flex-1 flex-col items-center gap-5 lg:flex-row">
              <CustomSelect
                options={numSelect}
                onItemSelected={() => {}}
                label={"Programs"}
              />

              <Button
                onClick={() => navigate("/admin/inventory/add-product")}
                className="bg-accent text-black duration-300 hover:bg-gray-200"
              >
                Add Product
              </Button>
              <Button
                size="lg"
                className="bg-accent text-black duration-300 hover:bg-gray-200"
              >
                <ShoppingCart />
              </Button>
            </div>
          </div>
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

              {filteredData.length !== 0 &&
                filteredData.map((product) => (
                  <Products
                    key={product.ProductID}
                    product={product}
                    handleProcessOrder={handleProcessOrder}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      </section>
    </>
  );
}
