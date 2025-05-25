import { instance } from "../../../service/api";
import type { updateProducts } from "../../../types/Product";

function updateProduct(product: updateProducts) {
  // WARNING:
  instance.put("", {
    data: {
      id: product.id,
      nameProduct: product.nameProduct,
      suppliers: product.suppliers,
      dateExpiration: product.dateExpiration,
      dateAdd: product.dateAdd,
      weightProduct: product.weightProduct,
      amount: product.amount,
      priceProduct: product.priceProduct,
      images: product.images
    }
  }).then().catch(function (error) {
    console.log("the was error" + error)
  })
}
export { updateProduct }
