import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useInput } from "@/hooks/useInput";
import Input from "@/components/Input";
import SelectModal from "@/components/modals/SelectModal";
import { usePost } from "@/hooks/usePost";
import { toast } from "sonner";
import CustomSkeleton from "@/components/customs/CustomSkeleton";
export default function AddProduct() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    data: product,
    loading,
    error,
    postData: postProduct,
  } = usePost("http://localhost:3000/api/products/post/new_product", null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreview(reader.result); // Set preview of the image
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid image file.");
    }
  };
  const {
    value: productName,
    handleInputChange: handleProductNameChange,
    handleInputBlur: handleProductNameBlur,
    hasError: productNameHasError,
  } = useInput("", () => true);

  const {
    value: productID,
    handleInputChange: handleProductIDChange,
    handleInputBlur: handleProductIDBlur,
    hasError: productIDHasError,
  } = useInput("", () => true);

  const {
    value: productDescription,
    handleInputChange: handleProductDescriptionChange,
    handleInputBlur: handleProductDescriptionBlur,
    hasError: productDescriptionHasError,
  } = useInput("", () => true);
  const {
    value: productType,
    handleInputChange: handleProductTypeChange,
    handleInputBlur: handleProductTypeBlur,
    hasError: productTypeHasError,
  } = useInput("", (value) => value !== "-");

  if (product?.message === "Product Posting successfull" && !error) {
    toast("Created  Product Successful 🎉", {
      className: "m-5",
      description: `Placed Product successfully  `,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }
  if (loading) {
    <CustomSkeleton times={20} />;
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const productSizes = formData.getAll("product-sizes");
    const productPrice = formData.getAll("product-price");
    const productStocks = formData.getAll("product-stocks");
    const productVariant = formData.getAll("product-variant");
    const data = Object.fromEntries(formData.entries());
    data["product-sizes"] = productSizes;
    data["product-price"] = productPrice;
    data["product-variant"] = productVariant;
    data["product-stocks"] = productStocks;

    const basicProductData = {
      ProductID: data["product-id"],
      ProductName: data["product-name"],
      ProductDescription: data["product-description"],
      ProductType: data["product-type"],
      ProductStockID: `${data["product-id"]}_STOCK`,
    };
    const formatPostProduct = (productType) => {
      if (
        productType === "GENERAL_TOP_ATTIRE" ||
        productType === "GENERAL_BOTTOM_ATTIRE" ||
        productType === "OTHER_PRODUCTS"
      ) {
        const variantsData = data["product-variant"].map((variant) => {
          const array = data["product-sizes"].map((size, index) => {
            return {
              ProductSizeID: size,
              ProductPrice: data["product-price"][index],
              ProductStockLeft: data["product-stocks"][index],
              productVariant: variant || "NULL",
            };
          });
          return [...array];
        });
        return {
          ...basicProductData,
          ProductVariants: variantsData.reduce((acc, curr) => {
            return acc.concat(curr);
          }, []),
        };
      } else if (
        productType === "MISCELLANEOUS" ||
        productType === "UNIFORM_ACCESSORIES"
      ) {
        const variantsData = [
          {
            ProductSizeID: "NULL",
            ProductPrice: data["product-price"][0],
            ProductStockLeft: data["product-stocks"][0],
            productVariant: "NULL",
          },
        ];
        return {
          ...basicProductData,
          ProductVariants: variantsData,
        };
      } else {
        const variantsData = data["product-sizes"].map((size, index) => {
          return {
            ProductSizeID: size,
            ProductPrice: data["product-price"][index],
            ProductStockLeft: data["product-stocks"][index],
            productVariant: data["product-variant"][index] || "NULL",
          };
        });
        return {
          ...basicProductData,
          ProductVariants: variantsData,
        };
      }
    };
    await postProduct(formatPostProduct(data["product-type"]));
    //  console.log(
    //   "reconstructData",
    //   formatPostProduct(data["product-type"]),
    // );
  }

  const customInputs = [];

  if (
    productType === "GENERAL_TOP_ATTIRE" ||
    productType === "GENERAL_BOTTOM_ATTIRE"
  ) {
    const genderOptions = [
      { label: "Male", value: "ML" },
      { label: "Female", value: "FM" },
    ];
    customInputs.push({
      id: "product-gender",
      value: (
        <div className="flex flex-wrap gap-5">
          {genderOptions.map((size) => (
            <div
              key={size.value}
              className="flex items-center justify-center gap-5"
            >
              <input
                type="checkbox"
                id={size.value}
                name="product-variant"
                value={size.value}
                className="checkbox-accent checkbox"
              />
              <label htmlFor={size.value} className="label-text text-white">
                {size.label}
              </label>
            </div>
          ))}
        </div>
      ),
    });
  }
  // if (
  //   productType !== "UNIFORM_ACCESSORIES" &&
  //   productType !== "MISCELLANEOUS" &&
  //   productType !== "OTHER_PRODUCTS" &&
  //   productType !== "-"
  // ) {
  //   const sizes = [
  //     { label: "Small", value: "S", price: "S-Price", stock: "S-Stock" },
  //     { label: "Medium", value: "M", price: "M-Price", stock: "M-Stock" },
  //     { label: "Large", value: "L", price: "L-Price", stock: "L-Stock" },
  //     {
  //       label: "Extra Large",
  //       value: "XL",
  //       price: "XL-Price",
  //       stock: "XL-Stock",
  //     },
  //     {
  //       label: "2 Extra Large",
  //       value: "2XL",
  //       price: "2XL-Price",
  //       stock: "2XL-Stock",
  //     },
  //     {
  //       label: "3 Extra Large",
  //       value: "3XL",
  //       price: "3XL-Price",
  //       stock: "3XL-Stock",
  //     },
  //     {
  //       label: "4 Extra Large",
  //       value: "4XL",
  //       price: "4XL-Price",
  //       stock: "4XL-Stock",
  //     },
  //     {
  //       label: "5 Extra Large",
  //       value: "5XL",
  //       price: "5XL-Price",
  //       stock: "5XL-Stock",
  //     },
  //     {
  //       label: "6 Extra Large",
  //       value: "6XL",
  //       price: "6XL-Price",
  //       stock: "6XL-Stock",
  //     },
  //     {
  //       label: "7 Extra Large",
  //       value: "7XL",
  //       price: "7XL-Price",
  //       stock: "7XL-Stock",
  //     },
  //   ];
  //   customInputs.push({
  //     id: "product-sizes",
  //     value: (
  //       <div className="flex h-[40rem] flex-col flex-wrap gap-5 text-white">
  //         <span className="text-lg font-bold">Product Sizes</span>
  //         {sizes.map((size) => (
  //           <div
  //             key={size.value}
  //             className="flex items-center justify-center gap-5"
  //           >
  //             <input
  //               type="checkbox"
  //               id={size.value}
  //               name={size.value}
  //               value={size.value}
  //               className="checkbox-accent checkbox"
  //             />
  //             <label htmlFor={size.value} className="label-text text-white">
  //               {size.label}
  //             </label>
  //             <input
  //               type="number"
  //               id={size.value}
  //               name={size.stock}
  //               placeholder="Product Stocks"
  //               className="input input-bordered w-full text-black"
  //             />
  //             <input
  //               type="number"
  //               id={size.value}
  //               name={size.price}
  //               placeholder="Product Price"
  //               className="input input-bordered w-full text-black"
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     ),
  //   });
  // }
  if (
    productType !== "UNIFORM_ACCESSORIES" &&
    productType !== "MISCELLANEOUS" &&
    productType !== "OTHER_PRODUCTS" &&
    productType !== "-"
  ) {
    const sizes = [
      { label: "Small", value: "S" },
      { label: "Medium", value: "M" },
      { label: "Large", value: "L" },
      { label: "Extra Large", value: "XL" },
      { label: "2 Extra Large", value: "2XL" },
      { label: "3 Extra Large", value: "3XL" },
      { label: "4 Extra Large", value: "4XL" },
      { label: "5 Extra Large", value: "5XL" },
      { label: "6 Extra Large", value: "6XL" },
      { label: "7 Extra Large", value: "7XL" },
    ];
    customInputs.push({
      id: "product-sizes",
      value: (
        <div className="flex h-[40rem] flex-col flex-wrap gap-5 text-white">
          <span className="text-lg font-bold">Product Sizes</span>
          {sizes.map((size) => (
            <div
              key={size.value}
              className="flex items-center justify-center gap-5"
            >
              <input
                type="checkbox"
                id={size.value}
                name="product-sizes"
                value={size.value}
                className="checkbox-accent checkbox"
              />
              <label htmlFor={size.value} className="label-text text-white">
                {size.label}
              </label>
              <input
                type="number"
                id={size.value}
                name="product-stocks"
                placeholder="Product Stocks"
                className="input input-bordered w-full text-black"
              />
              <input
                type="number"
                id={size.value}
                name="product-price"
                placeholder="Product Price"
                className="input input-bordered w-full text-black"
              />
            </div>
          ))}
        </div>
      ),
    });
  }
  if (
    productType === "UNIFORM_ACCESSORIES" ||
    productType === "MISCELLANEOUS"
  ) {
    customInputs.push({
      id: "stocks-only",
      value: (
        <div className="flex items-center justify-center gap-5">
          <input
            type="number"
            name="product-stocks"
            placeholder="Product Stocks"
            className="input input-bordered w-full text-black"
          />
          <input
            type="number"
            name="product-price"
            placeholder="Product Price"
            className="input input-bordered w-full text-black"
          />
        </div>
      ),
    });
  }
  if (productType === "OTHER_PRODUCTS") {
    const sizes = [
      { label: "11oz", value: "11oz" },
      { label: "30oz", value: "30oz" },
      { label: "40oz", value: "40oz" },
    ];
    const colorsOptions = [
      { label: "Blue", value: "BL" },
      { label: "Brown", value: "BR" },
      { label: "Green", value: "GR" },
      { label: "Grey", value: "GY" },
      { label: "Orange", value: "OR" },
      { label: "Pink", value: "PK" },
      { label: "Purple", value: "PL" },
      { label: "Red", value: "RD" },
      { label: "White", value: "WH" },
      { label: "Yellow", value: "YL" },
    ];
    customInputs.push({
      id: "other-product-sizes",
      value: (
        <div className="flex h-[20rem] flex-col flex-wrap gap-5 text-white">
          <div className="flex flex-wrap gap-5">
            {colorsOptions.map((color) => (
              <div
                key={color.value}
                className="flex items-center justify-center gap-5"
              >
                <input
                  type="checkbox"
                  id={color.value}
                  name="product-variant"
                  value={color.value}
                  className="checkbox-accent checkbox"
                />
                <label htmlFor={color.value} className="label-text text-white">
                  {color.label}
                </label>
              </div>
            ))}
          </div>
          <span className="text-lg font-bold">Product Sizes</span>
          {sizes.map((size) => (
            <div key={size.value} className="flex gap-5">
              <input
                type="checkbox"
                id={size.value}
                name="product-sizes"
                value={size.value}
                className="checkbox-accent checkbox"
              />
              <label htmlFor={size.value} className="label-text text-white">
                {size.label}
              </label>
              <input
                type="number"
                id={size.value}
                name="product-stocks"
                placeholder="Product Stocks"
                className="input input-bordered w-full text-black"
              />
              <input
                type="number"
                id={size.value}
                name="product-price"
                placeholder="Product Price"
                className="input input-bordered w-full text-black"
              />
            </div>
          ))}
        </div>
      ),
    });
  }

  return (
    <main className="m-5 flex flex-1 flex-col gap-2 text-white">
      <div className="flex items-center justify-between">
        <Button
          className="bg-white text-black hover:bg-white/80"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft />
        </Button>

        <Button
          disabled={loading}
          className="bg-white text-black hover:bg-white/80"
          onClick={() => document.getElementById("submit").click()}
        >
          Add To Product
        </Button>
      </div>
      {error && <div className="text-white">{error?.message}</div>}

      <ScrollArea className="flex flex-1 flex-col justify-center p-2 pr-0.5">
        <header className="flex flex-col items-center justify-center gap-2 p-2">
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-96 max-w-72 cursor-pointer rounded-md outline"
              onClick={() => {
                document.getElementById("productImageInput").click();
              }}
            />
          )}
          <input
            type="file"
            hidden
            id="productImageInput"
            accept="image/*"
            onChange={handleFileChange}
          />
          <Button
            variant="secondary"
            className={`h-20 text-lg uppercase ${imagePreview ? "hidden" : ""}`}
            onClick={() => {
              document.getElementById("productImageInput").click();
            }}
          >
            Add Image
          </Button>
        </header>
        <section>
          <form
            onSubmit={handleOnSubmit}
            className="flex flex-col gap-2 px-2 text-black"
          >
            <Input
              value={productName}
              labelStyle="text-white"
              handleOnBlur={handleProductNameBlur}
              handleOnChange={handleProductNameChange}
              type="text"
              id="product-name"
              placeholder="Product Name"
              isError={productNameHasError}
            />
            <Input
              value={productID}
              labelStyle="text-white"
              handleOnBlur={handleProductIDBlur}
              handleOnChange={handleProductIDChange}
              type="text"
              id="product-id"
              placeholder="Product ID"
              isError={productIDHasError}
            />
            <Input
              value={productDescription}
              labelStyle="text-white"
              handleOnBlur={handleProductDescriptionBlur}
              handleOnChange={handleProductDescriptionChange}
              type="text"
              id="product-description"
              placeholder="Product Description"
              isError={productDescriptionHasError}
            />

            <SelectModal
              labelStyle="text-white"
              value={productType}
              handleInputChange={handleProductTypeChange}
              handleInputBlur={handleProductTypeBlur}
              hasError={productTypeHasError}
              id={"product-type"}
              placeholder={"Product Type"}
              options={[
                {
                  label: "Daily Uniform - Top Attire",
                  value: "TOP_ATTIRE",
                },
                {
                  label: "Daily Uniform - Bottom Attire",
                  value: "BOTTOM_ATTIRE",
                },
                {
                  label: "Daily Uniform - Accessories",
                  value: "UNIFORM_ACCESSORIES",
                },
                {
                  label: "Special Uniform - Top Attire",
                  value: "GENERAL_TOP_ATTIRE",
                },
                {
                  label: "Special Uniform - Bottom Attire",
                  value: "GENERAL_BOTTOM_ATTIRE",
                },
                { label: "Miscellaneous Products", value: "MISCELLANEOUS" },
                { label: "Other Products", value: "OTHER_PRODUCTS" },
              ]}
            />
            {customInputs.map((input) => (
              <div className="" key={input.id}>
                {input.value}
              </div>
            ))}
            <button className="hidden" id="submit"></button>
          </form>
        </section>
      </ScrollArea>
    </main>
  );
}
