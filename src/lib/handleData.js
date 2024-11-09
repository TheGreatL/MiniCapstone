import { generateOrderID } from "@/lib/functions";
import { getCurrentDate } from "@/lib/functions";
import { getCurrentTime } from "@/lib/functions";
export const handleOnPostOrder = (formData, selectedProduct, totalOrder) => {
  const data = Object.fromEntries(formData.entries());

  const generatedOrderId = generateOrderID();
  const orderStatus = "ORDER_600";
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const userID = `02000${data[`student-no`]}`;
  const productID = selectedProduct.ProductID;
  const productSizeID =
    selectedProduct.ProductType === "UNIFORM_ACCESSORIES"
      ? "NULL"
      : data["product-size"];
  const productVariant = "NULL";
  const productStockID = selectedProduct.ProductStockID;
  const sales = totalOrder(selectedProduct);
  const total = totalOrder(selectedProduct);

  return {
    orderID: generatedOrderId,
    orderStatus: orderStatus,
    currentDate: currentDate,
    currentTime: currentTime,
    userID: userID,
    productID: productID,
    productSizeID: productSizeID,
    productVariant: productVariant,
    productStockID: productStockID,
    sales: sales,
    total: total,
  };
};
